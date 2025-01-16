import settings from "@/package.json"

export default async function Footer() {
  return (
    <footer className="border-t py-4 px-4">
      <div className="container mx-auto text-center text-sm text-gray-600">
        <p>© 2025 AlexTraveylan. Tous droits réservés.</p>
        <p>Version {settings.version}</p>
      </div>
    </footer>
  )
}
