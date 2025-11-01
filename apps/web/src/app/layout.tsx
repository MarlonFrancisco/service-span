import { AuthModal } from '@/components/features/auth';
import { Config, MobileSearchOverlay, Toaster } from '@/components/layout';
import { QueryProvider } from '@/providers';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Script from 'next/script';
import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
});
const monaSans = localFont({
  src: [
    // Regular weights
    {
      path: './fonts/Mona_Sans/static/MonaSans-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Mona_Sans/static/MonaSans-Italic.ttf',
      weight: '400',
      style: 'italic',
    },

    // Medium weight
    {
      path: './fonts/Mona_Sans/static/MonaSans-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/Mona_Sans/static/MonaSans-MediumItalic.ttf',
      weight: '500',
      style: 'italic',
    },

    // SemiBold weight
    {
      path: './fonts/Mona_Sans/static/MonaSans-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/Mona_Sans/static/MonaSans-SemiBoldItalic.ttf',
      weight: '600',
      style: 'italic',
    },

    // Bold weight
    {
      path: './fonts/Mona_Sans/static/MonaSans-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/Mona_Sans/static/MonaSans-BoldItalic.ttf',
      weight: '700',
      style: 'italic',
    },

    // ExtraBold weight
    {
      path: './fonts/Mona_Sans/static/MonaSans-ExtraBold.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: './fonts/Mona_Sans/static/MonaSans-ExtraBoldItalic.ttf',
      weight: '800',
      style: 'italic',
    },

    // Black weight
    {
      path: './fonts/Mona_Sans/static/MonaSans-Black.ttf',
      weight: '900',
      style: 'normal',
    },
    {
      path: './fonts/Mona_Sans/static/MonaSans-BlackItalic.ttf',
      weight: '900',
      style: 'italic',
    },

    // Light weights
    {
      path: './fonts/Mona_Sans/static/MonaSans-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/Mona_Sans/static/MonaSans-LightItalic.ttf',
      weight: '300',
      style: 'italic',
    },

    {
      path: './fonts/Mona_Sans/static/MonaSans-ExtraLight.ttf',
      weight: '200',
      style: 'normal',
    },
    {
      path: './fonts/Mona_Sans/static/MonaSans-ExtraLightItalic.ttf',
      weight: '200',
      style: 'italic',
    },

    // Condensed variations
    {
      path: './fonts/Mona_Sans/static/MonaSans_Condensed-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Mona_Sans/static/MonaSans_Condensed-Bold.ttf',
      weight: '700',
      style: 'normal',
    },

    // Expanded variations
    {
      path: './fonts/Mona_Sans/static/MonaSans_Expanded-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Mona_Sans/static/MonaSans_Expanded-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-mona-sans',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
});

export const metadata: Metadata = {
  title: 'ServiceSnap - Agende seus serviços favoritos',
  description:
    'Encontre e agende com os melhores profissionais perto de você. Simples, rápido e confiável.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${monaSans.variable} ${geistSans.variable} ${geistMono.variable}`}
      >
        <QueryProvider>
          {children}
          <Config />
          <AuthModal />
          <Toaster />
          <MobileSearchOverlay />
        </QueryProvider>

        <Script
          src="https://accounts.google.com/gsi/client"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
