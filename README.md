# ClimaMatch

Marketplace de climatização e refrigeração com intake simples para clientes, matching determinístico, propostas, serviços, notificações internas, mídia de chamados, perfis profissionais e avaliações pós-serviço.

Esta versão é independente e não depende de Manus, Manus Forge, Mangoes ou serviços proprietários. O frontend e o backend são servidos pelo mesmo processo Express.

## Requisitos

- Node.js 20 ou superior
- pnpm 10 ou npm equivalente
- MySQL 8+ ou MariaDB compatível
- Um bucket S3 ou compatível (Cloudflare R2, MinIO, AWS S3, DigitalOcean Spaces etc.) para fotos e vídeos

## Instalação local

```bash
cp .env.example .env
pnpm install
pnpm db:push
pnpm dev
```

Abra `http://localhost:3000`. O login independente fica em `/api/auth/login`; no primeiro acesso, informe nome, e-mail e uma senha com pelo menos 8 caracteres. A sessão é um JWT assinado em cookie HTTP-only.

## Variáveis de ambiente

| Variável | Obrigatória | Descrição |
|---|---:|---|
| `DATABASE_URL` | Sim | URL MySQL/MariaDB, por exemplo `mysql://usuario:senha@localhost:3306/climamatch` |
| `JWT_SECRET` | Sim | Segredo longo e aleatório para assinar sessões |
| `S3_BUCKET` | Sim | Nome do bucket de mídia |
| `S3_ACCESS_KEY_ID` | Sim | Chave do bucket |
| `S3_SECRET_ACCESS_KEY` | Sim | Segredo do bucket |
| `S3_REGION` | Sim | Região do bucket; para R2 use `auto` |
| `S3_ENDPOINT` | Não | Endpoint compatível, necessário para R2/MinIO/Spaces |
| `PORT` | Não | Porta HTTP; padrão `3000` |
| `PUBLIC_BASE_URL` | Não | URL pública usada em configurações externas |
| `NODE_ENV` | Não | `development` localmente e `production` no servidor |

Nunca commite `.env` ou credenciais. Para R2, use o endpoint no formato `https://<account-id>.r2.cloudflarestorage.com`. Configure CORS do bucket para permitir a origem pública do aplicativo se o navegador precisar abrir mídia diretamente.

## Banco de dados

O schema fica em `drizzle/schema.ts`. Para criar/aplicar migrações:

```bash
pnpm drizzle-kit generate
pnpm drizzle-kit migrate
```

O `pnpm db:push` executa a geração e a migração. A migração `drizzle/0003_local_auth.sql` adiciona o hash de senha para a autenticação local. Faça backup do banco antes de aplicar migrações em produção.

## Scripts

```bash
pnpm dev       # desenvolvimento com Vite middleware
pnpm check     # TypeScript
pnpm test      # testes Vitest
pnpm build     # frontend + bundle do servidor
pnpm start     # produção, depois de pnpm build
pnpm format    # Prettier
```

## Deploy em infraestrutura externa

1. Crie um banco MySQL/MariaDB e um bucket S3 compatível.
2. Suba este repositório para o GitHub.
3. Configure as variáveis de ambiente na plataforma de deploy.
4. Use `pnpm install --frozen-lockfile` como instalação.
5. Use `pnpm build` como build command.
6. Use `pnpm start` como start command.
7. Execute `pnpm drizzle-kit migrate` uma vez contra o banco de produção antes do primeiro uso.
8. Aponte o domínio para a porta definida por `PORT` e force HTTPS em produção.

### Docker

Um `Dockerfile` acompanha o projeto para plataformas que aceitam containers:

```bash
docker build -t climamatch .
docker run --env-file .env -p 3000:3000 climamatch
```

## Arquitetura

- `client/`: React, Tailwind e componentes da interface.
- `server/routers.ts`: contratos tRPC e regras do marketplace.
- `server/local-auth.ts`: cadastro/login local e sessão JWT.
- `server/storage.ts`: upload e URLs assinadas via S3 compatível.
- `server/db.ts`: acesso MySQL via Drizzle.
- `drizzle/`: schema e migrações.
- `server/matching.ts` e `server/problem-mapping.ts`: regras determinísticas do produto.

WhatsApp não faz parte do caminho crítico nesta exportação. As notificações internas continuam ativas e a decisão de integração externa pode ser tomada posteriormente sem alteração do núcleo do marketplace.
