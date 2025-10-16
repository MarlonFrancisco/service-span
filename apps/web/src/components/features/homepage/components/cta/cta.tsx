import { fadeInUpAnimation } from '@/utils/animations/common.animation';
import { Button } from '@repo/ui';
import { motion } from 'motion/react';

export const CTA = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="cta-section -mx-6 rounded-4xl bg-neutral-950 px-6 py-20 sm:mx-0 sm:py-32 md:px-12"
          {...fadeInUpAnimation}
        >
          <div className="mx-auto max-w-4xl">
            <div className="max-w-xl">
              <div className="text-left">
                <h2 className="text-3xl font-medium text-white mb-4">
                  Conte-nos sobre seu projeto
                </h2>
                <Button className="bg-white text-black hover:bg-gray-100 px-6 py-2 text-sm font-medium rounded-full">
                  Diga Olá!
                </Button>
              </div>

              <div className="text-white mt-10 border-t border-white/10 pt-10">
                <h3 className="text-lg font-medium mb-8">Nossos escritórios</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                  <div>
                    <h4 className="font-medium mb-2">São Paulo</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      1 Centro, Cidade
                      <br />
                      1200, Sudoeste, São Paulo
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Rio de Janeiro</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      04 Lage Ave
                      <br />
                      7740 Barra, Rio de Janeiro
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
