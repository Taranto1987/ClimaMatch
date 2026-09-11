export const allowedMediaTypes = ['image/jpeg', 'image/png', 'image/webp', 'video/mp4', 'video/quicktime'] as const;
export type AllowedMediaType = (typeof allowedMediaTypes)[number];
export const maxMediaBytes = 12 * 1024 * 1024;

export function sanitizeUploadName(fileName: string) {
  return fileName.replace(/[^a-zA-Z0-9._-]/g, '-');
}

export function validateMedia(mimeType: string, bytes: number) {
  if (!allowedMediaTypes.includes(mimeType as AllowedMediaType)) throw new Error('Tipo de arquivo não permitido');
  if (bytes > maxMediaBytes) throw new Error('O arquivo deve ter no máximo 12 MB');
}
