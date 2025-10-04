import { useState } from "react";
import { Button } from "./ui/button";

export function SearchToggle() {
  const [activeTab, setActiveTab] = useState<"empresas" | "servicos">("servicos");

  return (
    <div className="flex items-center bg-gray-100 rounded-full p-1 mb-6">
      <Button
        variant={activeTab === "servicos" ? "default" : "ghost"}
        className={`rounded-full px-8 py-2 transition-all ${
          activeTab === "servicos"
            ? "bg-black text-white shadow-sm"
            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
        }`}
        onClick={() => setActiveTab("servicos")}
      >
        Serviços
      </Button>
      <Button
        variant={activeTab === "empresas" ? "default" : "ghost"}
        className={`rounded-full px-8 py-2 transition-all ${
          activeTab === "empresas"
            ? "bg-black text-white shadow-sm"
            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
        }`}
        onClick={() => setActiveTab("empresas")}
      >
        Empresas
      </Button>
    </div>
  );
}