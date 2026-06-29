"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SimulationNavigatorProps {
  total: number;
  activeIdx: number;
  answeredFlags: boolean[];
  onSelect: (idx: number) => void;
}

/**
 * Barra de navegação do simulado: botões "Anterior/Próxima" e a grade de
 * números das questões (com quebra de linha para não estourar a área).
 * Questões já respondidas recebem um destaque visual.
 */
export default function SimulationNavigator({
  total,
  activeIdx,
  answeredFlags,
  onSelect,
}: SimulationNavigatorProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={() => onSelect(activeIdx - 1)}
          disabled={activeIdx === 0}
          className="flex items-center gap-1.5 px-4 py-2 bg-secondary hover:bg-muted border border-border rounded-lg text-xs font-semibold text-foreground transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4" /> Anterior
        </button>
        <span className="text-xs font-semibold text-muted-foreground">
          {activeIdx + 1} / {total}
        </span>
        <button
          onClick={() => onSelect(activeIdx + 1)}
          disabled={activeIdx === total - 1}
          className="flex items-center gap-1.5 px-4 py-2 bg-secondary hover:bg-muted border border-border rounded-lg text-xs font-semibold text-foreground transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Próxima <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto">
        {Array.from({ length: total }).map((_, idx) => {
          const isActive = idx === activeIdx;
          const isAnswered = answeredFlags[idx];
          return (
            <button
              key={idx}
              onClick={() => onSelect(idx)}
              title={isAnswered ? "Respondida" : "Sem resposta"}
              className={`relative w-8 h-8 text-xs font-bold rounded-md border transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-primary border-primary text-primary-foreground shadow-md shadow-primary/20"
                  : isAnswered
                    ? "bg-accent/15 border-accent/40 text-accent hover:bg-accent/25"
                    : "bg-secondary border-border text-muted-foreground hover:bg-muted"
              }`}
            >
              {idx + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}
