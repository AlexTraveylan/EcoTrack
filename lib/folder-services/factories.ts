import { settings } from "../settings"
import { JsonLhExtractor, fileActions } from "./interfaces"
import { PublicPathExtractor } from "./public-folder.service"
import { S3AmazonService } from "./s3-amazon.service"

export class JsonLhExtractorFactory {
  private static instance: JsonLhExtractor & fileActions

  public static getInstance(): JsonLhExtractor & fileActions {
    if (JsonLhExtractorFactory.instance) {
      return JsonLhExtractorFactory.instance
    }

    if (settings.fileExtractStrategy === "public-folder") {
      return new PublicPathExtractor()
    }

    if (settings.fileExtractStrategy === "s3-amazon") {
      return new S3AmazonService()
    }

    // Invalids strategies should raise during the settings validation
    throw new Error("Unknown file extract strategy (should not happen)")
  }
}
