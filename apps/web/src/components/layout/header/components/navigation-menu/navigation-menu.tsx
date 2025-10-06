import Link from 'next/link';
import type { TNavigationMenuConfig } from './navigation-menu.types';

export const NavigationMenu = ({ items }: TNavigationMenuConfig) => {
  const firstRow = items.slice(0, 2);
  const secondRow = items.slice(2, 4);

  const renderNavRow = (navItems: typeof items) => (
    <div className="even:mt-px sm:bg-neutral-950">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative isolate -mx-6 bg-neutral-950 px-6 py-10 even:mt-px sm:mx-0 sm:px-0 sm:py-16 sm:odd:pr-16 sm:even:mt-0 sm:even:border-l sm:even:border-neutral-800 sm:even:pl-16"
              >
                {item.label}
                <span className="absolute inset-y-0 -z-10 w-screen bg-neutral-900 opacity-0 transition group-odd:right-0 group-even:left-0 group-hover:opacity-100" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <nav className="mt-px font-display text-5xl font-medium tracking-tight text-white">
      {renderNavRow(firstRow)}
      {renderNavRow(secondRow)}
    </nav>
  );
};

