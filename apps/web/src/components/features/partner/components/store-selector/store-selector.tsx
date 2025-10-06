'use client';
import { Button } from '@repo/ui';
import { ChevronDown, MapPin } from 'lucide-react';
import { useStoreSelector } from './store-selector.hook';
import {
  storeSelectorActiveIndicatorVariants,
  storeSelectorButtonVariants,
  storeSelectorDropdownVariants,
  storeSelectorIconVariants,
  storeSelectorItemVariants,
  storeSelectorTextVariants,
  storeSelectorVariants,
} from './store-selector.styles';
import type { TStoreSelectorConfig } from './store-selector.types';

export const StoreSelectorComponent = ({
  stores,
  activeStore,
  onStoreChange,
}: TStoreSelectorConfig) => {
  const { isOpen, handleToggle, handleStoreSelect } = useStoreSelector({
    onStoreChange,
  });

  return (
    <div className={storeSelectorVariants()}>
      <Button
        variant="outline"
        onClick={handleToggle}
        className={storeSelectorButtonVariants()}
      >
        <div className="flex items-center gap-2">
          <MapPin className={storeSelectorIconVariants({ color: 'primary' })} />
          <div className={storeSelectorTextVariants()}>
            <div className="text-sm text-[#1a2b4c]">{activeStore.name}</div>
            <div className="text-xs text-gray-500 truncate max-w-[140px]">
              {activeStore.address}
            </div>
          </div>
        </div>
        <ChevronDown
          className={storeSelectorIconVariants({ color: 'muted' })}
        />
      </Button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={handleToggle} />
          <div className={storeSelectorDropdownVariants()}>
            <div className="p-2">
              <div className="text-xs text-gray-500 mb-2 px-2">
                Selecionar Unidade Ativa
              </div>
              {stores.map((store) => (
                <div
                  key={store.id}
                  onClick={() => handleStoreSelect(store)}
                  className={storeSelectorItemVariants({
                    variant:
                      activeStore.id === store.id ? 'active' : 'inactive',
                  })}
                >
                  <div className="flex items-center gap-3 w-full">
                    <MapPin
                      className={storeSelectorIconVariants({
                        color: 'primary',
                      })}
                    />
                    <div className="flex-1">
                      <div className="text-sm">{store.name}</div>
                      <div className="text-xs text-gray-500">
                        {store.address}
                      </div>
                    </div>
                    {activeStore.id === store.id && (
                      <div className={storeSelectorActiveIndicatorVariants()} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
