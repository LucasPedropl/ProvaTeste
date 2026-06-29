import { StudyModule } from "../../schemas/studyTypes";

export const module3: StudyModule = {
  id: "risk_based",
  title: "7. Testes Baseados em Riscos",
  description: "Entenda como gerenciar e priorizar o esforço de teste com base na análise de probabilidade e impacto de falhas, seguindo o processo de 10 passos de Craig e Jaskiel (2002).",
  estimatedMinutes: 18,
  tldr: "Como é impossível testar tudo, o teste baseado em risco prioriza onde o risco é maior. Risco = Probabilidade de falha × Impacto da falha. A prioridade é calculada SOMANDO os valores (Alto=3, Médio=2, Baixo=1), gerando 5 níveis (6, 5, 4, 3, 2). Craig e Jaskiel (2002) definem 10 passos, do brainstorming à mitigação, para conduzir essa análise.",
  keyTerms: [
    { term: "Risco", definition: "Probabilidade (ou possibilidade) de um evento ocorrer somada às suas consequências (impactos). Em teste: probabilidade de falha × impacto negativo da falha." },
    { term: "Análise de risco", definition: "Processo para identificar, estimar e avaliar riscos (Craig e Jaskiel, 2002)." },
    { term: "Probabilidade (fatores técnicos)", definition: "Chance de o componente conter erro. Relaciona-se a complexidade, nº de interfaces e nº de linhas de código." },
    { term: "Impacto (fatores de negócio)", definition: "Tamanho do prejuízo para o usuário/empresa se o componente falhar." },
    { term: "Características × Atributos", definition: "Características são funcionalidades (saque, depósito); atributos são qualidades (usabilidade, desempenho, segurança)." },
    { term: "Linha de corte", definition: "Limite que separa o que será testado do que não será (ou terá menos atenção). Sistemas críticos não têm linha de corte." },
    { term: "Mitigação", definition: "Ações para minimizar/eliminar riscos altos: revisão/inspeção, prototipação, mais níveis de teste." },
    { term: "Pareto (80-20)", definition: "80% dos defeitos vêm de 20% das áreas; concentra-se o esforço nessas áreas." },
  ],
  sections: [
    {
      id: "risk_intro",
      title: "O que são Testes Baseados em Riscos?",
      subtitle: "Priorizando o que realmente importa",
      contentMarkdown: `Em qualquer projeto o tempo e os recursos são **limitados** — é impossível testar tudo. O **Teste Baseado em Risco** direciona o esforço para as situações que, caso ocorram, causam **maiores prejuízos**.

**Definição de risco**: probabilidade (ou possibilidade) de um evento ocorrer somada às suas **consequências** (impactos). Em teste de software:

$$Risco = Probabilidade\\ de\\ falha \\times Impacto\\ negativo\\ da\\ falha$$

**Justificativa** (por que priorizar?):
* É impossível realizar um número ilimitado de testes.
* O foco deve estar onde a falha gera maior prejuízo.
* Identificando riscos, define-se a **quantidade** e a **ordem de execução** dos casos de teste.`,
    },
    {
      id: "risk_analysis",
      title: "Análise de Risco",
      subtitle: "O quê, quem, quando e como",
      contentMarkdown: `**Análise de risco** é o processo para **identificar, estimar e avaliar** riscos (Craig e Jaskiel, 2002). Pode ser classificada em:
* **Análise de risco em software** (riscos do produto).
* **Análise de risco de planejamento** (riscos do projeto/cronograma).

| Pergunta | Resposta |
| :--- | :--- |
| **O quê?** (objetivo) | Definir **o que testar**, as **prioridades** e a **abrangência** do teste. |
| **Quem?** | Desenvolvedores, **usuários**, testadores e analistas (quem conhece o negócio/produto). |
| **Quando?** | O mais **cedo possível** no ciclo de vida — quando os requisitos de alto nível já estiverem especificados. |
| **Como?** | Pelo processo de **10 passos** de Craig e Jaskiel (2002), adaptável a cada organização. |`,
    },
    {
      id: "risk_steps",
      title: "Os 10 Passos de Craig e Jaskiel (2002)",
      subtitle: "O processo da análise de risco",
      contentMarkdown: `1. **Formar equipe de brainstorming** — técnica em duas etapas: *ampliação* (gerar muitas ideias, sem críticas) e *redução* (filtrar por votação/critérios). Participam usuários, devs, analistas e testadores.
2. **Compilar lista de características** — a partir da documentação (requisitos, relatórios de defeitos), extrair **características** (funcionalidades) e **atributos** (ex.: acessibilidade, disponibilidade, manutenibilidade).
3. **Definir probabilidade de falha** — indicador **Alta / Média / Baixa** por item. Pergunta: *"qual a probabilidade desta característica falhar?"*. Fatores: complexidade, nº de interfaces, nº de linhas de código.
4. **Determinar o impacto** — indicador **Alto / Médio / Baixo**. Pergunta: *"qual o impacto para o usuário se isto falhar?"*. O usuário tende a achar tudo "alto" → **limite** a quantidade de Altos para conseguir priorizar.
5. **Atribuir valores numéricos** — Alto = **3**, Médio = **2**, Baixo = **1** (qualquer sequência decrescente serve). Itens que causam morte/perdas financeiras têm sempre alta prioridade.
6. **Calcular a prioridade do risco** — **somar** probabilidade + impacto → 5 níveis: **6, 5, 4, 3, 2**. (Algumas organizações preferem **multiplicar**.)
7. **Rever e modificar valores** — ajustar com base em: histórico da equipe/defeitos, complexidade (ciclomática, pontos por função/caso de uso), funcionalidades novas/alteradas, realismo do ambiente e análise de **Pareto** (80-20). A cada mudança, recalcula-se a prioridade.
8. **Priorizar as características** — reordenar pela prioridade. *Deficiência*: não considera **dependências de teste** (ex.: no ATM, "Saldo" tem baixa prioridade, mas precisa ser testado antes do "Saque").
9. **Determinar a linha de corte** — definir o que será testado e o que não será (ou terá menos atenção). **Sistemas críticos não têm linha de corte**.
10. **Considerar mitigação** — para itens de alta prioridade, reduzir o risco com revisão/inspeção, prototipação e mais níveis de teste.`,
      visualDiagramMermaid: `flowchart TD
  A[1. Brainstorming] --> B[2. Lista de caracteristicas]
  B --> C[3. Probabilidade de falha]
  C --> D[4. Impacto]
  D --> E[5. Valores numericos 3-2-1]
  E --> F[6. Prioridade = soma]
  F --> G[7. Rever valores]
  G --> H[8. Priorizar]
  H --> I[9. Linha de corte]
  I --> J[10. Mitigacao]`,
    },
    {
      id: "risk_calc",
      title: "Cálculo da Prioridade na Prática",
      subtitle: "Exemplo do Caixa Eletrônico (ATM)",
      contentMarkdown: `Considere um **ATM**. Características: *saque, depósito, saldo, extrato, transferência, recarga, pagamento*. Atributos: *usabilidade, desempenho, segurança*.

Atribuindo Alto=3 / Médio=2 / Baixo=1 e **somando** probabilidade + impacto:

| Característica | Probabilidade | Impacto | Prioridade (soma) |
| :--- | :---: | :---: | :---: |
| Saque | Alta (3) | Alto (3) | **6** |
| Transferência | Média (2) | Alto (3) | **5** |
| Pagamento | Alta (3) | Médio (2) | **5** |
| Depósito | Média (2) | Médio (2) | **4** |
| Extrato | Baixa (1) | Médio (2) | **3** |
| Saldo | Baixa (1) | Baixo (1) | **2** |

A lista ordenada mostra que **Saque** deve ser testado primeiro. **Atenção às dependências**: mesmo com prioridade 2, "Saldo" precisa ser testado antes de "Saque", pois o saque verifica o saldo.`,
      codeExample: {
        language: "java",
        code: `// Material (Craig & Jaskiel): prioridade = SOMA (Alto=3, Medio=2, Baixo=1)
// Niveis possiveis: 6, 5, 4, 3, 2
int prioridadeSoma = probabilidade + impacto; // 2 a 6

// Alternativa adotada por algumas organizacoes: MULTIPLICACAO
int prioridadeMult = probabilidade * impacto; // 1 a 9

// Exemplo ATM - funcao Saque
// probabilidade = Alta (3), impacto = Alto (3)
// soma  -> 6  => maxima prioridade (testar primeiro)
// mult  -> 9  => maxima prioridade

// Exemplo ATM - funcao Saldo
// probabilidade = Baixa (1), impacto = Baixo (1)
// soma  -> 2  => menor prioridade
// (mas testar antes do Saque por DEPENDENCIA)`,
        explanation: "O material da disciplina usa a SOMA como método principal (5 níveis: 6 a 2); a multiplicação é citada apenas como alternativa. A ordenação por prioridade define a sequência dos testes — mas dependências entre funções podem forçar testar antes um item de prioridade baixa.",
      },
    },
    {
      id: "risk_matrix",
      title: "Matriz de Risco e Estratégia de Teste",
      subtitle: "Da prioridade à ação",
      contentMarkdown: `A combinação Probabilidade × Impacto pode ser visualizada em uma **matriz de risco**, que orienta quanto esforço aplicar a cada item:

| Impacto \\ Probabilidade | Baixa | Média | Alta |
| :--- | :---: | :---: | :---: |
| **Alto** | Médio | Alto | Crítico |
| **Médio** | Baixo | Médio | Alto |
| **Baixo** | Insignificante | Baixo | Médio |

**Estratégia conforme a classificação:**
* **Crítico / Alto**: testar **primeiro** e com múltiplos critérios (funcional, estrutural, mutação); considerar **mitigação** (inspeção, prototipação, mais níveis de teste).
* **Médio**: testes funcionais básicos e estruturais leves.
* **Baixo / Insignificante**: ficam abaixo da **linha de corte** — testados por último ou só de forma exploratória.

> Em **sistemas críticos** (risco de morte/perdas financeiras) **não há linha de corte**: nenhum item fica sem teste.`,
    },
  ],
};
