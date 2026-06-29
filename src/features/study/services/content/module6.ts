import { StudyModule } from "../../schemas/studyTypes";

export const module6: StudyModule = {
  id: "junit_mockito",
  title: "10. Automatização (JUnit & Mockito)",
  description: "Aprenda a escrever testes automatizados em Java usando JUnit para asserções e Mockito para simular dependências.",
  estimatedMinutes: 25,
  tldr: "JUnit estrutura e executa testes (@Test, @BeforeEach, asserções como assertEquals e assertThrows). Para double, use a tolerância: assertEquals(esperado, atual, delta). Mockito isola dependências com dublês: @Mock (ou mock(Classe.class)) cria um falso que retorna nulo por padrão, @InjectMocks injeta os mocks; when().thenReturn() programa respostas e verify() confere as interações. Mock substitui tudo; Spy embrulha um objeto real.",
  keyTerms: [
    { term: "@Test", definition: "Marca um método como caso de teste no JUnit 5." },
    { term: "@BeforeEach", definition: "Executa antes de cada teste (preparação/reset de dados). Equivale ao @Before do JUnit 4." },
    { term: "assertEquals(esp, atual, delta)", definition: "Para números de ponto flutuante (double), o delta é a margem de erro tolerada na comparação." },
    { term: "@Mock / @InjectMocks", definition: "Cria um dublê simulado / injeta os mocks na classe sob teste." },
    { term: "mock(Classe.class)", definition: "Cria um mock de forma programática (sem anotação), usado no exemplo da aula." },
    { term: "when().thenReturn()", definition: "Stubbing: programa a resposta do mock para uma chamada." },
    { term: "Mock x Spy", definition: "Mock substitui totalmente o objeto; Spy embrulha um objeto real e chama métodos reais por padrão." },
  ],
  sections: [
    {
      id: "automation_intro",
      title: "Por que Automatizar Testes?",
      subtitle: "Garantindo regressão e velocidade",
      contentMarkdown: `A automatização de testes consiste em escrever programas (scripts de testes) cuja única finalidade é executar o software sob teste e verificar se as saídas coincidem com os resultados esperados.
      
No ecossistema Java, a dupla **JUnit** (para estruturação de testes) e **Mockito** (para isolamento e criação de dublês de teste) é o padrão de mercado para testes unitários e de integração.`,
    },
    {
      id: "junit_setup",
      title: "Configuração do Ambiente (Maven)",
      subtitle: "Dependências no pom.xml",
      contentMarkdown: `Nos slides, o projeto é criado como um **Maven Project** (no Eclipse: \`File → New → Other → Maven Project\`). As bibliotecas de teste são declaradas no arquivo **\`pom.xml\`**, dentro de \`<dependencies>\`.

São necessárias três dependências principais:
* \`junit-jupiter-engine\`: motor de execução do JUnit 5 (Jupiter).
* \`mockito-core\`: o Mockito propriamente dito (criação de mocks).
* \`mockito-junit-jupiter\`: integração do Mockito com o JUnit 5 (habilita \`@ExtendWith(MockitoExtension.class)\`).

> Após escrever a classe de teste, executa-se com: clique direito na classe de teste → **\`Run As → JUnit Test\`**. Os resultados (verde = passou, vermelho = falhou) aparecem no painel do JUnit.`,
      codeExample: {
        language: "xml",
        code: `<dependencies>
    <dependency>
        <groupId>org.junit.jupiter</groupId>
        <artifactId>junit-jupiter-engine</artifactId>
        <version>5.9.2</version>
    </dependency>
    <dependency>
        <groupId>org.mockito</groupId>
        <artifactId>mockito-junit-jupiter</artifactId>
        <version>3.6.28</version>
    </dependency>
    <dependency>
        <groupId>org.mockito</groupId>
        <artifactId>mockito-core</artifactId>
        <version>5.2.0</version>
    </dependency>
</dependencies>`,
        explanation: "Trecho do pom.xml usado em aula: JUnit 5 (Jupiter) para os testes e Mockito para os dublês.",
      },
    },
    {
      id: "junit_basics",
      title: "JUnit: O Framework de Testes",
      subtitle: "Anotações e Asserções fundamentais",
      contentMarkdown: `O **JUnit** gerencia a execução dos testes e valida os resultados.

**Anotações de Ciclo de Vida (JUnit 5)**:
* \`@Test\`: Declara que um método é um caso de teste.
* \`@BeforeEach\`: Executa antes de **cada** teste da classe (ótimo para reiniciar dados).
* \`@AfterEach\`: Executa após **cada** teste.
* \`@BeforeAll\`: Executa **uma vez** antes de todos os testes da classe (deve ser método estático).
* \`@AfterAll\`: Executa **uma vez** depois de todos os testes (método estático).
* \`@Disabled\`: Ignora o teste na execução.

> **Atenção à nomenclatura (JUnit 4 x 5):** os slides citam \`@After\`, \`@BeforeClass\` e \`@AfterClass\` (nomes do **JUnit 4**). No **JUnit 5** eles passaram a se chamar \`@AfterEach\`, \`@BeforeAll\` e \`@AfterAll\`. Já \`@BeforeEach\` é o nome do JUnit 5 (no JUnit 4 era \`@Before\`).

**Asserções comuns (\`Assertions.*\`):**
* \`assertEquals(esperado, atual)\`: Valida igualdade de valores.
* \`assertEquals(esperado, atual, delta)\`: Para **double/float**, compara com uma **margem de erro (delta)**. Ex.: \`assertEquals(3.0, calc.subtracao(5.0, 2.0), 0.1)\` aceita diferenças até 0,1 — essencial por causa de imprecisões do ponto flutuante.
* \`assertTrue(condicao)\` / \`assertFalse(condicao)\`: Valida booleanos.
* \`assertNotNull(objeto)\`: Garante que não é nulo.
* \`assertThrows(Excecao.class, () -> codigo)\`: Verifica se o trecho lança a exceção especificada (importante para testar fluxos de erro!).`,
      codeExample: {
        language: "java",
        code: `import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;

public class CalculadoraTest {
    private Calculadora calc;

    @BeforeEach
    void setUp() {
        calc = new Calculadora();
    }

    @Test
    void testSubtracao() {
        // 3º parâmetro (0.1) é o delta: margem de erro para double
        assertEquals(3.0, calc.subtracao(5.0, 2.0), 0.1);
    }

    @Test
    @DisplayName("Deve lançar exceção ao dividir por zero")
    void testDivisaoPorZero() {
        assertThrows(ArithmeticException.class, () -> calc.divisao(10, 0));
    }
}`,
        explanation: "Ciclo de vida (@BeforeEach) + asserções do JUnit 5. Note o delta no assertEquals para comparar doubles.",
      },
    },
    {
      id: "mockito_basics",
      title: "Mockito: Criando Dublês de Teste",
      subtitle: "Mocking e Injeção de dependências",
      contentMarkdown: `O **Mockito** permite criar objetos falsos (**Mocks**) que imitam o comportamento de dependências reais, isolando o código sob teste.

**Para que serve (motivação dos slides)**:
* **Simular partes ainda não implementadas** do software (ex.: testar uma regra que depende de um método \`soma()\` que ainda não foi escrito).
* **Simular partes que não devem ser acessadas** durante o teste (ex.: banco de dados, gateway de pagamento, serviços externos).

**Como criar um Mock**:
* \`@Mock\`: anotação que cria uma instância falsa simulada da classe/interface.
* \`mock(Classe.class)\`: forma **programática** (sem anotação) — usada no \`setUp\` dos slides: \`calculadora = mock(Calculadora.class);\`.
* \`@InjectMocks\`: cria uma instância real do objeto sob teste e injeta nele todos os campos anotados com \`@Mock\`.

**Configurando Comportamento (Stubbing)**:
* \`when(mock.metodo(argumento)).thenReturn(valorRetorno)\`: programa o mock para retornar um valor específico quando chamado.
* \`when(mock.metodo(any())).thenThrow(new RuntimeException())\`: programa para lançar erro para qualquer argumento.

**Verificação de Interações**:
* \`verify(mock, times(1)).metodo(argumento)\`: valida se o método do mock foi realmente invocado, com o argumento esperado e a quantidade de vezes especificada.`,
      codeExample: {
        language: "java",
        code: `@ExtendWith(MockitoExtension.class)
public class PagamentoServiceTest {
    @Mock
    private GatewayPagamento gatewayMock; // Dependência simulada

    @InjectMocks
    private PagamentoService service; // Objeto sob teste

    @Test
    void testProcessarPagamentoSucesso() {
        // Stubbing: configura o comportamento do Mock
        when(gatewayMock.cobrar(100.0)).thenReturn(true);

        boolean resultado = service.processar(100.0);

        assertTrue(resultado);
        // Verificação: garante que o gateway foi chamado 1 vez
        verify(gatewayMock, times(1)).cobrar(100.0);
    }
}`,
        explanation: "Mockito isolando a regra de negócio do PagamentoService sem acessar o gateway de pagamento real.",
      },
    },
    {
      id: "exemplo_aula",
      title: "Exemplo Prático da Aula (Calculadora)",
      subtitle: "JUnit + Mockito como visto em sala",
      contentMarkdown: `Este é o exemplo exato usado nos slides: a classe \`Calculadora\` é **mockada** para simular o método \`soma()\` (que poderia não estar implementado). O mock é criado com \`mock(Calculadora.class)\` no \`@BeforeEach\`, o retorno é programado com \`when().thenReturn()\` e a verificação usa \`assertEquals\` com **delta** (0.01).`,
      codeExample: {
        language: "java",
        code: `package Matematica;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Assertions;
import static org.mockito.Mockito.*;
import org.mockito.Mock;

public class CalculadoraTest {
    @Mock
    Calculadora calculadora;

    @BeforeEach
    public void setUp() {
        // Criação programática do mock
        calculadora = mock(Calculadora.class);
    }

    @Test
    public void Test002() {
        // Programa o retorno do método soma() simulado
        when(calculadora.soma(2.0, 3.0)).thenReturn(5.0);
        // 0.01 é o delta (margem de erro) na comparação de doubles
        Assertions.assertEquals(5.0, calculadora.soma(2.0, 3.0), 0.01);
    }
}`,
        explanation: "Exemplo literal dos slides: mock(Calculadora.class) + when().thenReturn() + assertEquals com delta.",
      },
    },
    {
      id: "mock_vs_spy",
      title: "Mock vs Spy",
      subtitle: "Substituição total vs Espionagem parcial",
      contentMarkdown: `Uma dúvida muito comum em provas de teste de software é a diferença entre Mocks e Spies no Mockito:

1. **Mock**:
   * Substitui **completamente** o objeto real.
   * Por padrão, todos os métodos de um Mock não fazem nada (retornam nulo, zero ou falso) a menos que você configure explicitamente um comportamento com \`when\`.
2. **Spy**:
   * Funciona como um embrulho (**wrapper**) em volta de uma instância de um objeto **real**.
   * Por padrão, ao chamar métodos de um Spy, o código **real** do objeto é executado, a menos que você configure explicitamente um comportamento parcial (stubbing) usando \`doReturn(...).when(spy).metodo(...)\`.`,
    },
  ],
};
