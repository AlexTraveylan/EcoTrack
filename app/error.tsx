"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md p-6 bg-white shadow-lg">
        {/* Icône d'erreur */}
        <div className="flex justify-center mb-6">
          <AlertCircle className="h-12 w-12 text-red-500 animate-pulse" />
        </div>

        {/* Titre */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          {"Une erreur est survenue"}
        </h2>

        {/* Message d'erreur */}
        <p className="text-gray-600 text-center mb-6">
          {"Une erreur est survenue pendant l'analyse."}
          {error?.message && (
            <span className="block mt-2 text-sm text-gray-500">
              Détail: {error.message}
            </span>
          )}
        </p>

        {/* Boutons d'action */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => reset()}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            {"Réessayer"}
          </Button>
          <Button
            onClick={() => (window.location.href = "/")}
            variant="outline"
            className="border-green-600 text-green-600 hover:bg-green-50"
          >
            {"Retour à l'accueil"}
          </Button>
        </div>
      </Card>
    </div>
  )
}
