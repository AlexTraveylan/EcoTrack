import { promises as fs } from "fs"
import type { Result } from "lighthouse"
import path from "path"
import { getProjectDataPath } from "./settings"
import { Project, PublicJsonPath } from "./types"

/*
Interface pour extraire les données de l'audit Lighthouse
Depuis le fichier json dans le dossier public

Peut évoluer pour le recuperer depuis une API d'un téléchargement utilisateur
*/
interface JsonLhExtractor {
  getLightHouseReport({
    projectName,
    pageName,
    reportNumber,
  }: PublicJsonPath): Promise<Result>
  getProjectsPaths(): Promise<Project[]>
}

class PublicPathExtractor implements JsonLhExtractor {
  private instance: PublicPathExtractor | null = null
  private projects: Project[] | null = null
  private cache = new Map<string, Promise<Result>>()

  constructor() {
    if (this.instance) {
      return this.instance
    }
    this.instance = this
  }

  async getLightHouseReport({
    projectName,
    pageName,
    reportNumber,
  }: PublicJsonPath): Promise<Result> {
    const cacheKey = `${projectName}-${pageName}-${reportNumber}`

    const cached = this.cache.get(cacheKey)
    if (cached) {
      return cached
    }

    const promise = fetch(
      getProjectDataPath({
        projectName,
        pageName,
        reportNumber,
      })
    ).then((result) => {
      if (!result.ok) {
        throw new Error(`${reportNumber} not found on project ${projectName}`)
      }
      return result.json()
    })

    this.cache.set(cacheKey, promise)
    return promise
  }

  public async getProjectsPaths(): Promise<Project[]> {
    if (this.projects) {
      return this.projects
    }

    const projectsDir = path.join(process.cwd(), "public")

    const projects: Project[] = []

    const projectNames = await fs.readdir(projectsDir)
    for (const projectName of projectNames) {
      const projectPath = path.join(projectsDir, projectName)
      const pageNames = await fs.readdir(projectPath)

      const pages = []
      for (const pageName of pageNames) {
        const pagePath = path.join(projectPath, pageName)
        const fileNames = await fs.readdir(pagePath)

        const numbers = fileNames
          .filter((fileName) => fileName.endsWith(".json"))
          .map((fileName) => parseInt(fileName.replace(".json", "")))

        pages.push({ name: pageName, numbers })
      }

      projects.push({ name: projectName, pages })
    }

    this.projects = projects
    return projects
  }
}

export const publicPathExtractor = new PublicPathExtractor()
