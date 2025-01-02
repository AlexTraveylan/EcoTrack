import {
  GetObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
  _Object,
} from "@aws-sdk/client-s3"
import type { Result } from "lighthouse"
import { settings } from "../settings"
import type { Page, Project, PublicJsonPath } from "../types"
import { JsonLhExtractor, fileActions } from "./interfaces"

export class S3AmazonService implements JsonLhExtractor, fileActions {
  private projects: Project[] | null = null
  private client: S3Client

  constructor() {
    this.client = new S3Client({
      forcePathStyle: true,
      region: settings.s3Region,
      endpoint: settings.s3Endpoint,
      credentials: {
        accessKeyId: settings.s3AccessKeyId,
        secretAccessKey: settings.s3SecretAccessKey,
      },
    })
  }

  public refreshProjectsPaths() {
    this.projects = null
  }

  private async listBucketContents(bucketName: string) {
    try {
      const command = new ListObjectsV2Command({
        Bucket: bucketName,
      })
      const response = await this.client.send(command)

      return response.Contents
    } catch (error) {
      throw error
    }
  }

  public async getProjectsPaths(): Promise<Project[]> {
    if (this.projects) {
      return this.projects
    }

    try {
      const contents = await this.listBucketContents(settings.bucketName)
      if (!contents) {
        return []
      }
      const projectsMap = new Map<string, Map<string, Set<number>>>()

      for (const item of contents) {
        if (!item.Key) continue

        const segments = item.Key.split("/")
        if (segments.length !== 3) continue

        const [projectName, pageName, fileName] = segments
        const number = parseInt(fileName.replace(".json", ""))

        if (!projectsMap.has(projectName)) {
          projectsMap.set(projectName, new Map())
        }
        const project = projectsMap.get(projectName)!

        if (!project.has(pageName)) {
          project.set(pageName, new Set())
        }
        const page = project.get(pageName)!

        page.add(number)
      }

      const projects: Project[] = []
      for (const [projectName, pagesMap] of projectsMap) {
        const pages: Page[] = []

        for (const [pageName, numbersSet] of pagesMap) {
          pages.push({
            name: pageName,
            numbers: Array.from(numbersSet).sort((a, b) => a - b),
          })
        }

        projects.push({
          name: projectName,
          pages: pages.sort((a, b) => a.name.localeCompare(b.name)),
        })
      }

      this.projects = projects.sort((a, b) => a.name.localeCompare(b.name))

      return this.projects
    } catch (error) {
      throw error
    }
  }

  async getLightHouseReport({
    pageName,
    projectName,
    reportNumber,
  }: PublicJsonPath): Promise<Result> {
    try {
      const key = `${projectName}/${pageName}/${reportNumber}.json`
      const command = new GetObjectCommand({
        Bucket: "lighthouseResults",
        Key: key,
      })

      const response = await this.client.send(command)
      const data = await response.Body?.transformToString()

      if (!data) {
        throw new Error("Aucune donnée trouvée")
      }

      return JSON.parse(data)
    } catch (error) {
      console.error("Erreur lors de la récupération du fichier:", error)
      throw error
    }
  }

  public async uploadJsonFile(
    bucketName: string,
    projectName: string,
    pageName: string,
    jsonContent: Result
  ): Promise<string> {
    try {
      // 1. Obtenir la liste des fichiers existants dans ce dossier
      const prefix = `${projectName}/${pageName}/`
      const existingFiles = await this.listFilesInFolder(bucketName, prefix)

      // 2. Déterminer le prochain numéro de fichier
      let nextNumber = 1
      if (existingFiles.length > 0) {
        const numbers = existingFiles
          .map((file) => {
            const match = file.Key?.match(/(\d+)\.json$/)
            return match ? parseInt(match[1]) : 0
          })
          .filter((num) => num > 0)

        nextNumber = numbers.length > 0 ? Math.max(...numbers) + 1 : 1
      }

      // 3. Créer le chemin complet du nouveau fichier
      const fileName = `${nextNumber}.json`
      const fullPath = `${prefix}${fileName}`

      // 4. Télécharger le fichier
      const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: fullPath,
        Body: JSON.stringify(jsonContent),
        ContentType: "application/json",
      })

      await this.client.send(command)

      return fullPath
    } catch (error) {
      console.error("Erreur lors du téléchargement du fichier:", error)
      throw error
    }
  }

  private async listFilesInFolder(bucketName: string, prefix: string): Promise<_Object[]> {
    try {
      const command = new ListObjectsV2Command({
        Bucket: bucketName,
        Prefix: prefix,
      })

      const response = await this.client.send(command)
      return response.Contents || []
    } catch (error) {
      console.error("Erreur lors de la lecture du dossier:", error)
      throw error
    }
  }
}
