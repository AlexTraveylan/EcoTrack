import { Card } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md p-6 bg-white shadow-lg relative overflow-hidden">
        {/* Barre de progression animée */}
        <div className="h-1 w-full bg-gray-100 mb-6 overflow-hidden">
          <div
            className="h-full bg-green-500 w-full animate-[shimmer_2s_infinite]
                        relative before:absolute before:inset-0 
                        before:translate-x-[-100%] before:bg-gradient-to-r 
                        before:from-transparent before:via-green-500 before:to-transparent
                        before:animate-[shimmer_2s_infinite]"
          />
        </div>

        {/* Titre */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {"Calcul d'éco-conception en cours"}
        </h2>

        {/* Indicateur de chargement rotatif */}
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 border-4 border-green-200 border-t-green-500 rounded-full animate-spin" />
        </div>

        {/* Message */}
        <p className="text-gray-600 text-center">
          {"Cette analyse peut prendre jusqu'à une minute."}
          <br />
          {"Merci de patienter..."}
        </p>

        {/* Effet de pulsation */}
        <div className="absolute inset-0 bg-green-100 opacity-20 animate-pulse" />
      </Card>
    </div>
  )
}
