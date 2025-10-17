import { SearchDesktop } from './search-desktop';
import { SearchMobile } from './search-mobile';

export const SearchBar = () => {
  return (
    <div className="w-full">
      <SearchMobile />
      <SearchDesktop />
    </div>
  );
};
