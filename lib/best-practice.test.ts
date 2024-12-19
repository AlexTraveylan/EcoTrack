import type { Result } from "lighthouse";
import { BPLazyLoading } from "./best-practice.service";
import { readFileSync } from 'fs';  // Importer le module fs
import { settings } from "./settings";
import path from "path"

describe("BPLazyLoading-TMF", () => {
  let result: Result;

  beforeEach(() => {
    const jsonData = readFileSync(path.join(settings.workspace, "public/chercher-ma-formation/soudeur/1.json"), "utf-8");
    result = JSON.parse(jsonData) as Result;
  });

  it("should have the correct title", () => {
    const bpLazyLoading = new BPLazyLoading(result);
    expect(bpLazyLoading.title).toBe("Mettre en place le Lazy-loading");
  });

  it("should return false if there are invalid image URLs", () => {
    const bpLazyLoading = new BPLazyLoading(result);
    expect(bpLazyLoading.checkIfValid()).toBe(false);
  });

  it("should return an acceptance message with correct values", () => {
    const bpLazyLoading = new BPLazyLoading(result);
    const message = bpLazyLoading.getAcceptanceMessage();
    expect(message).toContain("Requis: 0");
    expect(message).toContain("Valeur: 1");
  });

  it("should return invalid image URLs", () => {
    const bpLazyLoading = new BPLazyLoading(result);
    const messages = bpLazyLoading.displayMessages();
    expect(messages).toEqual([
      "https://voxusagers.numerique.gouv.fr/static/bouton-blanc.svg",
    ]);
  });
});

describe("BPLazyLoading-HP", () => {
    let result: Result;
  
    beforeEach(() => {
      const jsonData = readFileSync(path.join(settings.workspace, "public/home-page/accueil/1.json"), "utf-8");
      result = JSON.parse(jsonData) as Result;
    });
  
    it("should have the correct title", () => {
      const bpLazyLoading = new BPLazyLoading(result);
      expect(bpLazyLoading.title).toBe("Mettre en place le Lazy-loading");
    });
  
    it("should return true if there are no invalid image URLs", () => {
      const bpLazyLoading = new BPLazyLoading(result);
      expect(bpLazyLoading.checkIfValid()).toBe(true);
    });
  
    it("should return an acceptance message with correct values", () => {
      const bpLazyLoading = new BPLazyLoading(result);
      const message = bpLazyLoading.getAcceptanceMessage();
      expect(message).toContain("Requis: 0");
      expect(message).toContain("Valeur: 0");
    });
  
    it("should return empty invalid image URLs", () => {
      const bpLazyLoading = new BPLazyLoading(result);
      const messages = bpLazyLoading.displayMessages();
      expect(messages).toEqual([]);
    });
  });