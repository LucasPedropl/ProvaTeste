import { SimulationQuestion } from "../../schemas/studyTypes";

/**
 * Tema 1 — Testes estruturais com critérios baseados no Grafo de Fluxo de Dados.
 * Questões práticas no estilo da Prova 1 (aplicar critério, classificar
 * ocorrências e gerar casos de teste) e uma de múltipla escolha sobre subsunção.
 */
export const structuralDfgQuestions: SimulationQuestion[] = [
  {
    id: "p2_dfg_1",
    title: "Critério Todos-Usos para a variável soma",
    statement:
      "Aplique o critério estrutural **Todos-Usos** para a variável `soma` no método abaixo. " +
      "Identifique os nós de **definição (def)**, os **c-usos** e os **p-usos** de `soma`, " +
      "monte as associações **def-uso** e crie os **casos de teste** mínimos que satisfazem o critério para essa variável.",
    codeContext: `public int soma(int[] v) {
    int soma = 0;            // 1
    int i = 0;               // 2
    while (i < v.length) {   // 3
        if (v[i] > 0) {      // 4
            soma = soma + v[i]; // 5
        }
        i = i + 1;           // 6
    }
    return soma;             // 7
}`,
    expectedResponse:
      "**Ocorrências de `soma`:**\n" +
      "* **def** no nó 1 (`soma = 0`) e no nó 5 (`soma = soma + v[i]`).\n" +
      "* **c-uso** no nó 5 (lado direito `soma + v[i]`) e no nó 7 (`return soma`).\n" +
      "* `soma` **não possui p-uso** (nunca aparece em uma decisão).\n\n" +
      "**Associações def-uso (def, uso, variável):**\n" +
      "* ⟨1, 5, soma⟩ — def no 1 alcança o c-uso no 5.\n" +
      "* ⟨1, 7, soma⟩ — def no 1 alcança o c-uso no 7 (quando o `if` nunca é verdadeiro).\n" +
      "* ⟨5, 5, soma⟩ — def no 5 alcança o c-uso no 5 (próxima iteração).\n" +
      "* ⟨5, 7, soma⟩ — def no 5 alcança o c-uso no 7.\n\n" +
      "**Casos de teste (cobrem todas as associações):**\n" +
      "1. `v = {}` (vetor vazio) → executa 1 e 7 sem entrar no laço, cobrindo ⟨1, 7, soma⟩. Saída esperada: `0`.\n" +
      "2. `v = {-2}` (só negativo) → entra no laço, mas o `if` é falso; ainda cobre ⟨1, 7, soma⟩. Saída esperada: `0`.\n" +
      "3. `v = {4, 6}` (positivos) → cobre ⟨1, 5, soma⟩, ⟨5, 5, soma⟩ e ⟨5, 7, soma⟩. Saída esperada: `10`.",
    checklist: [
      { id: "c1", description: "Identificou corretamente as definições (nós 1 e 5) de soma.", points: 25 },
      { id: "c2", description: "Distinguiu os c-usos (nós 5 e 7) e notou a ausência de p-uso.", points: 30 },
      { id: "c3", description: "Montou ao menos 3 associações def-uso válidas.", points: 25 },
      { id: "c4", description: "Criou casos de teste que cobrem as associações com saídas esperadas.", points: 20 },
    ],
    totalPoints: 100,
  },
  {
    id: "p2_dfg_2",
    title: "Critério Todas-Definições",
    statement:
      "Aplique o critério **Todas-Definições** ao método abaixo. " +
      "Especifique o critério (cada definição deve alcançar **pelo menos um uso**), liste as definições das variáveis e crie **3 casos de teste** mostrando o passo a passo.",
    codeContext: `public int maior(int[] v) {
    int maior = v[0];        // 1
    int i = 1;               // 2
    while (i < v.length) {   // 3
        if (v[i] > maior) {  // 4
            maior = v[i];    // 5
        }
        i = i + 1;           // 6
    }
    return maior;            // 7
}`,
    expectedResponse:
      "**Critério Todas-Definições:** para cada definição de variável, o conjunto de testes deve exercitar ao menos um caminho livre de redefinição até **um** de seus usos (c-uso ou p-uso).\n\n" +
      "**Definições:**\n" +
      "* `maior`: nó 1 e nó 5.\n" +
      "* `i`: nó 2 e nó 6.\n\n" +
      "**Usos que satisfazem cada definição:**\n" +
      "* def `maior`@1 → uso em 4 (p-uso) ou 7 (c-uso).\n" +
      "* def `maior`@5 → uso em 4/7.\n" +
      "* def `i`@2 → uso em 3 (p-uso) ou 4.\n" +
      "* def `i`@6 → uso em 3.\n\n" +
      "**Casos de teste:**\n" +
      "1. `v = {9}` → cobre def `maior`@1 alcançando o uso no 7. Saída: `9`.\n" +
      "2. `v = {2, 8}` → o `if` é verdadeiro, cobrindo def `maior`@5 e def `i`@2/@6 nos usos do laço. Saída: `8`.\n" +
      "3. `v = {7, 1, 3}` → reforça def `i`@6 alcançando o p-uso no 3 em múltiplas iterações. Saída: `7`.\n\n" +
      "Como cada definição de `maior` e de `i` alcança ao menos um uso, o critério Todas-Definições é satisfeito.",
    checklist: [
      { id: "c1", description: "Enunciou corretamente o critério Todas-Definições.", points: 30 },
      { id: "c2", description: "Listou as definições de maior e i nos nós corretos.", points: 30 },
      { id: "c3", description: "Criou casos de teste cobrindo cada definição até um uso.", points: 40 },
    ],
    totalPoints: 100,
  },
  {
    id: "p2_dfg_3",
    title: "Hierarquia de força entre critérios (múltipla escolha)",
    statement:
      "Sobre a relação de **subsunção** (força) entre os critérios de fluxo de dados e de fluxo de controle, assinale a alternativa **correta**:\n\n" +
      "a) Todos-Nós subsume Todas-Arestas, pois percorrer todos os nós obriga necessariamente a percorrer todas as arestas que os conectam no grafo.\n" +
      "b) Todos-Usos subsume Todas-Definições e Todos-P-Usos.\n" +
      "c) Todas-Definições é o critério estrutural mais forte que existe.\n" +
      "d) Todos-DU-Caminhos é mais fraco do que Todas-Definições.",
    expectedResponse:
      "**Resposta correta: (b).**\n\n" +
      "* **(b) Correta:** cobrir caminhos até *todos os usos* engloba, necessariamente, alcançar ao menos um uso por definição (Todas-Definições) e cobrir os p-usos (Todos-P-Usos). Por isso Todos-Usos subsume ambos.\n" +
      "* **(a) Errada:** é o contrário — Todas-Arestas subsume Todos-Nós. Percorrer todas as arestas garante visitar todos os nós, mas visitar todos os nós **não** garante percorrer todas as arestas.\n" +
      "* **(c) Errada:** Todas-Definições é um dos critérios **mais fracos** de fluxo de dados; o mais forte é Todos-DU-Caminhos.\n" +
      "* **(d) Errada:** Todos-DU-Caminhos é o **mais forte**, logo não pode ser mais fraco que Todas-Definições.",
    checklist: [
      { id: "c1", description: "Marcou a alternativa (b) como correta.", points: 100 },
    ],
    totalPoints: 100,
  },
  {
    id: "p2_dfg_4",
    title: "Classificação de ocorrências (def, c-uso, p-uso)",
    statement:
      "Para o trecho abaixo, **classifique cada ocorrência** das variáveis `x` e `y` como definição (def), uso computacional (c-uso) ou uso predicativo (p-uso), indicando a linha.",
    codeContext: `x = a + b;          // L1
if (x > limite) {   // L2
    y = x * 2;      // L3
}
imprimir(y);        // L4`,
    expectedResponse:
      "* **L1:** `x` → **def**. `a` e `b` → **c-uso**.\n" +
      "* **L2:** `x` → **p-uso** (avaliada na decisão `if`). `limite` → **p-uso**.\n" +
      "* **L3:** `y` → **def**. `x` → **c-uso** (usada na computação `x * 2`).\n" +
      "* **L4:** `y` → **c-uso** (passada como argumento).\n\n" +
      "Observação: a mesma variável pode ter um c-uso e um p-uso dependendo de **onde** é utilizada — em computação/atribuição (c-uso) ou em uma decisão de controle (p-uso).",
    checklist: [
      { id: "c1", description: "Classificou corretamente as definições (x em L1, y em L3).", points: 35 },
      { id: "c2", description: "Identificou o p-uso de x na decisão da L2.", points: 35 },
      { id: "c3", description: "Identificou os c-usos restantes (x em L3, y em L4, a/b em L1).", points: 30 },
    ],
    totalPoints: 100,
  },
  {
    id: "p2_dfg_5",
    title: "Critério Todos-P-Usos",
    statement:
      "Aplique o critério **Todos-P-Usos** para a variável `n` no método abaixo. " +
      "Indique os p-usos de `n` e crie os **casos de teste** que exercitam o resultado **verdadeiro e falso** de cada decisão que usa `n`.",
    codeContext: `public String classifica(int n) {
    String r;
    if (n > 0) {          // d1
        r = "positivo";
    } else if (n < 0) {   // d2
        r = "negativo";
    } else {
        r = "zero";
    }
    return r;
}`,
    expectedResponse:
      "**p-usos de `n`:** na decisão `d1` (`n > 0`) e na decisão `d2` (`n < 0`).\n\n" +
      "Todos-P-Usos exige cobrir, para cada definição de `n` (o parâmetro), **ambos os ramos** (verdadeiro/falso) de cada predicado que a utiliza.\n\n" +
      "**Casos de teste:**\n" +
      "1. `n = 5` → d1 **verdadeira**. Saída: `\"positivo\"`.\n" +
      "2. `n = -3` → d1 **falsa**, d2 **verdadeira**. Saída: `\"negativo\"`.\n" +
      "3. `n = 0` → d1 **falsa**, d2 **falsa**. Saída: `\"zero\"`.\n\n" +
      "Com esses três casos, todos os ramos verdadeiro/falso de d1 e d2 (os p-usos de `n`) são exercitados.",
    checklist: [
      { id: "c1", description: "Identificou os p-usos de n em d1 e d2.", points: 30 },
      { id: "c2", description: "Explicou que é preciso cobrir os ramos verdadeiro e falso.", points: 30 },
      { id: "c3", description: "Criou os 3 casos de teste com entradas e saídas esperadas.", points: 40 },
    ],
    totalPoints: 100,
  },
  {
    id: "p2_dfg_6",
    title: "Diferença entre c-uso e p-uso",
    statement:
      "Explique, com suas palavras, a diferença entre **uso computacional (c-uso)** e **uso predicativo (p-uso)** de uma variável. " +
      "Apresente a **notação das triplas** de associação para cada caso e dê um exemplo de cada.",
    expectedResponse:
      "* **c-uso (computacional):** a variável é usada em uma computação ou atribuição direta (ex.: `total = preco * qtd;` — `preco` e `qtd` são c-usos). Associa-se a um **nó**: tripla ⟨i, j, v⟩ (definição no nó i, c-uso no nó j).\n" +
      "* **p-uso (predicativo):** a variável é usada na avaliação de uma **decisão** de controle (ex.: `if (saldo > 0)` — `saldo` é p-uso). Como o resultado da decisão escolhe uma **aresta**, associa-se a uma aresta: tripla ⟨i, (j, k), v⟩ (definição no nó i, p-uso na aresta (j, k)).\n\n" +
      "Em resumo: o c-uso está ligado ao **valor computado em um nó**, enquanto o p-uso está ligado ao **desvio de fluxo em uma aresta** decorrente de um predicado.",
    checklist: [
      { id: "c1", description: "Diferenciou corretamente c-uso (computação) de p-uso (decisão).", points: 40 },
      { id: "c2", description: "Apresentou as triplas ⟨i, j, v⟩ e ⟨i, (j, k), v⟩.", points: 30 },
      { id: "c3", description: "Deu um exemplo coerente de cada tipo de uso.", points: 30 },
    ],
    totalPoints: 100,
  },
];
