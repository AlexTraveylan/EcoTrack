import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { NavItemsBuilder } from "@/lib/routing-links"
import Link from "next/link"

export default async function Home() {
  const navigation = new NavItemsBuilder().withHome().getItems()

  return (
    <>
      <Header navigation={navigation} />
      <main className="min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50">
        <div className="text-center p-8">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">
            <span className="text-green-600">Eco</span>Track
          </h1>

          <p className="text-xl text-gray-600 mx-auto mb-8">
            {"Suivez et optimisez la performance environnementale de vos applications web"}
          </p>

          <Link href="/suivi">
            <Button size="lg" className="text-lg px-8 py-6">
              {"Démarrer le suivi"}
              <svg
                className="ml-2 h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Button>
          </Link>
        </div>
      </main>
    </>
  )
}
