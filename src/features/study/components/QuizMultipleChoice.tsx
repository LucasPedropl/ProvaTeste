"use client";

import React from "react";
import { QuizQuestion } from "../schemas/studyTypes";
import { CheckCircle2, XCircle } from "lucide-react";
import QuizQuestionStem from "./QuizQuestionStem";

interface QuizMultipleChoiceProps {
  question: QuizQuestion;
  selectedOptId: string | null;
  isSubmitted: boolean;
  onSelect: (optId: string) => void;
  onSubmit: () => void;
}

/**
 * Renderiza uma questão objetiva (múltipla escolha) com feedback visual
 * imediato e a justificativa da alternativa escolhida após a confirmação.
 */
export default function QuizMultipleChoice({
  question,
  selectedOptId,
  isSubmitted,
  onSelect,
  onSubmit,
}: QuizMultipleChoiceProps) {
  const options = question.options ?? [];
  const selectedOptionObj = options.find((o) => o.id === selectedOptId);

  return (
    <div>
      <QuizQuestionStem question={question} />

      <div className="flex flex-col gap-3">
        {options.map((opt) => {
          let optBg = "bg-secondary/40 border-border hover:bg-muted";
          let optText = "text-muted-foreground";

          if (selectedOptId === opt.id) {
            optBg = "bg-primary/20 border-primary text-foreground";
            optText = "text-foreground";
          }

          if (isSubmitted) {
            if (opt.isCorrect) {
              optBg = "bg-accent/10 border-accent text-foreground";
              optText = "text-foreground font-semibold";
            } else if (selectedOptId === opt.id) {
              optBg = "bg-red-500/10 border-red-500/50 text-foreground";
            } else {
              optBg = "bg-secondary/20 border-border/30 opacity-60";
            }
          }

          return (
            <button
              key={opt.id}
              onClick={() => !isSubmitted && onSelect(opt.id)}
              disabled={isSubmitted}
              className={`w-full flex items-center justify-between px-5 py-4 border rounded-lg text-sm text-left transition-all duration-200 ${optBg} ${
                !isSubmitted ? "cursor-pointer" : "cursor-default"
              }`}
            >
              <span className={optText}>{opt.text}</span>
              {isSubmitted && opt.isCorrect && <CheckCircle2 className="w-5 h-5 text-accent shrink-0 ml-2" />}
              {isSubmitted && !opt.isCorrect && selectedOptId === opt.id && (
                <XCircle className="w-5 h-5 text-red-500 shrink-0 ml-2" />
              )}
            </button>
          );
        })}
      </div>

      {isSubmitted && selectedOptionObj && (
        <div
          className={`mt-6 p-4 rounded-lg border text-sm leading-relaxed ${
            selectedOptionObj.isCorrect
              ? "bg-accent/5 border-accent/20 text-accent/90"
              : "bg-red-500/5 border-red-500/30 text-red-600"
          }`}
        >
          <div className="font-bold flex items-center gap-1.5 mb-1">
            {selectedOptionObj.isCorrect ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-accent" /> Resposta Correta!
              </>
            ) : (
              <>
                <XCircle className="w-4 h-4 text-red-500" /> Resposta Incorreta!
              </>
            )}
          </div>
          <p className="text-xs text-muted-foreground">{selectedOptionObj.explanation}</p>
        </div>
      )}

      {!isSubmitted && (
        <div className="flex justify-end mt-8 pt-4 border-t border-border/50">
          <button
            onClick={onSubmit}
            disabled={!selectedOptId}
            className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
              selectedOptId
                ? "bg-primary hover:bg-primary/80 text-primary-foreground shadow-lg shadow-primary/20 cursor-pointer"
                : "bg-muted text-muted-foreground border border-border/30 cursor-not-allowed"
            }`}
          >
            Responder
          </button>
        </div>
      )}
    </div>
  );
}
