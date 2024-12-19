import { AnalysisService } from "./analysis.service"
import { PublicPathExtractor } from "./json-lh-extractor.service"
import type { EcoIndex, EcoMetric, Grade } from "./types"

const quantilesDom: number[] = [
  0, 47, 75, 159, 233, 298, 358, 417, 476, 537, 603, 674, 753, 843, 949, 1076, 1237, 1459,
  1801, 2479, 594601,
]
const quantilesReq: number[] = [
  0, 2, 15, 25, 34, 42, 49, 56, 63, 70, 78, 86, 95, 105, 117, 130, 147, 170, 205, 281,
  3920,
]
const quantilesSize: number[] = [
  0, 1.37, 144.7, 319.53, 479.46, 631.97, 783.38, 937.91, 1098.62, 1265.47, 1448.32,
  1648.27, 1876.08, 2142.06, 2465.37, 2866.31, 3401.59, 4155.73, 5400.08, 8037.54,
  223212.26,
]

function getQuantile(quantiles: number[], value: number): number {
  for (let i = 1; i < quantiles.length; i++) {
    if (value < quantiles[i]) {
      return i - 1 + (value - quantiles[i - 1]) / (quantiles[i] - quantiles[i - 1])
    }
  }

  return quantiles.length - 1
}

function getGrade(score: number): Grade {
  if (score >= 80) return "A"
  if (score >= 70) return "B"
  if (score >= 55) return "C"
  if (score >= 40) return "D"
  if (score >= 25) return "E"
  if (score >= 10) return "F"
  return "G"
}

export class EcoIndexCalculator {
  private score: number | null

  constructor(private readonly metrics: EcoMetric) {
    this.metrics = metrics
    this.score = null
  }

  public getEcoIndex(): EcoIndex {
    return {
      score: this.getScore(),
      gCo2e: this.getGCo2e(),
      water: this.getWater(),
      grade: getGrade(this.getScore()),
    }
  }

  private getScore(): number {
    if (this.score) {
      return this.score
    }

    const domScore = getQuantile(quantilesDom, this.metrics.dom)
    const reqScore = getQuantile(quantilesReq, this.metrics.requests.total)
    const sizeScore = getQuantile(quantilesSize, this.metrics.byteWeight.total)

    this.score = Math.round(100 - (5 * (3 * domScore + 2 * reqScore + sizeScore)) / 6)

    return this.score
  }

  private getGCo2e(): number {
    return Math.round(100 * (2 + (2 * (50 - this.getScore())) / 100)) / 100
  }

  private getWater(): number {
    return Math.round(100 * (3 + (3 * (50 - this.getScore())) / 100)) / 100
  }
}
