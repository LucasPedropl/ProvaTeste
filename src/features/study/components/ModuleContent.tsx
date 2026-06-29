"use client";

import React from "react";
import { Zap, BookMarked } from "lucide-react";
import { StudyModule } from "../schemas/studyTypes";
import MarkdownContent from "./MarkdownContent";
import MermaidDiagram from "./MermaidDiagram";
import CodeBlock from "../../../components/ui/CodeBlock";

interface ModuleContentProps {
  studyModule: StudyModule;
  showTldr?: boolean;
}

/**
 * Renderiza o corpo de um módulo de estudo: resumo (TL;DR), seções
 * (texto, código e diagramas) e glossário. Reutilizado na página dedicada
 * de leitura e no modal de conteúdo do simulado.
 */
export default function ModuleContent({ studyModule, showTldr = true }: ModuleContentProps) {
  return (
    <>
      {showTldr && studyModule.tldr && (
        <div className="mb-8 flex gap-3 rounded-xl border border-accent/30 bg-accent/10 px-4 py-3.5">
          <Zap className="w-5 h-5 shrink-0 mt-0.5 text-accent" />
          <div>
            <span className="block text-xs font-bold text-accent uppercase tracking-wide mb-1">
              Resumo rápido
            </span>
            <p className="text-foreground/90 leading-relaxed">{studyModule.tldr}</p>
          </div>
        </div>
      )}

      <div className="space-y-14">
        {studyModule.sections.map((section, idx) => (
          <section key={section.id} id={section.id} className="scroll-mt-24">
            <div className="border-b border-border/60 pb-3 mb-6">
              {section.subtitle && (
                <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                  {section.subtitle}
                </span>
              )}
              <h2 className="text-2xl md:text-3xl font-bold mt-1.5 flex items-baseline gap-3 tracking-tight">
                <span className="text-base font-mono text-muted-foreground">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                {section.title}
              </h2>
            </div>

            <MarkdownContent content={section.contentMarkdown} />

            {section.visualDiagramMermaid && (
              <MermaidDiagram
                chart={section.visualDiagramMermaid}
                caption={`Diagrama: ${section.title}`}
              />
            )}

            {section.codeExample && (
              <CodeBlock
                title="Exemplo Prático"
                language={section.codeExample.language}
                code={section.codeExample.code}
                explanation={section.codeExample.explanation}
              />
            )}
          </section>
        ))}
      </div>

      {studyModule.keyTerms && studyModule.keyTerms.length > 0 && (
        <section className="mt-14 rounded-xl border border-border bg-card/50 p-5 glass-panel">
          <h2 className="flex items-center gap-2 text-lg font-bold text-foreground mb-4">
            <BookMarked className="w-5 h-5 text-primary" /> Glossário do tópico
          </h2>
          <dl className="space-y-3">
            {studyModule.keyTerms.map((kt) => (
              <div key={kt.term} className="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-1 sm:gap-3">
                <dt className="font-semibold text-foreground text-sm">{kt.term}</dt>
                <dd className="text-sm text-muted-foreground leading-relaxed">{kt.definition}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}
    </>
  );
}
