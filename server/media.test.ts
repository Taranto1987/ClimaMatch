import { describe, expect, it } from 'vitest';
import { maxMediaBytes, sanitizeUploadName, validateMedia } from './media';

describe('media upload validation', () => {
  it('accepts supported image and video types within the size limit', () => {
    expect(() => validateMedia('image/jpeg', maxMediaBytes)).not.toThrow();
    expect(() => validateMedia('video/mp4', maxMediaBytes)).not.toThrow();
  });

  it('rejects unsupported types and oversized files', () => {
    expect(() => validateMedia('application/pdf', 10)).toThrow('Tipo de arquivo não permitido');
    expect(() => validateMedia('image/png', maxMediaBytes + 1)).toThrow('12 MB');
  });

  it('sanitizes names before they become storage keys', () => {
    expect(sanitizeUploadName('../minha foto?.jpg')).toBe('..-minha-foto-.jpg');
  });
});
