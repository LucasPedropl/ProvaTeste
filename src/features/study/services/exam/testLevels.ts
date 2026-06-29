import { SimulationQuestion } from "../../schemas/studyTypes";

/**
 * Tema 4 — Níveis de teste (unitário, integração e sistema), incluindo
 * estratégias de integração e duas questões de múltipla escolha.
 */
export const testLevelsQuestions: SimulationQuestion[] = [
  {
    id: "p2_lev_1",
    title: "Identificação do nível de teste (múltipla escolha)",
    statement:
      "Uma equipe testa o sistema de e-commerce **completo, de ponta a ponta**, validando também requisitos não funcionais " +
      "(desempenho e segurança) em um ambiente semelhante ao de produção. Qual **nível de teste** está sendo executado?\n\n" +
      "a) Teste unitário.\n" +
      "b) Teste de integração.\n" +
      "c) Teste de aceitação pelo cliente, pois envolve o ambiente de produção e a aprovação formal de todos os requisitos não funcionais levantados na fase de análise.\n" +
      "d) Teste de sistema.",
    expectedResponse:
      "**Resposta correta: (d).**\n\n" +
      "* **(d) Correta:** o **teste de sistema** valida o produto **integrado e completo** frente aos requisitos funcionais **e não funcionais** (desempenho, segurança), em ambiente próximo ao de produção.\n" +
      "* **(a) Errada:** o teste unitário isola **pequenas partes** do código.\n" +
      "* **(b) Errada:** a integração foca a **comunicação entre módulos**, não o produto inteiro.\n" +
      "* **(c) Errada:** a aceitação foca a **aprovação formal pelo usuário final** quanto às necessidades de negócio; o enunciado descreve validação técnica do sistema completo, não a homologação do cliente.",
    checklist: [
      { id: "c1", description: "Marcou a alternativa (d) como correta.", points: 100 },
    ],
    totalPoints: 100,
  },
  {
    id: "p2_lev_2",
    title: "Diferença entre os três níveis de teste",
    statement:
      "Diferencie os níveis **unitário**, **integração** e **sistema** quanto ao **foco** de cada um. " +
      "Dê **um exemplo** de cada nível no contexto de um **aplicativo bancário**.",
    expectedResponse:
      "* **Unitário — foco:** menor unidade de código (método/classe) **isolada** de suas dependências. *Ex.:* testar o método `calcularJuros(saldo, taxa)` isoladamente.\n" +
      "* **Integração — foco:** **comunicação e troca de dados** nas interfaces entre módulos já testados. *Ex.:* verificar se o módulo de `Transferência` chama corretamente o módulo de `Conta` e o de `Notificação`.\n" +
      "* **Sistema — foco:** o **produto completo e integrado** frente aos requisitos funcionais e não funcionais. *Ex.:* simular um usuário fazendo login, transferindo dinheiro e recebendo o comprovante, medindo desempenho e segurança.\n\n" +
      "A progressão vai do **menor escopo isolado** (unitário) ao **sistema inteiro** (sistema).",
    checklist: [
      { id: "c1", description: "Definiu o foco do teste unitário (unidade isolada).", points: 30 },
      { id: "c2", description: "Definiu o foco da integração (interfaces entre módulos).", points: 30 },
      { id: "c3", description: "Definiu o foco do sistema e deu exemplos bancários coerentes.", points: 40 },
    ],
    totalPoints: 100,
  },
  {
    id: "p2_lev_3",
    title: "Integração Top-Down vs Bottom-Up",
    statement:
      "Compare as estratégias de integração **Top-Down** (descendente) e **Bottom-Up** (ascendente). " +
      "Indique **qual dublê de teste** (stub ou driver) cada uma utiliza e cite **uma vantagem** de cada abordagem.",
    expectedResponse:
      "* **Top-Down (descendente):** integra dos módulos **superiores para os inferiores**. Como os módulos de baixo nível ainda não existem, usa **stubs** para simular as chamadas a eles.\n" +
      "  * *Vantagem:* permite validar cedo a **lógica de controle/fluxo principal** e demonstrar o sistema de cima.\n\n" +
      "* **Bottom-Up (ascendente):** integra dos módulos **inferiores para os superiores**. Como os chamadores superiores ainda não existem, usa **drivers** para acionar os módulos de baixo nível.\n" +
      "  * *Vantagem:* facilita testar bem os **módulos de base** (utilitários) desde o início, e os defeitos são mais fáceis de localizar.\n\n" +
      "Resumo: **Top-Down → stubs**; **Bottom-Up → drivers**.",
    checklist: [
      { id: "c1", description: "Associou Top-Down a stubs e Bottom-Up a drivers.", points: 40 },
      { id: "c2", description: "Explicou o sentido de integração de cada estratégia.", points: 30 },
      { id: "c3", description: "Citou uma vantagem de cada abordagem.", points: 30 },
    ],
    totalPoints: 100,
  },
  {
    id: "p2_lev_4",
    title: "Foco do teste de integração (múltipla escolha)",
    statement:
      "Qual é o **foco principal** do teste de **integração**? Assinale a **correta**:\n\n" +
      "a) Garantir que cada unidade de código, completamente isolada de qualquer dependência externa por meio de stubs e mocks, retorne exatamente o valor esperado para todas as suas entradas possíveis.\n" +
      "b) Verificar a comunicação e a passagem de dados nas interfaces entre módulos já testados isoladamente.\n" +
      "c) Obter a aceitação formal do usuário final.\n" +
      "d) Medir a cobertura de código de uma única classe.",
    expectedResponse:
      "**Resposta correta: (b).**\n\n" +
      "* **(b) Correta:** a integração valida as **interfaces e a interação** entre módulos previamente testados de forma isolada.\n" +
      "* **(a) Errada:** descreve o **teste unitário** (unidade isolada).\n" +
      "* **(c) Errada:** descreve o **teste de aceitação**.\n" +
      "* **(d) Errada:** cobertura de uma única classe é métrica do nível **unitário**, não o foco da integração.",
    checklist: [
      { id: "c1", description: "Marcou a alternativa (b) como correta.", points: 100 },
    ],
    totalPoints: 100,
  },
];
