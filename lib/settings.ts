import path from "path"
import type { PublicJsonPath } from "./types"

export const settings = {
  workspace: path.resolve(__dirname, "../"),
  baseUrl: process.env.BASE_URL || "http://localhost:3000",
}

export function getProjectDataPath({
  pageName,
  projectName,
  reportNumber,
}: PublicJsonPath): string {
  return `${settings.baseUrl}/${projectName}/${pageName}/${reportNumber}.json`
}
