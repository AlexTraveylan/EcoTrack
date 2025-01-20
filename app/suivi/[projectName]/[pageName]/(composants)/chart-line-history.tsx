"use client"

import { useState } from "react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export type ChartLinePossibilities = "ecoindex" | "gCO2e" | "dom" | "requests" | "size"

const chartConfig = {
  ecoindex: {
    label: "Eco Index",
    color: "hsl(var(--chart-1))",
  },
  gCO2e: {
    label: "gCO2e",
    color: "hsl(var(--chart-2))",
  },
  dom: {
    label: "Taille du DOM",
    color: "hsl(var(--chart-3))",
  },
  requests: {
    label: "Nombre de requêtes",
    color: "hsl(var(--chart-4))",
  },
  size: {
    label: "Poids",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

export type MetricRecord = {
  dateStr: string
  ecoindex?: number
  gCO2e?: number
  dom?: number
  requests?: number
  size?: number
}

const ChartLineHistory = ({
  chartDataRecord,
}: {
  chartDataRecord: Record<ChartLinePossibilities, MetricRecord[]>
}) => {
  const [mesureKey, setMesureKey] = useState<ChartLinePossibilities>("gCO2e")
  const color = `var(--color-${mesureKey})`

  const chartData = chartDataRecord[mesureKey]

  // Calculer le min et max des données pour ajuster l'échelle
  const values = chartData
    .map((item) => item[mesureKey] as number)
    .filter((value) => value !== undefined)

  const minValue = Math.min(...values)
  const maxValue = Math.max(...values)
  const padding = (maxValue - minValue) * 0.1 // 10% de marge

  return (
    <Card>
      <CardHeader>
        <CardTitle>{"Évolution des mesures de la page"}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup
          value={mesureKey}
          onValueChange={(value) => setMesureKey(value as ChartLinePossibilities)}
          className="grid grid-cols-2 gap-4 sm:grid-cols-5"
        >
          {Object.entries(chartConfig).map(([key, config]) => (
            <div key={key} className="flex items-center space-x-2">
              <RadioGroupItem value={key} id={key} />
              <Label htmlFor={key}>{config.label}</Label>
            </div>
          ))}
        </RadioGroup>

        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
              left: 40,
              right: 20,
              bottom: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="dateStr"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              padding={{ left: 30, right: 30 }}
              tickFormatter={(value) => value.slice(0, 10)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              domain={[minValue - padding, maxValue + padding]}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Line
              dataKey={mesureKey}
              type="natural"
              stroke={color}
              strokeWidth={2}
              dot={{
                fill: color,
                r: 4,
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default ChartLineHistory
