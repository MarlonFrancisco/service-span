'use client'

import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"

export const Footer = () => {
  const router = useRouter()

  const navigate = (path: string) => {
    router.push(path, { scroll: true })
  }

  return (
    <footer>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side - Links */}
          <div className="grid grid-cols-3 gap-8">
            {/* Empresa */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-6">Empresa</h3>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    Sobre nós
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    Carreiras
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => navigate('contact')}
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Contato
                  </button>
                </li>
              </ul>
            </div>

            {/* Suporte */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-6">Suporte</h3>
              <ul className="space-y-4">
                <li>
                  <button
                    onClick={() => navigate('help')}
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Central de ajuda
                  </button>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    Como funciona
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => navigate('privacy')}
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Privacidade
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('terms')}
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Termos
                  </button>
                </li>
              </ul>
            </div>

            {/* Conecte-se */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-6">Conecte-se</h3>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Side - Newsletter */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-2">Inscreva-se na nossa newsletter</h3>
            <p className="text-sm text-gray-600 mb-6">
              Receba as últimas novidades sobre design, artigos, recursos e inspiração.
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
        <div className="mt-16 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo */}
          <Link
            href="/"
          >
            <Image src="/logo.png" alt="ServiceSnap" width={200} height={62} />
          </Link>

          {/* Copyright */}
          <p className="text-sm text-gray-600">
            © ServiceSnap Inc. 2025
          </p>
        </div>
      </div>
    </footer>
  )
}
