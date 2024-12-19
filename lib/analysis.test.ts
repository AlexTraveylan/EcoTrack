import { readFileSync } from "fs"
import type { Result } from "lighthouse"
import path from "path"
import { AnalysisService } from "./analysis.service"
import { settings } from "./settings"

describe("AnalysisService-HP", () => {
  let result: Result
  let analysis: AnalysisService

  beforeEach(() => {
    const jsonData = readFileSync(
      path.join(settings.workspace, "public/home-page/accueil/1.json"),
      "utf-8"
    )
    result = JSON.parse(jsonData) as Result
    analysis = new AnalysisService(result)
  })

  it("should have the correct date", () => {
    const ecoMetric = analysis.getEcoMetric()
    expect(ecoMetric.date.toISOString()).toBe("2024-12-11T21:01:56.661Z")
  })

  it("should have the correct DOM size", () => {
    const ecoMetric = analysis.getEcoMetric()
    expect(ecoMetric.dom).toBe(585)
  })

  it("should have the correct request counts", () => {
    const ecoMetric = analysis.getEcoMetric()
    expect(ecoMetric.requests.total).toBe(64)
    expect(ecoMetric.requests.scripts).toBe(9)
    expect(ecoMetric.requests.stylesheets).toBe(2)
    expect(ecoMetric.requests.images).toBe(26)
    expect(ecoMetric.requests.fonts).toBe(9)
    expect(ecoMetric.requests.other).toBe(18)
  })

  it("should have the correct byte weight", () => {
    const ecoMetric = analysis.getEcoMetric()
    expect(ecoMetric.byteWeight.total).toBe(1629768)
    expect(ecoMetric.byteWeight.scripts).toBe(692810)
    expect(ecoMetric.byteWeight.stylesheets).toBe(99199)
    expect(ecoMetric.byteWeight.images).toBe(637602)
    expect(ecoMetric.byteWeight.fonts).toBe(161490)
    expect(ecoMetric.byteWeight.other).toBe(38667)
  })
})
