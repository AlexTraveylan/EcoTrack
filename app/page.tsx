import Header from "@/components/header"
import { NavItemsBuilder } from "@/lib/routing-links"
import ContactSession from "./(composants)/contact-session"
import HeroSession from "./(composants)/hero-session"
import MainFeature from "./(composants)/main-feature"
import OtherFeatures from "./(composants)/other-features"

export default async function Home() {
  const navigation = new NavItemsBuilder().withHome().getItems()

  return (
    <>
      <Header navigation={navigation} />
      <main className="min-h-[calc(100vh-8rem)] flex flex-col gap-8 bg-gradient-to-b from-white to-gray-50">
        <HeroSession />

        <MainFeature />

        <OtherFeatures />

        <ContactSession />
      </main>
    </>
  )
}
