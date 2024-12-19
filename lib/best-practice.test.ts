import type { Result } from "lighthouse";
import {
  BPLazyLoading,
  BPMinifyCode,
  BPOptimizeImages,
} from "./best-practice.service";
import { readFileSync } from "fs"; // Importer le module fs
import { settings } from "./settings";
import path from "path";

// Bonne pratique du Lazy Loading

describe("BPLazyLoading-TMF", () => {
  let result: Result;

  beforeEach(() => {
    const jsonData = readFileSync(
      path.join(
        settings.workspace,
        "public/chercher-ma-formation/soudeur/1.json"
      ),
      "utf-8"
    );
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
    const jsonData = readFileSync(
      path.join(settings.workspace, "public/home-page/accueil/1.json"),
      "utf-8"
    );
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

// Bonne Pratique d'optimisation des images

describe("BPOptimizeImages-TMF", () => {
  let result: Result;

  beforeEach(() => {
    const jsonData = readFileSync(
      path.join(
        settings.workspace,
        "public/chercher-ma-formation/soudeur/1.json"
      ),
      "utf-8"
    );
    result = JSON.parse(jsonData) as Result;
  });

  it("should have the correct title", () => {
    const bpOptimizeImages = new BPOptimizeImages(result);
    expect(bpOptimizeImages.title).toBe(
      "Utiliser les images de manière approprié (taille, compression)"
    );
  });

  it("should return false if there are invalid image URLs", () => {
    const bpOptimizeImages = new BPOptimizeImages(result);
    expect(bpOptimizeImages.checkIfValid()).toBe(false);
  });

  it("should return an acceptance message with correct values", () => {
    const bpOptimizeImages = new BPOptimizeImages(result);
    const message = bpOptimizeImages.getAcceptanceMessage();
    expect(message).toContain("Requis: 0");
    expect(message).toContain("Valeur: 3");
  });

  it("should return invalid image URLs", () => {
    const bpOptimizeImages = new BPOptimizeImages(result);
    const messages = bpOptimizeImages.displayMessages();
    expect(messages).toEqual([
      "Dimensionnement incorrect: https://www.francetravail.fr/files/live/sites/PE/files/images/Logos/header-logo2023-ft-fr.svg",
      "Dimensionnement incorrect: https://www.francetravail.fr/files/live/sites/PE/files/images/Logos/header-logo2021-marianne.svg",
      "Dimensionnement incorrect: https://voxusagers.numerique.gouv.fr/static/bouton-blanc.svg",
    ]);
  });
});

describe("BPOptimizeImages-HP", () => {
  let result: Result;

  beforeEach(() => {
    const jsonData = readFileSync(
      path.join(settings.workspace, "public/home-page/accueil/1.json"),
      "utf-8"
    );
    result = JSON.parse(jsonData) as Result;
  });

  it("should have the correct title", () => {
    const bpOptimizeImages = new BPOptimizeImages(result);
    expect(bpOptimizeImages.title).toBe(
      "Utiliser les images de manière approprié (taille, compression)"
    );
  });

  it("should return false if there are invalid image URLs", () => {
    const bpOptimizeImages = new BPOptimizeImages(result);
    expect(bpOptimizeImages.checkIfValid()).toBe(false);
  });

  it("should return an acceptance message with correct values", () => {
    const bpOptimizeImages = new BPOptimizeImages(result);
    const message = bpOptimizeImages.getAcceptanceMessage();
    expect(message).toContain("Requis: 0");
    expect(message).toContain("Valeur: 28");
  });

  it("should return empty invalid image URLs", () => {
    const bpOptimizeImages = new BPOptimizeImages(result);
    const messages = bpOptimizeImages.displayMessages();
    expect(messages).toEqual([
      "Dimensionnement incorrect: https://www.francetravail.fr/files/live/sites/PE/files/masters/hp-v4/home-cover-1-bis.jpg",
      "Dimensionnement incorrect: https://www.francetravail.fr/files/live/sites/PE/files/dri/FAQ-prime-exceptionnelle.gif",
      "Dimensionnement incorrect: https://www.francetravail.fr/files/live/sites/PE/files/affiche/2024/prendre-soin--fr-308.jpg",
      "Dimensionnement incorrect: https://www.francetravail.fr/files/live/sites/PE/files/pole-emploi-internet/actualite/grande-cause-inclusion-make-org-308.jpg",
      "Dimensionnement incorrect: https://www.francetravail.fr/files/live/sites/PE/files/employeur/2024/logo-FT-Pro-308.gif",
      "Dimensionnement incorrect: https://www.francetravail.fr/files/live/sites/PE/files/pole-emploi-internet/actualite/G-P/la-poste-recrute-308.jpg",
      "Dimensionnement incorrect: https://www.francetravail.fr/files/live/sites/PE/files/secteurs-metiers/Fonction-publique/fonction-publique-statut-contractuel-308.jpg",
      "Dimensionnement incorrect: https://www.francetravail.fr/files/live/sites/PE/files/secteurs-metiers/Artisanat/charcutier-traiteur-308.jpg",
      "Dimensionnement incorrect: https://www.francetravail.fr/files/live/sites/PE/files/secteurs-metiers/Industrie/pharmaceutique/pros-des-labos-308.jpg",
      "Dimensionnement incorrect: https://www.francetravail.fr/files/live/sites/PE/files/affiche/Logos/Bloc_Marque_RF_France_Travail_marque-308.jpg",
      "Dimensionnement incorrect: https://www.francetravail.fr/files/live/sites/PE/files/images/Logos/header-logo2023-ft-fr.svg",
      "Dimensionnement incorrect: https://www.francetravail.fr/files/live/sites/PE/files/bannieres/2024/banni%c3%a8re-FranceTravail-Pro.gif",
      "Dimensionnement incorrect: https://www.francetravail.fr/files/live/sites/PE/files/bannieres/2024/banni%c3%a8re-FranceTravail-Pro.gif",
      "Dimensionnement incorrect: https://www.francetravail.fr/files/live/sites/PE/files/bannieres/2024/banni%c3%a8re-FranceTravail-Pro.gif",
      "Dimensionnement incorrect: https://www.francetravail.fr/files/live/sites/PE/files/bannieres/2024/ban-prendre-soin.gif",
      "Dimensionnement incorrect: https://www.francetravail.fr/files/live/sites/PE/files/bannieres/2024/france-services-banniere.gif",
      "Dimensionnement incorrect: https://www.francetravail.fr/files/live/sites/PE/files/images/Logos/header-logo2021-marianne.svg",
      "Dimensionnement incorrect: https://www.francetravail.fr/files/live/sites/PE/files/nouveau%20site/candidat/mode-emploi-NL-308.png",
      "Dimensionnement incorrect: https://www.francetravail.fr/files/live/sites/PE/files/nouveau%20site/candidat/service-en-ligne/simulateur-2-308-transparent.gif",
      "Dimensionnement incorrect: https://www.francetravail.fr/files/live/sites/PE/files/nouveau%20site/candidat/service-en-ligne/services-publics-3086HP.png",
      "Compression incorrecte: https://www.francetravail.fr/files/live/sites/PE/files/secteurs-metiers/Fonction-publique/fonction-publique-statut-contractuel-308.jpg",
      "Compression incorrecte: https://www.francetravail.fr/files/live/sites/PE/files/secteurs-metiers/Industrie/pharmaceutique/pros-des-labos-308.jpg",
      "Compression incorrecte: https://www.francetravail.fr/files/live/sites/PE/files/pole-emploi-internet/actualite/grande-cause-inclusion-make-org-308.jpg",
      "Compression incorrecte: https://www.francetravail.fr/files/live/sites/PE/files/secteurs-metiers/Artisanat/charcutier-traiteur-308.jpg",
      "Compression incorrecte: https://www.francetravail.fr/files/live/sites/PE/files/masters/hp-v4/home-cover-1-bis.jpg",
      "Compression incorrecte: https://www.francetravail.fr/files/live/sites/PE/files/pole-emploi-internet/actualite/G-P/la-poste-recrute-308.jpg",
      "Compression incorrecte: https://www.francetravail.fr/files/live/sites/PE/files/affiche/Logos/Bloc_Marque_RF_France_Travail_marque-308.jpg",
      "Compression incorrecte: https://www.francetravail.fr/files/live/sites/PE/files/affiche/2024/prendre-soin--fr-308.jpg",
    ]);
  });
});

// Bonne pratique de minification des fichiers js et Css

describe("BPMinifyCode-TMF", () => {
  let result: Result;

  beforeEach(() => {
    const jsonData = readFileSync(
      path.join(
        settings.workspace,
        "public/chercher-ma-formation/soudeur/1.json"
      ),
      "utf-8"
    );
    result = JSON.parse(jsonData) as Result;
  });

  it("should have the correct title", () => {
    const bpMinifyCode = new BPMinifyCode(result);
    expect(bpMinifyCode.title).toBe("Minifier le code");
  });

  it("should return false if there are invalid image URLs", () => {
    const bpMinifyCode = new BPMinifyCode(result);
    expect(bpMinifyCode.checkIfValid()).toBe(false);
  });

  it("should return an acceptance message with correct values", () => {
    const bpMinifyCode = new BPMinifyCode(result);
    const message = bpMinifyCode.getAcceptanceMessage();
    expect(message).toContain("Requis: 0");
    expect(message).toContain("Valeur: 1");
  });

  it("should return invalid image URLs", () => {
    const bpMinifyCode = new BPMinifyCode(result);
    const messages = bpMinifyCode.displayMessages();
    expect(messages).toEqual([
      "Js non minifié: https://cdn.tagcommander.com/4340/tc_PoleEmploi_24.js",
    ]);
  });
});

describe("bpMinifyCode-HP", () => {
  let result: Result;

  beforeEach(() => {
    const jsonData = readFileSync(
      path.join(settings.workspace, "public/home-page/accueil/1.json"),
      "utf-8"
    );
    result = JSON.parse(jsonData) as Result;
  });

  it("should have the correct title", () => {
    const bpMinifyCode = new BPMinifyCode(result);
    expect(bpMinifyCode.title).toBe("Minifier le code");
  });

  it("should return false if there are invalid image URLs", () => {
    const bpMinifyCode = new BPMinifyCode(result);
    expect(bpMinifyCode.checkIfValid()).toBe(false);
  });

  it("should return an acceptance message with correct values", () => {
    const bpMinifyCode = new BPMinifyCode(result);
    const message = bpMinifyCode.getAcceptanceMessage();
    expect(message).toContain("Requis: 0");
    expect(message).toContain("Valeur: 3");
  });

  it("should return invalid image URLs", () => {
    const bpMinifyCode = new BPMinifyCode(result);
    const messages = bpMinifyCode.displayMessages();
    expect(messages).toEqual([
      "Css non minifié: https://guidances-applicatives.pole-emploi.fr/know/api/style?pkgId=429&version=-418178325",
      "Js non minifié: https://guidances-applicatives.pole-emploi.fr/know/api/engine?pkgId=429&version=-414658748",
      "Js non minifié: https://cdn.tagcommander.com/4340/tc_PoleEmploi_24.js",
    ]);
  });
});
