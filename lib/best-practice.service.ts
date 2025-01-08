import type { Result } from "lighthouse"
import type { Impact } from "./types"

export interface BestPractice {
  title: string
  refCode: string
  impact: Impact[]
  checkIfValid(): boolean
  getAcceptanceMessage(): string
  displayMessages(): string[]
}

export function bestPracticesFactory(lhr: Result): BestPractice[] {
  return [
    new BPLazyLoading(lhr),
    new BPOptimizeImages(lhr),
    new BPMinifyCode(lhr),
    new BPUnusedCode(lhr),
    new BPWebfont(lhr),
    new BPHttpFlux(lhr),
  ]
}

function extractUrls(result: Result, key: string): string[] {
  const audit = result.audits[key]
  // @ts-expect-error I dont know how to get the type from lighthouse here.
  const items = audit.details.items

  if (!Array.isArray(items)) {
    return []
  }

  return items.filter((item) => !!item.url).map((item) => item.url)
}

export class BPLazyLoading implements BestPractice {
  public readonly title: string = "Mettre en place le Lazy-loading"
  public readonly refCode: string = "UI-01"
  public readonly impact: Impact[] = ["dom", "requests", "size"]
  private invalidUrls: string[] | null = null
  private readonly acceptanceValue = 0

  constructor(private readonly lhr: Result) {
    this.lhr = lhr
  }
  checkIfValid(): boolean {
    return this.getInvalidImageUrls().length === this.acceptanceValue
  }
  getAcceptanceMessage(): string {
    return `Les images sous la ligne de flotaison sont en lazy loading (Tolerance: ${
      this.acceptanceValue
    }, Valeur: ${this.getInvalidImageUrls().length})`
  }
  displayMessages(): string[] {
    return this.getInvalidImageUrls()
  }

  private getInvalidImageUrls(): string[] {
    if (this.invalidUrls !== null) {
      return this.invalidUrls
    }

    this.invalidUrls = extractUrls(this.lhr, "offscreen-images")

    return this.invalidUrls
  }
}

export class BPOptimizeImages implements BestPractice {
  public readonly title: string =
    "Utiliser les images de manière approprié (taille, compression)"
  public readonly refCode: string = "UI-20 / UI-21 / UI-22"
  public readonly impact: Impact[] = ["size"]
  private unsizedImgUrls: string[] | null = null
  private unoptimizedImgUrls: string[] | null = null
  private readonly acceptanceValue = 0

  constructor(private readonly lhr: Result) {
    this.lhr = lhr
  }

  checkIfValid(): boolean {
    return this.totalInvalid() === this.acceptanceValue
  }
  getAcceptanceMessage(): string {
    return `Toutes les images sont optimisées (Tolerance: ${
      this.acceptanceValue
    }, Valeur: ${this.totalInvalid()})`
  }

  displayMessages(): string[] {
    const messages: string[] = []

    this.getUnsizedImgUrls().forEach((url) => {
      messages.push(`Dimensionnement incorrect: ${url}`)
    })

    this.getUnoptimizedImgUrls().forEach((url) => {
      messages.push(`Compression incorrecte: ${url}`)
    })

    return messages
  }

  private totalInvalid(): number {
    return this.getUnsizedImgUrls().length + this.getUnoptimizedImgUrls().length
  }

  private getUnsizedImgUrls(): string[] {
    if (this.unsizedImgUrls !== null) {
      return this.unsizedImgUrls
    }

    this.unsizedImgUrls = extractUrls(this.lhr, "unsized-images")

    return this.unsizedImgUrls
  }

  private getUnoptimizedImgUrls(): string[] {
    if (this.unoptimizedImgUrls !== null) {
      return this.unoptimizedImgUrls
    }

    this.unoptimizedImgUrls = extractUrls(this.lhr, "uses-optimized-images")

    return this.unoptimizedImgUrls
  }
}

export class BPMinifyCode implements BestPractice {
  public readonly title: string = "Minifier le code"
  public readonly refCode: string = "CO-16"
  public readonly impact: Impact[] = ["size"]
  private unminifiedCssUrls: string[] | null = null
  private unminifiedJsUrls: string[] | null = null
  private readonly acceptanceValue = 0

  constructor(private readonly lhr: Result) {
    this.lhr = lhr
  }

  checkIfValid(): boolean {
    return this.totalInvalid() === this.acceptanceValue
  }

  getAcceptanceMessage(): string {
    return `Les fichiers css et js doivent être minifiés (Tolerance: ${
      this.acceptanceValue
    }, Valeur: ${this.totalInvalid()})`
  }

  displayMessages(): string[] {
    const messages: string[] = []

    this.getUnminifiedCssUrls().forEach((url) => {
      messages.push(`Css non minifié: ${url}`)
    })

    this.getUnminifiedJsUrls().forEach((url) => {
      messages.push(`Js non minifié: ${url}`)
    })

    return messages
  }

  private totalInvalid(): number {
    return this.getUnminifiedCssUrls().length + this.getUnminifiedJsUrls().length
  }

  private getUnminifiedCssUrls(): string[] {
    if (this.unminifiedCssUrls !== null) {
      return this.unminifiedCssUrls
    }

    this.unminifiedCssUrls = extractUrls(this.lhr, "unminified-css")

    return this.unminifiedCssUrls
  }

  private getUnminifiedJsUrls(): string[] {
    if (this.unminifiedJsUrls !== null) {
      return this.unminifiedJsUrls
    }

    this.unminifiedJsUrls = extractUrls(this.lhr, "unminified-javascript")

    return this.unminifiedJsUrls
  }
}

