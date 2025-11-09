import type { TSocialLinksConfig } from './social-links.types';

export const SocialLinks = ({ links }: TSocialLinksConfig) => {
  return (
    <div className="sm:border-l sm:border-transparent sm:pl-16">
      <h2 className="font-display text-base font-semibold text-white">
        Conecte-se
      </h2>
      <ul role="list" className="flex gap-x-10 text-white mt-6">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <li key={link.href}>
              <a
                aria-label={link.label}
                className="transition hover:text-neutral-200"
                href={link.href}
              >
                <Icon />
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
