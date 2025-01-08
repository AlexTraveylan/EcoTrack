import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { EcoMetric } from "@/lib/types"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

const EcoMetricCard: React.FC<{ metrics: EcoMetric }> = ({ metrics }) => {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Information du rapport</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-between">
        <div className="text-sm text-muted-foreground">
          {format(metrics.date, "PPP", { locale: fr })}
        </div>
        {metrics.url && <div className="text-sm text-muted-foreground">{metrics.url}</div>}
      </CardContent>
    </Card>
  )
}

export default EcoMetricCard
