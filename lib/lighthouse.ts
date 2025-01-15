import type { Result } from "lighthouse"
import { settings } from "./settings"

function endpoint(url: string) {
  const category = "performance"
  const strategy = "desktop"
  const locale = "fr"
  const baseUrl = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?"

  return `${baseUrl}url=${url}&category=${category}&strategy=${strategy}&locale=${locale}&key=${settings.googleInsightsApiKey}`
}

export async function requestLighthouse(url: string): Promise<Result> {
  const response = await fetch(endpoint(url))
  const jsonResponse = await response.json()

  return jsonResponse["lighthouseResult"]
}
