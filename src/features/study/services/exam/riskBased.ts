import { SimulationQuestion } from "../../schemas/studyTypes";

/**
 * Tema 3 — Testes baseados em riscos (RBT). Cálculo de exposição ao risco,
 * priorização, matriz de risco e uma questão de múltipla escolha.
 */
export const riskBasedQuestions: SimulationQuestion[] = [
  {
    id: "p2_risk_1",
    title: "Cálculo e priorização por exposição ao risco",
    statement:
      "Uma equipe avaliou 4 componentes atribuindo **Probabilidade** e **Impacto** numa escala de 1 a 5. " +
      "Calcule a **exposição ao risco** (Probabilidade × Impacto) de cada um, **classifique** o nível " +
      "(Crítico ≥ 15, Alto ≥ 9, Médio ≥ 4, Baixo < 4) e indique a **ordem de prioridade** dos testes.\n\n" +
      "| Componente | Probabilidade | Impacto |\n" +
      "| :--- | :---: | :---: |\n" +
      "| Pagamento | 4 | 5 |\n" +
      "| Login | 3 | 4 |\n" +
      "| Relatório | 2 | 2 |\n" +
      "| Tooltip de ajuda | 1 | 1 |",
    expectedResponse:
      "**Cálculo da exposição (Prob × Impacto) e classificação:**\n\n" +
      "| Componente | Exposição | Nível |\n" +
      "| :--- | :---: | :--- |\n" +
      "| Pagamento | 4 × 5 = 20 | **Crítico** (≥ 15) |\n" +
      "| Login | 3 × 4 = 12 | **Alto** (≥ 9) |\n" +
      "| Relatório | 2 × 2 = 4 | **Médio** (≥ 4) |\n" +
      "| Tooltip de ajuda | 1 × 1 = 1 | **Baixo** (< 4) |\n\n" +
      "**Ordem de prioridade dos testes (do maior para o menor risco):**\n" +
      "1. Pagamento (20) — testar primeiro, com mais critérios.\n" +
      "2. Login (12).\n" +
      "3. Relatório (4).\n" +
      "4. Tooltip de ajuda (1) — testar por último, ou apenas se houver tempo.",
    checklist: [
      { id: "c1", description: "Calculou as 4 exposições corretamente (20, 12, 4, 1).", points: 40 },
      { id: "c2", description: "Classificou os níveis (Crítico, Alto, Médio, Baixo).", points: 30 },
      { id: "c3", description: "Ordenou a prioridade do maior para o menor risco.", points: 30 },
    ],
    totalPoints: 100,
  },
  {
    id: "p2_risk_2",
    title: "Estratégia do Teste Baseado em Risco",
    statement:
      "Explique a ideia central do **Teste Baseado em Risco (RBT)** e por que ele é necessário. " +
      "Cite **dois fatores que aumentam a probabilidade** de falha e **dois fatores que aumentam o impacto** de uma falha.",
    expectedResponse:
      "**Ideia central:** como tempo e recursos de teste são limitados (é impossível testar tudo), o RBT **direciona o esforço de teste para as áreas de maior risco**, maximizando a eficácia dos testes no início do ciclo. Risco = Probabilidade × Impacto.\n\n" +
      "**Fatores que aumentam a PROBABILIDADE (técnicos):**\n" +
      "* Código complexo ou que sofre alterações frequentes.\n" +
      "* Uso de tecnologia nova, histórico de bugs ou autoria por desenvolvedor inexperiente.\n\n" +
      "**Fatores que aumentam o IMPACTO (negócio):**\n" +
      "* Afeta transações financeiras ou segurança/privacidade de dados.\n" +
      "* Viola leis/regulamentos ou impede o uso do fluxo principal do sistema.\n\n" +
      "Componentes com alta probabilidade **e** alto impacto recebem os testes mais exaustivos primeiro.",
    checklist: [
      { id: "c1", description: "Explicou que o RBT prioriza o esforço por causa de recursos limitados.", points: 40 },
      { id: "c2", description: "Citou 2 fatores de probabilidade (técnicos).", points: 30 },
      { id: "c3", description: "Citou 2 fatores de impacto (negócio).", points: 30 },
    ],
    totalPoints: 100,
  },
  {
    id: "p2_risk_3",
    title: "Fatores do risco (múltipla escolha)",
    statement:
      "O risco de um item de software é tradicionalmente calculado pela combinação de quais fatores? Assinale a **correta**:\n\n" +
      "a) Probabilidade de falha × Impacto no negócio.\n" +
      "b) Pelo número total de linhas de código do componente, dividido pela quantidade de comentários presentes no arquivo-fonte.\n" +
      "c) Pela razão entre a cobertura de testes atingida e a quantidade de casos de teste executados na suíte de regressão.\n" +
      "d) Pelo tempo médio de execução do componente somado ao seu consumo de memória observado em ambiente de produção.",
    expectedResponse:
      "**Resposta correta: (a).**\n\n" +
      "* **(a) Correta:** Risco = **Probabilidade × Impacto**. A probabilidade reúne fatores técnicos (chance de existir defeito) e o impacto reúne fatores de negócio (gravidade da falha).\n" +
      "* **(b), (c) e (d) Erradas:** linhas de código, comentários, cobertura, tempo de execução e consumo de memória são **métricas isoladas** — nenhuma define, por si só, o risco do item. São apenas indícios que podem influenciar a probabilidade.",
    checklist: [
      { id: "c1", description: "Marcou a alternativa (a) como correta.", points: 100 },
    ],
    totalPoints: 100,
  },
  {
    id: "p2_risk_4",
    title: "Matriz de risco e estratégia de teste",
    statement:
      "Descreva o que é a **matriz de risco** (Probabilidade × Impacto) e qual deve ser a **estratégia de teste** " +
      "para um item classificado como **Crítico** e para um item classificado como **Insignificante/Baixo**.",
    expectedResponse:
      "**Matriz de risco:** tabela (3×3 ou 5×5) que cruza os níveis de **Probabilidade** (colunas) com os de **Impacto** (linhas), classificando cada item em faixas como Insignificante, Baixo, Médio, Alto e Crítico. Ela mapeia visualmente onde concentrar o esforço de teste.\n\n" +
      "**Item Crítico (alta probabilidade e alto impacto):**\n" +
      "* Testar **primeiro** e de forma **exaustiva**.\n" +
      "* Aplicar **múltiplos critérios** (caixa-preta, caixa-branca, teste de mutação).\n\n" +
      "**Item Insignificante / Baixo:**\n" +
      "* Prioridade **mínima**: testar por último ou apenas de forma exploratória, se houver tempo.\n" +
      "* Não justifica esforço intenso nem bloquear a entrega por ele.",
    checklist: [
      { id: "c1", description: "Explicou a matriz como cruzamento Probabilidade × Impacto.", points: 30 },
      { id: "c2", description: "Definiu testar item Crítico primeiro e com múltiplos critérios.", points: 35 },
      { id: "c3", description: "Definiu esforço mínimo/exploratório para item de baixo risco.", points: 35 },
    ],
    totalPoints: 100,
  },
];
