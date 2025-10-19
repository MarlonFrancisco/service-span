import Stripe from 'stripe';

const stripe = new Stripe('');

async function clearStripeTestData() {
  console.log('🧹 Limpando produtos e preços de teste do Stripe...\n');

  try {
    // 1️⃣ Lista todos os produtos
    const products = await stripe.products.list({ limit: 100 });

    for (const product of products.data) {
      console.log(`➡️ Produto: ${product.name || product.id}`);

      if (product.name === 'myproduct') {
        // 2️⃣ Lista e apaga os preços associados
        const prices = await stripe.prices.list({
          product: product.id,
          limit: 100,
        });

        for (const price of prices.data) {
          if (price.active) {
            await stripe.prices.update(price.id, { active: false });
            console.log(`   ✅ Preço arquivado: ${price.id}`);
          } else {
            console.log(`   🔁 Já arquivado: ${price.id}`);
          }
        }

        if (product.active) {
          await stripe.products.update(product.id, { active: false });
          console.log(`✅ Produto arquivado: ${product.id}`);
        } else {
          console.log(`🔁 Produto já arquivado: ${product.id}`);
        }
      }
    }

    console.log('✨ Limpeza concluída!');
  } catch (err) {
    console.error('❌ Erro ao limpar:', err.message);
  }
}

clearStripeTestData();
