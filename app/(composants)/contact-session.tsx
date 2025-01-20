import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Send } from "lucide-react"

export default async function ContactSession() {
  return (
    <>
      <h2 className="text-2xl font-semibold text-center">{"Formulaire de contact"}</h2>

      <div className="w-full max-w-2xl mx-auto px-4 pb-16">
        <Card className="bg-gradient-to-r from-green-50 to-blue-50">
          <CardHeader>
            <CardTitle className="flex justify-center">
              <Send className="w-6 h-6 text-green-600" />
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 text-center">
            <h3 className="font-semibold text-lg">{"Besoin d'aide ?"}</h3>
            <p className="text-muted-foreground">
              {"Des questions ou des suggestions pour améliorer EcoTrack ?"}
            </p>
            <a
              href="https://www.alextraveylan.fr/fr/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button variant="outline" className="gap-2">
                {"Contactez-moi"}
                <Send className="w-4 h-4" />
              </Button>
            </a>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
