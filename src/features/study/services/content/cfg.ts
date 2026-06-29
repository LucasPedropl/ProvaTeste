import { StudyModule } from "../../schemas/studyTypes";

export const cfg: StudyModule = {
  id: "cfg",
  title: "3. Grafo de Fluxo de Controle (CFG)",
  description: "Aprenda a modelar um programa como grafo: nós, arestas, blocos básicos, complexidade ciclomática e os critérios de cobertura estrutural.",
  estimatedMinutes: 25,
  tldr: "O CFG modela o programa como grafo dirigido G=(N,E): nós são blocos básicos e arestas são desvios de fluxo. A complexidade ciclomática V(G)=E-N+2=P+1 dá o nº de caminhos independentes. Força dos critérios: Todos-Caminhos ⊃ Todas-Arestas ⊃ Todos-Nós.",
  keyTerms: [
    { term: "Bloco básico (nó)", definition: "Sequência maximal de comandos executados sem desvios internos." },
    { term: "Nó de decisão", definition: "Nó com duas ou mais arestas de saída (if, while)." },
    { term: "Complexidade ciclomática V(G)", definition: "Nº de caminhos independentes: E-N+2 ou P+1 (P = nº de predicados)." },
    { term: "Cobertura de nós", definition: "Todos-Nós: cada comando executado ao menos uma vez." },
    { term: "Cobertura de arestas", definition: "Todas-Arestas: cada decisão avaliada como verdadeira e falsa; subsume nós." },
  ],
  sections: [
    {
      id: "cfg_intro",
      title: "Por que representar código como Grafo?",
      subtitle: "A base do teste estrutural",
      contentMarkdown: `O **Grafo de Fluxo de Controle (GFC ou CFG - Control Flow Graph)** é uma representação abstrata de **todos os caminhos** que podem ser percorridos durante a execução de um programa.

Ele é a base do **teste estrutural** (caixa-branca), pois permite medir objetivamente **quanto** do código foi exercitado pelos casos de teste. Em vez de "achar" que testamos bastante, conseguimos calcular cobertura sobre o grafo.

Formalmente, um CFG é um grafo dirigido **G = (N, E)** onde:

* **N** é o conjunto de **nós** (blocos de comandos).
* **E** é o conjunto de **arestas** (transferências de controle entre blocos).
* Há um **nó de entrada** (início) e um ou mais **nós de saída** (fim).`,
    },
    {
      id: "cfg_blocks",
      title: "Nós, Arestas e Blocos Básicos",
      subtitle: "Os elementos do grafo",
      contentMarkdown: `* **Bloco Básico (Nó)**: uma sequência maximal de comandos que é executada **sequencialmente**, sem desvios — ou seja, se o primeiro comando executa, todos os demais do bloco também executam. O controle só entra pelo início e só sai pelo fim do bloco.
* **Aresta**: representa um possível **desvio de fluxo** de um bloco para outro (causado por \`if\`, \`while\`, \`for\`, \`return\`, etc.).
* **Nó de Decisão**: um nó com **duas ou mais arestas de saída** (ex.: a condição de um \`if\` ou \`while\`).

Estruturas de controle viram subgrafos característicos:

| Estrutura | Forma no grafo |
| :--- | :--- |
| Sequência | Nós ligados em linha (1 → 2 → 3) |
| \`if\` | Um nó decisão com 2 saídas que reconvergem |
| \`if/else\` | Decisão com 2 ramos distintos |
| \`while\` | Decisão com aresta de retorno (laço) |`,
    },
    {
      id: "cfg_build",
      title: "Construindo um CFG a partir do Código",
      subtitle: "Exemplo prático passo a passo",
      contentMarkdown: `Vamos numerar os comandos do código e desenhar o grafo. Considere a função abaixo, que retorna o maior valor positivo de um vetor.

O fluxo resultante pode ser visualizado assim (cada número é um nó/bloco):

* **Nó 1**: inicialização (\`max = 0; i = 0;\`)
* **Nó 2**: condição do laço \`while (i < n)\` — nó de decisão
* **Nó 3**: condição \`if (v[i] > max)\` — nó de decisão
* **Nó 4**: corpo do \`if\` (\`max = v[i];\`)
* **Nó 5**: incremento (\`i++;\`) — retorna ao nó 2
* **Nó 6**: \`return max;\` (saída)`,
      visualDiagramMermaid: `flowchart TD
    N1["(1) max = 0; i = 0"] --> N2{"(2) i < n ?"}
    N2 -- "falso" --> N6["(6) return max"]
    N2 -- "verdadeiro" --> N3{"(3) v[i] > max ?"}
    N3 -- "verdadeiro" --> N4["(4) max = v[i]"]
    N3 -- "falso" --> N5["(5) i++"]
    N4 --> N5
    N5 --> N2`,
      codeExample: {
        language: "java",
        code: `int maiorPositivo(int[] v, int n) {   // (1) início
    int max = 0;
    int i = 0;
    while (i < n) {                    // (2) decisão do laço
        if (v[i] > max) {              // (3) decisão
            max = v[i];                // (4)
        }
        i++;                           // (5) volta para (2)
    }
    return max;                        // (6) saída
}`,
        explanation: "Os nós 2 e 3 são nós de decisão (têm duas saídas). A aresta de 5 para 2 forma o laço (back edge). O grafo evidencia que existe um caminho onde o nó 4 nunca executa (quando nenhum elemento supera max).",
      },
    },
    {
      id: "cfg_complexity",
      title: "Complexidade Ciclomática (McCabe)",
      subtitle: "Medindo a quantidade de caminhos",
      contentMarkdown: `A **Complexidade Ciclomática V(G)**, proposta por McCabe, mede o número de **caminhos linearmente independentes** no grafo. Ela indica o esforço mínimo de teste e a complexidade lógica do código.

Há três fórmulas equivalentes:

* **V(G) = E - N + 2**, onde E = nº de arestas e N = nº de nós.
* **V(G) = P + 1**, onde P = número de **nós de predicado** (decisões).
* **V(G) = número de regiões** fechadas do grafo planar + 1.

No exemplo anterior temos 2 nós de decisão (nós 2 e 3), logo:

* \`V(G) = P + 1 = 2 + 1 = 3\`

Isso significa que existem **3 caminhos independentes**, e este é o número mínimo de casos de teste para o critério de **cobertura de caminhos básicos**. Valores altos de V(G) (acima de ~10) indicam código difícil de testar e candidato a refatoração.`,
    },
    {
      id: "cfg_criteria",
      title: "Critérios de Cobertura de Controle",
      subtitle: "Todos-Nós, Todas-Arestas e Todos-Caminhos",
      contentMarkdown: `Sobre o CFG definimos critérios estruturais, do mais fraco ao mais forte:

1. **Cobertura de Nós (Todos-Nós / cobertura de comandos)**: exige que **cada nó** (cada comando) seja executado ao menos uma vez. É o critério mais básico.
2. **Cobertura de Arestas (Todas-Arestas / cobertura de desvios)**: exige que **cada aresta** seja percorrida — ou seja, cada decisão deve ser avaliada como **verdadeira e falsa** pelo menos uma vez. Subsome a cobertura de nós.
3. **Cobertura de Condições**: cada **condição booleana** individual de uma decisão deve assumir verdadeiro e falso (importante em decisões compostas com \`&&\` e \`||\`).
4. **Cobertura de Caminhos (Todos-Caminhos)**: exige executar **todos os caminhos possíveis** do início ao fim. É o critério mais forte, porém geralmente **impraticável** quando há laços (número infinito/explosivo de caminhos).

> [!warn] Relação de força (subsunção): Todos-Caminhos ⊃ Todas-Arestas ⊃ Todos-Nós. Cobrir arestas garante cobrir nós, mas o contrário NÃO é verdade — pegadinha clássica de prova.`,
    },
  ],
};
