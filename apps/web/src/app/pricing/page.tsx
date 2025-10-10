import { Pricing } from '@/components/features/pricing';
import { PaymentService } from '@/service/payment/payment.service';

export default async function PricingPage() {
  const plans = await PaymentService.getPlans();
  console.log(plans);
  return <Pricing />;
}
