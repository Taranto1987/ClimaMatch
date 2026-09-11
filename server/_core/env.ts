export const ENV = {
  databaseUrl: process.env.DATABASE_URL ?? '',
  jwtSecret: process.env.JWT_SECRET ?? 'change-this-development-secret',
  isProduction: process.env.NODE_ENV === 'production',
  s3Endpoint: process.env.S3_ENDPOINT ?? '',
  s3Region: process.env.S3_REGION ?? 'auto',
  s3Bucket: process.env.S3_BUCKET ?? '',
  s3AccessKeyId: process.env.S3_ACCESS_KEY_ID ?? '',
  s3SecretAccessKey: process.env.S3_SECRET_ACCESS_KEY ?? '',
  publicBaseUrl: process.env.PUBLIC_BASE_URL ?? '',
};

if (ENV.isProduction && ENV.jwtSecret === 'change-this-development-secret') {
  throw new Error('JWT_SECRET must be configured in production');
}
