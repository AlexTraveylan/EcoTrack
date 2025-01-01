import ChartLineHistory, {
  type ChartLinePossibilities,
  type MetricRecord,
} from "@/components/chart-line-history"
import Header from "@/components/header"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AnalysisService } from "@/lib/analysis.service"
import { EcoIndexCalculator } from "@/lib/eco-index"
import { jsonLhExtractorFactory } from "@/lib/folder-services/factories"
import { NavItemsBuilder, reportNumberItem } from "@/lib/routing-links"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import Link from "next/link"

export default async function Page({
  params,
}: {
  params: Promise<{ projectName: string; pageName: string }>
}) {
  const { projectName, pageName } = await params
  const navigation = new NavItemsBuilder()
    .withHome()
    .withSuivi()
    .withProject(projectName)
    .withPage(projectName, pageName)
    .getItems()

  // Trouver le projet et la page correspondants
  const projects = await jsonLhExtractorFactory.getProjectsPaths()
  const project = projects.find((p) => p.name === projectName)
  const page = project?.pages.find((p) => p.name === pageName)

  if (!project || !page) {
    return (
      <>
        <Header navigation={navigation} />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-4">Page non trouvée</h1>
          <p>{`La page ${pageName} n'existe pas dans le projet ${projectName}.`}</p>
        </main>
      </>
    )
  }

  const chartDataRecord: Record<ChartLinePossibilities, MetricRecord[]> = {
    ecoindex: [],
    gCO2e: [],
    dom: [],
    requests: [],
    size: [],
  }

  for (const reportNumber of page.numbers) {
    const result = await jsonLhExtractorFactory.getLightHouseReport({
      projectName,
      pageName,
      reportNumber,
    })
    const metrics = new AnalysisService(result).getEcoMetric()
    const ecoIndex = new EcoIndexCalculator(metrics).getEcoIndex()

    chartDataRecord.ecoindex.push({
      dateStr: format(metrics.date, "dd/MM/yyyy", { locale: fr }),
      ecoindex: ecoIndex.score,
    })
    chartDataRecord.gCO2e.push({
      dateStr: format(metrics.date, "dd/MM/yyyy", { locale: fr }),
      gCO2e: ecoIndex.gCo2e,
    })
    chartDataRecord.dom.push({
      dateStr: format(metrics.date, "dd/MM/yyyy", { locale: fr }),
      dom: metrics.dom,
    })
    chartDataRecord.requests.push({
      dateStr: format(metrics.date, "dd/MM/yyyy", { locale: fr }),
      requests: metrics.requests.total,
    })
    chartDataRecord.size.push({
      dateStr: format(metrics.date, "dd/MM/yyyy", { locale: fr }),
      size: metrics.byteWeight.total,
    })
  }

  return (
    <>
      <Header navigation={navigation} />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{page.name}</h1>
          <p className="text-gray-600">{`Projet: ${project.name}`}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Rapports disponibles
              <span className="text-sm text-gray-500">
                {page.numbers.length} rapport
                {page.numbers.length > 1 ? "s" : ""}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {page.numbers.map((number) => (
                <Link
                  key={number}
                  href={reportNumberItem(projectName, pageName, number).href}
                  className={buttonVariants({
                    variant: "outline",
                    size: "lg",
                    className: "w-full h-24 flex flex-col items-center justify-center",
                  })}
                >
                  <span className="text-2xl font-bold">N°{number}</span>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        <ChartLineHistory chartDataRecord={chartDataRecord} />
      </main>
    </>
  )
}
