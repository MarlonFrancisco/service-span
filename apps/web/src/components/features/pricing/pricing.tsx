'use client';
import { Footer, Header } from '@/components/layout';
import { PlanCard } from '@/components/ui';
import { Badge, Card, Carousel, CarouselContent, CarouselItem } from '@repo/ui';
import {
  BarChart3,
  Clock,
  Shield,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';
import { motion } from 'motion/react';
import { ROICalculator } from '../roi-calculator';
import { usePricing } from './pricing.hook';

const benefits = [
  {
    icon: Zap,
    title: 'Aumente sua eficiência',
    description:
      'Automatize agendamentos e reduza no-shows em até 80% com lembretes inteligentes.',
  },
  {
    icon: TrendingUp,
    title: 'Cresça mais rápido',
    description:
      'Empresas que usam ServiceSnap crescem 3x mais rápido com agendamentos online 24/7.',
  },
  {
    icon: Users,
    title: 'Fidelize clientes',
    description:
      'Experiência premium de agendamento que seus clientes vão amar e recomendar.',
  },
  {
    icon: Shield,
    title: 'Segurança garantida',
    description:
      'Seus dados e dos seus clientes protegidos com criptografia de ponta a ponta.',
  },
  {
    icon: Clock,
    title: 'Economize tempo',
    description:
      'Reduza em até 15 horas semanais gastas com gestão de agendamentos manuais.',
  },
  {
    icon: BarChart3,
    title: 'Insights poderosos',
    description:
      'Tome decisões baseadas em dados com analytics detalhados e relatórios em tempo real.',
  },
];

export const Pricing = () => {
  const { plans } = usePricing();

  return (
    <Header>
      <motion.div layout>
        {/* Hero Section */}
        <div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Badge variant="outline" className="mb-4 border-black/10">
                  Pricing
                </Badge>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl text-gray-900 mb-6">
                  Preços que crescem com você
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                  Escolha um plano acessível e repleto dos melhores recursos
                  para engajar sua audiência, criar fidelidade e impulsionar
                  vendas.
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <Carousel
            opts={{
              slidesToScroll: 1,
              active: true,
              align: 'start',
              breakpoints: {
                '(min-width: 64rem)': { active: false },
              },
            }}
            className="-mx-4"
          >
            <CarouselContent className="pt-3 px-4">
              {plans?.map((plan, index) => (
                <CarouselItem
                  key={plan.name}
                  className="pl-4 basis-[85%] lg:basis-[calc(100%/3)]"
                >
                  <PlanCard plan={plan} index={index} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        {/* ROI Calculator Section */}
        <div className="bg-gradient-to-b from-gray-50 via-white to-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <Badge variant="outline" className="mb-4 border-black/10">
                <Sparkles className="w-3 h-3 mr-1 inline" />
                Calculadora de ROI
              </Badge>
              <h2 className="text-3xl sm:text-4xl text-gray-900 mb-4">
                Calcule seu retorno sobre investimento
              </h2>
              <p className="text-lg text-gray-600">
                Veja quanto você pode economizar reduzindo no-shows com
                ServiceSnap
              </p>
            </motion.div>

            <ROICalculator />
          </div>
        </div>

        {/* Why Subscribe Section */}
        <div className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl text-gray-900 mb-4">
                Por que assinar o ServiceSnap?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Junte-se a milhares de profissionais que transformaram seus
                negócios
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="border-gray-200 p-6 h-full hover:shadow-lg transition-shadow">
                    <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mb-4">
                      <benefit.icon className="w-6 h-6 text-gray-900" />
                    </div>
                    <h3 className="text-xl text-gray-900 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <Footer />
      </motion.div>
    </Header>
  );
};
