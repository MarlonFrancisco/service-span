import { useState } from "react";
import { ChevronDown, MapPin } from "lucide-react";
import { Button } from "./ui/button";

interface Store {
  id: string;
  name: string;
  address: string;
}

interface StoreSelectorProps {
  stores: Store[];
  activeStore: Store;
  onStoreChange: (store: Store) => void;
}

export function StoreSelector({ stores, activeStore, onStoreChange }: StoreSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <Button 
        variant="outline" 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 min-w-[200px] justify-between border-[#1a2b4c]/20 hover:border-[#20b2aa]"
      >
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-[#20b2aa]" />
          <div className="text-left">
            <div className="text-sm text-[#1a2b4c]">{activeStore.name}</div>
            <div className="text-xs text-gray-500 truncate max-w-[140px]">
              {activeStore.address}
            </div>
          </div>
        </div>
        <ChevronDown className="h-4 w-4 text-gray-400" />
      </Button>
      
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
            <div className="p-2">
              <div className="text-xs text-gray-500 mb-2 px-2">Selecionar Unidade Ativa</div>
              {stores.map((store) => (
                <div
                  key={store.id}
                  onClick={() => {
                    onStoreChange(store);
                    setIsOpen(false);
                  }}
                  className={`
                    p-3 cursor-pointer rounded-md transition-colors
                    ${activeStore.id === store.id ? 'bg-[#20b2aa]/10 text-[#1a2b4c]' : 'hover:bg-gray-50'}
                  `}
                >
                  <div className="flex items-center gap-3 w-full">
                    <MapPin className="h-4 w-4 text-[#20b2aa]" />
                    <div className="flex-1">
                      <div className="text-sm">{store.name}</div>
                      <div className="text-xs text-gray-500">{store.address}</div>
                    </div>
                    {activeStore.id === store.id && (
                      <div className="w-2 h-2 bg-[#20b2aa] rounded-full"></div>
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
}