import { URLTransformer } from "./url-transformer.service"

describe("URLCrypto", () => {
  // Tests d'encodage
  describe("toBase64Url", () => {
    test("devrait encoder une URL valide", () => {
      const url = "https://www.alextraveylan.fr/fr"
      const encoded = URLTransformer.toBase64Url(url)

      expect(encoded).toBeDefined()
      expect(encoded).toContain("-")
      expect(encoded.split("-")).toHaveLength(2)
    })

    test("devrait rejeter une URL invalide", () => {
      const invalidUrl = "not-a-url"

      expect(() => {
        URLTransformer.toBase64Url(invalidUrl)
      }).toThrow("URL invalide")
    })

    test("devrait gérer les URLs avec des caractères spéciaux", () => {
      const urlWithSpecialChars = "https://example.com/path?param=value&special=@#$"
      const encoded = URLTransformer.toBase64Url(urlWithSpecialChars)

      expect(encoded).toBeDefined()
      expect(URLTransformer.fromBase64Url(encoded)).toBe(urlWithSpecialChars)
    })
  })

  // Tests de décodage
  describe("fromBase64Url", () => {
    test("devrait décoder une string encodée valide", () => {
      const originalUrl = "https://www.alextraveylan.fr/fr"
      const encoded = URLTransformer.toBase64Url(originalUrl)
      const decoded = URLTransformer.fromBase64Url(encoded)

      expect(decoded).toBe(originalUrl)
    })

    test("devrait rejeter une string encodée invalide", () => {
      const invalidEncoded = "invalid-encoded-string"

      expect(() => {
        URLTransformer.fromBase64Url(invalidEncoded)
      }).toThrow("Décodage impossible")
    })

    test("devrait rejeter une string avec un hash incorrect", () => {
      const encoded = URLTransformer.toBase64Url("https://www.alextraveylan.fr/fr")
      const corruptedEncoded = encoded.slice(0, -1) + "X"

      expect(() => {
        URLTransformer.fromBase64Url(corruptedEncoded)
      }).toThrow("Décodage impossible")
    })
  })

  // Tests de validation
  describe("isValid", () => {
    test("devrait retourner true pour une string encodée valide", () => {
      const url = "https://www.alextraveylan.fr/fr"
      const encoded = URLTransformer.toBase64Url(url)

      expect(URLTransformer.isValid(encoded)).toBe(true)
    })

    test("devrait retourner false pour une string encodée invalide", () => {
      expect(URLTransformer.isValid("invalid-string")).toBe(false)
    })
  })

  // Tests de cas limites
  describe("edge cases", () => {
    test("devrait gérer les URLs très longues", () => {
      const longUrl = "https://example.com/" + "a".repeat(1000)
      const encoded = URLTransformer.toBase64Url(longUrl)
      const decoded = URLTransformer.fromBase64Url(encoded)

      expect(decoded).toBe(longUrl)
    })

    test("devrait gérer les URLs avec des fragments", () => {
      const urlWithFragment = "https://example.com/page#section"
      const encoded = URLTransformer.toBase64Url(urlWithFragment)
      const decoded = URLTransformer.fromBase64Url(encoded)

      expect(decoded).toBe(urlWithFragment)
    })

    test("devrait gérer les URLs avec des query params complexes", () => {
      const urlWithParams = "https://example.com/search?q=test&filter[]=1&filter[]=2"
      const encoded = URLTransformer.toBase64Url(urlWithParams)
      const decoded = URLTransformer.fromBase64Url(encoded)

      expect(decoded).toBe(urlWithParams)
    })
  })

  // Test de round-trip
  describe("round-trip", () => {
    test("devrait préserver l'URL après encodage/décodage multiple", () => {
      const originalUrl = "https://www.alextraveylan.fr/fr"
      const encoded1 = URLTransformer.toBase64Url(originalUrl)
      const decoded1 = URLTransformer.fromBase64Url(encoded1)
      const encoded2 = URLTransformer.toBase64Url(decoded1)
      const decoded2 = URLTransformer.fromBase64Url(encoded2)

      expect(decoded2).toBe(originalUrl)
    })
  })
})
