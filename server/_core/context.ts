import type { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import { jwtVerify } from 'jose';
import type { User } from '../../drizzle/schema';
import { getUserById } from '../db';
import { ENV } from './env';

export type TrpcContext = { req: CreateExpressContextOptions['req']; res: CreateExpressContextOptions['res']; user: User | null };

export async function createContext(opts: CreateExpressContextOptions): Promise<TrpcContext> {
  let user: User | null = null;
  const token = String(opts.req.headers.cookie ?? '').split(';').map(value => value.trim()).find(value => value.startsWith('app_session_id='))?.slice('app_session_id='.length);
  if (token) {
    try {
      const verified = await jwtVerify(token, new TextEncoder().encode(ENV.jwtSecret));
      const userId = Number(verified.payload.sub);
      if (userId) user = (await getUserById(userId)) ?? null;
    } catch { user = null; }
  }
  return { req: opts.req, res: opts.res, user };
}
