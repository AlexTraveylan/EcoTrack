import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Database } from "lucide-react"
import Link from "next/link"

const features = [
  {
    icon: <Activity className="w-6 h-6" />,
    title: "Suivi des métriques",
    description:
      "Visualisez l'évolution de vos performances environnementales à travers des graphiques détaillés et suivez vos progrès dans le temps.",
    href: "/suivi",
  },
  {
    icon: <Database className="w-6 h-6" />,
    title: "Import de données",
    description:
      "Importez manuellement vos rapports Lighthouse via un formulaire simple et intuitif.",
    href: "/ajout",
  },
]

export default async function OtherFeatures() {
  return (
    <div className="w-full bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-semibold text-center mb-6">
          {"Fonctionnalités de suivi"}
        </h2>
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
          {
            "EcoTrack vous permet de suivre l'évolution de vos sites web dans le temps. Branchez EcoTrack à un dossier, ou un S3 Amazon. Il vous est ainsi possible d'automatiser l'ajout de fichiers pour les pages simples. Et manuellement pour les pages complexes necessitant une authentification, des certificats ou une configuration de proxy. Cette approche vous offre la flexibilité de gérer vos analyses comme vous le souhaitez, particulièrement utile pour les sites nécessitant une authentification spéciale ou des configurations particulières."
          }
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <Link href={feature.href} key={index}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <CardTitle className="flex justify-center">
                    <div className="bg-green-100 rounded-lg p-3">{feature.icon}</div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center text-center">
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
