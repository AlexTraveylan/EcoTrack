import type { Result } from "lighthouse"
import { Project, PublicJsonPath } from "../types"

/*
Interface pour extraire les données de l'audit Lighthouse
Depuis le fichier json dans le dossier public

Peut évoluer pour le recuperer depuis une API d'un téléchargement utilisateur
*/
export interface JsonLhExtractor {
  getLightHouseReport({
    projectName,
    pageName,
    reportNumber,
  }: PublicJsonPath): Promise<Result>
  getProjectsPaths(): Promise<Project[]>
  refreshProjectsPaths(): void
}

/*
Interface pour les actions sur les fichiers

Peut évoluer pour ajouter des actions comme la suppression de fichier
*/
export interface fileActions {
  uploadJsonFile(
    bucketName: string,
    projectName: string,
    pageName: string,
    jsonContent: Result
  ): Promise<string>
}
