"use client";

import React from "react";
import { Code } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  explanation?: string;
}

/**
 * Bloco de código reutilizável com cabeçalho (título + linguagem) e explicação
 * opcional. Centraliza o estilo de "Exemplo Prático" usado em todo o sistema.
 */
export default function CodeBlock({
  code,
  language,
  title = "Código",
  explanation,
}: CodeBlockProps) {
  return (
    <div className="my-4 rounded-lg overflow-hidden border border-slate-800 bg-slate-950 font-mono text-xs shadow-md">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800 text-slate-400">
        <span className="flex items-center gap-1.5 font-medium">
          <Code className="w-3.5 h-3.5 text-accent" /> {title}
        </span>
        {language && (
          <span className="uppercase text-[10px] tracking-wider px-1.5 py-0.5 bg-slate-800 rounded font-semibold text-accent">
            {language}
          </span>
        )}
      </div>
      <pre className="p-4 overflow-x-auto text-slate-200">
        <code>{code}</code>
      </pre>
      {explanation && (
        <div className="p-3.5 bg-slate-900/60 border-t border-slate-800 text-slate-400 text-xs leading-normal italic">
          <strong className="text-slate-300">Explicação:</strong> {explanation}
        </div>
      )}
    </div>
  );
}
