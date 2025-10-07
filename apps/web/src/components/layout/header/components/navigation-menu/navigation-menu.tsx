import { useAuthActions } from '@/store/auth/auth.hook';
import Link from 'next/link';
import type { TNavigationMenuConfig } from './navigation-menu.types';

export const NavigationMenu = ({ items }: TNavigationMenuConfig) => {
  const { toggleAuthAction } = useAuthActions();

  const handleAuth = () => {
    toggleAuthAction(true);
  };

  return (
    <nav className="mt-px font-display text-5xl font-medium tracking-tight text-white">
      <div className="even:mt-px sm:bg-neutral-950">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="grid grid-cols-1 sm:grid-cols-2">
              <button
                className="group text-left cursor-pointer relative isolate bg-neutral-950 px-6 py-10 even:mt-px sm:mx-0 sm:px-0 sm:py-16 sm:odd:pr-16 sm:even:mt-0 sm:border-neutral-800 sm:even:pl-16"
                onClick={handleAuth}
              >
                Entrar ou registrar-se
                <span className="absolute inset-y-0 -z-10 w-screen right-0 bg-transparent sm:border-b sm:border-neutral-800 hover:display-none" />
                <span className="absolute inset-y-0 -z-10 w-screen bg-neutral-900 opacity-0 transition group-odd:right-0 group-even:left-0 group-hover:opacity-100 sm:border sm:border-neutral-800" />
              </button>
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative isolate -mx-6 bg-neutral-950 px-6 py-10 even:mt-px sm:mx-0 sm:px-0 sm:py-16 sm:odd:pr-16 sm:even:mt-0 sm:even:border-l sm:even:border-neutral-800 sm:even:pl-16"
                >
                  {item.label}
                  <span className="absolute inset-y-0 -z-10 w-screen group-odd:right-0 group-even:left-0 bg-transparent sm:border-b sm:border-neutral-800 hover:display-none" />
                  <span className="absolute inset-y-0 -z-10 w-screen bg-neutral-900 opacity-0 transition group-odd:right-0 group-even:left-0 group-hover:opacity-100" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
