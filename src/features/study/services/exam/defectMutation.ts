import { SimulationQuestion } from "../../schemas/studyTypes";

/**
 * Tema 2 — Testes baseados em defeitos: semeadura de defeitos (Mills) e teste
 * de mutação. Inclui cálculos, análise de mutantes e geração de testes que
 * matam mutantes, além de uma questão de múltipla escolha.
 */
export const defectMutationQuestions: SimulationQuestion[] = [
  {
    id: "p2_def_1",
    title: "Estimativa por semeadura de defeitos (Mills)",
    statement:
      "Uma equipe semeou **S = 40** defeitos artificiais no código. Após a execução dos testes, foram encontrados " +
      "**24 defeitos semeados** (s) e **18 defeitos reais** (n). " +
      "Estime o **número total de defeitos reais (N)** do sistema e quantos defeitos reais ainda **permanecem** não encontrados. " +
      "Mostre a fórmula e os cálculos.",
    expectedResponse:
      "Fórmula da semeadura (Mills): $$N = \\frac{n \\times S}{s}$$\n\n" +
      "Substituindo `n = 18`, `S = 40`, `s = 24`:\n\n" +
      "$$N = \\frac{18 \\times 40}{24} = \\frac{720}{24} = 30$$\n\n" +
      "* **Total estimado de defeitos reais:** N = **30**.\n" +
      "* **Defeitos reais ainda não encontrados:** N − n = 30 − 18 = **12 defeitos restantes**.\n\n" +
      "A estimativa assume que os testes têm a mesma eficácia para detectar defeitos reais e semeados (proporção s/S ≈ n/N).",
    checklist: [
      { id: "c1", description: "Aplicou a fórmula N = (n × S) / s.", points: 35 },
      { id: "c2", description: "Chegou ao total estimado N = 30.", points: 35 },
      { id: "c3", description: "Calculou os defeitos restantes N − n = 12.", points: 30 },
    ],
    totalPoints: 100,
  },
  {
    id: "p2_def_2",
    title: "Cálculo do escore de mutação",
    statement:
      "Uma ferramenta gerou **120 mutantes** (M) de uma classe. Ao rodar a suíte, **84 mutantes foram mortos** (DM) e 36 ficaram vivos. " +
      "A análise revelou que **24 mutantes são equivalentes** (ME). " +
      "Calcule o **escore de mutação** e interprete o resultado. Mostre a fórmula.",
    expectedResponse:
      "Fórmula do escore de mutação: $$ms(P, T) = \\frac{DM}{M - ME}$$\n\n" +
      "Substituindo `DM = 84`, `M = 120`, `ME = 24`:\n\n" +
      "$$ms = \\frac{84}{120 - 24} = \\frac{84}{96} = 0{,}875$$\n\n" +
      "* **Escore de mutação = 0,875 (87,5%).**\n" +
      "* Os mutantes **equivalentes são removidos do denominador**, pois não podem ser mortos por nenhum teste.\n" +
      "* Interpretação: a suíte matou 87,5% dos mutantes **não equivalentes**. Para chegar a 1,0 seria preciso criar novos casos de teste que matem os mutantes vivos restantes (96 − 84 = 12 mutantes não equivalentes ainda vivos).",
    checklist: [
      { id: "c1", description: "Usou a fórmula ms = DM / (M − ME).", points: 30 },
      { id: "c2", description: "Identificou DM=84, M=120, ME=24 e excluiu os equivalentes.", points: 35 },
      { id: "c3", description: "Chegou a 0,875 (87,5%) e interpretou o resultado.", points: 35 },
    ],
    totalPoints: 100,
  },
  {
    id: "p2_def_3",
    title: "Matar um mutante e identificar o operador",
    statement:
      "Considere o método **original** abaixo e um **mutante** em que a linha `if (v[i] == x)` foi alterada para `if (v[i] != x)`. " +
      "O mutante é **equivalente**? Se não, crie um **caso de teste** (entrada + saída esperada) que o **mate** e identifique o **operador de mutação** aplicado.",
    codeContext: `public int contar(int[] v, int x) {
    int c = 0;
    for (int i = 0; i < v.length; i++) {
        if (v[i] == x) {     // mutante: v[i] != x
            c = c + 1;
        }
    }
    return c;
}`,
    expectedResponse:
      "**Não é equivalente** — a troca de `==` por `!=` muda o comportamento sempre que o vetor contém valores diferentes de `x`.\n\n" +
      "**Operador de mutação:** substituição de operador relacional (**ROR — Relational Operator Replacement**).\n\n" +
      "**Caso de teste que mata o mutante:**\n" +
      "* Entrada: `v = {1, 2, 2}`, `x = 2`.\n" +
      "* Saída esperada (original): **2** (há dois elementos iguais a 2).\n" +
      "* Saída do mutante: **1** (conta os elementos *diferentes* de 2, ou seja, apenas o `1`).\n\n" +
      "Como a saída obtida (1) difere da esperada (2), o mutante é **morto**.",
    checklist: [
      { id: "c1", description: "Afirmou que o mutante NÃO é equivalente.", points: 25 },
      { id: "c2", description: "Identificou o operador ROR (troca de operador relacional).", points: 30 },
      { id: "c3", description: "Criou um caso de teste com saída esperada ≠ saída do mutante.", points: 45 },
    ],
    totalPoints: 100,
  },
  {
    id: "p2_def_4",
    title: "Mutantes mortos, vivos e equivalentes",
    statement:
      "Explique o que são mutantes **mortos**, **vivos** e **equivalentes**. " +
      "Em seguida, suponha que sua suíte obteve escore de mutação **0,70** e que ainda existem **mutantes vivos não equivalentes**. " +
      "Que **ação** o testador deve tomar e por quê?",
    expectedResponse:
      "* **Mutante morto:** existe ao menos um caso de teste cuja saída difere entre o programa original e o mutante — o teste **detectou** a alteração.\n" +
      "* **Mutante vivo:** nenhum teste da suíte conseguiu distinguir o mutante do original (saídas sempre iguais nos testes executados).\n" +
      "* **Mutante equivalente:** sintaticamente diferente, mas **semanticamente idêntico** ao original para qualquer entrada — é impossível matá-lo e ele é excluído do denominador do escore.\n\n" +
      "**Ação para escore 0,70 com mutantes vivos não equivalentes:** o testador deve **criar novos casos de teste** capazes de matar esses mutantes vivos, pois eles revelam **lacunas na suíte** (comportamentos do código que não estão sendo verificados). Aumentar os casos de teste eleva o escore de mutação e a confiança na suíte. Mutantes confirmadamente equivalentes não exigem novos testes, apenas devem ser removidos do cálculo.",
    checklist: [
      { id: "c1", description: "Definiu corretamente mutante morto e vivo.", points: 30 },
      { id: "c2", description: "Definiu mutante equivalente e sua exclusão do denominador.", points: 30 },
      { id: "c3", description: "Indicou criar novos testes para matar os mutantes vivos.", points: 40 },
    ],
    totalPoints: 100,
  },
  {
    id: "p2_def_5",
    title: "Conceito de mutante equivalente (múltipla escolha)",
    statement:
      "Assinale a alternativa que descreve **corretamente** um **mutante equivalente**:\n\n" +
      "a) É todo mutante que o compilador rejeita por erro de sintaxe antes da execução.\n" +
      "b) É um mutante morto por todos os casos de teste da suíte simultaneamente.\n" +
      "c) Produz a mesma saída do programa original para qualquer entrada e não pode ser morto.\n" +
      "d) É um mutante que aumenta artificialmente o escore de mutação por ser sempre contabilizado como morto no denominador da fórmula, distorcendo a métrica final do conjunto de testes.",
    expectedResponse:
      "**Resposta correta: (c).**\n\n" +
      "* **(c) Correta:** o mutante equivalente é semanticamente idêntico ao original — qualquer entrada produz a mesma saída, tornando impossível matá-lo.\n" +
      "* **(a) Errada:** mutante que não compila é **natimorto (stillborn)**, não equivalente.\n" +
      "* **(b) Errada:** se é morto pela suíte, então **não** é equivalente.\n" +
      "* **(d) Errada:** mutantes equivalentes não são contabilizados como mortos; ao contrário, são **removidos do denominador** (M − ME) justamente para não distorcer o escore.",
    checklist: [
      { id: "c1", description: "Marcou a alternativa (c) como correta.", points: 100 },
    ],
    totalPoints: 100,
  },
  {
    id: "p2_def_6",
    title: "Gerar um mutante com o operador AOR",
    statement:
      "Para o método abaixo, **aplique o operador de mutação AOR** (substituição de operador aritmético) para gerar **um mutante** " +
      "e crie um **caso de teste** que o mate (com entrada e saída esperada).",
    codeContext: `public int media(int a, int b) {
    return (a + b) / 2;
}`,
    expectedResponse:
      "**Operador AOR (Arithmetic Operator Replacement):** troca um operador aritmético por outro.\n\n" +
      "**Mutante gerado** (troca de `+` por `-`):\n\n" +
      "```java\npublic int media(int a, int b) {\n    return (a - b) / 2;\n}\n```\n\n" +
      "**Caso de teste que mata o mutante:**\n" +
      "* Entrada: `a = 4`, `b = 2`.\n" +
      "* Saída esperada (original): `(4 + 2) / 2 = 3`.\n" +
      "* Saída do mutante: `(4 - 2) / 2 = 1`.\n\n" +
      "Como 3 ≠ 1, o mutante é **morto**. (Outros mutantes AOR válidos: `(a + b) * 2`, `(a + b) % 2` etc.)",
    checklist: [
      { id: "c1", description: "Explicou o operador AOR e gerou um mutante aritmético válido.", points: 40 },
      { id: "c2", description: "Criou caso de teste com entrada e saída esperada do original.", points: 30 },
      { id: "c3", description: "Mostrou que a saída do mutante difere, matando-o.", points: 30 },
    ],
    totalPoints: 100,
  },
];
