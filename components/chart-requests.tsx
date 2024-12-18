"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import type { RequestDetails } from "@/lib/types"
import { LabelList, Pie, PieChart } from "recharts"

const ChartRequests: React.FC<{ reqDetails: RequestDetails; title: string }> = ({
  reqDetails,
  title,
}) => {
  const chartData = [
    {
      requestType: "scripts",
      nbReq: reqDetails.scripts,
      fill: "var(--color-scripts)",
    },
    {
      requestType: "stylesheets",
      nbReq: reqDetails.stylesheets,
      fill: "var(--color-stylesheets)",
    },
    {
      requestType: "images",
      nbReq: reqDetails.images,
      fill: "var(--color-images)",
    },
    {
      requestType: "fonts",
      nbReq: reqDetails.fonts,
      fill: "var(--color-fonts)",
    },
    {
      requestType: "other",
      nbReq: reqDetails.other,
      fill: "var(--color-other)",
    },
  ]

  const chartConfig = {
    nbReq: {
      label: "Nb de requêtes",
    },
    scripts: {
      label: "Js",
      color: "hsl(var(--chart-1))",
    },
    stylesheets: {
      label: "Css",
      color: "hsl(var(--chart-2))",
    },
    images: {
      label: "Img",
      color: "hsl(var(--chart-3))",
    },
    fonts: {
      label: "Font",
      color: "hsl(var(--chart-4))",
    },
    other: {
      label: "Autres",
      color: "hsl(var(--chart-5))",
    },
  } satisfies ChartConfig

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square min-h-[390px] [&_.recharts-text]:fill-background"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent nameKey="nbReq" hideLabel />} />
            <Pie data={chartData} dataKey="nbReq">
              <LabelList
                dataKey="requestType"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value: keyof typeof chartConfig) => chartConfig[value]?.label}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default ChartRequests
