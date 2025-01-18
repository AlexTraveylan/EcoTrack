import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { NavItemsBuilder } from "@/lib/routing-links"
import { Activity, Database, Scan, Send } from "lucide-react"
import Link from "next/link"

export default async function Home() {
  const navigation = new NavItemsBuilder().withHome().getItems()

  const features = [
    {
      icon: <Activity className="w-6 h-6" />,
      title: "Suivi des métriques",
      description: "Analysez l'évolution des performances de vos sites",
      href: "/suivi",
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Import de données",
      description: "Importez vos rapports Lighthouse",
      href: "/ajout",
    },
    {
      icon: <Scan className="w-6 h-6" />,
      title: "Analyse rapide",
      description: "Testez instantanément n'importe quel site",
      href: "/scan",
    },
  ]

  return (
    <>
      <Header navigation={navigation} />
      <main className="min-h-[calc(100vh-8rem)] flex flex-col gap-8 items-center justify-center bg-gradient-to-b from-white to-gray-50">
        {/* Hero section */}
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900">
            <span className="text-green-600">Eco</span>Track
          </h1>
          <p className="text-xl text-gray-600 mx-auto max-w-2xl">
            {"Suivez et optimisez la performance environnementale de vos applications web"}
          </p>
        </div>

        {/* Section features */}
        <div className="w-full max-w-6xl">
          <div className="flex flex-wrap gap-6">
            {features.map((feature, index) => (
              <Link href={feature.href} key={index}>
                <Card className="h-full hover:shadow-lg transition-shadow duration-200 w-[350px]">
                  <CardHeader>
                    <CardTitle className="flex justify-center">
                      <div className="bg-green-100 rounded-lg p-3">{feature.icon}</div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center text-center">
                    <h3 className="font-semibold text-lg">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Section contact */}
        <div className="w-full max-w-2xl">
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
      </main>
    </>
  )
}
