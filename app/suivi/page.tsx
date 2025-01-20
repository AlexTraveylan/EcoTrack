import Header from "@/components/header"
import { JsonLhExtractorFactory } from "@/lib/folder-services/factories"
import { NavItemsBuilder } from "@/lib/routing-links"
import SearchProjects from "./(composents)/search-projects"

export default async function Page() {
  const navigation = new NavItemsBuilder().withHome().withSuivi().getItems()
  const projects = await JsonLhExtractorFactory.getInstance().getProjectsPaths()

  return (
    <>
      <Header navigation={navigation} />
      <main className="min-h-[calc(100vh-8rem)] container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Rechercher des Projets</h1>
        <SearchProjects projects={projects} />
      </main>
    </>
  )
}
