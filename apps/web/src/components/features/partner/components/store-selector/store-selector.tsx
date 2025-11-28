'use client';
import { useStoresQuery } from '@/hooks/use-query/use-stores-query/use-stores-query.hook';
import { usePartnerStore } from '@/store/partner';
import { Button } from '@repo/ui';
import { Check, ChevronDown, MapPin } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';

export function StoreSelector() {
  const { stores } = useStoresQuery();
  const activeStore = usePartnerStore((state) => state.activeStore);
  const setActiveStore = usePartnerStore((state) => state.setActiveStore);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 h-12 min-w-[180px] sm:min-w-[240px] justify-between border-gray-200 hover:border-gray-300 hover:bg-gray-50"
      >
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-indigo-100">
            <MapPin className="h-3.5 w-3.5 text-indigo-600" />
          </div>
          <div className="text-left hidden sm:block">
            <div className="text-sm text-gray-900">{activeStore.name}</div>
            <div className="text-xs text-gray-500 truncate max-w-[140px] sm:max-w-[160px]">
              {activeStore.address}
            </div>
          </div>
          <div className="text-left sm:hidden">
            <div className="text-sm text-gray-900 truncate max-w-[100px]">
              {activeStore.name}
            </div>
          </div>
        </div>
        <ChevronDown
          className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            ></div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-white border border-gray-200 rounded-lg shadow-xl z-20"
            >
              <div className="p-2">
                <div className="text-xs text-gray-500 px-3 py-2">
                  Selecionar Unidade
                </div>
                {stores.map((store) => (
                  <motion.div
                    key={store.id}
                    onClick={() => {
                      setActiveStore(store);
                      setIsOpen(false);
                    }}
                    whileHover={{ backgroundColor: '#f9fafb' }}
                    className={`
                      p-3 cursor-pointer rounded-lg transition-colors
                      ${activeStore.id === store.id ? 'bg-indigo-50' : ''}
                    `}
                  >
                    <div className="flex items-center gap-3 w-full">
                      <div
                        className={`p-1.5 rounded-md ${activeStore.id === store.id ? 'bg-indigo-100' : 'bg-gray-100'}`}
                      >
                        <MapPin
                          className={`h-3.5 w-3.5 ${activeStore.id === store.id ? 'text-indigo-600' : 'text-gray-600'}`}
                        />
                      </div>
                      <div className="flex-1">
                        <div
                          className={`text-sm ${activeStore.id === store.id ? 'text-gray-900' : 'text-gray-700'}`}
                        >
                          {store.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {store.address}
                        </div>
                      </div>
                      {activeStore.id === store.id && (
                        <Check className="w-4 h-4 text-indigo-600" />
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