export class BPUnusedCode implements BestPractice {
  public readonly title: string = "Supprimer le code inutilisé"
  public readonly refCode: string = "CO-17"
  public readonly impact: Impact[] = ["size"]
  private readonly acceptanceValue = 0.4
  private unusedCssRatio: number | null = null
  private unusedJsRatio: number | null = null

  constructor(private readonly lhr: Result) {
    this.lhr = lhr
  }

  checkIfValid(): boolean {
    return (
      this.getUnusedCssRatio() <= this.acceptanceValue &&
      this.getUnusedJsRatio() <= this.acceptanceValue
    )
  }

  getAcceptanceMessage(): string {
    return `Le code inutilisé doit être supprimé (Tolerance: < ${
      this.acceptanceValue
    }, Css-Valeur: ${this.getUnusedCssRatio().toFixed(
      4
    )}, Js-Valeur: ${this.getUnusedJsRatio().toFixed(4)})`
  }

  displayMessages(): string[] {
    return [
      `Css inutilisé: ${(this.getUnusedCssRatio() * 100).toFixed(2)} %`,
      `Js inutilisé: ${(this.getUnusedJsRatio() * 100).toFixed(2)} %`,
    ]
  }

  private getUnusedCssRatio(): number {
    if (this.unusedCssRatio !== null) {
      return this.unusedCssRatio
    }

    const audit = this.lhr.audits["unused-css-rules"]
    // @ts-expect-error I dont know how to get the type from lighthouse here.
    const items = audit.details.items

    if (!Array.isArray(items)) {
      return 0
    }

    const totalWastedBytes = items.reduce((acc, item) => acc + item.wastedBytes, 0)
    const totalTotalBytes = items.reduce((acc, item) => acc + item.totalBytes, 0)

    this.unusedCssRatio = totalWastedBytes / totalTotalBytes

    return this.unusedCssRatio
  }

  private getUnusedJsRatio(): number {
    if (this.unusedJsRatio !== null) {
      return this.unusedJsRatio
    }

    const audit = this.lhr.audits["unused-javascript"]
    // @ts-expect-error I dont know how to get the type from lighthouse here.
    const items = audit.details.items

    if (!Array.isArray(items)) {
      return 0
    }

    const totalWastedBytes = items.reduce((acc, item) => acc + item.wastedBytes, 0)
    const totalTotalBytes = items.reduce((acc, item) => acc + item.totalBytes, 0)

    this.unusedJsRatio = totalWastedBytes / totalTotalBytes

    return this.unusedJsRatio
  }
}

export class BPWebfont implements BestPractice {
  public readonly title: string = "Utiliser les Webfonts de manière responsable"
  public readonly refCode: string = "UI-26 / UI-27"
  public readonly impact: Impact[] = ["requests", "size"]
  private readonly acceptanceValueNbFonts = 3
  private readonly acceptanceValueNbBadFonts = 0
  private nbFonts: number | null = null
  private badFontUrls: string[] | null = null

  constructor(private readonly lhr: Result) {
    this.lhr = lhr
  }

  checkIfValid(): boolean {
    return (
      this.getFontsInfos()[0] <= this.acceptanceValueNbFonts &&
      this.getFontsInfos()[1].length <= this.acceptanceValueNbBadFonts
    )
  }

  getAcceptanceMessage(): string {
    return `Nombre de fonts (Tolerance: ${this.acceptanceValueNbFonts}, Valeur: ${
      this.getFontsInfos()[0]
    }), Nombre de fonts non optimisées (Tolerance: ${
      this.acceptanceValueNbBadFonts
    }, Valeur: ${this.getFontsInfos()[1].length})`
  }

  displayMessages(): string[] {
    const messages: string[] = [`Nombre de webfonts: ${this.getFontsInfos()[0]}`]

    this.getFontsInfos()[1].forEach((url) => {
      messages.push(`Webfont non optimisée: ${url}`)
    })

    return messages
  }

  private getFontsInfos(): [number, string[]] {
    if (this.nbFonts !== null && this.badFontUrls !== null) {
      return [this.nbFonts, this.badFontUrls]
    }

    const audit = this.lhr.audits["network-requests"]
    // @ts-expect-error I dont know how to get the type from lighthouse here.
    const items = audit.details.items

    if (!Array.isArray(items)) {
      return [0, []]
    }

    const allFonts = items.filter((item) => item.resourceType === "Font")
    this.nbFonts = allFonts.length

    this.badFontUrls = allFonts
      .filter((item) => !item.url.includes(".woff"))
      .map((item) => item.url)

    return [this.nbFonts, this.badFontUrls]
  }
}

export class BPHttpFlux implements BestPractice {
  public readonly title: string = "Utiliser les flux HTTP de manière responsable"
  public readonly refCode: string = "AR-22 / AR-23"
  public readonly impact: Impact[] = []
  private readonly acceptanceValue = 0
  private http1Urls: string[] | null = null

  constructor(private readonly lhr: Result) {
    this.lhr = lhr
  }

  checkIfValid(): boolean {
    return this.getHttp1Urls().length === this.acceptanceValue
  }

  getAcceptanceMessage(): string {
    return `Nombre de flux HTTP/1.1 (Tolerance: ${this.acceptanceValue}, Valeur: ${
      this.getHttp1Urls().length
    })`
  }

  displayMessages(): string[] {
    return this.getHttp1Urls()
  }

  private getHttp1Urls(): string[] {
    if (this.http1Urls !== null) {
      return this.http1Urls
    }

    const audit = this.lhr.audits["network-requests"]
    // @ts-expect-error I dont know how to get the type from lighthouse here.
    const items = audit.details.items

    if (!Array.isArray(items)) {
      return []
    }

    this.http1Urls = items
      .filter((item) => item.protocol === "http/1.1")
      .map((item) => item.url)

    return this.http1Urls
  }
}
