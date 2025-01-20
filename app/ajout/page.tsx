import { JsonUploadForm } from "@/app/ajout/(composants)/json-upload-form"
import Header from "@/components/header"
import { NavItemsBuilder } from "@/lib/routing-links"

export default async function Page() {
  const navigation = new NavItemsBuilder().withHome().getItems()

  return (
    <>
      <Header navigation={navigation} />
      <main className="min-h-[calc(100vh-8rem)] container mx-auto px-4 py-8 items-center grid">
        <JsonUploadForm />
      </main>
    </>
  )
}
