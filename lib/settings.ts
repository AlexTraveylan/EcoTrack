import path from "path"
import type { PublicJsonPath } from "./types"

export const settings = {
  workspace: path.resolve(__dirname, "../"),
  baseUrl: process.env.BASE_URL || "http://localhost:3000",
  domT: { target: 800, acceptable: 1500 },
  requestsT: { target: 28, acceptable: 50 },
  sizeT: { target: 1000000, acceptable: 2000000 }, // unit: Bytes
}

export function getProjectDataPath({
  pageName,
  projectName,
  reportNumber,
}: PublicJsonPath): string {
  return `${settings.baseUrl}/${projectName}/${pageName}/${reportNumber}.json`
}
