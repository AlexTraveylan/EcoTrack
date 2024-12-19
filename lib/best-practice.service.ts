import type { Result } from "lighthouse";

interface BestPractice {
  title: string;
  refCode: string;
  checkIfValid(): boolean;
  getAcceptanceMessage(): string;
  displayMessages(): string[];
}

export class BPLazyLoading implements BestPractice {
  public readonly title: string = "Mettre en place le Lazy-loading";
  public readonly refCode: string = "UI-01";
  private invalidUrls: string[] | null = null;
  private readonly acceptanceValue = 0;

  constructor(private readonly lhr: Result) {
    this.lhr = lhr;
  }
  checkIfValid(): boolean {
    return this.getInvalidImageUrls().length === this.acceptanceValue;
  }
  getAcceptanceMessage(): string {
    return `Les images sous la ligne de flotaison sont en lazy loading (Requis: ${
      this.acceptanceValue
    }, Valeur: ${this.getInvalidImageUrls().length})`;
  }
  displayMessages(): string[] {
    return this.getInvalidImageUrls();
  }

  private getInvalidImageUrls(): string[] {
    if (this.invalidUrls !== null) {
      return this.invalidUrls;
    }

    const lazyAudit = this.lhr.audits["offscreen-images"];
    // @ts-ignore I dont know how to get the type from lighthouse here.
    const items = lazyAudit.details.items;

    if (!Array.isArray(items)) {
      return [];
    }

    this.invalidUrls = items
      .map((item) => item.url)
      .filter((url) => typeof url === "string");

    return this.invalidUrls;
  }
}

export class BPOptimizeImages implements BestPractice {
  public readonly title: string =
    "Utiliser les images de manière approprié (taille, compression)";
  public readonly refCode: string = "UI-20 / UI-21 / UI-22";
  private unsizedImgUrls: string[] | null = null;
  private unoptimizedImgUrls: string[] | null = null;
  private readonly acceptanceValue = 0;

  constructor(private readonly lhr: Result) {
    this.lhr = lhr;
  }

  checkIfValid(): boolean {
    return this.totalInvalidImgs() === this.acceptanceValue;
  }
  getAcceptanceMessage(): string {
    return `Toutes les images sont optimisées (Requis: ${
      this.acceptanceValue
    }, Valeur: ${this.totalInvalidImgs()})`;
  }

  displayMessages(): string[] {
    const messages: string[] = [];

    this.getUnsizedImgUrls().forEach((url) => {
      messages.push(`Dimensionnement incorrect: ${url}`);
    });

    this.getUnoptimizedImgUrls().forEach((url) => {
      messages.push(`Compression incorrecte: ${url}`);
    });

    return messages;
  }

  private totalInvalidImgs(): number {
    return (
      this.getUnsizedImgUrls().length + this.getUnoptimizedImgUrls().length
    );
  }

  private getUnsizedImgUrls(): string[] {
    if (this.unsizedImgUrls !== null) {
      return this.unsizedImgUrls;
    }

    const lazyAudit = this.lhr.audits["unsized-images"];
    // @ts-ignore I dont know how to get the type from lighthouse here.
    const items = lazyAudit.details.items;

    if (!Array.isArray(items)) {
      return [];
    }

    this.unsizedImgUrls = items
      .map((item) => item.url)
      .filter((url) => typeof url === "string");

    return this.unsizedImgUrls;
  }

  private getUnoptimizedImgUrls(): string[] {
    if (this.unoptimizedImgUrls !== null) {
      return this.unoptimizedImgUrls;
    }

    const lazyAudit = this.lhr.audits["uses-optimized-images"];
    // @ts-ignore I dont know how to get the type from lighthouse here.
    const items = lazyAudit.details.items;

    if (!Array.isArray(items)) {
      return [];
    }

    this.unoptimizedImgUrls = items
      .map((item) => item.url)
      .filter((url) => typeof url === "string");

    return this.unoptimizedImgUrls;
  }
}
