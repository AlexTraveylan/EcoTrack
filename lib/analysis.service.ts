import type { Result } from "lighthouse"
import type { ByteWeight, EcoMetric, Requests, ResourceItem } from "./types"

/*
Service pour extraire les données de l'audit Lighthouse

Peut évoluer pour recuperer des résultats existants en base de données
*/
interface Analyzer {
  getEcoMetric(): EcoMetric
}

export class AnalysisService implements Analyzer {
  private resourceItems: ResourceItem[] | null

  constructor(private readonly lhr: Result) {
    this.lhr = lhr
    this.resourceItems = null
  }

  public getEcoMetric(): EcoMetric {
    const [requests, byteWeight] = this.getRequests()
    const date = this.getDate()
    const dom = this.getDom()
    const url = this.lhr.requestedUrl

    return {
      date,
      url,
      dom,
      requests,
      byteWeight,
    }
  }

  private getResourceItems(): ResourceItem[] {
    // Utilisation du cache
    if (this.resourceItems) {
      return this.resourceItems
    }

    const resourceDetails = this.lhr.audits["resource-summary"].details
    if (!resourceDetails) {
      throw new Error("resource-summary don't have details")
    }

    // Mise en cache
    // @ts-expect-error: I don't know how to get the right type
    this.resourceItems = resourceDetails.items as ResourceItem[]

    return this.resourceItems
  }

  private getRequests(): [Requests, ByteWeight] {
    const totalRequests = this.getResourceItems().filter(
      (item) => item.resourceType === "total"
    )
    const scriptsItems = this.getResourceItems().filter(
      (item) => item.resourceType === "script"
    )
    const imagesItems = this.getResourceItems().filter(
      (item) => item.resourceType === "image"
    )
    const fontsItems = this.getResourceItems().filter(
      (item) => item.resourceType === "font"
    )
    const stylesheetsItems = this.getResourceItems().filter(
      (item) => item.resourceType === "stylesheet"
    )

    const requests: Requests = {
      total: totalRequests[0].requestCount,
      scripts: scriptsItems[0].requestCount,
      stylesheets: stylesheetsItems[0].requestCount,
      images: imagesItems[0].requestCount,
      fonts: fontsItems[0].requestCount,
      other:
        totalRequests[0].requestCount -
        scriptsItems[0].requestCount -
        stylesheetsItems[0].requestCount -
        imagesItems[0].requestCount -
        fontsItems[0].requestCount,
    }

    const byteWeight: ByteWeight = {
      total: totalRequests[0].transferSize,
      scripts: scriptsItems[0].transferSize,
      stylesheets: stylesheetsItems[0].transferSize,
      images: imagesItems[0].transferSize,
      fonts: fontsItems[0].transferSize,
      other:
        totalRequests[0].transferSize -
        scriptsItems[0].transferSize -
        stylesheetsItems[0].transferSize -
        imagesItems[0].transferSize -
        fontsItems[0].transferSize,
    }

    return [requests, byteWeight]
  }

  private getDom(): number {
    const domSizeAudit = this.lhr.audits["dom-size"]

    if (!domSizeAudit || !domSizeAudit.numericValue) {
      throw new Error("dom-size audit not found")
    }

    return domSizeAudit.numericValue
  }

  private getDate(): Date {
    return new Date(this.lhr.fetchTime)
  }
}
