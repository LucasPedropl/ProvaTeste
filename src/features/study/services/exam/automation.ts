import { SimulationQuestion } from "../../schemas/studyTypes";

/**
 * Tema 6 — Automatização da atividade de teste com JUnit 5 e Mockito:
 * escrita de testes, mocks/stubbing, verificação de interações, exceções e
 * uma questão de múltipla escolha.
 */
export const automationQuestions: SimulationQuestion[] = [
  {
    id: "p2_aut_1",
    title: "Escrever testes JUnit 5 para um método puro",
    statement:
      "Escreva métodos de teste **JUnit 5** para o método `ehPrimo(int n)` abaixo, cobrindo: " +
      "(1) um número **não primo**, (2) um número **primo** e (3) o **limite** `n < 2` (que deve retornar `false`). " +
      "Use as asserções adequadas.",
    codeContext: `public boolean ehPrimo(int n) {
    if (n < 2) return false;
    for (int d = 2; d < n; d++) {
        if (n % d == 0) return false;
    }
    return true;
}`,
    expectedResponse:
      "```java\nimport static org.junit.jupiter.api.Assertions.*;\nimport org.junit.jupiter.api.Test;\n\nclass CalculadoraTest {\n\n    private final Calculadora calc = new Calculadora();\n\n    @Test\n    void deveRetornarTrueParaNumeroPrimo() {\n        assertTrue(calc.ehPrimo(7));\n    }\n\n    @Test\n    void deveRetornarFalseParaNumeroNaoPrimo() {\n        assertFalse(calc.ehPrimo(9));\n    }\n\n    @Test\n    void deveRetornarFalseParaValorAbaixoDe2() {\n        assertFalse(calc.ehPrimo(1)); // limite n < 2\n        assertFalse(calc.ehPrimo(0));\n    }\n}\n```\n\n" +
      "Pontos-chave: anotação **`@Test`** em cada método, uso de **`assertTrue`/`assertFalse`** conforme a saída esperada e cobertura do **valor de fronteira** `n < 2`.",
    checklist: [
      { id: "c1", description: "Usou @Test e a importação das asserções do JUnit 5.", points: 25 },
      { id: "c2", description: "Cobriu primo (assertTrue) e não primo (assertFalse).", points: 40 },
      { id: "c3", description: "Cobriu o limite n < 2 com assertFalse.", points: 35 },
    ],
    totalPoints: 100,
  },
  {
    id: "p2_aut_2",
    title: "Teste com Mockito: produto disponível",
    statement:
      "A classe `ProcessadorPedido` depende de `EstoqueService` para verificar disponibilidade. " +
      "Escreva um teste **JUnit 5 + Mockito** para o cenário em que o produto **está disponível**, de modo que " +
      "`processar(...)` deve retornar `true`. Use mock, stubbing e verificação.",
    expectedResponse:
      "```java\nimport static org.junit.jupiter.api.Assertions.*;\nimport static org.mockito.Mockito.*;\nimport org.junit.jupiter.api.Test;\nimport org.junit.jupiter.api.extension.ExtendWith;\nimport org.mockito.InjectMocks;\nimport org.mockito.Mock;\nimport org.mockito.junit.jupiter.MockitoExtension;\n\n@ExtendWith(MockitoExtension.class)\nclass ProcessadorPedidoTest {\n\n    @Mock\n    private EstoqueService estoqueMock;\n\n    @InjectMocks\n    private ProcessadorPedido processador;\n\n    @Test\n    void deveProcessarQuandoProdutoDisponivel() {\n        when(estoqueMock.temEstoque(\"Prod1\", 2)).thenReturn(true);\n\n        boolean resultado = processador.processar(\"Prod1\", 2);\n\n        assertTrue(resultado);\n        verify(estoqueMock).temEstoque(\"Prod1\", 2);\n    }\n}\n```\n\n" +
      "Pontos-chave: **`@Mock`** cria o dublê do serviço, **`@InjectMocks`** injeta-o no objeto sob teste, **`when(...).thenReturn(true)`** programa a resposta e **`verify(...)`** confirma a interação.",
    checklist: [
      { id: "c1", description: "Declarou @Mock e @InjectMocks (e a extensão do Mockito).", points: 30 },
      { id: "c2", description: "Configurou o stubbing com when(...).thenReturn(true).", points: 40 },
      { id: "c3", description: "Fez a asserção (assertTrue) e a verificação (verify).", points: 30 },
    ],
    totalPoints: 100,
  },
  {
    id: "p2_aut_3",
    title: "Stubbing vs asserção no Mockito (múltipla escolha)",
    statement:
      "Assinale a alternativa **correta** sobre a configuração do comportamento de um mock no Mockito:\n\n" +
      "a) `assertEquals(esperado, obtido)` programa o comportamento de um mock para uma chamada específica.\n" +
      "b) `@BeforeEach` define o valor de retorno de um método mockado.\n" +
      "c) `when(mock.metodo()).thenReturn(valor)` configura (stubbing) a resposta do mock para aquela chamada.\n" +
      "d) `verify(mock).metodo()` cria automaticamente uma nova instância real da dependência e a injeta no objeto sob teste antes de cada execução.",
    expectedResponse:
      "**Resposta correta: (c).**\n\n" +
      "* **(c) Correta:** o par **`when(...).thenReturn(...)`** é o stubbing — programa qual valor o mock devolve para uma chamada específica.\n" +
      "* **(a) Errada:** `assertEquals` é uma **asserção do JUnit**, usada para verificar resultados, não para configurar mocks.\n" +
      "* **(b) Errada:** `@BeforeEach` apenas executa código **antes de cada teste** (setup); não define retorno de mock.\n" +
      "* **(d) Errada:** `verify` apenas **confere se uma interação ocorreu**; não cria nem injeta instâncias.",
    checklist: [
      { id: "c1", description: "Marcou a alternativa (c) como correta.", points: 100 },
    ],
    totalPoints: 100,
  },
  {
    id: "p2_aut_4",
    title: "Testar lançamento de exceção com JUnit 5",
    statement:
      "O método `sacar(double valor)` deve lançar `IllegalArgumentException` quando o valor for maior que o saldo. " +
      "Escreva um teste **JUnit 5** que verifique esse lançamento de exceção.",
    expectedResponse:
      "Usa-se **`assertThrows`**, que captura e verifica o tipo da exceção:\n\n" +
      "```java\nimport static org.junit.jupiter.api.Assertions.*;\nimport org.junit.jupiter.api.Test;\n\nclass ContaTest {\n\n    @Test\n    void deveLancarExcecaoQuandoSaldoInsuficiente() {\n        Conta conta = new Conta(100.0); // saldo inicial\n\n        assertThrows(IllegalArgumentException.class, () -> {\n            conta.sacar(150.0); // valor > saldo\n        });\n    }\n}\n```\n\n" +
      "Pontos-chave: `assertThrows(TipoEsperado.class, executable)` falha o teste se a exceção **não** for lançada (ou se for de outro tipo). Pode-se ainda capturar a exceção retornada para validar a mensagem.",
    checklist: [
      { id: "c1", description: "Usou assertThrows com o tipo de exceção esperado.", points: 50 },
      { id: "c2", description: "Passou a ação que dispara a exceção (lambda/executable).", points: 30 },
      { id: "c3", description: "Montou o cenário corretamente (valor > saldo).", points: 20 },
    ],
    totalPoints: 100,
  },
  {
    id: "p2_aut_5",
    title: "Stubbing, verificação e asserção: quando usar cada um",
    statement:
      "No contexto de JUnit + Mockito, explique a diferença entre **stubbing** (`when/thenReturn`), " +
      "**verificação** (`verify`) e **asserção** (`assertX`). Quando cada um deve ser usado?",
    expectedResponse:
      "* **Stubbing (`when(...).thenReturn(...)`):** *programa o comportamento* de um mock — define o que ele retorna ao ser chamado. Usado na **fase de preparação (arrange)**, para controlar as dependências do código sob teste.\n" +
      "* **Verificação (`verify(mock).metodo(args)`):** *confere a interação* — valida se um método do mock foi (ou não) chamado, quantas vezes e com quais argumentos. Usado para testar **comportamento/efeitos colaterais** (ex.: garantir que `enviarEmail()` foi chamado).\n" +
      "* **Asserção (`assertEquals`, `assertTrue`, ...):** *verifica o resultado* retornado pelo código sob teste (estado/valor). Usado para checar a **saída** do método testado.\n\n" +
      "Resumo: **stubbing prepara** as dependências, **asserção valida o resultado** e **verify valida a interação** com o mock.",
    checklist: [
      { id: "c1", description: "Explicou o stubbing (programar retorno do mock).", points: 35 },
      { id: "c2", description: "Explicou o verify (conferir interação/chamada).", points: 35 },
      { id: "c3", description: "Explicou a asserção (verificar o resultado/estado).", points: 30 },
    ],
    totalPoints: 100,
  },
  {
    id: "p2_aut_6",
    title: "Verificar interação e simular exceção (Mockito)",
    statement:
      "A classe `NotificadorPedido` chama `EmailService.enviar(destino, msg)` ao confirmar um pedido. " +
      "Escreva um teste **Mockito** que: (1) verifique que `enviar(...)` foi chamado com os argumentos corretos; " +
      "(2) num segundo cenário, faça o mock **lançar** `RuntimeException` ao enviar e verifique que o erro é tratado.",
    expectedResponse:
      "```java\nimport static org.mockito.Mockito.*;\nimport static org.junit.jupiter.api.Assertions.*;\nimport org.junit.jupiter.api.Test;\nimport org.junit.jupiter.api.extension.ExtendWith;\nimport org.mockito.InjectMocks;\nimport org.mockito.Mock;\nimport org.mockito.junit.jupiter.MockitoExtension;\n\n@ExtendWith(MockitoExtension.class)\nclass NotificadorPedidoTest {\n\n    @Mock\n    private EmailService emailMock;\n\n    @InjectMocks\n    private NotificadorPedido notificador;\n\n    @Test\n    void deveEnviarEmailComArgumentosCorretos() {\n        notificador.confirmar(\"ana@x.com\", \"Pedido #10 confirmado\");\n\n        verify(emailMock).enviar(\"ana@x.com\", \"Pedido #10 confirmado\");\n    }\n\n    @Test\n    void deveTratarFalhaNoEnvio() {\n        doThrow(new RuntimeException(\"SMTP fora do ar\"))\n            .when(emailMock).enviar(anyString(), anyString());\n\n        // O notificador deve capturar a falha e retornar false, sem propagar a exceção.\n        assertFalse(notificador.confirmar(\"ana@x.com\", \"Pedido #10\"));\n    }\n}\n```\n\n" +
      "Pontos-chave: **`verify(...)`** confirma a chamada com os argumentos esperados; **`doThrow(...).when(...)`** programa o mock para lançar exceção (usado para métodos `void`); e a asserção confirma o **tratamento** do erro.",
    checklist: [
      { id: "c1", description: "Usou verify para conferir a chamada com os argumentos corretos.", points: 35 },
      { id: "c2", description: "Programou o mock para lançar exceção (doThrow/when).", points: 35 },
      { id: "c3", description: "Verificou o tratamento do erro com asserção.", points: 30 },
    ],
    totalPoints: 100,
  },
];
