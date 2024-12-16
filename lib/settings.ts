import path from "path"

export const settings = {
  workspace: path.resolve(__dirname, "../"),
  baseUrl: process.env.BASE_URL || "http://localhost:3000",
}

export function getProjectDataPath(projectName: string, reportNumber: number): string {
  return `${settings.baseUrl}/${projectName}/${reportNumber}.json`
}
