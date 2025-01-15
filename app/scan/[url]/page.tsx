import BestPracticeCard from "@/components/best-practice-card"
import ChartRequests from "@/components/chart-requests"
import EcoMetricCard from "@/components/eco-metric-card"
import EcoIndexDisplay from "@/components/ecoindex-card"
import Header from "@/components/header"
import ReportInfos from "@/components/report-infos"
import { AnalysisService } from "@/lib/analysis.service"
import { bestPracticesFactory } from "@/lib/best-practice.service"
import { EcoIndexCalculator } from "@/lib/eco-index"
import { requestLighthouse } from "@/lib/lighthouse"
import { NavItemsBuilder } from "@/lib/routing-links"

export default async function Page({
  params,
}: {
  params: Promise<{
    url: string
  }>
}) {
  const { url } = await params
  const urlToString = url.replace("--", "://").replaceAll("-", "/").replaceAll("!", ".")

  const result = await requestLighthouse(urlToString)

  const metrics = new AnalysisService(result).getEcoMetric()
  const ecoIndex = new EcoIndexCalculator(metrics).getEcoIndex()
  const navigation = new NavItemsBuilder()
    .withHome()
    .withScan()
    .withScanUrl(urlToString)
    .getItems()

  const bestPractices = bestPracticesFactory(result)

  return (
    <>
      <Header navigation={navigation} />
      <main className="py-4">
        <div className="flex flex-col gap-4">
          <ReportInfos metrics={metrics} />
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
          <div className="flex flex-col gap-4 w-full max-w-4xl mx-auto">
            {bestPractices.map((practice, index) => {
              return <BestPracticeCard key={`Bp-n°${index}`} practice={practice} />
            })}
          </div>
        </div>
      </main>
    </>
  )
}
