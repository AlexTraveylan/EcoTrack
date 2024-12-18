export default async function Page({
  params,
}: {
  params: Promise<{ projectName: string; pageName: string }>
}) {
  const { projectName, pageName } = await params

  return (
    <main>
      <h1>Page du projet {projectName}</h1>
      <p>Contenu de la page {pageName}</p>
    </main>
  )
}
