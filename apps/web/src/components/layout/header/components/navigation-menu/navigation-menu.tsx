import { useUserQuery } from '@/hooks/use-query/use-user-query';
import { useAuthStore } from '@/store/auth/auth.store';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { NAVIGATION_ITEMS } from '../../header.constants';

export const NavigationMenu = () => {
  const openAuthAction = useAuthStore((state) => state.openAuthAction);
  const { isLoggedIn } = useUserQuery();
  const router = useRouter();

  const handleAuth = useCallback(() => {
    openAuthAction({});
  }, [openAuthAction]);

  const navigationItems = useMemo(() => {
    const items = NAVIGATION_ITEMS.map((item) => ({
      ...item,
      onClick: item.href ? () => router.push(item.href!) : item.onClick,
    }));

    if (isLoggedIn) {
      items.unshift({
        onClick: () => router.push('/profile'),
        label: 'Meu perfil',
      });
    } else {
      items.unshift({
        onClick: handleAuth,
        label: 'Entrar ou registrar-se',
      });
    }

    return items;
  }, [isLoggedIn, handleAuth, router]);

  return (
    <nav className="mt-px font-display text-5xl font-medium tracking-tight text-white">
      <div className="even:mt-px bg-foreground">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="grid grid-cols-1 sm:grid-cols-2">
              {navigationItems.map((item) => (
                <button
                  key={item.label}
                  onClick={item.onClick}
                  className="text-2xl sm:text-5xl group relative isolate -mx-6 bg-foreground px-6 py-6 even:mt-px sm:mx-0 sm:px-0 sm:py-16 sm:odd:pr-16 sm:even:mt-0 sm:even:border-l sm:even:border-neutral-600 sm:even:pl-16"
                >
                  {item.label}
                  <span className="absolute inset-y-0 -z-10 w-screen group-odd:right-0 group-even:left-0 bg-transparent sm:border-b sm:border-t sm:border-neutral-600 hover:display-none" />
                  <span className="absolute inset-y-0 -z-10 w-screen bg-neutral-800 opacity-0 transition group-odd:right-0 group-even:left-0 group-hover:opacity-100" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
