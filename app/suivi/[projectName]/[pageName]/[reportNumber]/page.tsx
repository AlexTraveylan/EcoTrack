import ChartRequests from "@/components/chart-requests"
import EcoMetricCard from "@/components/eco-metric-card"
import EcoIndexDisplay from "@/components/ecoindex-card"
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
      <div className="flex flex-col gap-4">
        <EcoIndexDisplay ecoIndex={ecoIndex} />
        <EcoMetricCard metrics={metrics} />
        <div className="flex gap-4 w-full max-w-4xl mx-auto">
          <ChartRequests
            reqDetails={metrics.requests}
            title="Nombre de requêtes - Répartition"
          />
          <ChartRequests
            reqDetails={metrics.byteWeight}
            title="Taille des requêtes - Répartition"
          />
        </div>
      </div>
    </main>
  )
}
