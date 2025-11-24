import 'dotenv/config';
import Stripe from 'stripe';

const stripeKey = process.env.STRIPE_API_KEY;

if (!stripeKey) {
  console.error(
    '❌ ERRO: STRIPE_API_KEY não encontrada nas variáveis de ambiente',
  );
  process.exit(1);
}

const stripe = new Stripe(stripeKey);

interface ProductMetadata extends Stripe.ProductUpdateParams {
  productId: string;
}

const productsMetadata: ProductMetadata[] = [
  {
    productId: 'prod_TR5FejhpnItfNp', // Starter
    metadata: {
      UNIT_LIMIT: '1',
      PRO_LIMIT: '1',
      RANK_TIER: 'TIER_3',
      SMS_REMINDER: 'false',
      WHATSAPP_INTEGRATION: 'false',
      DISPLAY_ORDER: '1',
      IS_RECOMMENDED: 'false',
      TRIAL_PERIOD_DAYS: '7',
    },
    marketing_features: [
      { name: '1 Loja' },
      { name: '1 Profissional' },
      { name: 'Ranqueamento Padrão' },
      { name: 'Suporte E-mail/FAQ' },
    ],
    description: 'Plano ideal para profissionais começando',
  },
  {
    productId: 'prod_TR5Fq5jyCFu8jB', // Professional
    metadata: {
      UNIT_LIMIT: '2',
      PRO_LIMIT: '5',
      RANK_TIER: 'TIER_2',
      SMS_REMINDER: 'false',
      WHATSAPP_INTEGRATION: 'false',
      DISPLAY_ORDER: '2',
      IS_RECOMMENDED: 'false',
    },
    marketing_features: [
      { name: 'Até 2 Lojas' },
      { name: 'Até 5 Profissionais' },
      { name: 'Ranqueamento Prioritário' },
      { name: 'Suporte Chat/E-mail' },
    ],
    description: 'Para profissionais que querem escalar',
  },
  {
    productId: 'prod_TR5FGo8Di9giHr', // Business
    metadata: {
      UNIT_LIMIT: '5',
      PRO_LIMIT: '20',
      RANK_TIER: 'TIER_1',
      SMS_REMINDER: 'false',
      WHATSAPP_INTEGRATION: 'false',
      DISPLAY_ORDER: '3',
      IS_RECOMMENDED: 'true',
    },
    marketing_features: [
      { name: 'Até 5 Lojas' },
      { name: 'Até 20 Profissionais' },
      { name: 'Ranqueamento Máximo' },
      { name: 'Analytics' },
      { name: 'Suporte Prioritário' },
    ],
    description: 'Para empresas estabelecidas',
  },
  {
    productId: 'prod_TR5FiVMjU2IKST', // Enterprise
    metadata: {
      UNIT_LIMIT: 'UNLIMITED',
      PRO_LIMIT: 'UNLIMITED',
      RANK_TIER: 'TIER_1',
      SMS_REMINDER: 'true',
      WHATSAPP_INTEGRATION: 'true',
      DISPLAY_ORDER: '4',
      IS_RECOMMENDED: 'false',
    },
    marketing_features: [
      { name: 'Lojas Ilimitadas' },
      { name: 'Profissionais Ilimitados' },
      { name: 'Ranqueamento Máximo + Destaque' },
      { name: 'Integração WhatsApp' },
      {
        name: 'Analytics Completo + API',
      },
      { name: 'Suporte Dedicado' },
    ],
    description: 'Solução completa para empresas',
  },
];

async function updateProductsMetadata() {
  console.log(
    '🚀 Iniciando atualização de metadata dos produtos no Stripe...\n',
  );
  console.log(`📋 Total de produtos a atualizar: ${productsMetadata.length}\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const {
    productId,
    metadata,
    marketing_features,
    description,
  } of productsMetadata) {
    try {
      console.log(`📦 Atualizando produto ${productId}...`);

      await stripe.products.retrieve(productId);

      const updatedProduct = await stripe.products.update(productId, {
        metadata,
        marketing_features,
        description,
      });

      const metadataUpdated = Object.keys(metadata).every(
        (key) => updatedProduct.metadata[key] === metadata[key],
      );

      if (!metadataUpdated) {
        throw new Error('Metadata não foi atualizada corretamente');
      }

      successCount++;
      console.log(
        `✅ Produto "${updatedProduct.name}" atualizado com sucesso!`,
      );
      console.log(`   Metadata:`, Object.keys(metadata).join(', '));
      const featuresList = Array.isArray(marketing_features)
        ? marketing_features.map((f) => f.name).join(', ')
        : 'N/A';
      console.log(`   Features:`, featuresList);
      console.log('');
    } catch (error) {
      errorCount++;
      console.error(`❌ Erro ao atualizar produto ${productId}:`);

      if (error instanceof Stripe.errors.StripeError) {
        console.error(`   Tipo: ${error.type}`);
        console.error(`   Código: ${error.code || 'N/A'}`);
        console.error(`   Mensagem: ${error.message}`);

        if (error.statusCode) {
          console.error(`   Status HTTP: ${error.statusCode}`);
        }
      } else if (error instanceof Error) {
        console.error(`   Mensagem: ${error.message}`);
      } else {
        console.error(`   Erro desconhecido:`, error);
      }
      console.log('');
    }
  }

  console.log('─'.repeat(50));
  console.log('✨ Processo concluído!');
  console.log(`   ✅ Sucessos: ${successCount}`);
  console.log(`   ❌ Erros: ${errorCount}`);
  console.log('─'.repeat(50));

  if (errorCount > 0) {
    console.log(
      '\n⚠️  Alguns produtos não foram atualizados. Verifique os erros acima.',
    );
    process.exit(1);
  }
}

updateProductsMetadata().catch((error) => {
  console.error('\n💥 Erro fatal ao executar script:');
  console.error(error);
  process.exit(1);
});
