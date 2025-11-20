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

const annualPrices = [
  { id: 'price_1SUD5QDcKHFnY9Kbci7jkrd4', plan: 'Starter' },
  { id: 'price_1SUD5RDcKHFnY9KbbMXGMO2N', plan: 'Professional' },
  { id: 'price_1SUD5TDcKHFnY9KbdTy0d7zm', plan: 'Business' },
  { id: 'price_1SUD5UDcKHFnY9KbFhRLQzfj', plan: 'Enterprise' },
];

async function updateAnnualPricesDiscount() {
  console.log('🚀 Atualizando metadata de desconto nos preços anuais...\n');

  let successCount = 0;
  let errorCount = 0;

  for (const { id, plan } of annualPrices) {
    try {
      console.log(`📦 Atualizando preço anual do ${plan} (${id})...`);

      const updatedPrice = await stripe.prices.update(id, {
        metadata: {
          discount: '10',
        },
      });

      if (updatedPrice.metadata.discount === '10') {
        successCount++;
        console.log(`✅ Preço ${plan} atualizado com sucesso!`);
        console.log(`   Discount: ${updatedPrice.metadata.discount}%\n`);
      } else {
        throw new Error('Metadata não foi atualizada corretamente');
      }
    } catch (error) {
      errorCount++;
      console.error(`❌ Erro ao atualizar preço ${plan}:`);

      if (error instanceof Stripe.errors.StripeError) {
        console.error(`   Tipo: ${error.type}`);
        console.error(`   Código: ${error.code || 'N/A'}`);
        console.error(`   Mensagem: ${error.message}\n`);
      } else if (error instanceof Error) {
        console.error(`   Mensagem: ${error.message}\n`);
      }
    }
  }

  console.log('─'.repeat(50));
  console.log('✨ Processo concluído!');
  console.log(`   ✅ Sucessos: ${successCount}`);
  console.log(`   ❌ Erros: ${errorCount}`);
  console.log('─'.repeat(50));

  if (errorCount > 0) {
    console.log(
      '\n⚠️  Alguns preços não foram atualizados. Verifique os erros acima.',
    );
    process.exit(1);
  }
}

updateAnnualPricesDiscount().catch((error) => {
  console.error('\n💥 Erro fatal ao executar script:');
  console.error(error);
  process.exit(1);
});
