export default async function Page({
  params,
}: {
  params: Promise<{ projectName: string }>
}) {
  const projetName = (await params).projectName

  return (
    <main>
      <h1>Page du projet {projetName}</h1>
      <p>Contenu de la page</p>
    </main>
  )
}
