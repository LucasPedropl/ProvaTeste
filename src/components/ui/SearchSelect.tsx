"use client";

import React, { useState, useRef, useEffect } from "react";
import { Search, ChevronDown, Check } from "lucide-react";

interface SearchSelectOption {
  value: string;
  label: string;
  description?: string;
}

interface SearchSelectProps {
  options: SearchSelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  className?: string;
}

/**
 * Componente de seleção customizado com busca interna integrada.
 * Atende estritamente à diretriz de inputs select pesquisáveis.
 */
export default function SearchSelect({
  options,
  value,
  onChange,
  placeholder = "Selecione uma opção...",
  searchPlaceholder = "Pesquisar...",
  className = "",
}: SearchSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Fecha o dropdown se clicar fora do componente
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Foca no input de busca ao abrir o dropdown
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const selectedOption = options.find((opt) => opt.value === value);

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (opt.description && opt.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className || "max-w-md"}`}>
      {/* Botão de Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-secondary/80 border border-border text-foreground rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-left transition-all duration-200 cursor-pointer"
      >
        <span className={selectedOption ? "text-foreground" : "text-muted-foreground"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${isOpen ? "transform rotate-180" : ""}`} />
      </button>

      {/* Painel Suspenso */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-card rounded-lg shadow-xl border border-border animate-scale-in overflow-hidden">
          {/* Caixa de Busca */}
          <div className="flex items-center px-3 py-2 border-b border-border bg-muted/50">
            <Search className="w-4 h-4 text-muted-foreground mr-2 shrink-0" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full bg-transparent border-0 py-1 text-foreground focus:outline-none focus:ring-0 text-sm"
            />
          </div>

          {/* Lista de Opções */}
          <ul className="max-h-60 overflow-y-auto py-1">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => (
                <li key={opt.value}>
                  <button
                    type="button"
                    onClick={() => handleSelect(opt.value)}
                    className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-primary/20 text-left transition-colors duration-150 cursor-pointer"
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-foreground">{opt.label}</span>
                      {opt.description && (
                        <span className="text-xs text-muted-foreground mt-0.5">{opt.description}</span>
                      )}
                    </div>
                    {value === opt.value && (
                      <Check className="w-4 h-4 text-accent" />
                    )}
                  </button>
                </li>
              ))
            ) : (
              <li className="px-4 py-3 text-sm text-muted-foreground text-center">
                Nenhum resultado encontrado
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
