import type { Result } from "lighthouse"
import { getProjectDataPath } from "./settings"

export class LightHouseService {
  constructor(private readonly projectName: string) {
    this.projectName = projectName
  }

  async getLightHouseReport(reportNumber: number): Promise<Result> {
    const result = await fetch(getProjectDataPath(this.projectName, reportNumber))

    if (!result.ok) {
      throw new Error(`${reportNumber} not found on project ${this.projectName}`)
    }

    return result.json()
  }
}
