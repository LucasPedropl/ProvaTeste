import { StudyModule } from "../../schemas/studyTypes";

export const criteria: StudyModule = {
  id: "criteria",
  title: "4. Critérios de Teste: Panorama Geral",
  description: "Entenda o que é um critério de teste e as três grandes técnicas: funcional (caixa-preta), estrutural (caixa-branca) e baseada em defeitos.",
  estimatedMinutes: 22,
  tldr: "Um critério de teste é a regra que define quais casos criar e quando o conjunto é adequado. Três técnicas complementares: funcional (caixa-preta, baseada na especificação), estrutural (caixa-branca, baseada no código) e baseada em defeitos (ex.: mutação). Critério mais forte subsume o mais fraco, com mais custo.",
  keyTerms: [
    { term: "Critério de teste", definition: "Regra para gerar casos de teste e avaliar a adequação de um conjunto." },
    { term: "Técnica funcional", definition: "Caixa-preta: testa entradas/saídas conforme a especificação." },
    { term: "Técnica estrutural", definition: "Caixa-branca: testa a estrutura interna (fluxo de controle/dados)." },
    { term: "Valor limite", definition: "Critério funcional que testa as fronteiras das classes de equivalência." },
    { term: "Subsunção", definition: "C1 subsume C2 se todo conjunto adequado a C1 também é adequado a C2." },
  ],
  sections: [
    {
      id: "crit_what",
      title: "O que é um Critério de Teste?",
      subtitle: "A regra que guia a seleção de casos",
      contentMarkdown: `Como o teste exaustivo é impossível, precisamos de uma forma sistemática de escolher **quais** casos de teste criar. Essa é a função de um **Critério de Teste**.

Um critério de teste é uma **regra** ou **predicado** que serve a dois propósitos:

1. **Geração**: define os requisitos que os casos de teste devem satisfazer (ex.: "cubra todas as arestas do grafo").
2. **Avaliação (adequação)**: permite medir se um conjunto de casos de teste é **suficiente** segundo aquele critério.

Os critérios se dividem em três grandes **técnicas**, agrupadas pela fonte de informação que utilizam.`,
    },
    {
      id: "crit_techniques",
      title: "As Três Técnicas de Teste",
      subtitle: "Funcional, Estrutural e Baseada em Defeitos",
      contentMarkdown: `| Técnica | Base | Também chamada |
| :--- | :--- | :--- |
| **Funcional** | Especificação / requisitos | Caixa-preta (black-box) |
| **Estrutural** | Código-fonte / fluxo interno | Caixa-branca (white-box) |
| **Baseada em Defeitos** | Tipos de defeitos conhecidos | Ex.: mutação, semeadura |

* **Funcional (Caixa-Preta)**: testa **o que** o software faz, sem olhar o código. Foca nas entradas e saídas conforme a especificação.
* **Estrutural (Caixa-Branca)**: testa **como** o software faz, analisando a estrutura interna (fluxo de controle e de dados). Mede cobertura sobre o grafo do programa.
* **Baseada em Defeitos**: foca em defeitos típicos. Avalia o quão bons são os testes em detectar erros plantados (ex.: teste de mutação).

As técnicas são **complementares**: uma estratégia robusta combina as três.`,
    },
    {
      id: "crit_blackbox",
      title: "Principais Critérios Funcionais (Caixa-Preta)",
      subtitle: "Partição, Valor Limite e Tabela de Decisão",
      contentMarkdown: `Os critérios funcionais mais cobrados:

1. **Particionamento em Classes de Equivalência**: divide o domínio de entrada em classes nas quais o software deveria se comportar de forma equivalente. Testa-se **um representante** de cada classe (válidas e inválidas), reduzindo drasticamente o número de casos.
2. **Análise de Valor Limite (Boundary Value)**: defeitos costumam se esconder nas **fronteiras** das classes. Testa-se os valores **na borda** e **imediatamente ao redor** (ex.: para 1–100, testar 0, 1, 100, 101).
3. **Tabela de Decisão**: modela combinações de **condições** e suas **ações** resultantes. Ideal para regras de negócio complexas com muitos "se isso e aquilo".
4. **Teste de Transição de Estados**: usado quando o comportamento depende do estado atual (ex.: máquinas de estado, fluxos de pedido).`,
      codeExample: {
        language: "java",
        code: `// Regra: aprova empréstimo se renda >= 2000 E idade entre 18 e 65.

// Classes de equivalência + valores limite para 'idade' [18..65]:
//   inválida baixa:  17
//   limite inferior: 18  (válido)
//   válida típica:   40
//   limite superior: 65  (válido)
//   inválida alta:   66

// Cada caso testa uma fronteira onde defeitos de '<' vs '<=' aparecem.`,
        explanation: "A análise de valor limite revela defeitos clássicos de operador relacional (usar > em vez de >=). Combinada com classes de equivalência, garante cobertura funcional eficiente com poucos casos.",
      },
    },
    {
      id: "crit_strength",
      title: "Adequação e Relação de Força",
      subtitle: "Critérios mais fortes incluem os mais fracos",
      contentMarkdown: `Critérios podem ser comparados pela **relação de inclusão (subsunção)**: dizemos que um critério **C1 subsume C2** se todo conjunto de testes adequado a C1 também é adequado a C2.

No teste estrutural de fluxo de controle, por exemplo:

* **Todos-Caminhos** subsume **Todas-Arestas**, que subsume **Todos-Nós**.

Quanto **mais forte** o critério:

* Maior a **confiança** e a chance de revelar defeitos.
* Maior o **custo** (mais casos de teste a projetar e manter).

Por isso a escolha do critério é uma decisão de **engenharia**: equilibra-se o risco do componente (ver Teste Baseado em Risco) com o esforço disponível. Em componentes críticos, usam-se critérios fortes; em componentes triviais, critérios mais leves.`,
    },
  ],
};
