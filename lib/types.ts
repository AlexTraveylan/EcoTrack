export type Requests = {
  total: number
  scripts: number
  stylesheets: number
  images: number
  fonts: number
  other: number
}

export type ByteWeight = {
  total: number
  scripts: number
  stylesheets: number
  images: number
  fonts: number
  other: number
}

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
