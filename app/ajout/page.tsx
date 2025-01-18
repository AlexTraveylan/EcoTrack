import Header from "@/components/header"
import { JsonUploadForm } from "@/components/json-upload-form"
import { NavItemsBuilder } from "@/lib/routing-links"

export default async function Page() {
  const navigation = new NavItemsBuilder().withHome().getItems()

  return (
    <>
      <Header navigation={navigation} />
      <main className="min-h-[calc(100vh-8rem)] container mx-auto px-4 py-8">
        <JsonUploadForm />
      </main>
    </>
  )
}
