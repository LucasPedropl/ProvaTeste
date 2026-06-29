import { StudySection } from "../../schemas/studyTypes";

/**
 * Seções de aplicação prática do teste estrutural de fluxo de dados sobre o
 * clássico programa "identificador". Reúne um grafo de fluxo de dados (DFG)
 * maior (10 nós), o código anotado por nó e as tabelas de apoio ao critério
 * Todas-Definições (ocorrências e caminhos requeridos), nos moldes do slide.
 */
export const dfgStructuralSections: StudySection[] = [
  {
    id: "dfg_grafo_exemplo",
    title: "Estudo de Caso: o programa Identificador",
    subtitle: "Construindo um DFG maior",
    contentMarkdown: `Para aplicar os critérios de fluxo de dados em algo mais realista, usamos o clássico programa **Identificador**, que verifica se uma cadeia digitada é um identificador válido (começa por letra e tem de 1 a 6 caracteres).

O programa é dividido em **blocos (nós)** numerados de 1 a 10. Cada nó agrupa comandos executados em sequência; as **arestas** representam os desvios de fluxo. Sobre esse grafo iremos mapear todas as **definições** e **usos** de cada variável.

> [!note] As três variáveis analisadas são \`length\` (tamanho acumulado), \`valid_id\` (flag de validade) e \`achar\` (caractere lido a cada passo).`,
    codeExample: {
      language: "c",
      code: `int validaIdentificador() {
    int  length;
    int  valid_id;
    char achar;

/* 1 */ length   = 0;
/* 1 */ achar    = ler();
/* 1 */ valid_id = ehInicialValida(achar);
/* 1 */ if (valid_id)
/* 2 */     length = 1;

/* 3 */ while (achar != EOL) {
/* 4 */     if (ehSeguinteValida(achar) || ehDigito(achar))
/* 5 */         length = length + 1;
            else
/* 6 */         valid_id = 0;
/* 7 */     achar = ler();
        }

/* 8 */ if (valid_id && length >= 1 && length <= 6)
/* 9 */     return VALIDO;
        else
/* 10 */    return INVALIDO;
}`,
      explanation:
        "Cada comentário /* n */ indica a que nó do grafo o comando pertence. O nó 1 concentra a inicialização e a leitura do primeiro caractere; o laço (nós 3 a 7) processa os caracteres seguintes; o nó 8 decide o resultado final.",
    },
    visualDiagramMermaid: `flowchart TD
    N1["1: def length, achar, valid_id"]
    N2["2: def length (= 1)"]
    N3{"3: achar diferente de EOL?"}
    N4{"4: caractere valido?"}
    N5["5: length = length + 1"]
    N6["6: valid_id = 0"]
    N7["7: achar = ler()"]
    N8{"8: valid_id e tamanho de 1 a 6?"}
    N9["9: identificador VALIDO"]
    N10["10: identificador INVALIDO"]
    N1 -->|valid_id| N2
    N1 -->|senao| N3
    N2 --> N3
    N3 -->|sim| N4
    N3 -->|nao| N8
    N4 -->|sim| N5
    N4 -->|nao| N6
    N5 --> N7
    N6 --> N7
    N7 --> N3
    N8 -->|sim| N9
    N8 -->|nao| N10`,
  },
  {
    id: "dfg_tabela_estrutural",
    title: "Tabela do Teste Estrutural de Dados",
    subtitle: "Critério Todas-Definições aplicado ao DFG",
    contentMarkdown: `Com o grafo pronto, o primeiro passo é **mapear onde cada variável é definida e usada**. Lembre-se: o **c-uso** ocorre num nó (computação) e o **p-uso** ocorre numa decisão (aresta).

| Variável | Definições (nós) | c-usos (nós) | p-usos (nós) |
| :-- | :-- | :-- | :-- |
| \`length\` | 1, 2, 5 | 5 | 8 |
| \`valid_id\` | 1, 6 | — | 1, 8 |
| \`achar\` | 1, 7 | 1 | 3, 4 |

## Critério Todas-Definições

O critério **Todas-Definições** exige que, para **cada definição** de variável, o conjunto de testes exercite **pelo menos um sub-caminho livre de redefinição** (def-clear) que alcance **algum uso** (c-uso ou p-uso) daquela definição.

A tabela abaixo auxilia na aplicação do critério: ela lista, para cada definição, os **caminhos requeridos** candidatos. Basta escolher (cobrir) **um** deles por definição para satisfazer Todas-Definições. Caminhos marcados com **×** são **não executáveis** (inviáveis).

| Nó | Variável | Caminho requerido |
| :--: | :-- | :-- |
| 1 | \`length\` | (1, 3, 4, 5) |
| 1 | \`length\` | (1, 3, 8, 9) |
| 1 | \`length\` | (1, 3, 8, 10) |
| 1 | \`valid_id\` | (1, 2) |
| 1 | \`valid_id\` | (1, 3) |
| 1 | \`valid_id\` | (1, 3, 8, 9) |
| 1 | \`valid_id\` | (1, 3, 8, 10) |
| 1 | \`achar\` | (1, 3, 4) |
| 1 | \`achar\` | (1, 3, 8) |
| 1 | \`achar\` | (1, 3, 4, 5) |
| 1 | \`achar\` | (1, 3, 4, 6) |
| 2 | \`length\` | (2, 3, 4, 5) |
| 2 | \`length\` | (2, 3, 8, 9) |
| 2 | \`length\` | (2, 3, 8, 10) × |
| 5 | \`length\` | (5, 7, 3, 4, 5) |
| 5 | \`length\` | (5, 7, 3, 8, 9) |
| 5 | \`length\` | (5, 7, 3, 8, 10) |
| 6 | \`valid_id\` | (6, 7, 3, 8, 9) × |
| 6 | \`valid_id\` | (6, 7, 3, 8, 10) |
| 7 | \`achar\` | (7, 3, 4) |
| 7 | \`achar\` | (7, 3, 8) |
| 7 | \`achar\` | (7, 3, 4, 5) |
| 7 | \`achar\` | (7, 3, 4, 6) |

> [!tip] Para cobrir Todas-Definições com poucos testes, escolha caminhos que se reaproveitem entre as definições. Um identificador válido como \`a1\` percorre 1→2→3→4→5→7→3→8→9 e já cobre várias definições de uma só vez.`,
  },
  {
    id: "dfg_associacoes_usos",
    title: "Associações e o Critério Todos-Usos",
    subtitle: "De Todos-C-Usos e Todos-P-Usos até Todos-Usos",
    contentMarkdown: `Enquanto Todas-Definições exige **um uso por definição**, os critérios mais fortes trabalham sobre **associações** — pares definição→uso ligados por um caminho **livre de redefinição** (def-clear):

* **c-uso** → tripla $\\langle i, j, v \\rangle$ (def no nó $i$, c-uso no nó $j$).
* **p-uso** → tripla $\\langle i, (j, k), v \\rangle$ (def no nó $i$, p-uso na aresta de decisão $(j, k)$).

Aplicando ao programa Identificador (mesma tabela de def/uso da seção anterior):

| Variável | Tipo | Associações requeridas |
| :-- | :-- | :-- |
| \`length\` | c-uso | (1,5), (2,5), (5,5) |
| \`length\` | p-uso | (1,(8,9)), (1,(8,10)), (2,(8,9)), (2,(8,10)), (5,(8,9)), (5,(8,10)) |
| \`valid_id\` | p-uso | (1,(1,2)), (1,(1,3)), (1,(8,9)), (1,(8,10)), (6,(8,9)), (6,(8,10)) |
| \`achar\` | c-uso | (1,1) |
| \`achar\` | p-uso | (1,(3,4)), (1,(3,8)), (1,(4,5)), (1,(4,6)), (7,(3,4)), (7,(3,8)), (7,(4,5)), (7,(4,6)) |

> [!note] \`valid_id\` não possui c-uso (só aparece em decisões), por isso só gera associações de p-uso. Já \`length\` tem o caso especial \`(5,5)\`: a definição no nó 5 alcança o c-uso no próprio nó 5 na **iteração seguinte** do laço (caminho 5→7→3→4→5, livre de redefinição).

**Como os critérios usam essas associações:**

1. **Todos-C-Usos**: exercitar todas as associações da coluna **c-uso**.
2. **Todos-P-Usos**: exercitar todas as associações da coluna **p-uso**.
3. **Todos-Usos**: exercitar **todas** as associações (c-uso **e** p-uso) — é a união das duas listas acima.

> [!tip] Para conferência rápida (no estilo do slide), guarde os exemplos: c-uso \`<1, 5, length>\` e p-uso \`<1, (3,4), achar>\`. Uma tabela como esta — análoga à de Todas-Definições — guia a seleção dos caminhos de teste para cada associação.`,
  },
];
