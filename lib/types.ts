export type PublicJsonPath = {
  projectName: string
  pageName: string
  reportNumber: number
}

export type RequestDetails = {
  total: number
  scripts: number
  stylesheets: number
  images: number
  fonts: number
  other: number
}

export type Requests = RequestDetails

export type ByteWeight = RequestDetails

export type EcoMetric = {
  date: Date
  dom: number
  requests: Requests
  byteWeight: ByteWeight
}

export type ResourceItem = {
  resourceType: ("script" | "stylesheet" | "font" | "image" | "total") & string
  label: string
  requestCount: number
  transferSize: number
}

export type Grade = "A" | "B" | "C" | "D" | "E" | "F" | "G"

export type EcoIndex = {
  score: number
  gCo2e: number
  water: number
  grade: Grade
}
