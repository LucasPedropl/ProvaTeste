import { StudySection } from "../../schemas/studyTypes";

/**
 * Exemplo resolvido dos 5 critérios de cobertura de fluxo de dados sobre um
 * único programa pequeno (soma condicional). Para cada critério há o conjunto
 * mínimo de casos de teste, as associações cobertas e o grafo dos caminhos
 * percorridos, mostrando a progressão Todas-Definições -> Todos-DU-Caminhos.
 */
export const dfgCriteriaExampleSections: StudySection[] = [
  {
    id: "dfg_criteria_example",
    title: "Exemplo Resolvido: Programa, Grafo e Associações",
    subtitle: "A base usada para cobrir os 5 critérios",
    contentMarkdown: `Vamos usar **um único programa** para mostrar, na prática, como cada critério exige conjuntos de teste diferentes. O código tem duas decisões independentes, o que gera caminhos interessantes para o fluxo da variável \`r\`.

**Associações def-uso (os requisitos de teste):**

| Variável | Definição (nós) | c-usos (nós) | p-usos (arestas) |
| :-- | :-- | :-- | :-- |
| \`a\` | 1 | 3 | (2,3) e (2,4) |
| \`b\` | 1 | 5 | (4,5) e (4,6) |
| \`r\` | 1, 3, 5 | 3, 5, 6 | — |

**Casos de teste candidatos** — cada um corresponde a um caminho completo do grafo:

| Caso | Entradas | Caminho percorrido |
| :--: | :-- | :-- |
| **T1** | a=1, b=1 | 1 → 2 → 3 → 4 → 5 → 6 |
| **T2** | a=1, b=-1 | 1 → 2 → 3 → 4 → 6 |
| **T3** | a=-1, b=1 | 1 → 2 → 4 → 5 → 6 |
| **T4** | a=-1, b=-1 | 1 → 2 → 4 → 6 |

> [!note] Lembre-se: um caminho é **livre de redefinição** (def-clear) para \`r\` quando, entre a definição e o uso, \`r\` **não** recebe outro valor. Como os nós 3 e 5 redefinem \`r\`, pular ou passar por eles muda quais associações são cobertas.`,
    codeExample: {
      language: "java",
      code: `public int soma(int a, int b) {  // no 1: def a, def b
    int r = 0;                   // no 1: def r
    if (a > 0)                   // no 2: p-uso a
        r = r + a;               // no 3: c-uso r, c-uso a, def r
    if (b > 0)                   // no 4: p-uso b
        r = r + b;               // no 5: c-uso r, c-uso b, def r
    return r;                    // no 6: c-uso r
}`,
      explanation:
        "O no 1 (entrada) define os parametros a e b e a variavel r. As duas decisoes (nos 2 e 4) sao os p-usos. Os nos 3 e 5 usam r e o redefinem; o no 6 faz o c-uso final de r.",
    },
    visualDiagramMermaid: `flowchart TD
    N1["1 — def a, b, r"] --> N2{"2 — if a>0 (p-uso a)"}
    N2 -->|V| N3["3 — r=r+a (c-uso a,r; def r)"]
    N2 -->|F| N4{"4 — if b>0 (p-uso b)"}
    N3 --> N4
    N4 -->|V| N5["5 — r=r+b (c-uso b,r; def r)"]
    N4 -->|F| N6["6 — return r (c-uso r)"]
    N5 --> N6`,
  },
  {
    id: "dfg_crit_alldefs",
    title: "1. Cobrindo Todas-Definições",
    subtitle: "Cada definição alcança ao menos um uso",
    contentMarkdown: `**Exigência:** para cada definição, basta **um** caminho livre de redefinição até **qualquer** uso.

Um único caso de teste resolve: o caminho de **T1** passa por todas as definições e cada uma alcança um uso.

| Definição | Uso alcançado em T1 |
| :-- | :-- |
| \`a\` (nó 1) | c-uso no nó 3 |
| \`b\` (nó 1) | c-uso no nó 5 |
| \`r\` (nó 1) | c-uso no nó 3 |
| \`r\` (nó 3) | c-uso no nó 5 |
| \`r\` (nó 5) | c-uso no nó 6 |

✅ **Conjunto suficiente: { T1 }** — é o critério mais fraco.`,
    visualDiagramMermaid: `flowchart LR
    A1["T1: nó 1"] --> A2["2"] -->|V| A3["3"] --> A4["4"] -->|V| A5["5"] --> A6["6"]`,
  },
  {
    id: "dfg_crit_allpuses",
    title: "2. Cobrindo Todos-P-Usos",
    subtitle: "Os dois lados de cada decisão",
    contentMarkdown: `**Exigência:** cobrir, para cada definição, **todas as arestas** de decisão (p-usos).

São 4 p-usos. Dois testes que tomam lados opostos das duas decisões cobrem todos:

| P-uso | Aresta | Caso |
| :-- | :--: | :--: |
| \`a\` verdadeiro | (2,3) | T1 |
| \`a\` falso | (2,4) | T4 |
| \`b\` verdadeiro | (4,5) | T1 |
| \`b\` falso | (4,6) | T4 |

✅ **Conjunto suficiente: { T1, T4 }**.`,
    visualDiagramMermaid: `flowchart LR
    A1["T1: nó 1"] --> A2["2"] -->|V| A3["3"] --> A4["4"] -->|V| A5["5"] --> A6["6"]
    B1["T4: nó 1"] --> B2["2"] -->|F| B4["4"] -->|F| B6["6"]`,
  },
  {
    id: "dfg_crit_pusos_cusos",
    title: "3. Cobrindo Todos-P-Usos/Alguns-C-Usos",
    subtitle: "P-usos completos + um c-uso onde não houver p-uso",
    contentMarkdown: `**Exigência:** cobrir **todos os p-usos** e, para definições **sem** p-uso, ao menos **um** c-uso.

A variável \`r\` não tem p-uso (nunca aparece em decisão), então cada definição de \`r\` precisa de pelo menos um c-uso coberto:

| Definição de \`r\` | C-uso coberto | Caso |
| :-- | :-- | :--: |
| \`r\` (nó 1) | nó 6 (return) | T4 |
| \`r\` (nó 3) | nó 5 | T1 |
| \`r\` (nó 5) | nó 6 | T1 |

Como os p-usos de \`a\` e \`b\` já são cobertos por **{ T1, T4 }**, o mesmo par satisfaz o critério inteiro.

✅ **Conjunto suficiente: { T1, T4 }**.`,
    visualDiagramMermaid: `flowchart LR
    A1["T1: nó 1"] --> A2["2"] -->|V| A3["3"] --> A4["4"] -->|V| A5["5"] --> A6["6"]
    B1["T4: nó 1"] --> B2["2"] -->|F| B4["4"] -->|F| B6["6"]`,
  },
  {
    id: "dfg_crit_alluses",
    title: "4. Cobrindo Todos-Usos",
    subtitle: "Toda definição até todos os c-usos e p-usos",
    contentMarkdown: `**Exigência:** cobrir **todas** as associações — todos os c-usos **e** todos os p-usos.

Aqui as associações da variável \`r\` forçam os **4 casos**, porque cada uma exige um caminho específico que não redefine \`r\`:

| Associação | Caminho livre de redefinição | Caso |
| :-- | :-- | :--: |
| \`r\`(1) → c-uso(5) | 1 → 2 → 4 → 5 (pula o nó 3) | T3 |
| \`r\`(1) → c-uso(6) | 1 → 2 → 4 → 6 | T4 |
| \`r\`(3) → c-uso(5) | 1 → 2 → 3 → 4 → 5 | T1 |
| \`r\`(3) → c-uso(6) | 1 → 2 → 3 → 4 → 6 | T2 |

Esses 4 casos também cobrem, de quebra, todos os p-usos e os c-usos de \`a\` e \`b\`.

✅ **Conjunto suficiente: { T1, T2, T3, T4 }** — os quatro caminhos.`,
    visualDiagramMermaid: `flowchart LR
    A1["T1: nó 1"] --> A2["2"] -->|V| A3["3"] --> A4["4"] -->|V| A5["5"] --> A6["6"]
    C1["T2: nó 1"] --> C2["2"] -->|V| C3["3"] --> C4["4"] -->|F| C6["6"]
    D1["T3: nó 1"] --> D2["2"] -->|F| D4["4"] -->|V| D5["5"] --> D6["6"]
    E1["T4: nó 1"] --> E2["2"] -->|F| E4["4"] -->|F| E6["6"]`,
  },
  {
    id: "dfg_crit_alldupaths",
    title: "5. Cobrindo Todos-DU-Caminhos",
    subtitle: "Todos os caminhos simples livres de redefinição",
    contentMarkdown: `**Exigência (a mais forte):** para cada associação, exercitar **todos** os caminhos simples livres de redefinição — não basta um caminho por uso.

A diferença em relação a Todos-Usos aparece na variável \`b\`: a associação ⟨def \`b\`(1), c-uso(5)⟩ possui **dois** caminhos livres de redefinição distintos, e **ambos** precisam ser exercitados:

| Caminho até o c-uso de \`b\` no nó 5 | Caso |
| :-- | :--: |
| 1 → 2 → **3** → 4 → 5 (passa pelo nó 3) | T1 |
| 1 → 2 → 4 → 5 (pula o nó 3) | T3 |

O mesmo se repete nos p-usos de \`b\` — arestas (4,5) e (4,6) —, cada um com duas rotas (com e sem o nó 3). Somando todas as rotas, os quatro caminhos completos se tornam necessários.

✅ **Conjunto suficiente: { T1, T2, T3, T4 }** — os mesmos casos de Todos-Usos, mas agora exigidos por cobrir **todas as rotas** de cada associação.

---

### Resumo da progressão

| Critério | Casos necessários | Força |
| :-- | :--: | :--: |
| Todas-Definições | { T1 } | mais fraco |
| Todos-P-Usos | { T1, T4 } | ↓ |
| Todos-P-Usos/Alguns-C-Usos | { T1, T4 } | ↓ |
| Todos-Usos | { T1, T2, T3, T4 } | ↓ |
| Todos-DU-Caminhos | { T1, T2, T3, T4 } | mais forte |`,
    visualDiagramMermaid: `flowchart LR
    A1["Rota A (T1): passa pelo nó 3"] --> A2["2"] -->|V| A3["3"] --> A4["4"] -->|V| A5["5 — c-uso de b"]
    B1["Rota B (T3): pula o nó 3"] --> B2["2"] -->|F| B4["4"] -->|V| B5["5 — c-uso de b"]`,
  },
];
