import Header from "@/components/header"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { jsonLhExtractorFactory } from "@/lib/folder-services/factories"
import { NavItemsBuilder, pageItem, reportNumberItem } from "@/lib/routing-links"
import Link from "next/link"

export default async function Page({
  params,
}: {
  params: Promise<{ projectName: string }>
}) {
  const { projectName } = await params
  const navigation = new NavItemsBuilder()
    .withHome()
    .withSuivi()
    .withProject(projectName)
    .getItems()

  // Trouver le projet correspondant
  const projects = await jsonLhExtractorFactory.getProjectsPaths()
  const project = projects.find((p) => p.name === projectName)

  if (!project) {
    return (
      <>
        <Header navigation={navigation} />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-4">{"Projet non trouvé"}</h1>
          <p>{`Le projet ${projectName} n'existe pas.`}</p>
        </main>
      </>
    )
  }

  return (
    <>
      <Header navigation={navigation} />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{project.name}</h1>
          <p className="text-gray-600">{"Vue d'ensemble du projet"}</p>
        </div>

        <div className="grid gap-6">
          {project.pages.map((page) => (
            <Card key={page.name}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <Link
                    href={pageItem(projectName, page.name).href}
                    className={buttonVariants({ variant: "link" })}
                  >
                    {page.name}
                  </Link>
                  <span className="text-sm text-gray-500">
                    {page.numbers.length} rapport{page.numbers.length > 1 ? "s" : ""}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {page.numbers.map((number) => (
                    <Link
                      key={number}
                      href={reportNumberItem(projectName, page.name, number).href}
                      className={buttonVariants({
                        variant: "outline",
                        size: "sm",
                        className: "w-full text-center",
                      })}
                    >
                      {`Rapport n°${number}`}
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </>
  )
}
