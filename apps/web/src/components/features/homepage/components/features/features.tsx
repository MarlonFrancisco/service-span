import { fadeInUpAnimation } from '@/utils/animations/common.animation';
import { Clock, Shield, Star } from 'lucide-react';
import { motion } from 'motion/react';

export const Features = () => {
  return (
    <section className="py-24 px-6" id="service-snap-features">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-semibold text-gray-900 mb-6">
            Por que usar o ServiceSnap?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A plataforma que conecta você aos melhores profissionais com total
            segurança e praticidade
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <motion.div
            className="feature-item text-center group"
            {...fadeInUpAnimation}
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-blue-50 rounded-2xl group-hover:scale-110 transition-transform">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Agendamento instantâneo
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Reserve seus horários em segundos, com confirmação automática e
              lembretes inteligentes.
            </p>
          </motion.div>

          <motion.div
            className="feature-item text-center group"
            {...fadeInUpAnimation}
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-purple-50 rounded-2xl group-hover:scale-110 transition-transform">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Profissionais verificados
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Todos os prestadores passam por verificação rigorosa de documentos
              e qualificações.
            </p>
          </motion.div>

          <motion.div
            className="feature-item text-center group"
            {...fadeInUpAnimation}
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-green-50 rounded-2xl group-hover:scale-110 transition-transform">
                <Star className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Qualidade garantida
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Sistema de avaliações transparente com feedback real de milhares
              de clientes satisfeitos.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
