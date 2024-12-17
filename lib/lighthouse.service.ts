import type { Result } from "lighthouse"
import { getProjectDataPath } from "./settings"

/*
Interface pour extraire les données de l'audit Lighthouse
Depuis le fichier json dans le dossier public

Peut évoluer pour le recuperer depuis une API d'un téléchargement utilisateur
*/
interface JsonLhExtractor {
  getLightHouseReport(reportNumber: number): Promise<Result>
}

export class PublicPathExtractor implements JsonLhExtractor {
  constructor(private readonly projectName: string, private readonly pageName: string) {
    this.projectName = projectName
    this.pageName = pageName
  }

  async getLightHouseReport(reportNumber: number): Promise<Result> {
    const result = await fetch(
      getProjectDataPath({
        projectName: this.projectName,
        pageName: this.pageName,
        reportNumber,
      })
    )

    if (!result.ok) {
      throw new Error(`${reportNumber} not found on project ${this.projectName}`)
    }

    return result.json()
  }
}
