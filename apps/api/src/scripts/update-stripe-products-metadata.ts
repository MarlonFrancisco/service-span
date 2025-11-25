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

interface ProductMetadata {
  productName: string;
  metadata: Record<string, string>;
  marketing_features: Array<{ name: string }>;
  description: string;
}

const productsMetadata: ProductMetadata[] = [
  {
    productName: 'Starter',
    metadata: {
      UNIT_LIMIT: '1',
      PRO_LIMIT: '1',
      RANK_TIER: 'TIER_3',
      SMS_REMINDER: 'false',
      WHATSAPP_INTEGRATION: 'false',
      DISPLAY_ORDER: '1',
      IS_RECOMMENDED: 'false',
      TRIAL_PERIOD_DAYS: '7',
      DASHBOARD_GENERAL_ACCESS: 'false',
      DASHBOARD_SALES_ACCESS: 'false',
      DASHBOARD_OPERATIONAL_ACCESS: 'false',
      DASHBOARD_CUSTOMERS_ACCESS: 'false',
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
    productName: 'Professional',
    metadata: {
      UNIT_LIMIT: '2',
      PRO_LIMIT: '5',
      RANK_TIER: 'TIER_2',
      SMS_REMINDER: 'false',
      WHATSAPP_INTEGRATION: 'false',
      DISPLAY_ORDER: '2',
      IS_RECOMMENDED: 'false',
      DASHBOARD_GENERAL_ACCESS: 'false',
      DASHBOARD_SALES_ACCESS: 'false',
      DASHBOARD_OPERATIONAL_ACCESS: 'false',
      DASHBOARD_CUSTOMERS_ACCESS: 'false',
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
    productName: 'Business',
    metadata: {
      UNIT_LIMIT: '5',
      PRO_LIMIT: '20',
      RANK_TIER: 'TIER_1',
      SMS_REMINDER: 'false',
      WHATSAPP_INTEGRATION: 'false',
      DISPLAY_ORDER: '3',
      IS_RECOMMENDED: 'true',

      DASHBOARD_GENERAL_ACCESS: 'true',
      DASHBOARD_SALES_ACCESS: 'false',
      DASHBOARD_OPERATIONAL_ACCESS: 'false',
      DASHBOARD_CUSTOMERS_ACCESS: 'false',
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
    productName: 'Enterprise',
    metadata: {
      UNIT_LIMIT: 'UNLIMITED',
      PRO_LIMIT: 'UNLIMITED',
      RANK_TIER: 'TIER_1',
      SMS_REMINDER: 'true',
      WHATSAPP_INTEGRATION: 'true',
      DISPLAY_ORDER: '4',
      IS_RECOMMENDED: 'false',

      DASHBOARD_GENERAL_ACCESS: 'true',
      DASHBOARD_SALES_ACCESS: 'true',
      DASHBOARD_OPERATIONAL_ACCESS: 'true',
      DASHBOARD_CUSTOMERS_ACCESS: 'true',
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

  // Listar todos os produtos da Stripe
  console.log('📡 Buscando produtos da Stripe...\n');
  const stripeProducts = await stripe.products.list({
    limit: 100,
    active: true,
  });

  let successCount = 0;
  let errorCount = 0;

  for (const {
    productName,
    metadata,
    marketing_features,
    description,
  } of productsMetadata) {
    try {
      console.log(`📦 Buscando produto "${productName}"...`);

      // Encontrar o produto pelo nome
      const product = stripeProducts.data.find((p) => p.name === productName);

      if (!product) {
        throw new Error(`Produto "${productName}" não encontrado na Stripe`);
      }

      console.log(`   Encontrado: ${product.id}`);
      console.log(`   Atualizando...`);

      const updatedProduct = await stripe.products.update(product.id, {
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
      console.error(`❌ Erro ao atualizar produto "${productName}":`);

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
