import EcoMetricCard from "@/components/eco-metric-card"
import { AnalysisService } from "@/lib/analysis.service"
import { EcoIndexCalculator } from "@/lib/eco-index"
import { PublicPathExtractor } from "@/lib/json-lh-extractor.service"

export default async function Page({
  params,
}: {
  params: Promise<{ projectName: string; pageName: string; reportNumber: number }>
}) {
  const { projectName, pageName, reportNumber } = await params

  const extractor = new PublicPathExtractor(projectName, pageName)
  const result = await extractor.getLightHouseReport(reportNumber)
  const metrics = new AnalysisService(result).getEcoMetric()
  const ecoIndex = new EcoIndexCalculator(metrics).getEcoIndex()

  return (
    <main>
      <h1>Page du projet {projectName}</h1>
      <p>
        Contenu de la page {pageName} avec le rapport n°{reportNumber}
      </p>
      <EcoMetricCard metrics={metrics} />
    </main>
  )
}
