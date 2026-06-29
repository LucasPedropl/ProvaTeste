import { StudyModule } from "../schemas/studyTypes";
import { fundamentals } from "./content/fundamentals";
import { testCases } from "./content/testCases";
import { cfg } from "./content/cfg";
import { criteria } from "./content/criteria";
import { module1 } from "./content/module1";
import { module2 } from "./content/module2";
import { module3 } from "./content/module3";
import { module4 } from "./content/module4";
import { module5 } from "./content/module5";
import { module6 } from "./content/module6";

/**
 * Array contendo todos os módulos de estudo.
 * Inicia pelos fundamentos (conceitos base) e segue pela ementa da Prova 2.
 */
export const studyModules: StudyModule[] = [
  fundamentals,
  testCases,
  cfg,
  criteria,
  module1,
  module2,
  module3,
  module4,
  module5,
  module6,
];

/**
 * Busca um módulo específico pelo ID
 */
export function getModuleById(id: string): StudyModule | undefined {
  return studyModules.find((m) => m.id === id);
}
