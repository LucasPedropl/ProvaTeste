"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock, GraduationCap, ListTree, Zap } from "lucide-react";
import { StudyModule } from "../schemas/studyTypes";
import ModuleContent from "./ModuleContent";
import TopicQuickNav from "./TopicQuickNav";
import ThemeToggle from "../../../components/ui/ThemeToggle";
import { useStudyProgress } from "../hooks/useStudyProgress";
import { studyModules } from "../services/contentData";

interface TopicReaderProps {
  studyModule: StudyModule;
}

/**
 * Página dedicada de leitura de um tópico.
 * Exibe TODAS as seções do módulo de uma só vez, com interface mínima
 * (apenas barra de topo com navegação e alternância de tema).
 */
export default function TopicReader({ studyModule }: TopicReaderProps) {
  const { markModuleAsRead } = useStudyProgress();

  // Marca o tópico como lido automaticamente ao abrir a página dedicada.
  useEffect(() => {
    markModuleAsRead(studyModule.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studyModule.id]);

  const currentIndex = studyModules.findIndex((m) => m.id === studyModule.id);
  const previousModule = currentIndex > 0 ? studyModules[currentIndex - 1] : null;
  const nextModule =
    currentIndex >= 0 && currentIndex < studyModules.length - 1
      ? studyModules[currentIndex + 1]
      : null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Barra de topo com navegação rápida entre conteúdos */}
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/85 backdrop-blur-md">
        <div className="max-w-3xl mx-auto w-full flex flex-col gap-2.5 px-3 sm:px-4 py-2.5 sm:py-3">
          <div className="flex items-center justify-between gap-3">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors duration-200 shrink-0"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Voltar aos tópicos</span>
              <span className="sm:hidden">Voltar</span>
            </Link>
            <ThemeToggle compact />
          </div>
          <TopicQuickNav currentId={studyModule.id} />
        </div>
      </header>

      {/* Conteúdo dedicado ao tópico */}
      <article className="max-w-2xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-10 animate-fade-in">
        <div className="flex items-center gap-2 text-xs font-semibold text-accent uppercase tracking-widest mb-3">
          <Clock className="w-3.5 h-3.5" /> {studyModule.estimatedMinutes} min de leitura
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight">
          {studyModule.title}
        </h1>
        <p className="text-muted-foreground mt-4 text-base sm:text-lg leading-relaxed">
          {studyModule.description}
        </p>

        {/* Resumo rápido (TL;DR) */}
        {studyModule.tldr && (
          <div className="mt-6 flex gap-3 rounded-xl border border-accent/30 bg-accent/10 px-4 py-3.5">
            <Zap className="w-5 h-5 shrink-0 mt-0.5 text-accent" />
            <div>
              <span className="block text-xs font-bold text-accent uppercase tracking-wide mb-1">
                Resumo rápido
              </span>
              <p className="text-foreground/90 leading-relaxed">{studyModule.tldr}</p>
            </div>
          </div>
        )}

        {/* Índice navegável do tópico */}
        {studyModule.sections.length > 1 && (
          <nav className="mt-8 rounded-xl border border-border bg-card/50 p-4 glass-panel">
            <span className="flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-wide mb-3">
              <ListTree className="w-3.5 h-3.5" /> Neste tópico
            </span>
            <ol className="space-y-1.5">
              {studyModule.sections.map((section, idx) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="flex items-baseline gap-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    <span className="font-mono text-xs text-accent">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="mt-12">
          <ModuleContent studyModule={studyModule} showTldr={false} />
        </div>

        {/* Rodapé de navegação entre tópicos */}
        <footer className="mt-16 pt-8 border-t border-border/60 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {previousModule ? (
            <Link
              href={`/topico/${previousModule.id}`}
              className="flex items-center justify-center gap-2 px-5 py-3 bg-secondary/60 hover:bg-secondary border border-border rounded-lg text-sm font-semibold text-foreground transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4" /> Tópico anterior
            </Link>
          ) : (
            <span className="flex items-center justify-center gap-2 px-5 py-3 border border-border/40 rounded-lg text-sm font-semibold text-muted-foreground/40 cursor-not-allowed select-none">
              <ArrowLeft className="w-4 h-4" /> Tópico anterior
            </span>
          )}

          <Link
            href={`/?quiz=${studyModule.id}`}
            className="flex items-center justify-center gap-2 px-5 py-3 bg-accent hover:bg-accent/85 text-accent-foreground rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm"
          >
            <GraduationCap className="w-4 h-4" /> Quiz do tópico
          </Link>

          {nextModule ? (
            <Link
              href={`/topico/${nextModule.id}`}
              className="flex items-center justify-center gap-2 px-5 py-3 bg-primary hover:bg-primary/85 text-primary-foreground rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm"
            >
              Próximo tópico <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <span className="flex items-center justify-center gap-2 px-5 py-3 border border-border/40 rounded-lg text-sm font-semibold text-muted-foreground/40 cursor-not-allowed select-none">
              Próximo tópico <ArrowRight className="w-4 h-4" />
            </span>
          )}
        </footer>
      </article>
    </div>
  );
}
