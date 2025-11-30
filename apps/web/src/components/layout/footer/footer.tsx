'use client';

import { LocaleDialog } from '@/components/layout/locale-dialog';
import { useLocaleStore } from '@/store/locale';
import { COUNTRIES, CURRENCIES } from '@repo/shared/constants';
import { getFlagEmoji } from '@repo/ui';
import { Globe } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export const Footer = () => {
  const [isLocaleOpen, setIsLocaleOpen] = useState(false);
  const { country, currency } = useLocaleStore();

  const countryData = COUNTRIES[country];
  const currencyData = CURRENCIES[currency];

  return (
    <footer>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side - Links */}
          <div className="grid grid-cols-3 gap-8">
            {/* Empresa */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-6">
                Empresa
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/about"
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Sobre nós
                  </Link>
                </li>

                <li>
                  <Link
                    href="/privacy"
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Privacidade
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Termos
                  </Link>
                </li>
              </ul>
            </div>

            {/* Suporte */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-6">
                Suporte
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/help"
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Central de ajuda
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Como funciona
                  </Link>
                </li>
              </ul>
            </div>

            {/* Conecte-se */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-6">
                Conecte-se
              </h3>
              <ul className="space-y-4">
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Side - Newsletter */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-2">
              Inscreva-se na nossa newsletter
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Receba as últimas novidades sobre serviços, profissionais e muito
              mais.
            </p>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Digite seu e-mail"
                className="flex-1 px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
              <button className="px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors">
                →
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo */}
          <Link href="/">
            <Image src="/logo.png" alt="ServiceSnap" width={200} height={62} />
          </Link>

          {/* Locale Selector & Copyright */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
            {/* Locale Button */}
            <button
              type="button"
              onClick={() => setIsLocaleOpen(true)}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Globe className="h-4 w-4" />
              <span>{getFlagEmoji(country)}</span>
              <span>{countryData?.nativeName}</span>
              <span className="text-gray-400">·</span>
              <span>
                {currencyData?.symbol} {currency}
              </span>
            </button>

            {/* Copyright */}
            <p className="text-sm text-gray-600">© ServiceSnap Inc. 2025</p>
          </div>
        </div>
      </div>

      <LocaleDialog open={isLocaleOpen} onOpenChange={setIsLocaleOpen} />
    </footer>
  );
};
