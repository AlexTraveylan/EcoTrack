import { createHash } from "crypto"

export class URLTransformer {
  private static readonly SEPARATOR = "-"

  static toBase64Url(url: string): string {
    try {
      new URL(url)
    } catch (error) {
      console.log(error)
      throw new Error(`URL invalide: ${url}`)
    }

    const hash = createHash("sha256").update(url).digest("base64url").slice(0, 8)
    const encoded = Buffer.from(url).toString("base64url")

    return `${encoded}${this.SEPARATOR}${hash}`
  }

  static fromBase64Url(encoded: string): string {
    try {
      const [urlPart, hashPart] = encoded.split(this.SEPARATOR)
      if (!urlPart || !hashPart) {
        throw new Error("Format invalide")
      }

      const decodedUrl = Buffer.from(urlPart, "base64url").toString()

      const expectedHash = createHash("sha256")
        .update(decodedUrl)
        .digest("base64url")
        .slice(0, 8)

      if (hashPart !== expectedHash) {
        throw new Error("Hash de vérification invalide")
      }

      new URL(decodedUrl)

      return decodedUrl
    } catch (error) {
      console.error(error)
      throw new Error(`Décodage impossible`)
    }
  }

  static isValid(encoded: string): boolean {
    try {
      this.fromBase64Url(encoded)
      return true
    } catch {
      return false
    }
  }
}
