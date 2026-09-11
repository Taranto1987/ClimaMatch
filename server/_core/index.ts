import 'dotenv/config';
import express from 'express';
import { createServer } from 'http';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter } from '../routers';
import { createContext } from './context';
import { registerLocalAuth } from '../local-auth';
import { serveStatic, setupVite } from './vite';

async function startServer() {
  const app = express();
  const server = createServer(app);
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));
  registerLocalAuth(app);
  app.use('/api/trpc', createExpressMiddleware({ router: appRouter, createContext }));
  if (process.env.NODE_ENV === 'development') await setupVite(app, server); else serveStatic(app);
  const port = Number(process.env.PORT || 3000);
  server.listen(port, '0.0.0.0', () => console.log(`ClimaMatch running on port ${port}`));
}
startServer().catch(error => { console.error(error); process.exit(1); });
