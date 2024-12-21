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

    return projects
  }
}

export const publicPathExtractor = new PublicPathExtractor()
