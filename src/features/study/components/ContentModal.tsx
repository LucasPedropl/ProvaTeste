"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { X, BookOpen, ExternalLink } from "lucide-react";
import { getModuleById } from "../services/contentData";
import ModuleContent from "./ModuleContent";

interface ContentModalProps {
  moduleId: string | null;
  onClose: () => void;
}

/**
 * Modal central que exibe o conteúdo teórico completo de um tópico, sem tirar
 * o usuário da tela atual (o estado da questão é preservado). Fecha com ESC,
 * clique no backdrop ou no botão de fechar.
 */
export default function ContentModal({ moduleId, onClose }: ContentModalProps) {
  const studyModule = moduleId ? getModuleById(moduleId) : undefined;
  const isOpen = Boolean(studyModule);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !studyModule) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-3xl max-h-[88vh] flex flex-col bg-background border border-border rounded-2xl shadow-2xl overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho fixo do modal */}
        <div className="flex items-start justify-between gap-4 border-b border-border/60 px-6 py-4 bg-card/60 backdrop-blur">
          <div className="min-w-0">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-accent uppercase tracking-wide">
              <BookOpen className="w-3.5 h-3.5" /> Conteúdo do assunto
            </span>
            <h2 className="text-lg md:text-xl font-bold text-foreground mt-1 truncate">
              {studyModule.title}
            </h2>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href={`/topico/${studyModule.id}`}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 bg-secondary hover:bg-muted border border-border rounded-lg text-xs font-semibold text-foreground transition-colors duration-200"
            >
              <ExternalLink className="w-3.5 h-3.5" /> Abrir página
            </Link>
            <button
              onClick={onClose}
              aria-label="Fechar conteúdo"
              className="flex items-center justify-center w-9 h-9 rounded-lg bg-secondary hover:bg-muted border border-border text-muted-foreground hover:text-foreground transition-colors duration-200 cursor-pointer"
            >
              <X className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>

        {/* Conteúdo rolável */}
        <div className="overflow-y-auto px-6 py-6">
          <p className="text-muted-foreground leading-relaxed mb-2">{studyModule.description}</p>
          <ModuleContent studyModule={studyModule} />
        </div>
      </div>
    </div>
  );
}
