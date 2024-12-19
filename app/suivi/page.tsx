import Header from "@/components/header"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  NavItemsBuilder,
  pageItem,
  projectItem,
  projects,
  reportNumberItem,
} from "@/lib/routing-links"
import Link from "next/link"

export default async function Page() {
  const navigation = new NavItemsBuilder().withHome().withSuivi().getItems()

  return (
    <>
      <Header navigation={navigation} />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">{"Suivi des Projets"}</h1>
        <div className="grid gap-6">
          {projects.map((project) => (
            <Card key={project.name}>
              <CardHeader>
                <CardTitle>
                  <Link
                    href={projectItem(project.name).href}
                    className={buttonVariants({ variant: "link" })}
                  >
                    {project.name}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {project.pages.map((page) => (
                    <div key={page.name} className="pl-4 border-l-2 border-gray-200">
                      <h3 className="text-lg font-medium mb-2">
                        <Link
                          href={pageItem(project.name, page.name).href}
                          className={buttonVariants({ variant: "link" })}
                        >
                          {page.name}
                        </Link>
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                        {page.numbers.map((number) => (
                          <Link
                            key={number}
                            href={reportNumberItem(project.name, page.name, number).href}
                            className={buttonVariants({ variant: "outline", size: "sm" })}
                          >
                            {`Rapport n°${number}`}
                          </Link>
                        ))}
                      </div>
                    </div>
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
