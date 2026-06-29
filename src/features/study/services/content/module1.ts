import { StudyModule } from "../../schemas/studyTypes";
import { dfgCriteriaExampleSections } from "./dfgCriteriaExamples";
import { dfgStructuralSections } from "./dfgStructuralExample";

export const module1: StudyModule = {
  id: "dfg",
  title: "5. Grafo de Fluxo de Dados (DFG)",
  description: "Entenda critérios estruturais baseados no fluxo de variáveis, definições, usos computacionais e predicativos.",
  estimatedMinutes: 35,
  tldr: "O teste de fluxo de dados acompanha o ciclo de vida das variáveis: onde são definidas (def) e usadas (c-uso em computação, p-uso em predicado). O Grafo Def-Uso (DFG) estende o grafo de fluxo de controle e gera os requisitos via associações: <i,j,v> para c-uso e <i,(j,k),v> para p-uso. Critérios vão de Todas-Definições (mais fraco) a Todos-DU-Caminhos (mais forte), passando por Todos-P-Usos, Todos-C-Usos e Todos-Usos. Anomalias clássicas: ur, dd e du.",
  keyTerms: [
    { term: "Definição (def)", definition: "Ocorrência em que a variável recebe um valor." },
    { term: "c-uso", definition: "Uso computacional: variável usada em cálculo/atribuição (nó)." },
    { term: "p-uso", definition: "Uso predicativo: variável avaliada em uma decisão (aresta)." },
    { term: "Grafo Def-Uso (DFG)", definition: "Extensão do grafo de fluxo de controle que anota defs e usos; deriva os requisitos de teste." },
    { term: "Associação def-uso", definition: "Tripla <i,j,v> (c-uso) ou <i,(j,k),v> (p-uso) ligando uma definição a um uso por caminho livre de redefinição." },
    { term: "Anomalia ur/dd/du", definition: "Usar não inicializada (ur), redefinir sem usar (dd), definir e não usar (du)." },
    { term: "Todos-Usos", definition: "Critério que cobre caminhos de cada def até todos os c-usos e p-usos." },
  ],
  sections: [
    {
      id: "dfg_intro",
      title: "Introdução ao Fluxo de Dados",
      subtitle: "Por que ir além do fluxo de controle?",
      contentMarkdown: `Enquanto os critérios de fluxo de controle (como cobertura de instruções e de desvios) focam na execução dos comandos e decisões, o teste de **Fluxo de Dados** foca em **como as variáveis são manipuladas**.
      
Ele analisa o ciclo de vida de uma variável: onde ela é criada (definição) e onde seu valor é lido (uso). Isso permite encontrar falhas sutis onde um valor incorreto é gravado em uma variável e propagado pelo código.

O artefato central é o **Grafo Def-Uso (Grafo de Fluxo de Dados, DFG)**: uma **extensão do Grafo de Fluxo de Controle** que, além dos desvios, anota em cada nó/aresta as **definições e usos** das variáveis. É a partir dele que **derivamos os requisitos de teste** de fluxo de dados.`,
    },
    {
      id: "dfg_concepts",
      title: "Definições e Usos (def, c-uso e p-uso)",
      subtitle: "Os três pilares fundamentais",
      contentMarkdown: `Para analisar o fluxo de dados, classificamos cada ocorrência de uma variável no código:

1. **Definição ($d$ ou $def$)**: Ocorre quando uma variável recebe um valor.
   * *Exemplos*: Atribuições (\`x = 10\`), entrada de dados (\`read(x)\`), parâmetros de métodos.
2. **Uso Computacional ($c$-uso)**: Ocorre quando uma variável é usada em uma computação ou atribuição direta.
   * *Exemplo*: na linha \`y = x + 2;\`, temos um **c-uso** da variável \`x\` e uma **definição** de \`y\`.
3. **Uso Predicativo ($p$-uso)**: Ocorre quando uma variável é avaliada para tomar uma decisão de controle.
   * *Exemplo*: na linha \`if (x > 0)\`, temos um **p-uso** de \`x\`.

As interações são mapeadas em **Associações**:
* **C-uso**: Representado pela tripla $\\langle i, j, v \\rangle$ (definição no nó $i$, c-uso no nó $j$).
* **P-uso**: Representado pela tripla $\\langle i, (j, k), v \\rangle$ (definição no nó $i$, p-uso na aresta de decisão $(j, k)$).`,
      visualDiagramMermaid: `flowchart TD
    N1["(1) x = a + 5 — def x"] --> N2{"(2) x > 10 ? — p-uso x"}
    N2 -- "verdadeiro" --> N3["(3) return x * 2 — c-uso x"]
    N2 -- "falso" --> N4["(4) return b — c-uso b"]`,
      codeExample: {
        language: "java",
        code: `public int calcular(int a, int b) {
    int x = a + 5; // Definição de x (nó 1)
    if (x > 10) {   // P-uso de x (aresta 2-3 ou 2-4)
        return x * 2; // C-uso de x (nó 3)
    }
    return b;       // C-uso de b (nó 4)
}`,
        explanation: "Aqui, a variável x é definida no nó 1, avaliada no nó 2 (p-uso) e usada em uma computação no nó 3 (c-uso).",
      },
    },
    {
      id: "dfg_anomalies",
      title: "Anomalias de Fluxo de Dados",
      subtitle: "Erros comuns detectados pelo DFG",
      contentMarkdown: `Uma anomalia ocorre quando a sequência de operações em uma variável é logicamente questionável ou errônea:

* **ur (Defined and then Undefined)**: Uma variável é declarada ou liberada da memória e depois referenciada sem valor. É o erro de **variável não inicializada**.
* **dd (Defined and Defined)**: Uma variável recebe um valor e, antes que ele seja lido, recebe outro valor. Indica computação redundante ou perda de dados.
* **du (Defined and Undefined)**: Uma variável é definida e depois sai do escopo ou é limpa sem nunca ter sido lida. Indica código inútil.`,
    },
    {
      id: "dfg_criteria",
      title: "Critérios de Cobertura de Dados",
      subtitle: "Quão exaustivo é o seu teste?",
      contentMarkdown: `Existem vários critérios para decidir se os casos de teste cobrem o fluxo de dados satisfatoriamente (do mais fraco para o mais forte):

1. **Todas-Definições**: Para cada definição de variável, o teste deve cobrir pelo menos um caminho livre de redefinição até algum uso (seja c-uso ou p-uso).
2. **Todos-P-Usos**: Exige que cada definição de variável seja testada em caminhos livres de redefinição para todos os seus possíveis p-usos.
3. **Todos-P-Usos/Alguns-C-Usos**: Exige testar todos os p-usos. Se uma definição não tiver p-usos, exige-se pelo menos um c-uso.
4. **Todos-Usos**: Exige testar caminhos livres de redefinição de cada definição para todos os c-usos e todos os p-usos.
5. **Todos-DU-Caminhos**: Exige testar todos os caminhos simples (sem repetição de nós, exceto opcionalmente o primeiro e último) livres de redefinição de cada definição para cada uso. É o critério mais forte e custoso.

> [!note] Existem também as variantes simétricas focadas em computação: **Todos-C-Usos** (cobre as associações de cada definição com todos os seus c-usos) e **Todos-C-Usos/Alguns-P-Usos** (cobre todos os c-usos e, se a definição não tiver c-usos, ao menos um p-uso). São o espelho de Todos-P-Usos e Todos-P-Usos/Alguns-C-Usos.`,
    },
    ...dfgCriteriaExampleSections,
    ...dfgStructuralSections,
  ],
};
