"use client";

import React, { useEffect, useState } from "react";
import { SimulationQuestion } from "../schemas/studyTypes";
import { Edit3, CheckSquare, Eye, BookOpen } from "lucide-react";
import MarkdownContent from "./MarkdownContent";
import CodeBlock from "../../../components/ui/CodeBlock";
import SimulationNavigator from "./SimulationNavigator";
import ContentModal from "./ContentModal";

interface SimulationProps {
  questions: SimulationQuestion[];
  onSaveScore: (questionId: string, score: number) => void;
  savedScores: Record<string, number>;
  savedAnswers: Record<string, string>;
  onSaveAnswer: (questionId: string, answer: string) => void;
  eyebrow?: string;
}

/**
 * Simulado de questões teóricas/práticas. A resposta do usuário é persistida
 * por questão, com navegação livre, autoavaliação por checklist e acesso ao
 * conteúdo teórico do assunto via modal (sem perder a questão atual).
 */
export default function Simulation({
  questions,
  onSaveScore,
  savedScores,
  savedAnswers,
  onSaveAnswer,
  eyebrow = "Simulado de Questões Dissertativas",
}: SimulationProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [showGabarito, setShowGabarito] = useState(false);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [scoreSaved, setScoreSaved] = useState(false);
  const [modalModuleId, setModalModuleId] = useState<string | null>(null);

  const activeQuestion = questions[activeIdx];

  // Ao trocar de questão, recarrega o rascunho salvo e reseta a autoavaliação.
  useEffect(() => {
    setUserAnswer(savedAnswers[activeQuestion.id] ?? "");
    setShowGabarito(false);
    setCheckedItems([]);
    setScoreSaved(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIdx, activeQuestion.id]);

  const handleAnswerChange = (value: string) => {
    setUserAnswer(value);
    onSaveAnswer(activeQuestion.id, value);
  };

  const handleSelect = (idx: number) => {
    if (idx < 0 || idx > questions.length - 1) return;
    setActiveIdx(idx);
  };

  const handleToggleCheck = (itemId: string) => {
    setCheckedItems((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  const currentScore = activeQuestion.checklist.reduce(
    (acc, item) => acc + (checkedItems.includes(item.id) ? item.points : 0),
    0
  );

  const handleSaveScore = () => {
    onSaveScore(activeQuestion.id, currentScore);
    setScoreSaved(true);
  };

  const answeredFlags = questions.map((q) => Boolean(savedAnswers[q.id]?.trim()));

  return (
    <div className="max-w-3xl mx-auto bg-card border border-border rounded-xl p-6 glass-panel animate-slide-up">
      {/* Cabeçalho */}
      <div className="border-b border-border/50 pb-4 mb-5">
        <span className="text-xs font-semibold text-accent uppercase tracking-wider block">
          {eyebrow}
        </span>
        <h2 className="text-lg font-bold text-foreground mt-0.5">
          Questão {activeIdx + 1} de {questions.length}: {activeQuestion.title}
        </h2>
      </div>

      {/* Navegação entre questões */}
      <div className="mb-6">
        <SimulationNavigator
          total={questions.length}
          activeIdx={activeIdx}
          answeredFlags={answeredFlags}
          onSelect={handleSelect}
        />
      </div>

      {/* Enunciado + acesso ao conteúdo */}
      <div className="bg-muted/30 border border-border/50 rounded-lg p-5 mb-6">
        <MarkdownContent content={activeQuestion.statement} />
        {activeQuestion.codeContext && (
          <CodeBlock code={activeQuestion.codeContext} language="java" title="Código da questão" />
        )}
        {activeQuestion.moduleId && (
          <button
            onClick={() => setModalModuleId(activeQuestion.moduleId ?? null)}
            className="mt-4 flex items-center gap-1.5 px-3 py-2 bg-primary/10 hover:bg-primary/20 border border-primary/30 text-primary rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" /> Ver conteúdo do assunto
          </button>
        )}
      </div>

      {/* Rascunho da resposta (persistido por questão) */}
      <div className="flex flex-col gap-2 mb-6">
        <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
          <Edit3 className="w-3.5 h-3.5" /> Escreva sua resposta / rascunho (salvo automaticamente):
        </label>
        <textarea
          value={userAnswer}
          onChange={(e) => handleAnswerChange(e.target.value)}
          rows={5}
          placeholder="Rascunhe sua resposta aqui. O texto fica salvo mesmo ao trocar de questão..."
          className="w-full bg-secondary/30 border border-border text-foreground rounded-lg p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y transition-all duration-200"
        />
      </div>

      {/* Botão de revelar gabarito */}
      {!showGabarito && (
        <div className="flex justify-center mb-2">
          <button
            onClick={() => setShowGabarito(true)}
            className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/80 text-primary-foreground rounded-lg text-sm font-semibold transition-all duration-200 shadow-lg shadow-primary/15 cursor-pointer"
          >
            <Eye className="w-4 h-4" /> Revelar Resolução da Questão
          </button>
        </div>
      )}

      {/* Painel de gabarito e autoavaliação */}
      {showGabarito && (
        <div className="mt-8 pt-6 border-t border-border/50 space-y-6 animate-fade-in">
          <div>
            <h4 className="text-sm font-bold text-accent mb-2">Resolução da Questão (Gabarito):</h4>
            <div className="bg-accent/5 border border-accent/25 rounded-lg p-5">
              <MarkdownContent content={activeQuestion.expectedResponse} />
            </div>
          </div>

          <div className="bg-secondary/40 border border-border rounded-lg p-5">
            <h4 className="text-sm font-bold text-foreground mb-3 flex items-center gap-1.5">
              <CheckSquare className="w-4 h-4 text-primary" /> Checklist de Autoavaliação
            </h4>
            <p className="text-xs text-muted-foreground mb-4 leading-normal">
              Compare o seu rascunho com o gabarito e marque os critérios que você atingiu:
            </p>

            <div className="flex flex-col gap-3">
              {activeQuestion.checklist.map((item) => (
                <label
                  key={item.id}
                  className="flex items-start justify-between p-3 bg-muted/30 hover:bg-muted/60 border border-border/50 rounded-lg text-xs text-foreground cursor-pointer transition-colors duration-150"
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={checkedItems.includes(item.id)}
                      onChange={() => handleToggleCheck(item.id)}
                      className="rounded border-border text-primary focus:ring-primary/40 focus:ring-offset-background"
                    />
                    <span>{item.description}</span>
                  </div>
                  <span className="font-semibold text-accent shrink-0 ml-4">+{item.points} pts</span>
                </label>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between mt-6 pt-5 border-t border-border/40 gap-4">
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground">Nota autoavaliada:</span>
                <span className="text-3xl font-black text-foreground">
                  {currentScore} / {activeQuestion.totalPoints}
                </span>
              </div>
              <button
                onClick={handleSaveScore}
                className={`px-5 py-2.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  scoreSaved
                    ? "bg-accent/20 border border-accent/30 text-accent"
                    : "bg-primary hover:bg-primary/80 text-primary-foreground shadow-md shadow-primary/20"
                }`}
              >
                {scoreSaved ? "Nota Salva!" : "Confirmar Nota"}
              </button>
            </div>

            {savedScores[activeQuestion.id] !== undefined && (
              <p className="text-[10px] text-muted-foreground text-right mt-2">
                Última nota registrada: <strong className="text-foreground">{savedScores[activeQuestion.id]} pts</strong>
              </p>
            )}
          </div>
        </div>
      )}

      <ContentModal moduleId={modalModuleId} onClose={() => setModalModuleId(null)} />
    </div>
  );
}
