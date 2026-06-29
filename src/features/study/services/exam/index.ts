import { SimulationQuestion } from "../../schemas/studyTypes";
import { structuralDfgQuestions } from "./structuralDfg";
import { defectMutationQuestions } from "./defectMutation";
import { riskBasedQuestions } from "./riskBased";
import { testLevelsQuestions } from "./testLevels";
import { driversStubsQuestions } from "./driversStubs";
import { automationQuestions } from "./automation";

/**
 * Simulado completo da Prova 2 (30 questões) cobrindo todos os temas do
 * conteúdo: fluxo de dados, defeitos/mutação, riscos, níveis de teste,
 * drivers/stubs e automatização (JUnit/Mockito). As questões seguem o estilo
 * prático da Prova 1, com resolução revelável ao final de cada uma.
 */
/** Vincula cada grupo de questões ao tópico de estudo correspondente. */
const withModule = (qs: SimulationQuestion[], moduleId: string): SimulationQuestion[] =>
  qs.map((q) => ({ ...q, moduleId }));

export const prova2ExamQuestions: SimulationQuestion[] = [
  ...withModule(structuralDfgQuestions, "dfg"),
  ...withModule(defectMutationQuestions, "defect_based"),
  ...withModule(riskBasedQuestions, "risk_based"),
  ...withModule(testLevelsQuestions, "test_levels"),
  ...withModule(driversStubsQuestions, "drivers_stubs"),
  ...withModule(automationQuestions, "junit_mockito"),
];
