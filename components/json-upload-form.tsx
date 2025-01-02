"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { File, Upload } from "lucide-react"
import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { useForm } from "react-hook-form"

interface FormValues {
  projectName: string
  pageName: string
  jsonFile: File | null
}

export const JsonUploadForm = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      projectName: "",
      pageName: "",
      jsonFile: null,
    },
  })

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      if (file) {
        if (file.type !== "application/json" && !file.name.endsWith(".json")) {
          console.log("Fichier invalide")
          return
        }
        form.setValue("jsonFile", file)
      }
    },
    [form]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/json": [".json"],
    },
    maxFiles: 1,
  })

  const handleSubmit = async (values: FormValues) => {
    try {
      if (!values.jsonFile) {
        console.log("Fichier JSON requis")
        return
      }

      const formData = new FormData()
      formData.append("projectName", values.projectName)
      formData.append("pageName", values.pageName)
      formData.append("jsonFile", values.jsonFile)

      const response = await fetch("/api/uploadFile", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Erreur lors de l'envoi")
      }

      const data = await response.json()

      form.reset()
      console.log("Téléchargement réussi", data)
    } catch (error) {
      console.error("Erreur lors du téléchargement:", error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="projectName"
          rules={{ required: "Le nom du projet est requis" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom du projet</FormLabel>
              <FormControl>
                <Input placeholder="mon-projet" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pageName"
          rules={{ required: "Le nom de la page est requis" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom de la page</FormLabel>
              <FormControl>
                <Input placeholder="ma-page" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="jsonFile"
          rules={{ required: "Le fichier JSON est requis" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fichier JSON</FormLabel>
              <FormControl>
                <Card
                  {...getRootProps()}
                  className={`border-2 border-dashed ${
                    isDragActive ? "border-primary" : "border-muted"
                  } hover:border-primary cursor-pointer transition-colors`}
                >
                  <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                    <input
                      {...getInputProps()}
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          field.onChange(file)
                        }
                      }}
                    />
                    {field.value ? (
                      <div className="flex items-center gap-2">
                        <File className="h-6 w-6" />
                        <span>{field.value.name}</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <Upload className="h-12 w-12 text-muted-foreground" />
                        <div className="text-muted-foreground">
                          <p>Glissez-déposez votre fichier JSON ici</p>
                          <p>ou cliquez pour sélectionner un fichier</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Télécharger
        </Button>
      </form>
    </Form>
  )
}
