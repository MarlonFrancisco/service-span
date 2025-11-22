# Configuração de Planos no Stripe

## Produtos Criados

### 1. Starter

- **Product ID**: `prod_TR5FejhpnItfNp`
- **Preço Mensal**: `price_1SUD5PDcKHFnY9KbwF4ARV1P` - R$ 49,90/mês
- **Preço Anual**: `price_1SUD5QDcKHFnY9Kbci7jkrd4` - R$ 538,92/ano (desconto de 10%)

**Metadata do Product** (configurar no dashboard do Stripe):

```
UNIT_LIMIT: 1
PRO_LIMIT: 1
SCHEDULE_LIMIT: 100
RANK_TIER: TIER_3
SMS_REMINDER: false
DISPLAY_ORDER: 1
IS_RECOMMENDED: false
```

**Trial Period**: Configurar `trial_period_days: 7` no preço mensal (`price_1SUD5PDcKHFnY9KbwF4ARV1P`) via API ou dashboard.

### 2. Professional

- **Product ID**: `prod_TR5Fq5jyCFu8jB`
- **Preço Mensal**: `price_1SUD5RDcKHFnY9KbmIed7oPM` - R$ 99,90/mês
- **Preço Anual**: `price_1SUD5RDcKHFnY9KbbMXGMO2N` - R$ 1.078,92/ano (desconto de 10%)

**Metadata do Product**:

```
UNIT_LIMIT: 2
PRO_LIMIT: 5
SCHEDULE_LIMIT: 300
RANK_TIER: TIER_2
SMS_REMINDER: true
DISPLAY_ORDER: 2
IS_RECOMMENDED: false
```

### 3. Business

- **Product ID**: `prod_TR5FGo8Di9giHr`
- **Preço Mensal**: `price_1SUD5SDcKHFnY9KbMgtyGzXg` - R$ 199,90/mês
- **Preço Anual**: `price_1SUD5TDcKHFnY9KbdTy0d7zm` - R$ 2.158,92/ano (desconto de 10%)

**Metadata do Product**:

```
UNIT_LIMIT: 10
PRO_LIMIT: UNLIMITED
SCHEDULE_LIMIT: 1000
RANK_TIER: TIER_1
SMS_REMINDER: true
DISPLAY_ORDER: 3
IS_RECOMMENDED: true
```

### 4. Enterprise

- **Product ID**: `prod_TR5FiVMjU2IKST`
- **Preço Mensal**: `price_1SUD5UDcKHFnY9KbUlxna0Da` - R$ 399,90/mês
- **Preço Anual**: `price_1SUD5UDcKHFnY9KbFhRLQzfj` - R$ 4.318,92/ano (desconto de 10%)

**Metadata do Product**:

```
UNIT_LIMIT: UNLIMITED
PRO_LIMIT: UNLIMITED
SCHEDULE_LIMIT: UNLIMITED
RANK_TIER: TIER_1
SMS_REMINDER: true
DISPLAY_ORDER: 4
IS_RECOMMENDED: false
```

## Como Configurar Metadata

### Via Dashboard do Stripe:

1. Acesse https://dashboard.stripe.com/products
2. Clique em cada produto
3. Vá na seção "Additional information" ou "Metadata"
4. Adicione cada chave-valor listada acima

### Via Script Automatizado (Recomendado):

Execute o script TypeScript criado para atualizar todos os produtos de uma vez:

```bash
cd apps/api
pnpm tsx ../../scripts/update-stripe-products-metadata.ts
```

**Nota**: Certifique-se de que o arquivo `.env.local` na pasta `apps/api` contenha a variável `STRIPE_API_KEY`.

### Via Stripe CLI:

```bash
# Exemplo para Starter
stripe products update prod_TR5FejhpnItfNp \
  --metadata[UNIT_LIMIT]=1 \
  --metadata[PRO_LIMIT]=1 \
  --metadata[SCHEDULE_LIMIT]=100 \
  --metadata[RANK_TIER]=TIER_3 \
  --metadata[SMS_REMINDER]=false \
  --metadata[DISPLAY_ORDER]=1 \
  --metadata[IS_RECOMMENDED]=false
```

## Configurar Trial Period no Starter Mensal

O trial period de 7 dias precisa ser configurado no preço mensal do Starter. Isso pode ser feito:

1. **Via API ao criar subscription**: O trial será aplicado automaticamente quando criar uma subscription usando o price mensal do Starter
2. **Via Dashboard**: Não é possível configurar trial diretamente no price, mas será aplicado na criação da subscription

**Nota**: O trial period será aplicado no método `create()` do `SubscriptionService` quando detectar que é o plano Starter mensal.

## Metadata de Desconto nos Preços Anuais

Todos os preços anuais possuem metadata `discount: 10` configurada, representando o desconto de 10% aplicado no plano anual.

**Preços Anuais com Desconto**:

- Starter: `price_1SUD5QDcKHFnY9Kbci7jkrd4` - metadata `discount: 10`
- Professional: `price_1SUD5RDcKHFnY9KbbMXGMO2N` - metadata `discount: 10`
- Business: `price_1SUD5TDcKHFnY9KbdTy0d7zm` - metadata `discount: 10`
- Enterprise: `price_1SUD5UDcKHFnY9KbFhRLQzfj` - metadata `discount: 10`

Para atualizar os descontos, execute:

```bash
cd apps/api
npx tsx src/scripts/update-annual-prices-discount.ts
```

## Marketing Features (Features Exibidas na UI)

Para cada produto, adicione as seguintes features via dashboard do Stripe ou API:

### Starter:

- 1 Loja
- 1 Profissional
- Até 100 agendamentos/mês
- Ranqueamento Padrão
- Suporte E-mail/FAQ

### Professional:

- Até 2 Lojas
- Até 5 Profissionais
- Até 300 agendamentos/mês
- Ranqueamento Prioritário
- Lembretes SMS
- Analytics Completo
- Suporte Chat/E-mail

### Business:

- Até 10 Lojas
- Profissionais Ilimitados
- Até 1.000 agendamentos/mês
- Ranqueamento Máximo
- Lembretes SMS
- Analytics Completo + Exportação
- Suporte Prioritário

### Enterprise:

- Lojas Ilimitadas
- Profissionais Ilimitados
- Agendamentos Ilimitados
- Ranqueamento Máximo + Destaque
- Lembretes SMS
- Analytics Completo + Exportação + API
- Suporte Dedicado
