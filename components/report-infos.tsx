import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { EcoMetric } from "@/lib/types"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Badge } from "./ui/badge"

const EcoMetricCard: React.FC<{ metrics: EcoMetric }> = ({ metrics }) => {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Information du rapport</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-4">
        <Badge variant="outline">{format(metrics.date, "PPP", { locale: fr })}</Badge>
        {metrics.url && <Badge variant="outline">{metrics.url}</Badge>}
      </CardContent>
    </Card>
  )
}

export default EcoMetricCard
