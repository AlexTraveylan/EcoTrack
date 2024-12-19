import type { Result } from "lighthouse"
import { PublicPathExtractor } from "./json-lh-extractor.service"

interface BestPratice {
    title: string
    checkIfValid(): boolean
    getAcceptanceMessage(): string
    displayMessages(): string[]
}

export class BPLazyLoading implements BestPratice {
    public readonly title: string = "Mettre en place le Lazy-loading"
    private invalidUrls: string[] | null = null
    private readonly acceptanceValue = 0

  constructor(private readonly lhr: Result) {
    this.lhr = lhr
  }
    checkIfValid(): boolean {
        return this.getInvalidImageUrls().length === this.acceptanceValue
    }
    getAcceptanceMessage(): string {
        return `Les images sous la ligne de flotaison sont en lazy loading (Requis: ${this.acceptanceValue}, Valeur: ${this.getInvalidImageUrls().length})`
    }
    displayMessages(): string[] {
        return this.getInvalidImageUrls()
    }

    private getInvalidImageUrls(): string[] {

        if (this.invalidUrls !== null) {
            return this.invalidUrls
        }

        const lazyAudit = this.lhr.audits["offscreen-images"];
        // @ts-ignore I dont know how to get the type from lighthouse here.
        const items = lazyAudit.details.items;
        
        if (!Array.isArray(items)) {
            return [];
        }

        this.invalidUrls = items.map(item => item.url).filter(url => typeof url === 'string');
        
        return this.invalidUrls
    }
}


new PublicPathExtractor("home-page", "accueil").getLightHouseReport(1).then((result) => {
    const bp = new BPLazyLoading(result)
    console.log(bp.title)
    console.log(bp.checkIfValid())
    console.log(bp.displayMessages())
    console.log(bp.getAcceptanceMessage())
})