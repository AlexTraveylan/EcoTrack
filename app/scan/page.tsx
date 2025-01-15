import Header from "@/components/header"
import { NavItemsBuilder } from "@/lib/routing-links"

export default async function Page() {
  const navigation = new NavItemsBuilder().withHome().withScan().getItems()
  return (
    <>
      <Header navigation={navigation} />
      <main className="py-4">
        <div>
          <h1>Scan ta page</h1>
          <div>Mettre ici un formulaire dinput url et un bouton</div>
        </div>
      </main>
    </>
  )
}
