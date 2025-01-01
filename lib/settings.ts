import path from "path"
import type { PublicJsonPath } from "./types"

export const settings = {
  workspace: path.resolve(__dirname, "../"),
  baseUrl: process.env.BASE_URL || "http://localhost:3000",
  supabaseUrl: process.env.SUPABASE_PROJECT_URL || "",
  supabaseKey: process.env.SUPABASE_API_KEY || "",
  s3AccessKeyId: process.env.S3_ACCES_KEY_ID || "",
  s3SecretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
  bucketName: process.env.S3_BUCKET_NAME || "",
  domT: { target: 800, acceptable: 1500 },
  requestsT: { target: 43, acceptable: 71 },
  sizeT: { target: 1100000, acceptable: 2300000 }, // unit: Bytes
}

export function getProjectDataPath({
  pageName,
  projectName,
  reportNumber,
}: PublicJsonPath): string {
  return `${settings.baseUrl}/${projectName}/${pageName}/${reportNumber}.json`
}
