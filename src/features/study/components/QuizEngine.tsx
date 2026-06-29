"use client";

import React, { useState, useEffect, useMemo } from "react";
import { QuizQuestion } from "../schemas/studyTypes";
import { HelpCircle, Trophy, BookOpen, RotateCcw, Flag, ChevronLeft, ChevronRight } from "lucide-react";
import QuizMultipleChoice from "./QuizMultipleChoice";
import QuizOpenQuestion from "./QuizOpenQuestion";
import SimulationNavigator from "./SimulationNavigator";
import ContentModal from "./ContentModal";
import { getModuleById } from "../services/contentData";

interface QuizEngineProps {
  questions: QuizQuestion[];
  moduleId: string;
  moduleTitle: string;
  onQuizFinished: (score: number) => void;
  savedScore: number | null;
}

const TYPE_LABEL: Record<string, string> = {
  "multiple-choice": "Múltipla escolha",
  open: "Dissertativa",
  drawing: "Desenho (caderno)",
};

/**
 * Quiz navegável com tipos mistos de questão (múltipla escolha, dissertativa e
 * desenho). Permite alternar livremente entre as questões, preservando o estado
 * de cada uma, e consultar a teoria do tópico sem perder o progresso.
 */
export default function QuizEngine({
  questions,
  moduleId,
  moduleTitle,
  onQuizFinished,
  savedScore,
}: QuizEngineProps) {
  const moduleQuestions = useMemo(
    () => questions.filter((q) => q.moduleId === moduleId),
    [questions, moduleId]
  );

  const [activeIdx, setActiveIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [finished, setFinished] = useState(false);
  const [showContent, setShowContent] = useState(false);

  // Reinicia tudo ao trocar de módulo.
  useEffect(() => {
    setActiveIdx(0);
    setSelectedOpt({});
    setSubmitted({});
    setDrafts({});
    setRevealed({});
    setFinished(false);
    setShowContent(false);
  }, [moduleId]);

  const hasModuleContent = Boolean(getModuleById(moduleId));

  const mcQuestions = moduleQuestions.filter((q) => (q.type ?? "multiple-choice") === "multiple-choice");
  const correctCount = mcQuestions.filter((q) => {
    const opt = (q.options ?? []).find((o) => o.id === selectedOpt[q.id]);
    return submitted[q.id] && opt?.isCorrect;
  }).length;
  const finalScore = mcQuestions.length > 0 ? Math.round((correctCount / mcQuestions.length) * 100) : 0;

  if (moduleQuestions.length === 0) {
    return (
      <div className="bg-card border border-border rounded-xl p-8 text-center glass-panel">
        <HelpCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-bold text-foreground">Nenhuma questão disponível</h3>
        <p className="text-muted-foreground text-sm mt-1">Este módulo ainda não possui questões cadastradas.</p>
      </div>
    );
  }

  const activeQuestion = moduleQuestions[activeIdx];
  const activeType = activeQuestion.type ?? "multiple-choice";
  const isFirst = activeIdx === 0;
  const isLast = activeIdx === moduleQuestions.length - 1;

  const goToPrev = () => setActiveIdx((i) => Math.max(0, i - 1));
  const goToNext = () => setActiveIdx((i) => Math.min(moduleQuestions.length - 1, i + 1));

  const answeredFlags = moduleQuestions.map((q) => {
    const t = q.type ?? "multiple-choice";
    if (t === "multiple-choice") return Boolean(submitted[q.id]);
    return Boolean(revealed[q.id]) || Boolean(drafts[q.id]?.trim());
  });

  const handleReset = () => {
    setActiveIdx(0);
    setSelectedOpt({});
    setSubmitted({});
    setDrafts({});
    setRevealed({});
    setFinished(false);
  };

  const handleFinish = () => {
    setFinished(true);
    if (mcQuestions.length > 0) onQuizFinished(finalScore);
  };

  if (finished) {
    const passed = finalScore >= 70;
    return (
      <div className="max-w-xl mx-auto bg-card border border-border rounded-xl p-8 text-center glass-panel animate-scale-in">
        <Trophy className={`w-16 h-16 mx-auto mb-4 ${passed ? "text-accent" : "text-primary"}`} />
        <h2 className="text-2xl font-bold text-foreground">Quiz finalizado!</h2>
        <p className="text-muted-foreground text-sm mt-1">{moduleTitle}</p>

        <div className="my-8 py-6 px-4 bg-muted/40 border border-border/50 rounded-lg max-w-sm mx-auto">
          <span className="text-sm text-muted-foreground">Acertos nas objetivas</span>
          <div className="text-5xl font-black text-foreground mt-2">{finalScore}%</div>
          <span className="text-xs text-muted-foreground block mt-2">
            {correctCount} de {mcQuestions.length} questões de múltipla escolha
          </span>
          <span className={`text-xs font-bold uppercase tracking-wider block mt-3 ${passed ? "text-accent" : "text-primary"}`}>
            {mcQuestions.length === 0 ? "Sem questões objetivas neste módulo" : passed ? "Aprovado (≥ 70%)" : "Abaixo de 70%"}
          </span>
        </div>

        {savedScore !== null && (
          <p className="text-xs text-muted-foreground mb-6">
            Maior pontuação gravada anteriormente: <strong className="text-foreground">{savedScore}%</strong>
          </p>
        )}

        <button
          onClick={handleReset}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-secondary text-foreground hover:bg-muted border border-border rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" /> Refazer quiz
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-card border border-border rounded-xl p-6 glass-panel animate-slide-up">
      {/* Cabeçalho */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/50 pb-3.5 mb-5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">
            Questão {activeIdx + 1} de {moduleQuestions.length}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded bg-secondary border border-border text-muted-foreground">
            {TYPE_LABEL[activeType]}
          </span>
        </div>
        <span className="text-xs text-muted-foreground whitespace-nowrap">
          Acertos: {correctCount} / {mcQuestions.length}
        </span>
      </div>

      {/* Navegação livre entre questões */}
      <div className="mb-6">
        <SimulationNavigator
          total={moduleQuestions.length}
          activeIdx={activeIdx}
          answeredFlags={answeredFlags}
          onSelect={(idx) => idx >= 0 && idx < moduleQuestions.length && setActiveIdx(idx)}
        />
      </div>

      {/* Questão ativa conforme o tipo */}
      {activeType === "multiple-choice" ? (
        <QuizMultipleChoice
          question={activeQuestion}
          selectedOptId={selectedOpt[activeQuestion.id] ?? null}
          isSubmitted={Boolean(submitted[activeQuestion.id])}
          onSelect={(optId) => setSelectedOpt((prev) => ({ ...prev, [activeQuestion.id]: optId }))}
          onSubmit={() => setSubmitted((prev) => ({ ...prev, [activeQuestion.id]: true }))}
        />
      ) : (
        <QuizOpenQuestion
          question={activeQuestion}
          draft={drafts[activeQuestion.id] ?? ""}
          revealed={Boolean(revealed[activeQuestion.id])}
          onDraftChange={(value) => setDrafts((prev) => ({ ...prev, [activeQuestion.id]: value }))}
          onReveal={() => setRevealed((prev) => ({ ...prev, [activeQuestion.id]: true }))}
        />
      )}

      {/* Rodapé: navegação entre questões */}
      <div className="flex items-center justify-between gap-2 mt-8 pt-5 border-t border-border/40">
        <button
          onClick={goToPrev}
          disabled={isFirst}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-secondary text-foreground hover:bg-muted border border-border rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4" /> Anterior
        </button>

        {hasModuleContent && (
          <button
            onClick={() => setShowContent(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-secondary hover:bg-muted border border-border rounded-lg text-sm font-semibold text-foreground transition-colors duration-200 cursor-pointer"
            title="Consultar a teoria deste tópico sem perder o progresso do quiz"
          >
            <BookOpen className="w-4 h-4 text-accent" /> Conteúdo
          </button>
        )}

        {isLast ? (
          <button
            onClick={handleFinish}
            className="flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent/80 text-accent-foreground rounded-lg text-sm font-semibold transition-all duration-200 shadow-lg shadow-accent/15 cursor-pointer"
          >
            <Flag className="w-4 h-4" /> Finalizar e ver desempenho
          </button>
        ) : (
          <button
            onClick={goToNext}
            className="flex items-center gap-1.5 px-5 py-2.5 bg-primary hover:bg-primary/85 text-primary-foreground rounded-lg text-sm font-semibold transition-all duration-200 shadow-lg shadow-primary/15 cursor-pointer"
          >
            Próxima <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {showContent && <ContentModal moduleId={moduleId} onClose={() => setShowContent(false)} />}
    </div>
  );
}
