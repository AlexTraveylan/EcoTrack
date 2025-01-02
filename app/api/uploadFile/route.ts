import { JsonLhExtractorFactory } from "@/lib/folder-services/factories"
import { settings } from "@/lib/settings"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()

    const projectName = formData.get("projectName") as string
    const pageName = formData.get("pageName") as string
    const jsonFile = formData.get("jsonFile") as File

    // Validation des champs requis
    if (!projectName || !pageName || !jsonFile) {
      return NextResponse.json({ error: "Tous les champs sont requis" }, { status: 400 })
    }

    // Lecture du contenu du fichier JSON
    const fileContent = await jsonFile.text()
    let jsonContent

    try {
      jsonContent = JSON.parse(fileContent)
    } catch (e) {
      return NextResponse.json(
        { error: "Le fichier doit être un JSON valide" },
        { status: 400 }
      )
    }

    const uploadService = JsonLhExtractorFactory.getInstance()
    const result_path = await uploadService.uploadJsonFile(
      settings.bucketName,
      projectName,
      pageName,
      jsonContent
    )

    uploadService.refreshProjectsPaths()

    return NextResponse.json(
      { message: `Téléchargement réussi : ${result_path}` },
      { status: 200 }
    )
  } catch (error) {
    console.error("Erreur lors du traitement:", error)
    return NextResponse.json(
      { error: "Erreur lors du traitement de la requête" },
      { status: 500 }
    )
  }
}
