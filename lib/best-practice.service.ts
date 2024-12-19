import type { Result } from "lighthouse";
import type { Impact } from "./types";

interface BestPractice {
  title: string;
  refCode: string;
  impact: Impact[];
  checkIfValid(): boolean;
  getAcceptanceMessage(): string;
  displayMessages(): string[];
}

export function bestPracticesFactory(lhr: Result): BestPractice[] {

    return [
        new BPLazyLoading(lhr),
        new BPOptimizeImages(lhr),
        new BPMinifyCode(lhr)
    ]
}

function extractUrls(result: Result, key: string): string[] {
  const audit = result.audits[key];
  // @ts-ignore I dont know how to get the type from lighthouse here.
  const items = audit.details.items;

  if (!Array.isArray(items)) {
    return [];
  }

  return items.map((item) => item.url).filter((url) => typeof url === "string");
}

export class BPLazyLoading implements BestPractice {
  public readonly title: string = "Mettre en place le Lazy-loading";
  public readonly refCode: string = "UI-01";
  public readonly impact: Impact[] = ["dom", "requests", "size"];
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

    this.invalidUrls = extractUrls(this.lhr, "offscreen-images");

    return this.invalidUrls;
  }
}

export class BPOptimizeImages implements BestPractice {
  public readonly title: string =
    "Utiliser les images de manière approprié (taille, compression)";
  public readonly refCode: string = "UI-20 / UI-21 / UI-22";
  public readonly impact: Impact[] = ["size"];
  private unsizedImgUrls: string[] | null = null;
  private unoptimizedImgUrls: string[] | null = null;
  private readonly acceptanceValue = 0;

  constructor(private readonly lhr: Result) {
    this.lhr = lhr;
  }

  checkIfValid(): boolean {
    return this.totalInvalid() === this.acceptanceValue;
  }
  getAcceptanceMessage(): string {
    return `Toutes les images sont optimisées (Requis: ${
      this.acceptanceValue
    }, Valeur: ${this.totalInvalid()})`;
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

  private totalInvalid(): number {
    return (
      this.getUnsizedImgUrls().length + this.getUnoptimizedImgUrls().length
    );
  }

  private getUnsizedImgUrls(): string[] {
    if (this.unsizedImgUrls !== null) {
      return this.unsizedImgUrls;
    }

    this.unsizedImgUrls = extractUrls(this.lhr, "unsized-images");

    return this.unsizedImgUrls;
  }

  private getUnoptimizedImgUrls(): string[] {
    if (this.unoptimizedImgUrls !== null) {
      return this.unoptimizedImgUrls;
    }

    this.unoptimizedImgUrls = extractUrls(this.lhr, "uses-optimized-images");

    return this.unoptimizedImgUrls;
  }
}

export class BPMinifyCode implements BestPractice {
  public readonly title: string = "Minifier le code";
  public readonly refCode: string = "CO-16";
  public readonly impact: Impact[] = ["size"];
  private unminifiedCssUrls: string[] | null = null;
  private unminifiedJsUrls: string[] | null = null;
  private readonly acceptanceValue = 0;

  constructor(private readonly lhr: Result) {
    this.lhr = lhr;
  }

  checkIfValid(): boolean {
    return this.totalInvalid() === this.acceptanceValue;
  }

  getAcceptanceMessage(): string {
    return `Les fichiers css et js doivent être minifiés (Requis: ${
      this.acceptanceValue
    }, Valeur: ${this.totalInvalid()})`;
  }

  displayMessages(): string[] {
    const messages: string[] = [];

    this.getUnminifiedCssUrls().forEach((url) => {
      messages.push(`Css non minifié: ${url}`);
    });

    this.getUnminifiedJsUrls().forEach((url) => {
      messages.push(`Js non minifié: ${url}`);
    });

    return messages;
  }

  private totalInvalid(): number {
    return (
      this.getUnminifiedCssUrls().length + this.getUnminifiedJsUrls().length
    );
  }

  private getUnminifiedCssUrls(): string[] {
    if (this.unminifiedCssUrls !== null) {
      return this.unminifiedCssUrls;
    }

    this.unminifiedCssUrls = extractUrls(this.lhr, "unminified-css");

    return this.unminifiedCssUrls;
  }

  private getUnminifiedJsUrls(): string[] {
    if (this.unminifiedJsUrls !== null) {
      return this.unminifiedJsUrls;
    }

    this.unminifiedJsUrls = extractUrls(this.lhr, "unminified-javascript");

    return this.unminifiedJsUrls;
  }
}
