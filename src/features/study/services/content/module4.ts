import { StudyModule } from "../../schemas/studyTypes";

export const module4: StudyModule = {
  id: "test_levels",
  title: "8. Níveis de Teste",
  description: "Diferencie as fases de teste — unidade, módulo, integração, sistema e aceitação — e conheça a classificação procedimental vs. orientada a objetos.",
  estimatedMinutes: 22,
  tldr: "O teste é organizado em fases: unidade (menor unidade isolada — o método), módulo (a classe como unidade), integração (comunicação entre as unidades), sistema (produto completo, ponta a ponta, requisitos funcionais e não funcionais) e aceitação (validação pelo usuário). A integração pode ser Top-Down, Bottom-Up, Big-Bang ou Sanduíche e usa drivers/stubs para simular partes ainda não prontas.",
  keyTerms: [
    { term: "Teste de unidade", definition: "Verifica a menor unidade isolada de dependências. Procedimentalmente a unidade é a função/método." },
    { term: "Teste de módulo", definition: "Trata a classe (ou arquivo/componente) como unidade. Em orientação a objetos, costuma se confundir com o próprio teste unitário." },
    { term: "Teste de integração", definition: "Verifica a comunicação e os dados trocados entre as unidades já testadas." },
    { term: "Teste de sistema", definition: "Valida o produto completo (end-to-end) e os requisitos não funcionais." },
    { term: "Teste de aceitação", definition: "Validação final feita pelo usuário/cliente para decidir se o software atende às necessidades do negócio." },
    { term: "Driver", definition: "Simula a parte que CHAMA/invoca outra (o chamador). Usado no Bottom-Up." },
    { term: "Stub", definition: "Simula a parte que é CHAMADA/invocada (o chamado). Usado no Top-Down." },
    { term: "Intra/Inter", definition: "Intra = dentro da mesma unidade (método/classe); Inter = entre unidades (métodos/classes)." },
  ],
  sections: [
    {
      id: "levels_intro",
      title: "O que são Níveis de Teste?",
      subtitle: "Dividir para conquistar",
      contentMarkdown: `O processo de teste de software é organizado em **fases (ou níveis)**, cada uma com um foco diferente: começamos validando as menores partes e vamos ampliando o escopo até o produto completo.

Seguindo [Ammann e Offutt, 2016], as fases, da menor para a maior granularidade, são:
1. **Teste de Unidade** — foca em cada função, procedimento ou método.
2. **Teste de Módulo** — foca em cada classe, arquivo, módulo ou componente.
3. **Teste de Integração** — foca na construção da estrutura: as partes trabalhando juntas.
4. **Teste de Sistema** — foca no software completo.
5. **Teste de Aceitação** — aceitação pelo usuário.

> [!note] Em muitos materiais (e na prática orientada a objetos) "unidade" e "módulo" aparecem fundidos: o **teste unitário** trata a **classe** como a unidade. O que importa é entender o que está sendo isolado em cada fase.`,
    },
    {
      id: "unit_testing",
      title: "Teste de Unidade",
      subtitle: "Foco na menor parte testável (o método)",
      contentMarkdown: `O **Teste de Unidade** isola e verifica a menor unidade lógica do código de forma independente. No paradigma procedimental, **a unidade é a função/método**.
* **O que é testado**: métodos e funções individuais.
* **Isolamento**: dependências externas (bancos de dados, APIs, outras classes complexas) são substituídas por **dublês de teste** (mocks, stubs).
* **Vantagens**: execução extremamente rápida (milissegundos), facilidade de depurar (se falhar, o erro está naquela unidade específica) e incentivo a um código limpo e desacoplado.`,
      codeExample: {
        language: "java",
        code: `// Unidade sob teste
class Calculadora {
    int somar(int a, int b) { return a + b; }
}

// Teste unitário com JUnit 5 — isola um único método
class CalculadoraTest {
    @Test
    void deveSomarDoisNumerosPositivos() {
        Calculadora calc = new Calculadora();
        int resultado = calc.somar(2, 3);
        assertEquals(5, resultado); // verifica a menor unidade
    }
}`,
        explanation: "O teste exercita um único método (somar) sem dependências externas. Se falhar, o defeito está isolado naquela unidade — rápido de executar e fácil de depurar.",
      },
    },
    {
      id: "module_testing",
      title: "Teste de Módulo",
      subtitle: "A classe como unidade",
      contentMarkdown: `Quando subimos um nível, a **classe** (ou arquivo/componente) passa a ser a unidade testada — é o **Teste de Módulo**.
* **O que é testado**: o comportamento de uma classe inteira, incluindo a interação entre os **métodos da própria classe** e seu estado interno (atributos).
* **Relação com o unitário**: em orientação a objetos, "teste unitário" e "teste de módulo" frequentemente se referem à mesma coisa — *testar a classe isolada*. A diferença é apenas o tamanho que se adota para "unidade".

> [!tip] Regra prática: se você está validando **um método isolado**, é unidade no sentido estrito (procedimental). Se está validando **a classe inteira e a colaboração entre seus próprios métodos**, é teste de módulo (a classe é a unidade).`,
      codeExample: {
        language: "java",
        code: `// A classe inteira é a unidade: testamos a colaboração
// entre seus métodos e o estado interno (saldo).
class ContaBancaria {
    private double saldo = 0;
    void depositar(double v) { saldo += v; }
    void sacar(double v)     { saldo -= v; }
    double getSaldo()        { return saldo; }
}

class ContaBancariaTest {
    @Test
    void deveRefletirOperacoesNoSaldo() {
        ContaBancaria conta = new ContaBancaria();
        conta.depositar(100); // método 1
        conta.sacar(30);      // método 2
        assertEquals(70, conta.getSaldo()); // estado da classe
    }
}`,
        explanation: "Aqui a unidade é a classe ContaBancaria: o teste verifica como depositar(), sacar() e getSaldo() colaboram sobre o mesmo estado interno (saldo).",
      },
    },
    {
      id: "integration_testing",
      title: "Teste de Integração",
      subtitle: "Testando a comunicação entre as unidades",
      contentMarkdown: `O **Teste de Integração** verifica a comunicação e a transferência de dados entre duas ou mais unidades/subsistemas que já foram testados isoladamente. O foco deixa de ser "a unidade funciona?" e passa a ser "**as unidades conversam corretamente?**".

**Estratégias de Integração**:
* **Top-Down (de cima para baixo)**: integra do módulo principal (topo) para as camadas inferiores. Módulos de baixo ainda não prontos são substituídos por **Stubs**.
* **Bottom-Up (de baixo para cima)**: começa pelos módulos da base e sobe no fluxo. Módulos superiores que ainda chamam os de baixo são substituídos por **Drivers**.
* **Big-Bang**: todos os módulos são integrados de uma só vez. *Desvantagem*: se falhar, é muito difícil localizar em qual interface está o defeito.
* **Sanduíche / Híbrida**: combina Top-Down e Bottom-Up, atacando o núcleo do sistema a partir das duas direções.

**Drivers e Stubs** simulam partes do software que ainda não foram implementadas no momento do teste. Considere que um **método A invoca um método B**:
* Se simulamos o **método A (o que invoca)**, criamos um **Driver** — ele dispara a chamada.
* Se simulamos o **método B (o que é invocado)**, criamos um **Stub** — ele responde à chamada.

> [!tip] Mnemônico: o **Driver dirige** (chama); o **Stub é o destino** (é chamado). O aprofundamento com exemplos completos está no tópico **9. Drivers e Stubs**.`,
    },
    {
      id: "system_testing",
      title: "Teste de Sistema",
      subtitle: "Validação de ponta a ponta",
      contentMarkdown: `No **Teste de Sistema**, o produto integrado e completo é executado em um ambiente que simula o de produção, para verificar se ele atende aos requisitos especificados.
* **Foco**: fluxos de ponta a ponta (end-to-end), requisitos **funcionais** (regras de negócio) e **não funcionais** (desempenho, segurança, usabilidade, carga).
* **Visão**: normalmente executado como **caixa-preta** (sem olhar o código interno), assumindo a perspectiva de quem usa o sistema.`,
    },
    {
      id: "acceptance_testing",
      title: "Teste de Aceitação",
      subtitle: "A palavra final é do usuário",
      contentMarkdown: `O **Teste de Aceitação** é a última fase: o **usuário/cliente** valida se o software realmente atende às necessidades do negócio antes de colocá-lo em produção. É a "aceitação do usuário".
* **Quem executa**: tipicamente o cliente final, a área de negócio ou usuários representativos — não o time de desenvolvimento.
* **Foco**: confirmar que o que foi entregue resolve o problema real (validação), e não apenas que o código funciona (verificação).
* **Relação com o sistema**: ocorre normalmente **após** o teste de sistema e em condições próximas às de uso real.`,
    },
    {
      id: "levels_classification",
      title: "Classificação: Procedimental vs. Orientado a Objetos",
      subtitle: "A visão de Vincenzi (2004)",
      contentMarkdown: `[Vincenzi, 2004] organiza as fases conforme o **escopo do código exercitado**, e o resultado muda dependendo do que se adota como "unidade".

**Legenda dos termos:**
* **Intraprocedimental**: somente dentro do procedimento.
* **Interprocedimental**: entre procedimentos.
* **IntraMétodo**: somente dentro do método.
* **InterMétodos**: entre métodos (de uma mesma classe).
* **IntraClasse**: somente dentro da classe.
* **InterClasses**: entre classes diferentes.

**Caso 1 — quando a unidade é o procedimento ou o método:**

| Fase | Teste procedimental | Teste orientado a objetos |
| --- | --- | --- |
| Unitário | Intraprocedimental | IntraMétodo |
| Integração | Interprocedimental | InterMétodos, IntraClasse e InterClasses |
| Sistema | Todo o sistema | Todo o sistema |

**Caso 2 — quando a unidade são diversos procedimentos ou a classe inteira:**

| Fase | Teste procedimental | Teste orientado a objetos |
| --- | --- | --- |
| Unitário | Intraprocedimental | IntraMétodo, InterMétodos e IntraClasse |
| Integração | Interprocedimental | InterClasses |
| Sistema | Todo o sistema | Todo o sistema |

> [!warn] Repare na diferença entre os dois casos: ao adotar a **classe** como unidade (Caso 2), a interação entre métodos da mesma classe (**InterMétodos**) e a própria classe (**IntraClasse**) sobem para o nível **unitário**, deixando apenas o **InterClasses** como integração. Saber justificar essa mudança costuma ser cobrado em prova.`,
    },
  ],
};
