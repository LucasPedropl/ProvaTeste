import { z } from "zod";

// --- Schema do Conteúdo de Estudo ---

export const StudySectionSchema = z.object({
  id: z.string(),
  title: z.string(),
  subtitle: z.string().optional(),
  contentMarkdown: z.string(),
  codeExample: z.object({
    language: z.string(),
    code: z.string(),
    explanation: z.string(),
  }).optional(),
  visualDiagramMermaid: z.string().optional(), // Código Mermaid.js para grafos e diagramas
});

export const KeyTermSchema = z.object({
  term: z.string(),
  definition: z.string(),
});

export const StudyModuleSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  estimatedMinutes: z.number(),
  tldr: z.string().optional(), // Resumo rápido (TL;DR) exibido no topo do tópico
  keyTerms: z.array(KeyTermSchema).optional(), // Glossário de termos-chave do módulo
  sections: z.array(StudySectionSchema),
});

export type StudySection = z.infer<typeof StudySectionSchema>;
export type KeyTerm = z.infer<typeof KeyTermSchema>;
export type StudyModule = z.infer<typeof StudyModuleSchema>;


// --- Schema do Quiz (Questões de Múltipla Escolha) ---

export const QuizOptionSchema = z.object({
  id: z.string(),
  text: z.string(),
  isCorrect: z.boolean(),
  explanation: z.string(), // Justificativa de por que a opção está certa ou errada
});

/**
 * Tipos de questão suportados no quiz:
 * - multiple-choice: objetiva, com correção automática (padrão).
 * - open: dissertativa, com gabarito revelável para autoavaliação.
 * - drawing: pede desenho de grafo/tabela no caderno; o gabarito traz o
 *   diagrama/tabela esperado para conferência.
 */
export const QuizQuestionTypeSchema = z.enum(["multiple-choice", "open", "drawing"]);
export type QuizQuestionType = z.infer<typeof QuizQuestionTypeSchema>;

export const QuizQuestionSchema = z.object({
  id: z.string(),
  moduleId: z.string(),
  type: QuizQuestionTypeSchema.optional(), // undefined => multiple-choice
  questionText: z.string(), // Suporta markdown (tabelas, listas, código inline, $matemática$)
  options: z.array(QuizOptionSchema).optional(), // Obrigatório apenas em multiple-choice
  codeContext: z.string().optional(), // Trecho de código complementar opcional
  codeLanguage: z.string().optional(), // Linguagem do codeContext (ex: "java", "c")
  diagramMermaid: z.string().optional(), // Grafo/diagrama Mermaid (ex: grafo de fluxo de dados)
  diagramCaption: z.string().optional(), // Legenda exibida acima do diagrama
  answerHint: z.string().optional(), // Instrução do que produzir (ex: "desenhe o DFG")
  expectedAnswer: z.string().optional(), // Gabarito (markdown) das questões open/drawing
  expectedDiagramMermaid: z.string().optional(), // Diagrama-gabarito para conferir o desenho
  expectedDiagramCaption: z.string().optional(),
});

export type QuizOption = z.infer<typeof QuizOptionSchema>;
export type QuizQuestion = z.infer<typeof QuizQuestionSchema>;


// --- Schema da Simulação (Questões Discursivas) ---

export const ChecklistItemSchema = z.object({
  id: z.string(),
  description: z.string(), // Critério de pontuação (ex: "Identificou o operador de mutação AOR")
  points: z.number(),
});

export const SimulationQuestionSchema = z.object({
  id: z.string(),
  title: z.string(),
  statement: z.string(),
  codeContext: z.string().optional(),
  expectedResponse: z.string(), // Resposta esperada (gabarito do professor)
  checklist: z.array(ChecklistItemSchema), // Checklist para o usuário pontuar a si mesmo
  totalPoints: z.number(),
  moduleId: z.string().optional(), // Tópico de estudo relacionado (abre o conteúdo no modal)
});

export type ChecklistItem = z.infer<typeof ChecklistItemSchema>;
export type SimulationQuestion = z.infer<typeof SimulationQuestionSchema>;


// --- Schema do Progresso do Usuário (Persistência) ---

export const ModuleProgressSchema = z.object({
  moduleId: z.string(),
  isRead: z.boolean(),
  quizScore: z.number().nullable(), // Melhor score alcançado (0 a 100)
  isCompleted: z.boolean(),
});

export const UserProgressSchema = z.object({
  completedModules: z.array(z.string()),
  moduleDetails: z.record(z.string(), ModuleProgressSchema),
  simulationScores: z.record(z.string(), z.number()), // idQuestao -> pontuacao (autoavaliação)
  simulationAnswers: z.record(z.string(), z.string()), // idQuestao -> rascunho da resposta do usuário
  totalStudySeconds: z.number(),
});

export type ModuleProgress = z.infer<typeof ModuleProgressSchema>;
export type UserProgress = z.infer<typeof UserProgressSchema>;
