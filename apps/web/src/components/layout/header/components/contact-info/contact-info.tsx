import type { TContactInfoConfig } from './contact-info.types';

export const ContactInfo = ({ addresses }: TContactInfoConfig) => {
  return (
    <div>
      <h2 className="font-display text-base font-semibold text-white">
        Central de ajuda
      </h2>
      <ul role="list" className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2">
        {addresses.map((address) => (
          <li key={address.city}>
            <address className="text-sm not-italic text-neutral-300">
              <strong className="text-white">{address.city}</strong>
              <br />
              {address.street}
              <br />
              {address.postalCode}, {address.country}
            </address>
          </li>
        ))}
      </ul>
    </div>
  );
};

