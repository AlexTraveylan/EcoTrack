import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Scan } from "lucide-react"
import Link from "next/link"

export default async function MainFeature() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <Link href="/scan">
        <Card className="hover:shadow-lg transition-shadow duration-200 bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-100">
          <CardHeader>
            <CardTitle className="flex justify-center">
              <div className="bg-green-100 rounded-lg p-4">
                <Scan className="w-10 h-10" />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center text-center gap-4">
            <h2 className="font-semibold text-xl">
              {"Analyse instantanée d'éco-conception"}
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              {
                "Évaluez rapidement la performance environnementale de votre site web grâce à notre outil complet d'analyse. Obtenez des recommandations basées sur les meilleures pratiques du marché."
              }
            </p>
            <Button>
              {"Analyser mon site maintenant"}
              <ArrowRight className="w-5 h-5" />
            </Button>
          </CardContent>
        </Card>
      </Link>
    </div>
  )
}
