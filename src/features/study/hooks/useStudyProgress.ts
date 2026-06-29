"use client";

import { useState, useEffect } from "react";
import { UserProgress, ModuleProgress } from "../schemas/studyTypes";

const LOCAL_STORAGE_KEY = "provateste_study_progress_v2";

const MODULE_IDS = [
  "fundamentals",
  "test_cases",
  "cfg",
  "criteria",
  "dfg",
  "defect_based",
  "risk_based",
  "test_levels",
  "drivers_stubs",
  "junit_mockito",
] as const;

const buildInitialModuleDetails = (): UserProgress["moduleDetails"] =>
  MODULE_IDS.reduce((acc, moduleId) => {
    acc[moduleId] = { moduleId, isRead: false, quizScore: null, isCompleted: false };
    return acc;
  }, {} as UserProgress["moduleDetails"]);

const INITIAL_PROGRESS: UserProgress = {
  completedModules: [],
  moduleDetails: buildInitialModuleDetails(),
  simulationScores: {},
  simulationAnswers: {},
  totalStudySeconds: 0,
};

/**
 * Custom Hook para gerenciar e persistir o progresso de estudos no localStorage.
 * Centraliza a lógica de alteração de estado fora dos componentes visuais.
 */
export function useStudyProgress() {
  const [progress, setProgress] = useState<UserProgress>(INITIAL_PROGRESS);
  const [isLoaded, setIsLoaded] = useState(false);

  // Carrega do localStorage de forma segura após a hidratação do cliente
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<UserProgress>;
        // Merge defensivo: garante que todo módulo cadastrado exista no progresso
        const merged: UserProgress = {
          ...INITIAL_PROGRESS,
          ...parsed,
          moduleDetails: {
            ...INITIAL_PROGRESS.moduleDetails,
            ...(parsed.moduleDetails ?? {}),
          },
          simulationScores: parsed.simulationScores ?? {},
          simulationAnswers: parsed.simulationAnswers ?? {},
        };
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setProgress(merged);
      }
    } catch (e) {
      console.error("Falha ao carregar progresso do localStorage:", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Salva no localStorage sempre que o progresso mudar
  const saveProgress = (newProgress: UserProgress) => {
    setProgress(newProgress);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newProgress));
    } catch (e) {
      console.error("Falha ao salvar progresso no localStorage:", e);
    }
  };

  const markModuleAsRead = (moduleId: string) => {
    const details = progress.moduleDetails[moduleId];
    if (!details || details.isRead) return;

    const updatedDetails: ModuleProgress = {
      ...details,
      isRead: true,
      isCompleted: details.quizScore !== null && details.quizScore >= 70, // Conclui se leu e tirou >= 70%
    };

    const newCompletedModules = [...progress.completedModules];
    if (updatedDetails.isCompleted && !newCompletedModules.includes(moduleId)) {
      newCompletedModules.push(moduleId);
    }

    saveProgress({
      ...progress,
      completedModules: newCompletedModules,
      moduleDetails: {
        ...progress.moduleDetails,
        [moduleId]: updatedDetails,
      },
    });
  };

  const saveQuizScore = (moduleId: string, score: number) => {
    const details = progress.moduleDetails[moduleId];
    if (!details) return;

    // Mantém a maior nota
    const bestScore = details.quizScore !== null ? Math.max(details.quizScore, score) : score;
    const isCompletedNow = details.isRead && bestScore >= 70;

    const newCompletedModules = [...progress.completedModules];
    if (isCompletedNow && !newCompletedModules.includes(moduleId)) {
      newCompletedModules.push(moduleId);
    }

    const updatedDetails: ModuleProgress = {
      ...details,
      quizScore: bestScore,
      isCompleted: isCompletedNow,
    };

    saveProgress({
      ...progress,
      completedModules: newCompletedModules,
      moduleDetails: {
        ...progress.moduleDetails,
        [moduleId]: updatedDetails,
      },
    });
  };

  const saveSimulationScore = (questionId: string, score: number) => {
    saveProgress({
      ...progress,
      simulationScores: {
        ...progress.simulationScores,
        [questionId]: score,
      },
    });
  };

  const saveSimulationAnswer = (questionId: string, answer: string) => {
    setProgress((prev) => {
      const updated: UserProgress = {
        ...prev,
        simulationAnswers: {
          ...prev.simulationAnswers,
          [questionId]: answer,
        },
      };
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error("Falha ao salvar resposta do simulado:", e);
      }
      return updated;
    });
  };

  const resetProgress = () => {
    saveProgress(INITIAL_PROGRESS);
  };

  // Efeito para contar o tempo de estudo ativo em segundo plano
  useEffect(() => {
    if (!isLoaded) return;
    const timer = setInterval(() => {
      setProgress((prev) => {
        const updated = {
          ...prev,
          totalStudySeconds: prev.totalStudySeconds + 1,
        };
        // Salva periodicamente
        try {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
        } catch {}
        return updated;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isLoaded]);

  return {
    progress,
    isLoaded,
    markModuleAsRead,
    saveQuizScore,
    saveSimulationScore,
    saveSimulationAnswer,
    resetProgress,
  };
}
