import path from "path"

export const settings = {
  workspace: path.resolve(__dirname, "../"),
  s3Region: process.env.S3_REGION || "",
  s3Endpoint: process.env.S3_ENDPOINT || "",
  s3AccessKeyId: process.env.S3_ACCES_KEY_ID || "",
  s3SecretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
  bucketName: process.env.S3_BUCKET_NAME || "",
  baseUrl: process.env.BASE_URL || "http://localhost:3000",
  fileExtractStrategy: process.env.FILE_EXTRACT_STRATEGY || "public-folder", // public-folder | s3-bucket
  domT: { target: 800, acceptable: 1500 },
  requestsT: { target: 43, acceptable: 71 },
  sizeT: { target: 1100000, acceptable: 2300000 }, // unit: Bytes
}

if (
  settings.fileExtractStrategy !== "public-folder" &&
  settings.fileExtractStrategy !== "s3-bucket"
) {
  throw new Error(
    `Stratégie invalide dans l'environnement: ${settings.fileExtractStrategy}`
  )
}
