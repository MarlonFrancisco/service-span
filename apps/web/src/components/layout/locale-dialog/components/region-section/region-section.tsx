import { COUNTRIES } from '@repo/shared/constants';
import { CountryOption } from '../country-option';
import type { TRegionSectionConfig } from './region-section.types';

export const RegionSection = ({
  title,
  countries,
  selectedCountry,
  onSelect,
}: TRegionSectionConfig) => {
  return (
    <div className="mb-6">
      <h4 className="text-sm font-medium text-neutral-500 mb-3">{title}</h4>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {countries.map((code) => {
          const countryData = COUNTRIES[code];
          return (
            <CountryOption
              key={code}
              code={code}
              name={countryData.nativeName}
              locale={countryData.locale}
              isSelected={selectedCountry === code}
              onClick={() => onSelect(code)}
            />
          );
        })}
      </div>
    </div>
  );
};
