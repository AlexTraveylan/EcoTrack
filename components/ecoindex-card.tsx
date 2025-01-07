import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { EcoIndex, Grade } from "@/lib/types"

const getGradeColor = (grade: Grade): string => {
  const colors = {
    A: "bg-green-500",
    B: "bg-green-400",
    C: "bg-yellow-400",
    D: "bg-yellow-500",
    E: "bg-orange-500",
    F: "bg-red-400",
    G: "bg-red-500",
  }[grade]

  return colors
}
const EcoIndexDisplay: React.FC<{ ecoIndex: EcoIndex }> = ({ ecoIndex }) => {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Eco Index</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-center justify-center">
          <div
            className={`${getGradeColor(
              ecoIndex.grade
            )} w-24 h-24 rounded-full flex items-center justify-center`}
          >
            <span className="text-4xl font-bold text-white">{ecoIndex.grade}</span>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">{"Score EcoIndex"}</p>
            <p className="text-xl font-semibold">{ecoIndex.score.toFixed(1)} / 100</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">{"Émissions CO2"}</p>
            <p className="text-xl font-semibold">{ecoIndex.gCo2e.toFixed(2)} gCO2e</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">{"Consommation d'eau"}</p>
            <p className="text-xl font-semibold">{ecoIndex.water.toFixed(2)} cl</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default EcoIndexDisplay
