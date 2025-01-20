import { promises as fs } from "fs"
import { glob } from "glob"
import type { Result } from "lighthouse"
import path from "path"
import { settings } from "../settings"
import { Project, PublicJsonPath } from "../types"
import { fileActions, JsonLhExtractor } from "./interfaces"

export function getProjectDataPath({
  pageName,
  projectName,
  reportNumber,
}: PublicJsonPath): string {
  return `${settings.baseUrl}/${projectName}/${pageName}/${reportNumber}.json`
}

export class PublicPathExtractor implements JsonLhExtractor, fileActions {
  async uploadJsonFile(
    bucketName: string,
    projectName: string,
    pageName: string,
    jsonContent: Result
  ): Promise<string> {
    if (bucketName !== "public") {
      throw new Error("'public' is the only bucket available on this service")
    }

    const basePath = process.cwd()
    const dirPath = path.join(basePath, bucketName, projectName, pageName)

    const existingFiles = await glob("*.json", { cwd: dirPath })
    const reportNumber = existingFiles.length + 1

    const jsonPath = path.join(dirPath, `${reportNumber}.json`)

    await fs.mkdir(dirPath, { recursive: true })
    await fs.writeFile(jsonPath, JSON.stringify(jsonContent))

    this.refreshProjectsPaths()

    return jsonPath
  }
  private projects: Project[] | null = null

  public refreshProjectsPaths(): void {
    this.projects = null
  }

  async getLightHouseReport({
    projectName,
    pageName,
    reportNumber,
  }: PublicJsonPath): Promise<Result> {
    const result = await fetch(
      getProjectDataPath({
        projectName: projectName,
        pageName: pageName,
        reportNumber,
      })
    )

    if (!result.ok) {
      throw new Error(`${reportNumber} not found on project ${projectName}`)
    }

    return result.json()
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
