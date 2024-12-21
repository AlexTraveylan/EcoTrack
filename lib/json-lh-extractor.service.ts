import type { Result } from "lighthouse"
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
    return new Promise((resolve) => {
      resolve(projects)
    })
  }
}

export const publicPathExtractor = new PublicPathExtractor()

export const projects: Project[] = [
  {
    name: "home-page",
    pages: [
      {
        name: "accueil",
        numbers: [1, 2, 3],
      },
    ],
  },
  {
    name: "chercher-ma-formation",
    pages: [
      {
        name: "soudeur",
        numbers: [1],
      },
    ],
  },
]
