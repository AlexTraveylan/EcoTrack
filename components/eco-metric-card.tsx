import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { settings } from "@/lib/settings"
import type { EcoMetric } from "@/lib/types"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

const getColorClass = (
  value: number,
  targetThreshold: number,
  acceptableThreshold: number
) => {
  if (value <= targetThreshold) return "text-green-600"
  if (value <= acceptableThreshold) return "text-orange-600"
  return "text-red-600"
}

const formatNumber = (num: number) => num.toLocaleString("fr-FR")

const EcoMetricCard: React.FC<{ metrics: EcoMetric }> = ({ metrics }) => {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Performances Eco</CardTitle>
        <Badge variant="outline">{format(metrics.date, "PPP", { locale: fr })}</Badge>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          {/*  DOM */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Taille du DOM
            </h3>
            <p
              className={`text-2xl font-bold ${getColorClass(
                metrics.dom,
                settings.domT.target,
                settings.domT.acceptable
              )}`}
            >
              {formatNumber(metrics.dom)} ms
            </p>
          </div>
          {/* Nombre total de requêtes */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Nombre total de requêtes
            </h3>
            <p
              className={`text-2xl font-bold ${getColorClass(
                metrics.requests.total,
                settings.requestsT.target,
                settings.requestsT.acceptable
              )}`}
            >
              {formatNumber(metrics.requests.total)}
            </p>
          </div>
          {/* Poids total des octets */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Poids total en octets
            </h3>
            <p
              className={`text-2xl font-bold ${getColorClass(
                metrics.byteWeight.total,
                settings.sizeT.target,
                settings.sizeT.acceptable
              )}`}
            >
              {formatNumber(metrics.byteWeight.total)} octets
            </p>
          </div>
          {/* Détail des requêtes */}
          <div className="col-span-3 mt-4 grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-semibold mb-2">Répartition des requêtes</h4>
              <ul className="space-y-1 text-sm">
                <li>Scripts : {formatNumber(metrics.requests.scripts)}</li>
                <li>Feuilles de style : {formatNumber(metrics.requests.stylesheets)}</li>
                <li>Images : {formatNumber(metrics.requests.images)}</li>
                <li>Polices : {formatNumber(metrics.requests.fonts)}</li>
                <li>Autres : {formatNumber(metrics.requests.other)}</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-2">
                Répartition du poids en octets
              </h4>
              <ul className="space-y-1 text-sm">
                <li>Scripts : {formatNumber(metrics.byteWeight.scripts)} octets</li>
                <li>
                  Feuilles de style : {formatNumber(metrics.byteWeight.stylesheets)} octets
                </li>
                <li>Images : {formatNumber(metrics.byteWeight.images)} octets</li>
                <li>Polices : {formatNumber(metrics.byteWeight.fonts)} octets</li>
                <li>Autres : {formatNumber(metrics.byteWeight.other)} octets</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground border-t pt-4">
        <div className="grid grid-cols-3 w-full gap-4">
          <div>
            <strong>Temps DOM</strong>
            <p>Optimal : ≤ {formatNumber(settings.domT.target)} ms</p>
            <p>Acceptable : ≤ {formatNumber(settings.domT.acceptable)} ms</p>
          </div>
          <div>
            <strong>Nombre de requêtes</strong>
            <p>Optimal : ≤ {formatNumber(settings.requestsT.target)}</p>
            <p>Acceptable : ≤ {formatNumber(settings.requestsT.acceptable)}</p>
          </div>
          <div>
            <strong>Poids total</strong>
            <p>Optimal : ≤ {formatNumber(settings.sizeT.target)} octets</p>
            <p>Acceptable : ≤ {formatNumber(settings.sizeT.acceptable)} octets</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

export default EcoMetricCard
