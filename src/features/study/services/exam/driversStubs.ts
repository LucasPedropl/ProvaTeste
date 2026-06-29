import { SimulationQuestion } from "../../schemas/studyTypes";

/**
 * Tema 5 — Drivers e stubs no teste de integração: identificação dos dublês
 * necessários, escrita de um stub e uma questão de múltipla escolha.
 */
export const driversStubsQuestions: SimulationQuestion[] = [
  {
    id: "p2_drv_1",
    title: "Quais dublês são necessários na integração?",
    statement:
      "Considere a cadeia de chamadas: **`ControlePedido` → `ServicoEstoque` → `RepositorioBD`** " +
      "(o controle chama o serviço, que chama o repositório).\n\n" +
      "1. Numa integração **Top-Down** iniciando por `ControlePedido`, **quais dublês** são necessários e de que tipo?\n" +
      "2. Numa integração **Bottom-Up** iniciando por `RepositorioBD`, **qual dublê** é necessário e de que tipo?",
    expectedResponse:
      "1. **Top-Down (a partir de `ControlePedido`):** como `ServicoEstoque` e `RepositorioBD` ainda não estão integrados, são necessários **stubs** que simulem suas respostas. Inicialmente um **stub de `ServicoEstoque`** (chamado por `ControlePedido`); ao descer um nível, um **stub de `RepositorioBD`**. Stubs ficam **abaixo** do módulo sob teste (simulam quem é chamado).\n\n" +
      "2. **Bottom-Up (a partir de `RepositorioBD`):** como o chamador `ServicoEstoque` ainda não existe/integrado, é necessário um **driver** que acione `RepositorioBD`, fornecendo entradas e capturando saídas. O driver fica **acima** do módulo sob teste (simula quem chama).\n\n" +
      "Resumo: **Top-Down usa stubs (módulos chamados); Bottom-Up usa drivers (módulo chamador).**",
    checklist: [
      { id: "c1", description: "Indicou stubs para a integração Top-Down (módulos inferiores).", points: 40 },
      { id: "c2", description: "Indicou driver para a integração Bottom-Up (chamador superior).", points: 40 },
      { id: "c3", description: "Posicionou corretamente stub (abaixo) e driver (acima).", points: 20 },
    ],
    totalPoints: 100,
  },
  {
    id: "p2_drv_2",
    title: "Driver vs Stub (múltipla escolha)",
    statement:
      "Assinale a alternativa que distingue **corretamente** driver e stub:\n\n" +
      "a) O driver substitui os módulos chamados (inferiores) e o stub substitui o módulo chamador (superior).\n" +
      "b) O stub simula um módulo **chamado**, retornando respostas pré-definidas; o driver simula o módulo **chamador**, fornecendo as entradas.\n" +
      "c) Driver e stub são, na prática, relatórios gerados automaticamente pela ferramenta de cobertura ao final da execução da suíte de regressão do sistema.\n" +
      "d) Driver e stub são termos sinônimos para o mesmo componente.",
    expectedResponse:
      "**Resposta correta: (b).**\n\n" +
      "* **(b) Correta:** o **stub** fica abaixo do módulo sob teste e devolve respostas enlatadas (simula o **chamado**); o **driver** fica acima e fornece entradas/coleta saídas (simula o **chamador**).\n" +
      "* **(a) Errada:** está **invertida** — quem simula o chamado é o stub, e quem simula o chamador é o driver.\n" +
      "* **(c) Errada:** não são relatórios, e sim **componentes executáveis** de simulação.\n" +
      "* **(d) Errada:** têm papéis **opostos**, não são sinônimos.",
    checklist: [
      { id: "c1", description: "Marcou a alternativa (b) como correta.", points: 100 },
    ],
    totalPoints: 100,
  },
  {
    id: "p2_drv_3",
    title: "Escrever um stub para isolar uma dependência",
    statement:
      "Você precisa testar `ServicoPedido`, que depende de uma interface `GatewayPagamento` com o método " +
      "`boolean cobrar(double valor)`. O gateway real ainda **não está pronto**. " +
      "Escreva um **stub** simples (em Java) que sempre aprove o pagamento, para que o teste de `ServicoPedido` possa prosseguir.",
    expectedResponse:
      "Um stub implementa a interface da dependência retornando uma **resposta fixa pré-programada**:\n\n" +
      "```java\npublic class GatewayPagamentoStub implements GatewayPagamento {\n    @Override\n    public boolean cobrar(double valor) {\n        // Resposta enlatada: aprova qualquer cobrança.\n        return true;\n    }\n}\n```\n\n" +
      "No teste, injeta-se o stub no lugar do gateway real:\n\n" +
      "```java\nGatewayPagamento gateway = new GatewayPagamentoStub();\nServicoPedido servico = new ServicoPedido(gateway);\n// agora o teste de servico.finalizar(...) roda sem o gateway real\n```\n\n" +
      "Assim, `ServicoPedido` é testado de forma **isolada**, sem depender da implementação real (ainda inexistente) do gateway.",
    checklist: [
      { id: "c1", description: "Implementou a interface da dependência (stub).", points: 35 },
      { id: "c2", description: "Retornou uma resposta fixa/pré-programada (ex.: true).", points: 35 },
      { id: "c3", description: "Mostrou a injeção do stub no objeto sob teste.", points: 30 },
    ],
    totalPoints: 100,
  },
  {
    id: "p2_drv_4",
    title: "Por que drivers e stubs são necessários?",
    statement:
      "Explique **por que** drivers e stubs são necessários no teste de integração e dê um **exemplo** de situação " +
      "em que cada um seria usado num sistema parcialmente implementado.",
    expectedResponse:
      "Durante a integração, frequentemente um módulo precisa ser testado mas **suas dependências (ou seus chamadores) ainda não foram implementadas, estão indisponíveis, são lentas ou caras**. Drivers e stubs **simulam** essas partes ausentes, permitindo exercitar o módulo sob teste de forma controlada e isolada, sem esperar o sistema inteiro ficar pronto.\n\n" +
      "* **Exemplo de stub:** o módulo `Checkout` (pronto) chama `ServicoFrete` (ainda não implementado). Um **stub** de `ServicoFrete` retorna um valor fixo de frete para que o `Checkout` possa ser testado agora.\n" +
      "* **Exemplo de driver:** o módulo `RepositorioCliente` (pronto) ainda não tem nenhum chamador implementado. Um **driver** invoca seus métodos com dados de teste e verifica os resultados.\n\n" +
      "Sem esses dublês, o teste de integração ficaria **bloqueado** pela ausência de partes do sistema.",
    checklist: [
      { id: "c1", description: "Justificou a necessidade (dependências/chamadores ausentes ou indisponíveis).", points: 40 },
      { id: "c2", description: "Deu um exemplo de uso de stub.", points: 30 },
      { id: "c3", description: "Deu um exemplo de uso de driver.", points: 30 },
    ],
    totalPoints: 100,
  },
];
