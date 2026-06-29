"use client";

import React from "react";
import { QuizQuestion } from "../schemas/studyTypes";
import { Edit3, Eye, PencilRuler, MessageSquareText } from "lucide-react";
import QuizQuestionStem from "./QuizQuestionStem";
import MarkdownContent from "./MarkdownContent";
import MermaidDiagram from "./MermaidDiagram";

interface QuizOpenQuestionProps {
  question: QuizQuestion;
  draft: string;
  revealed: boolean;
  onDraftChange: (value: string) => void;
  onReveal: () => void;
}

/**
 * Renderiza questões dissertativas (open) e de desenho (drawing). O usuário
 * pode rascunhar a resposta (ou resolver no caderno) e revelar o gabarito para
 * conferência — incluindo um diagrama-gabarito quando for questão de desenho.
 */
export default function QuizOpenQuestion({
  question,
  draft,
  revealed,
  onDraftChange,
  onReveal,
}: QuizOpenQuestionProps) {
  const isDrawing = question.type === "drawing";

  return (
    <div>
      <QuizQuestionStem question={question} />

      <div
        className={`flex gap-3 rounded-lg border px-4 py-3 mb-5 text-sm ${
          isDrawing
            ? "bg-amber-500/10 border-amber-500/40 text-amber-600"
            : "bg-primary/10 border-primary/40 text-primary"
        }`}
      >
        {isDrawing ? (
          <PencilRuler className="w-5 h-5 shrink-0 mt-0.5" />
        ) : (
          <MessageSquareText className="w-5 h-5 shrink-0 mt-0.5" />
        )}
        <div className="text-foreground/90">
          <span className="block font-bold mb-0.5">
            {isDrawing ? "Questão de desenho (resolva no caderno)" : "Questão dissertativa"}
          </span>
          {question.answerHint ??
            (isDrawing
              ? "Desenhe o grafo/tabela pedido no papel e compare com o gabarito ao final."
              : "Estruture sua resposta e depois confira com o gabarito.")}
        </div>
      </div>

      <div className="flex flex-col gap-2 mb-6">
        <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
          <Edit3 className="w-3.5 h-3.5" /> Rascunho da resposta (opcional, mantido ao navegar):
        </label>
        <textarea
          value={draft}
          onChange={(e) => onDraftChange(e.target.value)}
          rows={isDrawing ? 3 : 5}
          placeholder={
            isDrawing
              ? "Anote aqui os nós/células que você desenhou no caderno, se quiser..."
              : "Escreva sua resposta aqui..."
          }
          className="w-full bg-secondary/30 border border-border text-foreground rounded-lg p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y transition-all duration-200"
        />
      </div>

      {!revealed && (
        <div className="flex justify-center">
          <button
            onClick={onReveal}
            className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/80 text-primary-foreground rounded-lg text-sm font-semibold transition-all duration-200 shadow-lg shadow-primary/15 cursor-pointer"
          >
            <Eye className="w-4 h-4" /> Revelar gabarito
          </button>
        </div>
      )}

      {revealed && (
        <div className="mt-6 pt-6 border-t border-border/50 space-y-5 animate-fade-in">
          <h4 className="text-sm font-bold text-accent">Gabarito / Resolução esperada:</h4>
          <div className="bg-accent/5 border border-accent/25 rounded-lg p-5">
            {question.expectedAnswer && <MarkdownContent content={question.expectedAnswer} />}
            {question.expectedDiagramMermaid && (
              <MermaidDiagram
                chart={question.expectedDiagramMermaid}
                caption={question.expectedDiagramCaption ?? "Diagrama esperado"}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
