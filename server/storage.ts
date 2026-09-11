import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { ENV } from './_core/env';

function client() {
  if (!ENV.s3Bucket || !ENV.s3AccessKeyId || !ENV.s3SecretAccessKey) throw new Error('S3 storage is not configured');
  return new S3Client({ region: ENV.s3Region, endpoint: ENV.s3Endpoint || undefined, forcePathStyle: Boolean(ENV.s3Endpoint), credentials: { accessKeyId: ENV.s3AccessKeyId, secretAccessKey: ENV.s3SecretAccessKey } });
}
function normalize(key: string) { return key.replace(/^\/+/, ''); }
export async function storagePut(relKey: string, data: Buffer | Uint8Array | string, contentType = 'application/octet-stream') {
  const key = `${normalize(relKey).replace(/[^a-zA-Z0-9/_\-.]/g, '_')}_${crypto.randomUUID().slice(0, 8)}`;
  await client().send(new PutObjectCommand({ Bucket: ENV.s3Bucket, Key: key, Body: data, ContentType: contentType }));
  return { key, url: await storageGetSignedUrl(key) };
}
export async function storageGet(relKey: string) { const key = normalize(relKey); return { key, url: await storageGetSignedUrl(key) }; }
export async function storageGetSignedUrl(relKey: string) { return getSignedUrl(client(), new GetObjectCommand({ Bucket: ENV.s3Bucket, Key: normalize(relKey) }), { expiresIn: 3600 }); }
