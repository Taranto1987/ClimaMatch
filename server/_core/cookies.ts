import type { CookieOptions, Request } from 'express';

export function getSessionCookieOptions(req: Request): Pick<CookieOptions, 'httpOnly' | 'path' | 'sameSite' | 'secure'> {
  const forwarded = String(req.headers['x-forwarded-proto'] ?? '');
  const secure = req.protocol === 'https' || forwarded.split(',').some(value => value.trim() === 'https');
  return { httpOnly: true, path: '/', sameSite: secure ? 'lax' : 'lax', secure };
}
