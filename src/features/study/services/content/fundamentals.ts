import { StudyModule } from "../../schemas/studyTypes";

export const fundamentals: StudyModule = {
  id: "fundamentals",
  title: "1. Fundamentos: Erro, Defeito e Falha",
  description: "Comece do zero: o que é teste de software, a diferença entre verificação e validação e a cadeia engano → defeito → erro → falha.",
  estimatedMinutes: 20,
  tldr: "Testar é executar o software para revelar defeitos (nunca provar a ausência deles). A cadeia é engano (humano) → defeito (no código) → erro (estado interno errado) → falha (saída observável). Verificação é 'construir certo'; validação é 'construir o certo'.",
  keyTerms: [
    { term: "Engano (mistake)", definition: "Ação humana incorreta que origina o defeito." },
    { term: "Defeito (fault/bug)", definition: "Trecho de código estaticamente errado; pode existir sem ser executado." },
    { term: "Erro (error)", definition: "Estado interno inconsistente durante a execução do programa." },
    { term: "Falha (failure)", definition: "Comportamento observável que diverge do esperado na saída." },
    { term: "Verificação x Validação", definition: "Construir o produto corretamente (especificação) x construir o produto certo (necessidade do usuário)." },
  ],
  sections: [
    {
      id: "fund_what",
      title: "O que é Teste de Software?",
      subtitle: "Objetivo e mentalidade",
      contentMarkdown: `O **Teste de Software** é o processo de executar um programa com a intenção de **revelar a presença de defeitos**. Essa é a visão clássica de Glenford Myers: um teste bem-sucedido **não** é o que "passa", e sim o que **encontra um problema ainda desconhecido**.

Testar faz parte de um conjunto maior de atividades de **Verificação e Validação (V&V)**, cujo objetivo é aumentar a confiança de que o software atende aos requisitos e funciona como esperado.

Uma frase fundamental de Dijkstra resume a principal limitação da atividade:

* O teste pode mostrar a **presença** de defeitos, mas **nunca** a sua **ausência**.

Ou seja, por mais casos de teste que executemos, não conseguimos provar que o software é 100% livre de defeitos — apenas aumentamos nossa confiança nele.`,
    },
    {
      id: "fund_vv",
      title: "Verificação vs. Validação",
      subtitle: "Construir certo vs. construir a coisa certa",
      contentMarkdown: `São dois conceitos complementares que costumam ser cobrados em prova:

* **Verificação**: "Estamos construindo o produto **corretamente**?" Avalia se o software está de acordo com sua **especificação**. Inclui revisões, inspeções e testes que comparam o resultado com o que foi documentado.
* **Validação**: "Estamos construindo o **produto certo**?" Avalia se o software atende às **necessidades reais** do usuário, independentemente do que está escrito na especificação.

| Aspecto | Verificação | Validação |
| :--- | :--- | :--- |
| Pergunta-chave | Construímos certo? | Construímos o certo? |
| Referência | Especificação / projeto | Necessidade do usuário |
| Exemplos | Revisão de código, teste unitário | Teste de aceitação, beta |
| Momento típico | Durante o desenvolvimento | Próximo à entrega |`,
    },
    {
      id: "fund_chain",
      title: "Erro, Defeito e Falha (a Cadeia)",
      subtitle: "Os três termos que mais confundem",
      contentMarkdown: `A terminologia de qualidade (alinhada à norma IEEE 610.12) distingue três conceitos encadeados:

1. **Engano (Mistake)**: a ação humana incorreta. Ex.: o programador entendeu mal a regra de negócio.
2. **Defeito (Fault / Bug)**: a manifestação do engano **no código**. É o trecho estaticamente errado (uma linha, uma condição trocada). Um defeito **pode existir sem nunca ser executado**.
3. **Erro (Error)**: um **estado interno** inconsistente do programa durante a execução, causado quando o defeito é **executado**. Ex.: uma variável fica com valor incorreto na memória.
4. **Falha (Failure)**: o comportamento **observável** externamente que diverge do esperado, quando o erro se propaga até a saída. É o que o usuário percebe.

A cadeia é: **engano → defeito → erro → falha**.

> [!warn] Nem todo defeito executado gera erro, e nem todo erro se propaga até virar falha (o estado errado pode ser "mascarado" ou sobrescrito antes da saída).`,
      codeExample: {
        language: "java",
        code: `public int somaPositivos(int[] v) {
    int soma = 0;
    for (int i = 0; i < v.length; i++) {
        // DEFEITO: deveria ser "v[i] > 0"
        if (v[i] >= 0) {
            soma += v[i]; // ERRO: 'soma' acumula valor errado quando há zeros... 
        }
    }
    return soma; // FALHA: só ocorre se o valor de saída divergir do esperado
}`,
        explanation: "A condição 'v[i] >= 0' é o DEFEITO. Para [1, 2] o defeito é executado, mas não causa ERRO perceptível (incluir o 0 não muda a soma). Já uma especificação que conte ocorrências revelaria o ERRO e, na saída, a FALHA.",
      },
    },
    {
      id: "fund_why",
      title: "Por que (e o quanto) testar?",
      subtitle: "Custo do defeito e limites do teste",
      contentMarkdown: `Quanto **mais tarde** um defeito é descoberto, **mais caro** é corrigi-lo. Um defeito encontrado em produção pode custar ordens de magnitude mais do que se fosse pego na fase de requisitos ou de teste unitário.

Princípios importantes do teste:

* **Teste exaustivo é impossível**: o número de entradas possíveis costuma ser astronômico. Por isso usamos **critérios** para selecionar um subconjunto eficaz de casos de teste.
* **Agrupamento de defeitos**: poucos módulos concentram a maioria dos defeitos (princípio de Pareto aplicado a bugs).
* **Paradoxo do pesticida**: repetir sempre os mesmos testes deixa de encontrar novos defeitos; os casos de teste precisam ser revisados e renovados.
* **Teste depende do contexto**: um app bancário e um jogo casual exigem rigores e estratégias diferentes.`,
    },
  ],
};
