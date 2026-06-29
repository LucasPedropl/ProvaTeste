import { StudyModule } from "../../schemas/studyTypes";

export const testCases: StudyModule = {
  id: "test_cases",
  title: "2. Anatomia de um Caso de Teste",
  description: "O que é um caso de teste, sua estrutura formal, o papel do oráculo e a diferença entre caso, procedimento e suíte de teste.",
  estimatedMinutes: 18,
  tldr: "Um caso de teste = entrada + resultado esperado (definido ANTES, pela especificação) + pré-condições. Quem decide se a saída está correta é o oráculo. Não confunda caso de teste, procedimento (passos) e suíte (coleção de casos).",
  keyTerms: [
    { term: "Caso de teste", definition: "Par (entrada, saída esperada) com suas condições de execução." },
    { term: "Resultado esperado", definition: "Saída correta prevista de antemão, derivada da especificação." },
    { term: "Oráculo de teste", definition: "Mecanismo que decide se o resultado obtido está correto." },
    { term: "Problema do oráculo", definition: "Dificuldade/custo de conhecer a saída correta (ex.: IA, simulações)." },
    { term: "Suíte de testes", definition: "Coleção de casos de teste agrupados por módulo, função ou critério." },
  ],
  sections: [
    {
      id: "tc_what",
      title: "O que é um Caso de Teste?",
      subtitle: "A unidade fundamental do teste",
      contentMarkdown: `Um **Caso de Teste (Test Case)** é a descrição de uma condição específica a ser verificada, definindo **quais entradas fornecer** ao software e **qual saída se espera** observar. É a menor unidade executável da atividade de teste.

Um bom caso de teste possui três ingredientes essenciais:

1. **Valores de entrada**: os dados fornecidos ao software sob teste.
2. **Resultado esperado**: a saída correta prevista, definida **antes** da execução (a partir da especificação).
3. **Condições de execução**: o estado/ambiente necessário para rodar o teste (pré-condições).

Um caso de teste só tem valor se o resultado esperado for **conhecido de antemão** — caso contrário, não há como decidir se o software acertou ou errou.`,
    },
    {
      id: "tc_structure",
      title: "Estrutura Formal de um Caso de Teste",
      subtitle: "Os campos que o compõem",
      contentMarkdown: `Na prática, um caso de teste documentado costuma conter os seguintes campos:

| Campo | Descrição |
| :--- | :--- |
| **ID** | Identificador único (ex.: CT-001) |
| **Título/Objetivo** | O que o teste pretende verificar |
| **Pré-condições** | Estado necessário antes da execução |
| **Entradas** | Dados/parâmetros fornecidos |
| **Passos** | Sequência de ações a executar |
| **Resultado esperado** | Saída ou comportamento correto previsto |
| **Pós-condições** | Estado esperado do sistema após a execução |
| **Resultado obtido** | O que de fato aconteceu (preenchido na execução) |
| **Status** | Passou / Falhou |

Comparar o **resultado esperado** com o **resultado obtido** é o que determina o veredito (passou ou falhou).`,
    },
    {
      id: "tc_oracle",
      title: "O Oráculo de Teste",
      subtitle: "Quem decide se passou ou falhou?",
      contentMarkdown: `O **Oráculo de Teste (Test Oracle)** é o mecanismo que determina se o resultado obtido está **correto**. Ele responde à pergunta: "essa saída é a esperada?".

Fontes comuns de oráculo:

* **Especificação/requisitos**: a fonte mais confiável.
* **Versão anterior do sistema** (testes de regressão).
* **Cálculo manual** ou implementação de referência.
* **Conhecimento do especialista** (oráculo humano).

O **problema do oráculo** ocorre quando é difícil ou caro saber qual deveria ser a saída correta (ex.: sistemas de IA, simulações científicas complexas). Sem um bom oráculo, automatizar a verificação fica inviável.`,
      codeExample: {
        language: "java",
        code: `@Test
void deveCalcularDescontoParaClienteVip() {
    // Pré-condição / Entrada
    Pedido pedido = new Pedido(1000.0, TipoCliente.VIP);

    // Passo (execução do método sob teste)
    double total = calculadora.aplicarDesconto(pedido);

    // Resultado esperado (definido pelo ORÁCULO: regra = 10% p/ VIP)
    assertEquals(900.0, total);
}`,
        explanation: "O 'assertEquals(900.0, ...)' é o oráculo materializado: o valor 900.0 foi derivado da especificação antes da execução. Se 'aplicarDesconto' retornar outro valor, o caso de teste falha.",
      },
    },
    {
      id: "tc_terms",
      title: "Caso, Procedimento, Conjunto e Suíte",
      subtitle: "Não confunda os termos",
      contentMarkdown: `Termos relacionados frequentemente cobrados:

* **Caso de Teste**: par (entrada, saída esperada) com suas condições.
* **Procedimento de Teste**: a sequência detalhada de passos para **executar** um ou mais casos de teste.
* **Conjunto/Suíte de Testes (Test Suite)**: uma coleção de casos de teste agrupados (por módulo, funcionalidade ou critério).
* **Dados de Teste**: os valores concretos usados como entrada.

Boas práticas para escrever casos de teste:

* Cada caso deve ser **independente** e ter um **objetivo único e claro**.
* Devem ser **repetíveis** (mesma entrada → mesmo resultado).
* Devem cobrir tanto cenários válidos (caminho feliz) quanto inválidos (tratamento de erro e limites).`,
    },
  ],
};
