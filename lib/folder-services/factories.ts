import { JsonLhExtractor, fileActions } from "./interfaces"
import { S3AmazonService } from "./s3-amazon.service"

export class JsonLhExtractorFactory {
  private static instance: JsonLhExtractor & fileActions

  public static getInstance(): JsonLhExtractor & fileActions {
    if (!JsonLhExtractorFactory.instance) {
      JsonLhExtractorFactory.instance = new S3AmazonService()
    }

    return JsonLhExtractorFactory.instance
  }
}
