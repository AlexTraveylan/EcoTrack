import Header from "@/components/header"
import ScanUrlForm from "@/components/scan-url-form"
import { NavItemsBuilder } from "@/lib/routing-links"

export default async function Page() {
  const navigation = new NavItemsBuilder().withHome().withScan().getItems()
  return (
    <>
      <Header navigation={navigation} />
      <main className="min-h-[calc(100vh-8rem)] container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-6">
            {"Analysez l'impact environnemental de votre site"}
          </h1>

          <div className="text-center mb-8">
            <p className="text-lg text-gray-600 mb-4">
              {
                "Découvrez comment votre site web impacte l'environnement et obtenez des recommandations concrètes pour réduire son empreinte carbone."
              }
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="text-center p-4">
              <div className="text-2xl font-bold text-green-600 mb-2">🔍</div>
              <h3 className="font-semibold mb-2">{"Analyse complète"}</h3>
              <p className="text-gray-600">
                {
                  "Performance, poids des pages, optimisation des images et bonnes pratiques d'écoconception"
                }
              </p>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl font-bold text-green-600 mb-2">💡</div>
              <h3 className="font-semibold mb-2">{"Recommandations"}</h3>
              <p className="text-gray-600">
                {
                  "Conseils personnalisés et actions concrètes pour améliorer l'impact de votre site"
                }
              </p>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl font-bold text-green-600 mb-2">📊</div>
              <h3 className="font-semibold mb-2">{"Score détaillé"}</h3>
              <p className="text-gray-600">
                {"Évaluation précise basée sur les critères d'écoconception web"}
              </p>
            </div>
          </div>

          <div className="bg-green-50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold mb-4 text-center">
              {"Commencez votre analyse"}
            </h2>
            <p className="text-center text-gray-600 mb-6">
              {
                "Entrez l'URL de votre site web pour obtenir une analyse détaillée et des recommandations d'amélioration"
              }
            </p>
            <ScanUrlForm />
          </div>

          <div className="text-center text-sm text-gray-500">
            <p>
              {
                "L'analyse prend en compte les bonnes pratiques de l'écoconception web et les dernières recommandations du GreenIT."
              }
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
