# Service Span API

API NestJS com TypeORM e PostgreSQL, otimizada para deployment serverless na Vercel.

## Getting Started

### Desenvolvimento Local

```bash
pnpm run dev
```

Por padrão, o servidor roda em [http://localhost:3000](http://localhost:3000).

### Build

```bash
pnpm run build
```

**⚠️ Importante:** Build os packages primeiro se for buildar apenas esta app.

## Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com:

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=service_snap
DB_SYNCHRONIZE=false
DB_LOGGING=false

# JWT
JWT_SECRET=seu-secret-super-seguro-aqui

# Frontend
FRONTEND_URL=http://localhost:3001

# AWS (para notificações SMS)
AWS_ACCESS_KEY_ID=sua-aws-key
AWS_SECRET_ACCESS_KEY=sua-aws-secret
AWS_REGION=us-east-1

# Stripe
STRIPE_API_KEY=sk_test_...

# Google OAuth
GOOGLE_CLIENT_ID=seu-google-client-id
GOOGLE_CLIENT_SECRET=seu-google-secret

# Node
NODE_ENV=development
```

### Variáveis de Ambiente na Vercel

No painel da Vercel, adicione todas as variáveis acima em **Settings → Environment Variables**.

**⚠️ Configuração Crítica para Serverless:**

- `DB_HOST`: Use URL do seu banco (Neon, Supabase, Railway, etc)
- `DB_SYNCHRONIZE`: SEMPRE `false` em produção
- `NODE_ENV`: `production`

## Deploy na Vercel

Esta API está configurada para rodar em modo serverless na Vercel:

1. **Otimizações implementadas:**

   - Connection pooling limitado (1 conexão por função)
   - Cache da aplicação NestJS
   - Timeouts configurados
   - Handler serverless em `api/index.ts`

2. **Estrutura:**

   ```
   apps/api/
   ├── api/index.ts          # Handler Vercel
   ├── vercel.json           # Config Vercel
   └── src/main.ts           # Bootstrap NestJS
   ```

3. **Build automático:**
   A Vercel executa `pnpm build` e usa `dist/main.js` como entrypoint.

### ⚠️ Note about build

If you plan to only build this app. Please make sure you've built the packages first.

## Learn More

To learn more about NestJs, take a look at the following resources:

- [Official Documentation](https://docs.nestjs.com) - A progressive Node.js framework for building efficient, reliable and scalable server-side applications.
- [Official NestJS Courses](https://courses.nestjs.com) - Learn everything you need to master NestJS and tackle modern backend applications at any scale.
- [GitHub Repo](https://github.com/nestjs/nest)
