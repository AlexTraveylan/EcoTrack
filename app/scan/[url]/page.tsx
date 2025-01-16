import Header from "@/components/header"
import ReportInfos from "@/components/report-infos"
import { Skeleton } from "@/components/ui/skeleton"
import { AnalysisService } from "@/lib/analysis.service"
import { bestPracticesFactory } from "@/lib/best-practice.service"
import { EcoIndexCalculator } from "@/lib/eco-index"
import { requestLighthouse } from "@/lib/lighthouse"
import { NavItemsBuilder } from "@/lib/routing-links"
import dynamic from "next/dynamic"

const DynamicEcoIndexDisplay = dynamic(() => import("@/components/ecoindex-card"), {
  loading: () => <Skeleton className="w-full max-w-4xl mx-auto h-[200px]" />,
})

const DynamicEcoMetricCard = dynamic(() => import("@/components/eco-metric-card"), {
  loading: () => <Skeleton className="w-full max-w-4xl mx-auto h-[200px]" />,
})

const DynamicChartRequests = dynamic(() => import("@/components/chart-requests"), {
  loading: () => <Skeleton className="w-full max-w-4xl mx-auto h-[200px]" />,
})

const DynamicBestPracticeCard = dynamic(() => import("@/components/best-practice-card"), {
  loading: () => <Skeleton className="w-full max-w-4xl mx-auto h-[200px]" />,
})

export default async function Page({
  params,
}: {
  params: Promise<{
    url: string
  }>
}) {
  const { url } = await params
  const decodedUrl = decodeURIComponent(url)

  const result = await requestLighthouse(decodedUrl)

  const metrics = new AnalysisService(result).getEcoMetric()
  const ecoIndex = new EcoIndexCalculator(metrics).getEcoIndex()
  const navigation = new NavItemsBuilder()
    .withHome()
    .withScan()
    .withScanUrl(decodedUrl)
    .getItems()

  const bestPractices = bestPracticesFactory(result)

  return (
    <>
      <Header navigation={navigation} />
      <main className="py-4">
        <div className="flex flex-col gap-4">
          <ReportInfos metrics={metrics} />
          <DynamicEcoIndexDisplay ecoIndex={ecoIndex} />
          <DynamicEcoMetricCard metrics={metrics} />
          <div className="flex gap-4 w-full max-w-4xl mx-auto">
            <DynamicChartRequests
              reqDetails={metrics.requests}
              title="Nombre de requêtes - Répartition"
            />
            <DynamicChartRequests
              reqDetails={metrics.byteWeight}
              title="Taille des requêtes - Répartition"
            />
          </div>
          <div className="flex flex-col gap-4 w-full max-w-4xl mx-auto">
            {bestPractices.map((practice, index) => {
              return <DynamicBestPracticeCard key={`Bp-n°${index}`} practice={practice} />
            })}
          </div>
        </div>
      </main>
    </>
  )
}
