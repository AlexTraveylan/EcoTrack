import { JsonLhExtractor } from "./interfaces"
import { S3AmazonService } from "./s3-amazon.service"

export class JsonLhExtractorFactory {
  private static instance: JsonLhExtractor

  public static getInstance(): JsonLhExtractor {
    if (!JsonLhExtractorFactory.instance) {
      JsonLhExtractorFactory.instance = new S3AmazonService()
    }

    return JsonLhExtractorFactory.instance
  }
}
