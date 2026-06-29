"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { studyModules, getModuleById } from "../features/study/services/contentData";
import { quizQuestions, simulationQuestions } from "../features/study/services/quizData";
import { prova2ExamQuestions } from "../features/study/services/exam";
import { useStudyProgress } from "../features/study/hooks/useStudyProgress";
import SearchSelect from "../components/ui/SearchSelect";
import ProgressBar from "../components/ui/ProgressBar";
import ThemeToggle from "../components/ui/ThemeToggle";
import QuizEngine from "../features/study/components/QuizEngine";
import Simulation from "../features/study/components/Simulation";
import { LayoutDashboard, GraduationCap, FileText, CheckCircle, RefreshCcw, ArrowRight, ClipboardList } from "lucide-react";

type Tab = "dashboard" | "quiz" | "simulation" | "exam";

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [selectedModuleId, setSelectedModuleId] = useState<string>("fundamentals");

  // Permite abrir o quiz de um tópico específico via query param (?quiz=<id>),
  // usado pelo botão "Quiz do tópico" na página dedicada de leitura.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const quizModuleId = params.get("quiz");
    if (quizModuleId && getModuleById(quizModuleId)) {
      setSelectedModuleId(quizModuleId);
      setActiveTab("quiz");
    }
  }, []);

  const {
    progress,
    isLoaded,
    saveQuizScore,
    saveSimulationScore,
    saveSimulationAnswer,
    resetProgress,
  } = useStudyProgress();

  if (!isLoaded) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-background text-foreground min-h-screen">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm text-muted-foreground mt-4 font-medium animate-pulse">Carregando Simulador...</p>
      </div>
    );
  }

  // --- LÓGICA DE ESTATÍSTICAS ---
  const totalModules = studyModules.length;
  const readModulesCount = Object.values(progress.moduleDetails).filter((m) => m.isRead).length;
  const completedModulesCount = Object.values(progress.moduleDetails).filter((m) => m.isCompleted).length;

  const quizScores = Object.values(progress.moduleDetails)
    .map((m) => m.quizScore)
    .filter((s): s is number => s !== null);
  const averageQuizScore = quizScores.length > 0 ? Math.round(quizScores.reduce((a, b) => a + b, 0) / quizScores.length) : 0;

  // Progresso total é a média de conclusão da leitura (50%) e quizzes aprovados (50%)
  const overallProgress = Math.round((readModulesCount / totalModules) * 50 + (completedModulesCount / totalModules) * 50);

  const currentModule = getModuleById(selectedModuleId) || studyModules[0];
  const selectOptions = studyModules.map((m) => ({
    value: m.id,
    label: m.title,
    description: m.description,
  }));

  return (
    <div className="flex-1 flex flex-col max-w-7xl w-full mx-auto p-4 md:p-8 animate-fade-in">
      {/* HEADER CIBERNÉTICO */}
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-border/50 pb-6 mb-8 gap-4">
        <div>
          <span className="text-xs font-bold text-accent uppercase tracking-widest bg-accent/10 px-2.5 py-1 rounded">PROVA 2</span>
          <h1 className="text-2xl md:text-3xl font-black text-foreground tracking-tight mt-2.5">
            Plataforma de Estudos: Teste de Software
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
        </div>
      </header>

      {/* METRICAS DE PROGRESSO */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8">
        <div className="bg-card/50 border border-border p-4 rounded-xl glass-panel">
          <span className="text-xs font-bold text-muted-foreground block uppercase">Progresso Geral</span>
          <span className="text-2xl sm:text-3xl font-black text-foreground block mt-1.5">{overallProgress}%</span>
          <ProgressBar value={overallProgress} size="sm" className="mt-3.5" />
        </div>
        <div className="bg-card/50 border border-border p-4 rounded-xl glass-panel">
          <span className="text-xs font-bold text-muted-foreground block uppercase">Leituras Concluídas</span>
          <span className="text-2xl sm:text-3xl font-black text-foreground block mt-1.5">{readModulesCount} de {totalModules}</span>
          <span className="text-[10px] text-muted-foreground block mt-1.5">Conclusão teórica dos tópicos</span>
        </div>
        <div className="bg-card/50 border border-border p-4 rounded-xl glass-panel">
          <span className="text-xs font-bold text-muted-foreground block uppercase">Quizzes Aprovados</span>
          <span className="text-2xl sm:text-3xl font-black text-foreground block mt-1.5">{completedModulesCount} de {totalModules}</span>
          <span className="text-[10px] text-muted-foreground block mt-1.5">Aproveitamento ≥ 70% exigido</span>
        </div>
        <div className="bg-card/50 border border-border p-4 rounded-xl glass-panel">
          <span className="text-xs font-bold text-muted-foreground block uppercase">Média nos Quizzes</span>
          <span className="text-2xl sm:text-3xl font-black text-foreground block mt-1.5">{averageQuizScore}%</span>
          <span className="text-[10px] text-muted-foreground block mt-1.5">Média geral dos acertos</span>
        </div>
      </section>

      {/* ABAS DE NAVEGAÇÃO */}
      <nav className="flex border-b border-border/40 gap-1.5 mb-8 overflow-x-auto pb-1">
        {[
          { id: "dashboard", label: "Tópicos", icon: LayoutDashboard },
          { id: "quiz", label: "Quizzes Práticos", icon: GraduationCap },
          { id: "exam", label: "Simulado Prova 2", icon: ClipboardList },
          { id: "simulation", label: "Simulado Discursivas", icon: FileText },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`flex items-center gap-2 px-5 py-3 rounded-t-lg text-sm font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-card border-t border-x border-border text-foreground -mb-px shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
              }`}
            >
              <Icon className="w-4 h-4" /> {tab.label}
            </button>
          );
        })}
      </nav>

      {/* CONTEÚDO DA ABA SELECIONADA */}
      <main className="flex-1 min-h-[500px]">
        {/* ABA: DASHBOARD */}
        {activeTab === "dashboard" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 animate-slide-up">
            {studyModules.map((m) => {
              const details = progress.moduleDetails[m.id];
              return (
                <Link
                  key={m.id}
                  href={`/topico/${m.id}`}
                  className="bg-card/40 border border-border rounded-xl p-5 flex flex-col justify-between glass-panel glass-card-hover cursor-pointer"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3.5">
                      <span className="text-[10px] text-primary font-bold uppercase">{m.estimatedMinutes} min de estudo</span>
                      {details.isCompleted && <CheckCircle className="w-4.5 h-4.5 text-accent" />}
                    </div>
                    <h3 className="font-bold text-foreground text-base mb-2">{m.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-4">{m.description}</p>
                  </div>
                  <div className="border-t border-border/50 pt-3.5 mt-3 flex items-center justify-between gap-2">
                    <span className="flex items-center gap-1 text-xs font-semibold text-primary group-hover:underline">
                      Estudar Teoria <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setSelectedModuleId(m.id);
                        setActiveTab("quiz");
                      }}
                      className="text-xs font-semibold text-accent hover:underline cursor-pointer"
                    >
                      {details.quizScore !== null ? `Quiz: ${details.quizScore}%` : "Fazer Quiz"}
                    </button>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* ABA: QUIZZES */}
        {activeTab === "quiz" && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card/20 border border-border/50 rounded-xl p-4 glass-panel">
              <span className="text-xs font-bold text-muted-foreground uppercase">Selecionar Módulo:</span>
              <SearchSelect
                options={selectOptions}
                value={selectedModuleId}
                onChange={setSelectedModuleId}
              />
            </div>
            <QuizEngine
              questions={quizQuestions}
              moduleId={selectedModuleId}
              moduleTitle={currentModule.title}
              onQuizFinished={(score) => saveQuizScore(selectedModuleId, score)}
              savedScore={progress.moduleDetails[selectedModuleId]?.quizScore || null}
            />
          </div>
        )}

        {/* ABA: SIMULADO PROVA 2 (30 QUESTÕES) */}
        {activeTab === "exam" && (
          <div className="space-y-5 animate-fade-in">
            <div className="bg-card/20 border border-border/50 rounded-xl p-4 glass-panel text-sm text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Simulado da Prova 2 — 30 questões</strong> cobrindo
              fluxo de dados, defeitos/mutação, riscos, níveis de teste, drivers/stubs e JUnit/Mockito.
              Resolva no papel ou no rascunho e revele a <strong className="text-foreground">resolução de cada questão</strong> ao final.
            </div>
            <Simulation
              questions={prova2ExamQuestions}
              onSaveScore={saveSimulationScore}
              savedScores={progress.simulationScores}
              savedAnswers={progress.simulationAnswers}
              onSaveAnswer={saveSimulationAnswer}
              eyebrow="Simulado da Prova 2"
            />
          </div>
        )}

        {/* ABA: SIMULADO DISCURSIVAS */}
        {activeTab === "simulation" && (
          <Simulation
            questions={simulationQuestions}
            onSaveScore={saveSimulationScore}
            savedScores={progress.simulationScores}
            savedAnswers={progress.simulationAnswers}
            onSaveAnswer={saveSimulationAnswer}
          />
        )}
      </main>

      {/* RESET DE PROGRESSO */}
      <footer className="mt-16 pt-6 border-t border-border/40 flex justify-center">
        <button
          onClick={resetProgress}
          className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-600 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer"
        >
          <RefreshCcw className="w-3.5 h-3.5" /> Reiniciar Progresso de Estudos
        </button>
      </footer>
    </div>
  );
}
