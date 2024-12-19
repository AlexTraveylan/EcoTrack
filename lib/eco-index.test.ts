import { readFileSync } from "fs";
import path from "path";
import { settings } from "./settings";
import type { Result } from "lighthouse";
import { AnalysisService } from "./analysis.service";
import { EcoIndexCalculator } from "./eco-index";

describe("EcoIndexCalculator-HP", () => {
  let result: Result;
  let calculator: EcoIndexCalculator;

  beforeEach(() => {
    const jsonData = readFileSync(
      path.join(settings.workspace, "public/home-page/accueil/1.json"),
      "utf-8"
    );
    result = JSON.parse(jsonData) as Result;
    const metrics = new AnalysisService(result).getEcoMetric();
    calculator = new EcoIndexCalculator(metrics);
  });

  it("should have the correct score", () => {
    const ecoIndex = calculator.getEcoIndex();
    expect(ecoIndex.score).toBe(45);
  });

  it("should have the correct gCo2e", () => {
    const ecoIndex = calculator.getEcoIndex();
    expect(ecoIndex.gCo2e).toBe(2.1);
  });

  it("should have the correct water", () => {
    const ecoIndex = calculator.getEcoIndex();
    expect(ecoIndex.water).toBe(3.15);
  });

  it("should have the correct grade", () => {
    const ecoIndex = calculator.getEcoIndex();
    expect(ecoIndex.grade).toBe("D");
  });
});
