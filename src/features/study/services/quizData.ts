import { QuizQuestion, SimulationQuestion } from "../schemas/studyTypes";

export const quizQuestions: QuizQuestion[] = [
  // --- MÓDULO: FUNDAMENTOS (ERRO/DEFEITO/FALHA) ---
  {
    id: "q_fund_1",
    moduleId: "fundamentals",
    questionText: "Um programador troca '>' por '>=' em uma condição. O código com esse trecho ainda não foi executado por nenhum teste. Como classificamos esse '>=' incorreto?",
    options: [
      { id: "a", text: "Falha (failure)", isCorrect: false, explanation: "Incorreto. Falha é o comportamento observável na saída; como nada foi executado, não há falha." },
      { id: "b", text: "Erro (error)", isCorrect: false, explanation: "Incorreto. Erro é um estado interno inconsistente durante a execução, que ainda não ocorreu." },
      { id: "c", text: "Defeito (fault)", isCorrect: true, explanation: "Correto! O trecho de código estaticamente incorreto é um defeito (fault/bug), e pode existir sem nunca ser executado." },
      { id: "d", text: "Engano (mistake)", isCorrect: false, explanation: "Incorreto. O engano é a ação humana; sua manifestação no código é o defeito." }
    ]
  },
  {
    id: "q_fund_2",
    moduleId: "fundamentals",
    questionText: "Segundo Dijkstra, qual é a principal limitação da atividade de teste?",
    options: [
      { id: "a", text: "O teste prova matematicamente a ausência de defeitos.", isCorrect: false, explanation: "Incorreto. É justamente o oposto do que Dijkstra afirma." },
      { id: "b", text: "O teste pode mostrar a presença de defeitos, mas nunca a sua ausência.", isCorrect: true, explanation: "Correto! Testes aumentam a confiança, mas não garantem que o software esteja livre de defeitos." },
      { id: "c", text: "O teste só funciona em linguagens orientadas a objetos.", isCorrect: false, explanation: "Incorreto. A técnica independe do paradigma da linguagem." },
      { id: "d", text: "Verificação e validação são sinônimos exatos.", isCorrect: false, explanation: "Incorreto. Verificação ('construir certo') e validação ('construir o certo') são complementares, não sinônimos." }
    ]
  },

  // --- MÓDULO: CASO DE TESTE ---
  {
    id: "q_tc_1",
    moduleId: "test_cases",
    questionText: "Qual é o papel do oráculo de teste?",
    options: [
      { id: "a", text: "Gerar automaticamente os dados de entrada.", isCorrect: false, explanation: "Incorreto. Gerar entradas é papel dos critérios/geradores, não do oráculo." },
      { id: "b", text: "Determinar se o resultado obtido está correto (saída esperada).", isCorrect: true, explanation: "Correto! O oráculo é o mecanismo que decide se a saída observada corresponde à esperada." },
      { id: "c", text: "Medir o tempo de execução do teste.", isCorrect: false, explanation: "Incorreto. Isso é uma métrica de desempenho, não a função do oráculo." },
      { id: "d", text: "Compilar o código sob teste.", isCorrect: false, explanation: "Incorreto. Compilação é tarefa do compilador, não do oráculo." }
    ]
  },
  {
    id: "q_tc_2",
    moduleId: "test_cases",
    questionText: "Um caso de teste só tem valor real quando:",
    options: [
      { id: "a", text: "Seu resultado esperado é definido antes da execução, a partir da especificação.", isCorrect: true, explanation: "Correto! Sem conhecer a saída correta de antemão, é impossível decidir se o software passou ou falhou." },
      { id: "b", text: "Ele sempre passa na primeira execução.", isCorrect: false, explanation: "Incorreto. Um teste que sempre passa pode simplesmente não estar exercitando defeitos." },
      { id: "c", text: "Ele não possui pré-condições.", isCorrect: false, explanation: "Incorreto. Pré-condições são parte legítima e útil de um caso de teste." },
      { id: "d", text: "Ele depende de outro caso de teste para rodar.", isCorrect: false, explanation: "Incorreto. O ideal é que casos de teste sejam independentes entre si." }
    ]
  },

  // --- MÓDULO: GRAFO DE FLUXO DE CONTROLE (CFG) ---
  {
    id: "q_cfg_1",
    moduleId: "cfg",
    questionText: "Um grafo de fluxo de controle possui 8 arestas (E) e 7 nós (N). Qual a complexidade ciclomática V(G) pela fórmula E - N + 2?",
    options: [
      { id: "a", text: "V(G) = 1", isCorrect: false, explanation: "Incorreto. Calcule 8 - 7 + 2." },
      { id: "b", text: "V(G) = 2", isCorrect: false, explanation: "Incorreto. Revise: E - N + 2 = 8 - 7 + 2." },
      { id: "c", text: "V(G) = 3", isCorrect: true, explanation: "Correto! V(G) = E - N + 2 = 8 - 7 + 2 = 3 caminhos independentes." },
      { id: "d", text: "V(G) = 4", isCorrect: false, explanation: "Incorreto. O resultado de 8 - 7 + 2 é 3." }
    ]
  },
  {
    id: "q_cfg_2",
    moduleId: "cfg",
    questionText: "Qual afirmação sobre a relação de força entre os critérios estruturais é correta?",
    options: [
      { id: "a", text: "Cobrir todos os nós garante cobrir todas as arestas.", isCorrect: false, explanation: "Incorreto. É o contrário: cobrir arestas garante cobrir nós, mas não o inverso." },
      { id: "b", text: "Cobertura de Todas-Arestas subsume a cobertura de Todos-Nós.", isCorrect: true, explanation: "Correto! Percorrer todas as arestas necessariamente executa todos os nós; por isso Todas-Arestas é mais forte." },
      { id: "c", text: "Todos-Caminhos é o critério mais fraco.", isCorrect: false, explanation: "Incorreto. Todos-Caminhos é o mais forte (e geralmente impraticável com laços)." },
      { id: "d", text: "Cobertura de comandos e cobertura de desvios são idênticas.", isCorrect: false, explanation: "Incorreto. Cobertura de desvios (arestas) é estritamente mais forte que cobertura de comandos (nós)." }
    ]
  },

  // --- MÓDULO: CRITÉRIOS DE TESTE ---
  {
    id: "q_crit_1",
    moduleId: "criteria",
    questionText: "A técnica que projeta casos de teste apenas a partir da especificação, sem analisar o código-fonte, é chamada de:",
    options: [
      { id: "a", text: "Teste estrutural (caixa-branca)", isCorrect: false, explanation: "Incorreto. O teste estrutural analisa o código interno do programa." },
      { id: "b", text: "Teste funcional (caixa-preta)", isCorrect: true, explanation: "Correto! O teste funcional/caixa-preta foca em entradas e saídas conforme a especificação, ignorando a estrutura interna." },
      { id: "c", text: "Teste de mutação", isCorrect: false, explanation: "Incorreto. Mutação é uma técnica baseada em defeitos que altera o código." },
      { id: "d", text: "Teste de fluxo de dados", isCorrect: false, explanation: "Incorreto. Fluxo de dados é um critério estrutural (caixa-branca)." }
    ]
  },
  {
    id: "q_crit_2",
    moduleId: "criteria",
    questionText: "Para a regra 'idade válida entre 18 e 65 anos', qual conjunto reflete melhor a Análise de Valor Limite?",
    options: [
      { id: "a", text: "Apenas o valor 40 (um valor típico válido).", isCorrect: false, explanation: "Incorreto. Isso é um valor típico de classe de equivalência, não os limites." },
      { id: "b", text: "Os valores 17, 18, 65 e 66 (em torno das fronteiras).", isCorrect: true, explanation: "Correto! A análise de valor limite testa as bordas e seus vizinhos imediatos, onde defeitos de '>' vs '>=' costumam aparecer." },
      { id: "c", text: "Apenas valores negativos.", isCorrect: false, explanation: "Incorreto. Valores negativos cobrem uma classe inválida, mas não exploram as fronteiras 18 e 65." },
      { id: "d", text: "Mil valores aleatórios entre 0 e 100.", isCorrect: false, explanation: "Incorreto. Testes aleatórios em massa são ineficientes e não focam nas fronteiras críticas." }
    ]
  },

  // --- MÓDULO 1: DFG ---
  {
    id: "q_dfg_1",
    moduleId: "dfg",
    questionText: "Em um Grafo de Fluxo de Dados (DFG), se uma variável 'x' é avaliada dentro de uma instrução 'if (x > 10)', qual classificação essa ocorrência recebe?",
    options: [
      { id: "a", text: "Definição (def)", isCorrect: false, explanation: "Incorreto. Uma definição ocorre quando 'x' recebe um valor, não quando é lido em uma condicional." },
      { id: "b", text: "Uso Computacional (c-uso)", isCorrect: false, explanation: "Incorreto. O c-uso refere-se ao uso de uma variável em operações matemáticas ou atribuições diretas." },
      { id: "c", text: "Uso Predicativo (p-uso)", isCorrect: true, explanation: "Correto! O uso predicativo (p-uso) ocorre quando a variável é usada na avaliação de uma condição para desvio do fluxo." },
      { id: "d", text: "Anomalia de fluxo", isCorrect: false, explanation: "Incorreto. Ler uma variável em um 'if' é uma operação válida e padrão, não uma anomalia." }
    ]
  },
  {
    id: "q_dfg_2",
    moduleId: "dfg",
    questionText: "Qual das seguintes sequências caracteriza uma anomalia de fluxo de dados do tipo 'ur' (useless/uninitialized reference)?",
    options: [
      { id: "a", text: "Definir a variável duas vezes seguidas sem nenhum uso entre elas.", isCorrect: false, explanation: "Incorreto. Isso caracteriza a anomalia 'dd' (defined-defined)." },
      { id: "b", text: "Utilizar uma variável antes que ela tenha sido declarada ou inicializada com um valor.", isCorrect: true, explanation: "Correto! A anomalia 'ur' (undefined-read) ocorre quando tentamos ler/usar uma variável que não foi definida." },
      { id: "c", text: "Definir a variável e depois ela sair do escopo sem nunca ter sido lida.", isCorrect: false, explanation: "Incorreto. Isso caracteriza a anomalia 'du' (defined-undefined)." },
      { id: "d", text: "Acessar uma variável global de dentro de um método estático.", isCorrect: false, explanation: "Incorreto. Isso é uma restrição de escopo da linguagem, não uma anomalia de fluxo de dados." }
    ]
  },

  // --- MÓDULO 2: DEFEITOS/MUTAÇÃO ---
  {
    id: "q_mut_1",
    moduleId: "defect_based",
    questionText: "Se 20 defeitos foram semeados (S) no código, e os testes encontraram 15 dos semeados (s) e 30 defeitos reais (n), qual a estimativa do número total de defeitos reais (N) do sistema?",
    options: [
      { id: "a", text: "N = 35 defeitos", isCorrect: false, explanation: "Incorreto. Use a fórmula: N = (n * S) / s." },
      { id: "b", text: "N = 40 defeitos", isCorrect: true, explanation: "Correto! Pela fórmula da semeadura: N = (30 * 20) / 15 = 600 / 15 = 40 defeitos reais estimados." },
      { id: "c", text: "N = 45 defeitos", isCorrect: false, explanation: "Incorreto. Revise os cálculos na fórmula N = (n * S) / s." },
      { id: "d", text: "N = 50 defeitos", isCorrect: false, explanation: "Incorreto. O resultado correto é 40." }
    ]
  },
  {
    id: "q_mut_2",
    moduleId: "defect_based",
    questionText: "Um mutante é chamado de 'Equivalente' quando:",
    options: [
      { id: "a", text: "Ele pode ser facilmente morto por qualquer caso de teste da suíte.", isCorrect: false, explanation: "Incorreto. Se ele pode ser morto, ele não é equivalente." },
      { id: "b", text: "Ele apresenta o mesmo escore de mutação que a média dos outros mutantes.", isCorrect: false, explanation: "Incorreto. O termo se refere à equivalência semântica do código." },
      { id: "c", text: "A alteração sintática não muda o comportamento semântico (funcionalidade) do programa em relação ao original.", isCorrect: true, explanation: "Correto! Mutantes equivalentes se comportam de forma idêntica ao original para qualquer entrada, impossibilitando sua morte por testes." },
      { id: "d", text: "O mutante lança uma exceção em tempo de compilação.", isCorrect: false, explanation: "Incorreto. Se não compila, ele é um mutante natimorto (stillborn), não equivalente." }
    ]
  },

  // --- MÓDULO 3: RISCOS ---
  {
    id: "q_risk_1",
    moduleId: "risk_based",
    questionText: "Na estratégia de Teste Baseado em Risco, quais componentes devem ser priorizados para receberem os testes mais exaustivos?",
    options: [
      { id: "a", text: "Componentes com alta probabilidade de falha e alto impacto de negócio.", isCorrect: true, explanation: "Correto! Risco = Probabilidade * Impacto. A prioridade máxima (crítico) é dada a itens onde ambos são elevados." },
      { id: "b", text: "Componentes fáceis de codificar e que não sofreram alterações.", isCorrect: false, explanation: "Incorreto. Estes representam baixo risco (baixa probabilidade de falha e provavelmente menor criticidade)." },
      { id: "c", text: "Componentes que serão implementados na última sprint do projeto.", isCorrect: false, explanation: "Incorreto. O cronograma de desenvolvimento não define a priorização de riscos de forma direta." },
      { id: "d", text: "Componentes que possuem menor número de linhas de código.", isCorrect: false, explanation: "Incorreto. Código menor costuma ter menor probabilidade de falha." }
    ]
  },

  // --- MÓDULO 4: NÍVEIS ---
  {
    id: "q_lev_1",
    moduleId: "test_levels",
    questionText: "Qual nível de teste tem como foco principal avaliar o comportamento funcional de ponta a ponta e os requisitos não funcionais do software completo?",
    options: [
      { id: "a", text: "Teste Unitário", isCorrect: false, explanation: "Incorreto. O teste unitário foca no isolamento e em pequenas partes do código." },
      { id: "b", text: "Teste de Integração", isCorrect: false, explanation: "Incorreto. A integração valida a interface e comunicação entre módulos." },
      { id: "c", text: "Teste de Sistema", isCorrect: true, explanation: "Correto! O teste de sistema valida o produto final integrado e completo frente aos seus requisitos de negócio e desempenho." },
      { id: "d", text: "Teste de Aceitação", isCorrect: false, explanation: "Incorreto. O teste de aceitação é focado na aprovação formal pelo usuário final, não no comportamento geral de sistema." }
    ]
  },

  // --- MÓDULO 5: DRIVERS/STUBS ---
  {
    id: "q_drv_1",
    moduleId: "drivers_stubs",
    questionText: "No teste de integração descendente (Top-Down), qual componente simulador é utilizado para substituir módulos de níveis inferiores que ainda não foram desenvolvidos?",
    options: [
      { id: "a", text: "Driver", isCorrect: false, explanation: "Incorreto. Drivers simulam chamadores superiores no teste Bottom-Up." },
      { id: "b", text: "Stub", isCorrect: true, explanation: "Correto! O Stub simula a resposta de métodos inferiores chamados pelo componente sob teste no fluxo Top-Down." },
      { id: "c", text: "Mock", isCorrect: false, explanation: "Incorreto. Mock é um termo mais genérico de dublês de teste, mas estruturalmente o fluxo top-down usa stubs." },
      { id: "d", text: "Spy", isCorrect: false, explanation: "Incorreto. Spies são wrappers sobre objetos reais usados no teste unitário." }
    ]
  },

  // --- MÓDULO 6: JUNIT/MOCKITO ---
  {
    id: "q_jum_1",
    moduleId: "junit_mockito",
    questionText: "No Mockito, qual a diferença fundamental entre as anotações @Mock e @Spy?",
    options: [
      { id: "a", text: "@Mock cria uma classe real e @Spy cria um dublê estático.", isCorrect: false, explanation: "Incorreto. Ambas criam dublês de teste." },
      { id: "b", text: "@Mock substitui totalmente o objeto (retornando nulos por padrão), enquanto @Spy encapsula um objeto real e chama seus métodos reais por padrão.", isCorrect: true, explanation: "Correto! Esta é a diferença conceitual mais importante no Mockito." },
      { id: "c", text: "@Mock só funciona para interfaces e @Spy só funciona para classes concretas.", isCorrect: false, explanation: "Incorreto. Ambas podem ser aplicadas em classes ou interfaces." },
      { id: "d", text: "@Mock é do JUnit 5 e @Spy é nativo da linguagem Java.", isCorrect: false, explanation: "Incorreto. Ambas são anotações da biblioteca Mockito." }
    ]
  },

  // --- QUESTÕES ADICIONAIS (reforço por módulo) ---

  // FUNDAMENTOS
  {
    id: "q_fund_3",
    moduleId: "fundamentals",
    questionText: "Uma revisão de código verifica se a implementação está de acordo com o documento de especificação. Essa atividade é um exemplo de:",
    options: [
      { id: "a", text: "Validação", isCorrect: false, explanation: "Incorreto. Validação pergunta se construímos o produto certo (necessidade do usuário)." },
      { id: "b", text: "Verificação", isCorrect: true, explanation: "Correto! Verificação pergunta 'construímos o produto corretamente?', comparando com a especificação/projeto." },
      { id: "c", text: "Depuração (debug)", isCorrect: false, explanation: "Incorreto. Depuração é a atividade de localizar e corrigir o defeito após uma falha." },
      { id: "d", text: "Semeadura de defeitos", isCorrect: false, explanation: "Incorreto. Semeadura insere defeitos artificiais para estimar a quantidade total." }
    ]
  },

  // CASO DE TESTE
  {
    id: "q_tc_3",
    moduleId: "test_cases",
    questionText: "Quais elementos compõem minimamente um caso de teste bem formado?",
    options: [
      { id: "a", text: "Apenas a saída esperada.", isCorrect: false, explanation: "Incorreto. A saída esperada sozinha não permite executar o teste; faltam entradas e pré-condições." },
      { id: "b", text: "Pré-condições, dados de entrada e resultado esperado.", isCorrect: true, explanation: "Correto! Um caso de teste define o estado inicial (pré-condições), as entradas e o resultado esperado para comparação." },
      { id: "c", text: "Somente o nome do desenvolvedor responsável.", isCorrect: false, explanation: "Incorreto. Metadados como autor são auxiliares, não a essência do caso de teste." },
      { id: "d", text: "O tempo de compilação do código.", isCorrect: false, explanation: "Incorreto. Isso é uma métrica de build, não parte do caso de teste." }
    ]
  },

  // CFG
  {
    id: "q_cfg_3",
    moduleId: "cfg",
    questionText: "O que caracteriza um 'bloco básico' (nó) em um Grafo de Fluxo de Controle?",
    options: [
      { id: "a", text: "Uma sequência maximal de comandos executados sequencialmente, sem desvios internos.", isCorrect: true, explanation: "Correto! Se o primeiro comando do bloco executa, todos os demais também executam; o controle só entra no início e sai no fim." },
      { id: "b", text: "Qualquer comando que contenha uma chamada de método.", isCorrect: false, explanation: "Incorreto. Uma chamada de método não inicia necessariamente um novo bloco básico." },
      { id: "c", text: "Apenas comandos de decisão (if/while).", isCorrect: false, explanation: "Incorreto. Decisões geram nós de decisão, mas blocos básicos incluem qualquer sequência linear." },
      { id: "d", text: "Um conjunto de variáveis declaradas no método.", isCorrect: false, explanation: "Incorreto. Bloco básico se refere a comandos, não a declarações de variáveis." }
    ]
  },

  // CRITÉRIOS
  {
    id: "q_crit_3",
    moduleId: "criteria",
    questionText: "O teste de mutação, que insere pequenas alterações no código para avaliar a qualidade da suíte de testes, pertence a qual categoria de técnica?",
    options: [
      { id: "a", text: "Técnica funcional (caixa-preta)", isCorrect: false, explanation: "Incorreto. A técnica funcional não olha o código; a mutação altera o código diretamente." },
      { id: "b", text: "Técnica baseada em defeitos", isCorrect: true, explanation: "Correto! O teste de mutação é a principal técnica baseada em defeitos, avaliando se os testes detectam defeitos plantados." },
      { id: "c", text: "Técnica baseada em risco", isCorrect: false, explanation: "Incorreto. O teste baseado em risco prioriza o esforço, mas não é a definição da mutação." },
      { id: "d", text: "Técnica de aceitação", isCorrect: false, explanation: "Incorreto. Aceitação é um nível de teste com foco no usuário final." }
    ]
  },

  // DFG
  {
    id: "q_dfg_3",
    moduleId: "dfg",
    questionText: "Sobre a força dos critérios de fluxo de dados, qual afirmação é correta?",
    options: [
      { id: "a", text: "Todos-Usos subsume Todas-Definições.", isCorrect: true, explanation: "Correto! Cobrir caminhos até todos os usos (c-uso e p-uso) inclui necessariamente cobrir ao menos um uso por definição." },
      { id: "b", text: "Todas-Definições é o critério mais forte e custoso.", isCorrect: false, explanation: "Incorreto. Todas-Definições é mais fraco; Todos-DU-Caminhos é o mais forte." },
      { id: "c", text: "Todos-DU-Caminhos é o mais fraco de todos.", isCorrect: false, explanation: "Incorreto. É exatamente o oposto: é o mais forte e o mais caro." },
      { id: "d", text: "p-uso e c-uso são sinônimos.", isCorrect: false, explanation: "Incorreto. p-uso ocorre em predicados (decisões) e c-uso em computações." }
    ]
  },

  // DFG — QUESTÕES APLICADAS (grafos, tabelas e código)
  {
    id: "q_dfg_4",
    moduleId: "dfg",
    questionText: "Analise o código e o **grafo de fluxo de dados** abaixo. A variável `y` é definida no nó 2 (`y = 0`), mas em **todo** caminho ela é redefinida no nó 4 ou no nó 6 **antes** de ser lida no nó 7. Que anomalia de fluxo de dados a definição do nó 2 caracteriza?",
    codeContext: `int exemplo(int x) {
    int y = 0;        // no 2: def y
    if (x > 0) {      // no 3: p-uso x
        y = x * 2;    // no 4: c-uso x, def y
    } else {
        y = -x;       // no 6: c-uso x, def y
    }
    return y;         // no 7: c-uso y
}`,
    codeLanguage: "java",
    diagramMermaid: `flowchart TD
    N1["(1) x = parâmetro — def x"] --> N2["(2) y = 0 — def y"]
    N2 --> N3{"(3) x > 0 ? — p-uso x"}
    N3 -- "verdadeiro" --> N4["(4) y = x*2 — c-uso x, def y"]
    N3 -- "falso" --> N6["(6) y = -x — c-uso x, def y"]
    N4 --> N7["(7) return y — c-uso y"]
    N6 --> N7`,
    diagramCaption: "Grafo de fluxo de dados do método exemplo",
    options: [
      { id: "a", text: "Anomalia dd (definida e redefinida sem uso intermediário).", isCorrect: true, explanation: "Correto! A definição y = 0 do nó 2 é sobrescrita no nó 4 ou 6 antes de qualquer leitura, caracterizando a anomalia dd (defined-defined): a primeira atribuição é inútil." },
      { id: "b", text: "Anomalia ur (uso de variável não inicializada).", isCorrect: false, explanation: "Incorreto. A anomalia ur ocorre ao ler uma variável sem valor; aqui y foi definida normalmente no nó 2." },
      { id: "c", text: "Anomalia du (definida e nunca usada até sair do escopo).", isCorrect: false, explanation: "Incorreto. Na anomalia du a variável jamais é lida; aqui y é lida no nó 7, apenas após ser redefinida — o problema é a redefinição (dd)." },
      { id: "d", text: "Nenhuma anomalia: trata-se de um c-uso comum de `y`.", isCorrect: false, explanation: "Incorreto. y = 0 é uma definição (não um uso), e ela é desperdiçada por sempre ser sobrescrita antes de ser lida." }
    ]
  },
  {
    id: "q_dfg_5",
    moduleId: "dfg",
    questionText: "No grafo abaixo, a variável `x` é avaliada na decisão do nó 3 (`if (x > 0)`). Segundo a teoria de fluxo de dados, a **qual elemento do grafo** esse p-uso de `x` é associado?",
    diagramMermaid: `flowchart TD
    N1["(1) def x"] --> N2["(2) def y"]
    N2 --> N3{"(3) x > 0 ? — p-uso x"}
    N3 -- "verdadeiro" --> N4["(4) c-uso x"]
    N3 -- "falso" --> N6["(6) c-uso x"]
    N4 --> N7["(7) c-uso y"]
    N6 --> N7`,
    diagramCaption: "Decisão no nó 3 com dois ramos de saída",
    options: [
      { id: "a", text: "Ao nó 3 apenas, pois todo uso pertence a um nó.", isCorrect: false, explanation: "Incorreto. Quem se associa a um nó é o c-uso; o p-uso se associa às arestas de saída da decisão." },
      { id: "b", text: "Às arestas (3,4) e (3,6) que saem da decisão.", isCorrect: true, explanation: "Correto! O p-uso é associado às arestas de saída do nó de decisão — neste caso (3,4) para o ramo verdadeiro e (3,6) para o falso." },
      { id: "c", text: "Ao nó 1, onde `x` foi definida.", isCorrect: false, explanation: "Incorreto. O nó 1 contém a definição (def) de x, não o seu uso predicativo." },
      { id: "d", text: "Ao nó 7, onde o resultado é retornado.", isCorrect: false, explanation: "Incorreto. O nó 7 faz c-uso de y; não tem relação com o p-uso de x no nó 3." }
    ]
  },
  {
    id: "q_dfg_6",
    moduleId: "dfg",
    questionText: "Ainda sobre o grafo do método `exemplo`, a variável `x` é **definida apenas no nó 1** e tem c-usos nos nós 4 e 6 (além de um p-uso no nó 3). Quantas **associações def→c-uso** livres de redefinição ⟨def, c-uso, x⟩ existem para `x`?",
    codeContext: `// no 1: def x
// no 3: p-uso x   (decisão)
// no 4: c-uso x   (ramo verdadeiro)
// no 6: c-uso x   (ramo falso)
// x não é redefinida em nenhum ponto`,
    codeLanguage: "java",
    options: [
      { id: "a", text: "Nenhuma, pois `x` só possui p-uso.", isCorrect: false, explanation: "Incorreto. Além do p-uso no nó 3, x é usada em computação nos nós 4 e 6 (c-usos)." },
      { id: "b", text: "1 associação.", isCorrect: false, explanation: "Incorreto. Há dois c-usos distintos alcançáveis a partir da definição do nó 1." },
      { id: "c", text: "2 associações: ⟨1, 4, x⟩ e ⟨1, 6, x⟩.", isCorrect: true, explanation: "Correto! A definição do nó 1 alcança, por caminhos livres de redefinição, o c-uso do nó 4 e o c-uso do nó 6 — duas associações def→c-uso." },
      { id: "d", text: "3 associações.", isCorrect: false, explanation: "Incorreto. O uso no nó 3 é p-uso (associação def→p-uso), não conta como associação def→c-uso. Restam apenas 2 c-usos." }
    ]
  },
  {
    id: "q_dfg_7",
    moduleId: "dfg",
    questionText: "A tabela relaciona critérios de fluxo de dados às suas exigências. **Qual linha está INCORRETA?**\n\n| Critério | Exigência |\n| :-- | :-- |\n| Todas-Definições | cobrir pelo menos um uso (c-uso ou p-uso) de cada definição |\n| Todos-P-Usos | cobrir todos os p-usos de cada definição |\n| Todos-Usos | cobrir todos os c-usos e p-usos de cada definição |\n| Todos-DU-Caminhos | é o critério mais fraco e mais barato de aplicar |",
    options: [
      { id: "a", text: "Linha de Todas-Definições.", isCorrect: false, explanation: "Incorreto. A descrição está certa: basta um uso por definição." },
      { id: "b", text: "Linha de Todos-P-Usos.", isCorrect: false, explanation: "Incorreto. A descrição está correta: exige cobrir todos os p-usos de cada definição." },
      { id: "c", text: "Linha de Todos-Usos.", isCorrect: false, explanation: "Incorreto. A descrição está correta: cobre todos os c-usos e p-usos." },
      { id: "d", text: "Linha de Todos-DU-Caminhos.", isCorrect: true, explanation: "Correto! Está invertida: Todos-DU-Caminhos é o critério mais FORTE e mais CARO (testa todos os caminhos simples livres de redefinição), não o mais fraco/barato." }
    ]
  },
  {
    id: "q_dfg_8",
    moduleId: "dfg",
    questionText: "Considere o programa **Identificador** (grafo abaixo). A variável `length` é definida nos nós 1, 2 e 5 e tem um **p-uso no nó 8**. Qual caminho é **livre de redefinição (def-clear)** da definição do nó 2 até o p-uso de `length` no nó 8?",
    diagramMermaid: `flowchart TD
    N1["1: def length, achar, valid_id"]
    N2["2: def length (= 1)"]
    N3{"3: achar diferente de EOL?"}
    N4{"4: caractere valido?"}
    N5["5: length = length + 1"]
    N6["6: valid_id = 0"]
    N7["7: achar = ler()"]
    N8{"8: valid_id e tamanho de 1 a 6?"}
    N9["9: VALIDO"]
    N10["10: INVALIDO"]
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
    diagramCaption: "Grafo de fluxo do programa Identificador",
    options: [
      { id: "a", text: "(2, 3, 8)", isCorrect: true, explanation: "Correto! O laço não é executado (3→8 direto), então `length` não é redefinida entre o nó 2 e o p-uso no nó 8 — caminho def-clear." },
      { id: "b", text: "(2, 3, 4, 5, 7, 3, 8)", isCorrect: false, explanation: "Incorreto. Esse caminho passa pelo nó 5, que redefine `length` (length = length + 1), quebrando a condição def-clear." },
      { id: "c", text: "(1, 2, 3, 8)", isCorrect: false, explanation: "Incorreto. O caminho requerido deve começar na própria definição analisada (nó 2); incluir o nó 1 introduz outra definição de `length`." },
      { id: "d", text: "(2, 3, 4, 5)", isCorrect: false, explanation: "Incorreto. Esse caminho termina no nó 5 (que redefine `length`) e nem chega ao p-uso do nó 8." }
    ]
  },
  {
    id: "q_dfg_9",
    moduleId: "dfg",
    questionText: "No código abaixo, a variável `temp` recebe um valor mas nunca é lida antes de o método terminar. Que anomalia de fluxo de dados ela apresenta?",
    codeContext: `int calcular(int a) {
    int total = a * 2;   // def total
    int temp;
    temp = total + 1;    // def temp, c-uso total
    return total;        // c-uso total
    // 'temp' nunca é lida
}`,
    codeLanguage: "java",
    options: [
      { id: "a", text: "Anomalia ur (uso antes de inicializar).", isCorrect: false, explanation: "Incorreto. ur seria ler `temp` sem valor; aqui o problema é o oposto: ela recebe valor e nunca é lida." },
      { id: "b", text: "Anomalia dd (definida e redefinida).", isCorrect: false, explanation: "Incorreto. `temp` é definida uma única vez; não há redefinição sem uso intermediário." },
      { id: "c", text: "Anomalia du (definida e nunca usada até sair do escopo).", isCorrect: true, explanation: "Correto! `temp` é definida (temp = total + 1) e jamais lida antes de sair do escopo — caracteriza a anomalia du (defined-undefined), indicando código inútil." },
      { id: "d", text: "Nenhuma anomalia.", isCorrect: false, explanation: "Incorreto. Definir uma variável e nunca usá-la é a anomalia du, sintoma de código morto." }
    ]
  },
  {
    id: "q_dfg_10",
    moduleId: "dfg",
    questionText: "Sobre a relação de **força (subsunção)** entre os critérios de fluxo de dados, qual afirmativa é VERDADEIRA?",
    options: [
      { id: "a", text: "Todos-Usos subsume Todos-DU-Caminhos.", isCorrect: false, explanation: "Incorreto. É o contrário: Todos-DU-Caminhos é mais forte e subsume Todos-Usos." },
      { id: "b", text: "Todos-DU-Caminhos subsume Todos-Usos.", isCorrect: true, explanation: "Correto! Cobrir todos os caminhos def-clear (DU-Caminhos) necessariamente cobre todos os usos; por isso é o critério mais forte da hierarquia." },
      { id: "c", text: "Todas-Definições subsume Todos-Usos.", isCorrect: false, explanation: "Incorreto. Todas-Definições é mais fraco (basta um uso por definição), logo não subsume Todos-Usos." },
      { id: "d", text: "Todos-P-Usos subsume Todos-Usos.", isCorrect: false, explanation: "Incorreto. Todos-Usos exige p-usos e c-usos; Todos-P-Usos cobre só os p-usos, sendo mais fraco." }
    ]
  },
  {
    id: "q_dfg_11",
    moduleId: "dfg",
    questionText: "Quantas **definições (def)** da variável `s` existem no código abaixo?",
    codeContext: `int soma(int[] v) {
    int s = 0;                 // (A)
    for (int i = 0; i < v.length; i++) {
        s = s + v[i];          // (B)
    }
    return s;
}`,
    codeLanguage: "java",
    options: [
      { id: "a", text: "4 definições.", isCorrect: false, explanation: "Incorreto. Conte apenas onde `s` recebe valor: em (A) e em (B)." },
      { id: "b", text: "3 definições.", isCorrect: false, explanation: "Incorreto. `s` recebe valor em apenas dois pontos do código." },
      { id: "c", text: "2 definições.", isCorrect: true, explanation: "Correto! `s = 0` (A) e `s = s + v[i]` (B) são as duas definições de `s`. A leitura de `s` dentro de (B) e no return são c-usos, não definições." },
      { id: "d", text: "1 definição.", isCorrect: false, explanation: "Incorreto. Além da inicialização `s = 0`, há a redefinição dentro do laço (`s = s + v[i]`)." }
    ]
  },
  {
    id: "q_dfg_12",
    moduleId: "dfg",
    questionText: "No comando `boolean valido = (n >= 0) && (n <= max);`, como se classifica o uso de `n`? (Atenção à pegadinha entre p-uso e c-uso.)",
    options: [
      { id: "a", text: "Definição, pois `n` está à direita de uma atribuição.", isCorrect: false, explanation: "Incorreto. Quem é definida é `valido` (lado esquerdo); `n` apenas é lida." },
      { id: "b", text: "p-uso, pois `n` aparece em comparações.", isCorrect: false, explanation: "Incorreto. p-uso exige que a expressão controle um desvio de fluxo (if/while). Aqui o resultado é apenas atribuído a uma variável." },
      { id: "c", text: "Anomalia dd.", isCorrect: false, explanation: "Incorreto. Não há definição de `n` aqui, muito menos redefinição." },
      { id: "d", text: "c-uso, pois o resultado é atribuído a `valido` sem desviar o fluxo.", isCorrect: true, explanation: "Correto! Mesmo havendo comparações, a expressão não decide um desvio de controle: o valor é computado e atribuído a `valido`, configurando c-uso de `n` (e de `max`)." }
    ]
  },

  // DFG — QUESTÕES DISSERTATIVAS E DE DESENHO (resolva no caderno)
  {
    id: "q_dfg_open_1",
    moduleId: "dfg",
    type: "open",
    questionText: "Explique, com suas palavras, a diferença entre **c-uso** e **p-uso** de uma variável no teste de fluxo de dados. Dê um exemplo de código curto que contenha os dois tipos de uso para a mesma variável.",
    answerHint: "Defina cada tipo de uso, diga a qual elemento do grafo ele se associa (nó ou aresta) e ilustre com código.",
    expectedAnswer: `Um **c-uso (uso computacional)** ocorre quando a variável é lida em uma **computação** ou atribuição, sem decidir o fluxo. Ele é associado a um **nó** do grafo.

Um **p-uso (uso predicativo)** ocorre quando a variável é avaliada em um **predicado** que decide um desvio (\`if\`, \`while\`, \`for\`). Ele é associado às **arestas** de saída da decisão.

Exemplo com a variável \`x\`:

\`\`\`java
int x = ler();        // def de x
if (x > 0) {          // p-uso de x (decisão -> arestas)
    int y = x * 2;    // c-uso de x (computação -> nó)
}
\`\`\`

Aqui \`x\` tem um p-uso na condição \`x > 0\` e um c-uso na expressão \`x * 2\`.`,
  },
  {
    id: "q_dfg_draw_1",
    moduleId: "dfg",
    type: "drawing",
    questionText: "**Desenhe o grafo de fluxo** do método abaixo. Numere os nós (blocos) e, em cada um, anote as **definições (def)** e os **usos (c-uso/p-uso)** das variáveis `n` e `r`. Indique o p-uso nas arestas da decisão.",
    answerHint: "Desenhe os nós como caixas e ligue-os com setas; marque def/c-uso nos nós e o p-uso nas arestas que saem do if.",
    codeContext: `int classifica(int n) {
    int r;
    if (n % 2 == 0) {   // decisão: p-uso n
        r = n / 2;      // c-uso n, def r
    } else {
        r = n * 3 + 1;  // c-uso n, def r
    }
    return r;           // c-uso r
}`,
    codeLanguage: "java",
    expectedAnswer: `Solução esperada (4 nós):

- **Nó 1** — \`if (n % 2 == 0)\`: **p-uso de n** nas arestas (1,2) e (1,3).
- **Nó 2** — \`r = n / 2\`: **c-uso de n**, **def de r**.
- **Nó 3** — \`r = n * 3 + 1\`: **c-uso de n**, **def de r**.
- **Nó 4** — \`return r\`: **c-uso de r**.

A variável \`r\` tem duas definições (nós 2 e 3) que alcançam o c-uso do nó 4.`,
    expectedDiagramMermaid: `flowchart TD
    N1{"(1) n % 2 == 0 ? — p-uso n"}
    N2["(2) r = n/2 — c-uso n, def r"]
    N3["(3) r = n*3+1 — c-uso n, def r"]
    N4["(4) return r — c-uso r"]
    N1 -- "verdadeiro (1,2)" --> N2
    N1 -- "falso (1,3)" --> N3
    N2 --> N4
    N3 --> N4`,
    expectedDiagramCaption: "Grafo-gabarito do método classifica",
  },
  {
    id: "q_dfg_draw_2",
    moduleId: "dfg",
    type: "drawing",
    questionText: "**Monte a tabela de fluxo de dados** do método abaixo. Crie as colunas **Variável | Definições (nós) | c-usos (nós) | p-usos (nós)** e preencha para as variáveis `x` e `y`.",
    answerHint: "Percorra o código nó a nó e classifique cada ocorrência de x e y como def, c-uso ou p-uso.",
    codeContext: `int exemplo(int x) {
    int y = 0;        // no 2
    if (x > 0) {      // no 3
        y = x * 2;    // no 4
    } else {
        y = -x;       // no 6
    }
    return y;         // no 7
}`,
    codeLanguage: "java",
    expectedAnswer: `Considerando \`x\` como parâmetro definido no nó 1:

| Variável | Definições (nós) | c-usos (nós) | p-usos (nós) |
| :-- | :-- | :-- | :-- |
| \`x\` | 1 | 4, 6 | 3 |
| \`y\` | 2, 4, 6 | 7 | — |

Observação: a definição \`y = 0\` (nó 2) é sempre sobrescrita no nó 4 ou 6 antes do c-uso no nó 7 — uma anomalia **dd**.`,
  },
  {
    id: "q_dfg_open_2",
    moduleId: "dfg",
    type: "open",
    questionText: "Considere uma definição da variável `length` no nó 5 (`length = length + 1`) e um p-uso de `length` no nó 8 do programa Identificador. O caminho **(5, 7, 3, 4, 5, 7, 3, 8)** é um caminho **livre de redefinição (def-clear)** para essa associação? Justifique.",
    answerHint: "Verifique se a variável é redefinida em algum nó intermediário do caminho.",
    expectedAnswer: `**Não**, o caminho **não** é livre de redefinição.

Embora ele comece na definição do nó 5 e termine no p-uso do nó 8, o caminho **passa novamente pelo nó 5** (\`length = length + 1\`) no meio do percurso (...3, 4, **5**, 7, 3, 8). Esse nó **redefine** \`length\`, interrompendo o sub-caminho def-clear da primeira definição.

Para ser def-clear, nenhum nó intermediário entre a definição e o uso pode redefinir a variável. Um caminho válido seria **(5, 7, 3, 8)**, em que \`length\` não é redefinida antes do p-uso no nó 8.`,
  },

  // DEFEITOS / MUTAÇÃO
  {
    id: "q_mut_3",
    moduleId: "defect_based",
    questionText: "O 'paradoxo do pesticida' no contexto de teste de software afirma que:",
    options: [
      { id: "a", text: "Repetir sempre os mesmos casos de teste deixa de revelar novos defeitos com o tempo.", isCorrect: true, explanation: "Correto! Assim como pragas criam resistência, testes repetidos param de encontrar defeitos novos; é preciso revisá-los e renová-los." },
      { id: "b", text: "Quanto mais testes, mais defeitos são inseridos no código.", isCorrect: false, explanation: "Incorreto. Testar não insere defeitos; isso confunde com semeadura intencional." },
      { id: "c", text: "Defeitos se distribuem igualmente por todos os módulos.", isCorrect: false, explanation: "Incorreto. Isso contraria o princípio do agrupamento de defeitos (Pareto)." },
      { id: "d", text: "Mutantes equivalentes sempre podem ser mortos.", isCorrect: false, explanation: "Incorreto. Mutantes equivalentes, por definição, não podem ser mortos." }
    ]
  },

  // RISCOS (faltavam questões)
  {
    id: "q_risk_2",
    moduleId: "risk_based",
    questionText: "O risco de um item de software é tradicionalmente calculado pela combinação de quais dois fatores?",
    options: [
      { id: "a", text: "Probabilidade de ocorrência e Impacto da falha.", isCorrect: true, explanation: "Correto! Risco = Probabilidade x Impacto; a probabilidade reúne fatores técnicos e o impacto, fatores de negócio." },
      { id: "b", text: "Número de linhas e quantidade de comentários.", isCorrect: false, explanation: "Incorreto. Essas métricas isoladas não definem risco." },
      { id: "c", text: "Tempo de execução e uso de memória.", isCorrect: false, explanation: "Incorreto. São métricas de desempenho, não a fórmula do risco." },
      { id: "d", text: "Cobertura de código e número de testes.", isCorrect: false, explanation: "Incorreto. Cobertura mede o esforço de teste, não o risco do item." }
    ]
  },
  {
    id: "q_risk_3",
    moduleId: "risk_based",
    questionText: "Um item classificado com risco 'Insignificante' na matriz de risco deve, idealmente:",
    options: [
      { id: "a", text: "Receber o maior esforço de teste, com mutação e caixa-branca.", isCorrect: false, explanation: "Incorreto. Esse esforço é reservado aos itens críticos/altos." },
      { id: "b", text: "Ser testado por último ou apenas de forma exploratória, se houver tempo.", isCorrect: true, explanation: "Correto! Itens de baixíssimo risco têm prioridade mínima, recebendo testes leves ou nenhum se o tempo for escasso." },
      { id: "c", text: "Bloquear a entrega até cobertura de 100%.", isCorrect: false, explanation: "Incorreto. Seria desperdício de recursos em um item de risco mínimo." },
      { id: "d", text: "Ser removido do sistema automaticamente.", isCorrect: false, explanation: "Incorreto. Baixo risco não implica remoção da funcionalidade." }
    ]
  },

  // NÍVEIS DE TESTE (faltavam questões)
  {
    id: "q_lev_2",
    moduleId: "test_levels",
    questionText: "Na estratégia de integração Bottom-Up, qual dublê de teste é necessário para exercitar os módulos de baixo nível antes dos superiores existirem?",
    options: [
      { id: "a", text: "Stub", isCorrect: false, explanation: "Incorreto. Stubs simulam módulos chamados (inferiores), usados no Top-Down." },
      { id: "b", text: "Driver", isCorrect: true, explanation: "Correto! No Bottom-Up, o Driver simula o módulo chamador superior, alimentando o módulo de baixo nível sob teste." },
      { id: "c", text: "Oráculo", isCorrect: false, explanation: "Incorreto. Oráculo decide se a saída está correta; não substitui módulos." },
      { id: "d", text: "Mutante", isCorrect: false, explanation: "Incorreto. Mutante é uma versão alterada do código no teste de mutação." }
    ]
  },
  {
    id: "q_lev_3",
    moduleId: "test_levels",
    questionText: "Qual é o foco principal do Teste de Integração?",
    options: [
      { id: "a", text: "Verificar a comunicação e a transferência de dados entre módulos já testados.", isCorrect: true, explanation: "Correto! A integração valida as interfaces e a interação entre unidades, não a lógica interna de cada uma." },
      { id: "b", text: "Isolar e testar um único método sem dependências.", isCorrect: false, explanation: "Incorreto. Isso descreve o teste unitário." },
      { id: "c", text: "Validar requisitos não funcionais do sistema completo em produção.", isCorrect: false, explanation: "Incorreto. Isso é foco do teste de sistema." },
      { id: "d", text: "Obter a aprovação formal do cliente.", isCorrect: false, explanation: "Incorreto. Isso é o teste de aceitação." }
    ]
  },

  // DRIVERS / STUBS (faltavam questões)
  {
    id: "q_drv_2",
    moduleId: "drivers_stubs",
    questionText: "Qual afirmação descreve corretamente a posição de um Driver em relação ao módulo sob teste?",
    options: [
      { id: "a", text: "Fica acima do módulo sob teste, simulando quem o chama.", isCorrect: true, explanation: "Correto! O Driver simula o componente chamador (nível superior), fornecendo entradas e capturando saídas." },
      { id: "b", text: "Fica abaixo do módulo sob teste, simulando quem é chamado.", isCorrect: false, explanation: "Incorreto. Quem fica abaixo, simulando o chamado, é o Stub." },
      { id: "c", text: "Substitui o banco de dados de produção.", isCorrect: false, explanation: "Incorreto. Essa função se aproxima mais de um stub/mock de dependência, não da definição de Driver." },
      { id: "d", text: "É um relatório de cobertura de código.", isCorrect: false, explanation: "Incorreto. Driver é um componente executável de simulação, não um relatório." }
    ]
  },
  {
    id: "q_drv_3",
    moduleId: "drivers_stubs",
    questionText: "Um Stub, ao ser chamado pelo módulo sob teste, normalmente:",
    options: [
      { id: "a", text: "Executa a lógica real e completa do componente substituído.", isCorrect: false, explanation: "Incorreto. Se executasse a lógica real, não seria um stub." },
      { id: "b", text: "Retorna dados fixos pré-programados para permitir que o fluxo continue.", isCorrect: true, explanation: "Correto! O Stub devolve respostas enlatadas (fixas) para isolar o módulo sob teste da dependência real." },
      { id: "c", text: "Aciona o módulo sob teste enviando parâmetros de entrada.", isCorrect: false, explanation: "Incorreto. Quem aciona/envia entradas é o Driver." },
      { id: "d", text: "Mede a complexidade ciclomática do código.", isCorrect: false, explanation: "Incorreto. Isso é uma métrica estrutural, não a função de um stub." }
    ]
  },

  // JUNIT / MOCKITO (faltavam questões)
  {
    id: "q_jum_2",
    moduleId: "junit_mockito",
    questionText: "No Mockito, qual construção define o comportamento de um mock para uma chamada específica?",
    options: [
      { id: "a", text: "assertEquals(esperado, obtido)", isCorrect: false, explanation: "Incorreto. assertEquals é uma asserção do JUnit, não configura comportamento de mock." },
      { id: "b", text: "when(mock.metodo(...)).thenReturn(valor)", isCorrect: true, explanation: "Correto! O par when/thenReturn (stubbing) programa a resposta do mock para uma chamada específica." },
      { id: "c", text: "@BeforeEach", isCorrect: false, explanation: "Incorreto. @BeforeEach apenas executa código antes de cada teste, não define respostas de mock." },
      { id: "d", text: "System.out.println(...)", isCorrect: false, explanation: "Incorreto. Apenas imprime no console; nada tem a ver com stubbing." }
    ]
  },
  {
    id: "q_jum_3",
    moduleId: "junit_mockito",
    questionText: "Qual anotação do JUnit 5 marca um método como um caso de teste a ser executado?",
    options: [
      { id: "a", text: "@Test", isCorrect: true, explanation: "Correto! @Test (do pacote org.junit.jupiter.api) marca o método como um teste executável pelo JUnit 5." },
      { id: "b", text: "@Mock", isCorrect: false, explanation: "Incorreto. @Mock é do Mockito e cria um dublê, não marca um teste." },
      { id: "c", text: "@Override", isCorrect: false, explanation: "Incorreto. @Override é uma anotação da linguagem Java para sobrescrita de métodos." },
      { id: "d", text: "@InjectMocks", isCorrect: false, explanation: "Incorreto. @InjectMocks injeta mocks na classe sob teste, não marca um teste." }
    ]
  },

  // ===================================================================
  // DEFEITOS / MUTAÇÃO — QUESTÕES APLICADAS, DISSERTATIVAS E DE DESENHO
  // ===================================================================
  {
    id: "q_mut_4",
    moduleId: "defect_based",
    questionText: "A **hipótese do programador competente**, que fundamenta a análise de mutação, afirma que:",
    options: [
      { id: "a", text: "Programadores experientes escrevem programas corretos ou muito próximos do correto, errando por defeitos simples.", isCorrect: true, explanation: "Correto! Por isso faz sentido simular defeitos com pequenas alterações sintáticas (mutações simples)." },
      { id: "b", text: "Todo programador comete os mesmos erros, independentemente da experiência.", isCorrect: false, explanation: "Incorreto. A hipótese pressupõe justamente que o competente erra pouco e por defeitos simples." },
      { id: "c", text: "Quanto mais competente o programador, menos testes são necessários.", isCorrect: false, explanation: "Incorreto. A hipótese não trata da quantidade de testes, e sim da natureza simples dos defeitos." },
      { id: "d", text: "Mutantes equivalentes só surgem com programadores competentes.", isCorrect: false, explanation: "Incorreto. Equivalência é uma propriedade semântica do mutante, não do programador." }
    ]
  },
  {
    id: "q_mut_5",
    moduleId: "defect_based",
    questionText: "O **efeito do acoplamento** (coupling effect), no teste de mutação, sustenta que:",
    options: [
      { id: "a", text: "Casos de teste que revelam defeitos simples tendem a revelar, implicitamente, defeitos complexos.", isCorrect: true, explanation: "Correto! Defeitos complexos são vistos como combinações de defeitos simples; testes sensíveis aos simples pegam os complexos." },
      { id: "b", text: "Defeitos complexos nunca podem ser detectados por testes.", isCorrect: false, explanation: "Incorreto. O efeito do acoplamento afirma o oposto: eles tendem a ser revelados." },
      { id: "c", text: "Quanto mais acoplado o código, mais mutantes equivalentes surgem.", isCorrect: false, explanation: "Incorreto. O termo 'acoplamento' aqui se refere à relação entre defeitos simples e complexos, não ao acoplamento de módulos." },
      { id: "d", text: "Mutantes simples e complexos sempre têm o mesmo escore.", isCorrect: false, explanation: "Incorreto. Não é uma afirmação sobre escore, e sim sobre a capacidade de detecção." }
    ]
  },
  {
    id: "q_mut_6",
    moduleId: "defect_based",
    questionText: "Observe a mutação aplicada. Qual **operador de mutação** foi utilizado?",
    codeContext: `// Original
if (a >= b) { ... }

// Mutante
if (a > b)  { ... }`,
    codeLanguage: "java",
    options: [
      { id: "a", text: "ROR (Relational Operator Replacement)", isCorrect: true, explanation: "Correto! Houve a troca de um operador relacional (>= por >), característica do ROR." },
      { id: "b", text: "AOR (Arithmetic Operator Replacement)", isCorrect: false, explanation: "Incorreto. AOR troca operadores aritméticos (+, -, *, /), não relacionais." },
      { id: "c", text: "LOR (Logical Operator Replacement)", isCorrect: false, explanation: "Incorreto. LOR troca operadores lógicos (&&, ||, !)." },
      { id: "d", text: "CDL (Constant DeLetion)", isCorrect: false, explanation: "Incorreto. CDL remove uma constante; aqui nenhum valor constante foi removido." }
    ]
  },
  {
    id: "q_mut_7",
    moduleId: "defect_based",
    questionText: "Foram gerados 50 mutantes; 30 foram mortos e, dos vivos, 5 são equivalentes. Qual o escore de mutação $ms = DM / (M - ME)$?",
    options: [
      { id: "a", text: "60%", isCorrect: false, explanation: "Incorreto. 60% seria 30/50, mas é preciso descontar os equivalentes do denominador." },
      { id: "b", text: "Aproximadamente 66,7%", isCorrect: true, explanation: "Correto! ms = 30 / (50 - 5) = 30/45 ≈ 0,667 = 66,7%." },
      { id: "c", text: "75%", isCorrect: false, explanation: "Incorreto. Revise: o denominador é M - ME = 45, não 40." },
      { id: "d", text: "30%", isCorrect: false, explanation: "Incorreto. 30 é o número de mutantes mortos (DM), não o escore." }
    ]
  },
  {
    id: "q_mut_8",
    moduleId: "defect_based",
    questionText: "A suíte possui um único caso de teste: `isAdult(20)` esperando `true`. O que acontece com o mutante ROR abaixo?",
    codeContext: `// Original
boolean isAdult(int age) { return age >= 18; }

// Mutante (ROR)
boolean isAdult(int age) { return age > 18; }`,
    codeLanguage: "java",
    options: [
      { id: "a", text: "O mutante sobrevive (fica vivo), pois isAdult(20) retorna true tanto no original quanto no mutante.", isCorrect: true, explanation: "Correto! Como 20 > 18 e 20 >= 18 são ambos true, o teste não distingue os dois — o mutante não é morto." },
      { id: "b", text: "O mutante é morto, pois 20 é diferente de 18.", isCorrect: false, explanation: "Incorreto. Para 20, ambas as versões retornam true; nada falha." },
      { id: "c", text: "O mutante é equivalente.", isCorrect: false, explanation: "Incorreto. Ele NÃO é equivalente: o caso isAdult(18) distingue as versões (true x false). Ele apenas sobreviveu a esta suíte fraca." },
      { id: "d", text: "O mutante não compila (natimorto).", isCorrect: false, explanation: "Incorreto. A alteração é sintaticamente válida e compila normalmente." }
    ]
  },
  {
    id: "q_mut_9",
    moduleId: "defect_based",
    questionText: "Considerando que `numero` é uma variável recém-atribuída, qual mutação gera um **mutante equivalente** (que nenhum teste consegue matar)?",
    options: [
      { id: "a", text: "`numero = 0;` → `numero *= 0;`", isCorrect: true, explanation: "Correto! Qualquer valor multiplicado por 0 resulta em 0; o comportamento é idêntico ao original — mutante equivalente." },
      { id: "b", text: "`x = a + b;` → `x = a - b;`", isCorrect: false, explanation: "Incorreto. Para a maioria das entradas a soma difere da subtração; é facilmente morto." },
      { id: "c", text: "`if (x > 0)` → `if (x < 0)`", isCorrect: false, explanation: "Incorreto. Inverter a condição muda o fluxo para diversas entradas; é morto facilmente." },
      { id: "d", text: "`return n;` → `return n + 1;`", isCorrect: false, explanation: "Incorreto. O retorno passa a ser diferente do original; é morto por qualquer teste que verifique o valor." }
    ]
  },
  {
    id: "q_mut_10",
    moduleId: "defect_based",
    questionText: "Sobre ferramentas de teste de mutação, qual associação **ferramenta → linguagem** está correta?",
    options: [
      { id: "a", text: "muJava → Java", isCorrect: true, explanation: "Correto! muJava (e a extensão MuClipse para Eclipse) é voltada para Java." },
      { id: "b", text: "Proteum → Fortran", isCorrect: false, explanation: "Incorreto. Proteum é para C; quem é escrita em Fortran é a Mothra." },
      { id: "c", text: "Mothra → Java", isCorrect: false, explanation: "Incorreto. Mothra é em Fortran." },
      { id: "d", text: "Jumble → C", isCorrect: false, explanation: "Incorreto. Jumble é para Java; C é o caso da Proteum." }
    ]
  },
  {
    id: "q_mut_11",
    moduleId: "defect_based",
    questionText: "Qual é a ordem correta do **passo a passo do teste de mutação**?",
    options: [
      { id: "a", text: "Gerar mutantes → executar T no original → executar T nos mutantes → identificar mortos/vivos → analisar equivalentes → calcular ms.", isCorrect: true, explanation: "Correto! Primeiro confirma-se que T passa no original, depois roda-se nos mutantes e, por fim, analisa-se sobreviventes/equivalentes e calcula-se o escore." },
      { id: "b", text: "Calcular ms → gerar mutantes → executar testes.", isCorrect: false, explanation: "Incorreto. O escore só pode ser calculado ao final, após executar os testes nos mutantes." },
      { id: "c", text: "Executar T nos mutantes antes de validar T no original.", isCorrect: false, explanation: "Incorreto. É preciso garantir que T esteja correto no original antes de rodar nos mutantes." },
      { id: "d", text: "Identificar equivalentes antes de gerar os mutantes.", isCorrect: false, explanation: "Incorreto. Não há mutantes a analisar antes de gerá-los." }
    ]
  },
  {
    id: "q_mut_open_1",
    moduleId: "defect_based",
    type: "open",
    questionText: "Explique a diferença entre **mutante morto**, **mutante vivo** e **mutante equivalente**. Por que os mutantes equivalentes precisam ser descontados no cálculo do escore de mutação?",
    answerHint: "Defina cada tipo pelo resultado dos testes e relacione com a fórmula ms = DM/(M − ME).",
    expectedAnswer: `**Mutante morto (killed):** pelo menos um caso de teste produz saída diferente da do original ao rodar no mutante — o teste detectou o defeito (resultado desejado).

**Mutante vivo (sobrevivente):** todos os casos de teste passam no mutante (mesma saída do original). Indica que a suíte é fraca para aquele defeito.

**Mutante equivalente:** embora sintaticamente alterado, comporta-se exatamente como o original para **toda** entrada possível. **Nenhum** teste é capaz de matá-lo.

Como o mutante equivalente é impossível de matar, mantê-lo no denominador puniria injustamente a suíte. Por isso a fórmula desconta os equivalentes:

$$ms = \\frac{DM}{M - ME}$$

Assim, o escore só leva em conta os mutantes que **poderiam** ser mortos.`,
  },
  {
    id: "q_mut_open_2",
    moduleId: "defect_based",
    type: "open",
    questionText: "Considere `boolean isAdult(int age) { return age >= 18; }` e o mutante ROR `return age > 18;`. **Crie os casos de teste** (entrada → saída esperada) necessários para **matar** esse mutante e justifique.",
    answerHint: "Pense em qual valor de entrada faz o original e o mutante divergirem.",
    codeContext: `// Original
boolean isAdult(int age) { return age >= 18; }
// Mutante (ROR)
boolean isAdult(int age) { return age > 18; }`,
    codeLanguage: "java",
    expectedAnswer: `O único valor que distingue \`>=\` de \`>\` é exatamente o **limite 18**.

**Caso de teste que mata o mutante:**
- Entrada: \`age = 18\` → Saída esperada: \`true\` (definida pelo original).
- No mutante: \`18 > 18\` = \`false\` → diverge do esperado → o teste **falha no mutante** → mutante **morto**.

Observação: casos como \`isAdult(20)\` (true) ou \`isAdult(10)\` (false) **não** matam o mutante, pois produzem o mesmo resultado nas duas versões. Por isso testar o **valor limite** é essencial.`,
  },
  {
    id: "q_mut_draw_1",
    moduleId: "defect_based",
    type: "drawing",
    questionText: "**Gere os mutantes** do trecho abaixo aplicando os operadores indicados e monte a tabela com as colunas **Operador | Original | Mutante**. Use AOR no `+` e ROR no `>`.",
    answerHint: "Para cada operador, troque o operador alvo por outros do mesmo tipo, um por linha.",
    codeContext: `int r = a + b;
if (a > b) { ... }`,
    codeLanguage: "java",
    expectedAnswer: `Exemplos de mutantes (um por substituição):

| Operador | Original | Mutante |
| :-- | :-- | :-- |
| AOR | \`r = a + b\` | \`r = a - b\` |
| AOR | \`r = a + b\` | \`r = a * b\` |
| AOR | \`r = a + b\` | \`r = a / b\` |
| ROR | \`if (a > b)\` | \`if (a >= b)\` |
| ROR | \`if (a > b)\` | \`if (a < b)\` |
| ROR | \`if (a > b)\` | \`if (a == b)\` |
| ROR | \`if (a > b)\` | \`if (a != b)\` |

Cada linha é um mutante distinto, contendo **uma única** alteração sintática em relação ao original.`,
  },

  // ===================================================================
  // RISCOS — QUESTÕES APLICADAS, DISSERTATIVAS E DE DESENHO
  // ===================================================================
  {
    id: "q_risk_4",
    moduleId: "risk_based",
    questionText: "Pelo método de Craig e Jaskiel, a prioridade do risco é a **soma** de probabilidade + impacto (Alto=3, Médio=2, Baixo=1). Para Probabilidade **Média** e Impacto **Alto**, a prioridade é:",
    options: [
      { id: "a", text: "6", isCorrect: false, explanation: "Incorreto. 6 = 3 + 3 (Alta + Alto)." },
      { id: "b", text: "5", isCorrect: true, explanation: "Correto! Média (2) + Alto (3) = 5." },
      { id: "c", text: "4", isCorrect: false, explanation: "Incorreto. 4 = 2 + 2 (Média + Médio)." },
      { id: "d", text: "9", isCorrect: false, explanation: "Incorreto. 9 viria da MULTIPLICAÇÃO (3×3), método alternativo — e nem corresponde a Média×Alto." }
    ]
  },
  {
    id: "q_risk_5",
    moduleId: "risk_based",
    questionText: "Usando a **SOMA** dos valores (Alto=3, Médio=2, Baixo=1), quais são os possíveis níveis de prioridade de risco?",
    options: [
      { id: "a", text: "6, 5, 4, 3, 2", isCorrect: true, explanation: "Correto! O mínimo é 1+1=2 e o máximo é 3+3=6, gerando 5 níveis." },
      { id: "b", text: "De 1 a 9", isCorrect: false, explanation: "Incorreto. Esse é o intervalo da MULTIPLICAÇÃO (1×1 a 3×3), método alternativo." },
      { id: "c", text: "De 0 a 10", isCorrect: false, explanation: "Incorreto. Não há valor 0 nem 10 na escala de soma 3/2/1." },
      { id: "d", text: "Apenas Alto, Médio e Baixo", isCorrect: false, explanation: "Incorreto. Esses são os rótulos de cada fator; a prioridade é o valor numérico somado." }
    ]
  },
  {
    id: "q_risk_6",
    moduleId: "risk_based",
    questionText: "Sobre a **linha de corte** no teste baseado em risco, é correto afirmar que:",
    options: [
      { id: "a", text: "Em sistemas críticos (risco de morte ou perdas financeiras) não há linha de corte: nenhum item fica sem teste.", isCorrect: true, explanation: "Correto! A linha de corte separa o que será (ou não) testado, mas sistemas críticos não a possuem." },
      { id: "b", text: "Ela define quais defeitos são aceitáveis em produção.", isCorrect: false, explanation: "Incorreto. Ela define o que será testado, não quais defeitos são aceitáveis." },
      { id: "c", text: "Itens acima da linha de corte são os que NÃO serão testados.", isCorrect: false, explanation: "Incorreto. É o contrário: o que fica abaixo da linha recebe menos (ou nenhum) teste." },
      { id: "d", text: "Todo sistema deve usar exatamente a mesma linha de corte.", isCorrect: false, explanation: "Incorreto. A linha depende do contexto/criticidade de cada sistema." }
    ]
  },
  {
    id: "q_risk_7",
    moduleId: "risk_based",
    questionText: "A técnica de **brainstorming** (passo 1 do processo) ocorre em duas etapas. Quais são?",
    options: [
      { id: "a", text: "Ampliação (gerar muitas ideias, sem críticas) e redução (filtrar por votação/critérios).", isCorrect: true, explanation: "Correto! Primeiro diverge-se gerando ideias, depois converge-se filtrando-as." },
      { id: "b", text: "Codificação e execução de testes.", isCorrect: false, explanation: "Incorreto. Não são etapas do brainstorming de riscos." },
      { id: "c", text: "Cálculo de probabilidade e de impacto.", isCorrect: false, explanation: "Incorreto. Esses são passos posteriores (3 e 4), não as etapas do brainstorming." },
      { id: "d", text: "Verificação e validação.", isCorrect: false, explanation: "Incorreto. V&V são conceitos de qualidade, não etapas do brainstorming." }
    ]
  },
  {
    id: "q_risk_8",
    moduleId: "risk_based",
    questionText: "A tabela mostra prioridades de um ATM. Mesmo com prioridade mínima, qual item deve ser testado **antes** do Saque, e por quê?\n\n| Característica | Prioridade (soma) |\n| :-- | :--: |\n| Saque | 6 |\n| Saldo | 2 |",
    options: [
      { id: "a", text: "Saldo, pois o Saque depende da verificação de saldo — uma dependência de teste não capturada pela priorização.", isCorrect: true, explanation: "Correto! Essa é a deficiência do passo de priorização: ele não considera dependências entre funcionalidades." },
      { id: "b", text: "Nenhum; sempre se testa estritamente pela ordem de prioridade.", isCorrect: false, explanation: "Incorreto. Dependências podem forçar antecipar um item de baixa prioridade." },
      { id: "c", text: "Saque, por ter a maior prioridade.", isCorrect: false, explanation: "Incorreto. A pergunta é sobre o que precisa vir ANTES do Saque por dependência." },
      { id: "d", text: "Ambos têm a mesma prioridade, então a ordem é indiferente.", isCorrect: false, explanation: "Incorreto. As prioridades são diferentes (6 e 2)." }
    ]
  },
  {
    id: "q_risk_9",
    moduleId: "risk_based",
    questionText: "O princípio de **Pareto (80-20)** aplicado a testes sugere que:",
    options: [
      { id: "a", text: "Cerca de 80% dos defeitos se concentram em ~20% das áreas; o esforço deve focar nessas áreas.", isCorrect: true, explanation: "Correto! O agrupamento de defeitos orienta a concentrar testes nas áreas mais problemáticas." },
      { id: "b", text: "80% do tempo deve ser gasto em documentação.", isCorrect: false, explanation: "Incorreto. Pareto aqui se refere à distribuição de defeitos, não de tempo em documentação." },
      { id: "c", text: "20% dos testes encontram apenas 20% dos defeitos.", isCorrect: false, explanation: "Incorreto. A ideia é que poucas áreas concentram a maioria dos defeitos." },
      { id: "d", text: "Os defeitos se distribuem uniformemente pelo código.", isCorrect: false, explanation: "Incorreto. Pareto contraria exatamente a distribuição uniforme." }
    ]
  },
  {
    id: "q_risk_10",
    moduleId: "risk_based",
    questionText: "Complexidade, número de interfaces e número de linhas de código são fatores que influenciam principalmente:",
    options: [
      { id: "a", text: "A probabilidade de falha (fatores técnicos).", isCorrect: true, explanation: "Correto! Esses fatores técnicos elevam a chance de o componente conter erro." },
      { id: "b", text: "O impacto da falha (fatores de negócio).", isCorrect: false, explanation: "Incorreto. O impacto está ligado ao prejuízo para o usuário/empresa, não à complexidade do código." },
      { id: "c", text: "A linha de corte.", isCorrect: false, explanation: "Incorreto. A linha de corte é definida depois, a partir das prioridades." },
      { id: "d", text: "O escore de mutação.", isCorrect: false, explanation: "Incorreto. Escore de mutação é de outro tópico (teste baseado em defeitos)." }
    ]
  },
  {
    id: "q_risk_open_1",
    moduleId: "risk_based",
    type: "open",
    questionText: "Diferencie **probabilidade de falha (fatores técnicos)** de **impacto da falha (fatores de negócio)** no teste baseado em risco. Dê um exemplo de cada.",
    answerHint: "Relacione probabilidade a características do código e impacto a consequências para o negócio/usuário.",
    expectedAnswer: `**Probabilidade de falha (fatores técnicos):** mede a chance de o componente **conter um erro**. Depende de fatores do código, como complexidade (ex.: complexidade ciclomática), número de interfaces e número de linhas de código.
- *Exemplo:* um módulo de cálculo de impostos, grande e cheio de regras condicionais, tem **alta probabilidade** de falha.

**Impacto da falha (fatores de negócio):** mede o **prejuízo** para o usuário/empresa caso o componente falhe.
- *Exemplo:* a função de **saque** de um ATM tem **alto impacto** — uma falha pode causar perda financeira direta.

O **risco** combina os dois: $Risco = Probabilidade \\times Impacto$. Um item só é prioridade máxima quando ambos são elevados.`,
  },
  {
    id: "q_risk_open_2",
    moduleId: "risk_based",
    type: "open",
    questionText: "**Calcule a prioridade pela SOMA** (Alto=3, Médio=2, Baixo=1) e ordene da maior para a menor: Saque (Prob Alta, Imp Alto); Depósito (Prob Média, Imp Médio); Extrato (Prob Baixa, Imp Médio).",
    answerHint: "Some os valores de probabilidade e impacto de cada item e ordene.",
    expectedAnswer: `| Característica | Probabilidade | Impacto | Prioridade (soma) |
| :-- | :--: | :--: | :--: |
| Saque | Alta (3) | Alto (3) | **6** |
| Depósito | Média (2) | Médio (2) | **4** |
| Extrato | Baixa (1) | Médio (2) | **3** |

**Ordem de teste (maior → menor prioridade):** Saque (6) → Depósito (4) → Extrato (3).

Observação: dependências entre funcionalidades podem forçar antecipar itens de prioridade menor (ex.: testar Saldo antes de Saque), mesmo que o cálculo não capture isso.`,
  },
  {
    id: "q_risk_draw_1",
    moduleId: "risk_based",
    type: "drawing",
    questionText: "**Monte a matriz de risco**: linhas = Impacto (Alto/Médio/Baixo), colunas = Probabilidade (Baixa/Média/Alta). Classifique cada célula em Insignificante / Baixo / Médio / Alto / Crítico.",
    answerHint: "A combinação de alta probabilidade com alto impacto leva ao nível Crítico; baixa+baixo leva a Insignificante.",
    expectedAnswer: `| Impacto \\ Probabilidade | Baixa | Média | Alta |
| :-- | :--: | :--: | :--: |
| **Alto** | Médio | Alto | Crítico |
| **Médio** | Baixo | Médio | Alto |
| **Baixo** | Insignificante | Baixo | Médio |

**Estratégia:** Crítico/Alto → testar primeiro, com múltiplos critérios e mitigação; Médio → testes funcionais básicos; Baixo/Insignificante → abaixo da linha de corte (testes leves ou só exploratórios).`,
  },

  // ===================================================================
  // NÍVEIS DE TESTE — QUESTÕES APLICADAS, DISSERTATIVAS E DE DESENHO
  // ===================================================================
  {
    id: "q_lev_4",
    moduleId: "test_levels",
    questionText: "No paradigma **procedimental**, qual é a menor unidade isolada no teste de unidade?",
    options: [
      { id: "a", text: "A função/método.", isCorrect: true, explanation: "Correto! Procedimentalmente, a unidade é a função ou método." },
      { id: "b", text: "A classe inteira.", isCorrect: false, explanation: "Incorreto. A classe como unidade caracteriza o teste de módulo (ou unitário em OO)." },
      { id: "c", text: "O sistema completo.", isCorrect: false, explanation: "Incorreto. Isso é teste de sistema." },
      { id: "d", text: "O pacote/biblioteca.", isCorrect: false, explanation: "Incorreto. Pacote é um escopo bem maior que a unidade." }
    ]
  },
  {
    id: "q_lev_5",
    moduleId: "test_levels",
    questionText: "Quem normalmente executa o **teste de aceitação**?",
    options: [
      { id: "a", text: "O usuário/cliente ou a área de negócio.", isCorrect: true, explanation: "Correto! A aceitação valida se o produto atende às necessidades do negócio, na ótica do usuário." },
      { id: "b", text: "Apenas o time de desenvolvimento.", isCorrect: false, explanation: "Incorreto. A aceitação é tipicamente conduzida por quem representa o usuário/cliente." },
      { id: "c", text: "O compilador.", isCorrect: false, explanation: "Incorreto. Compilador não executa testes de aceitação." },
      { id: "d", text: "O servidor de integração contínua, automaticamente.", isCorrect: false, explanation: "Incorreto. Embora possa haver automação, a aceitação é uma validação do usuário/negócio." }
    ]
  },
  {
    id: "q_lev_6",
    moduleId: "test_levels",
    questionText: "Qual é a principal desvantagem da integração **Big-Bang**?",
    options: [
      { id: "a", text: "Se ocorre uma falha, é difícil localizar em qual interface está o defeito.", isCorrect: true, explanation: "Correto! Integrar tudo de uma vez dificulta isolar a origem dos defeitos de interface." },
      { id: "b", text: "Exige muitos stubs e drivers.", isCorrect: false, explanation: "Incorreto. Justamente por integrar tudo de uma vez, demanda menos dublês — mas perde rastreabilidade." },
      { id: "c", text: "É incompatível com testes de sistema.", isCorrect: false, explanation: "Incorreto. É uma estratégia de integração; não impede o teste de sistema posterior." },
      { id: "d", text: "Não permite encontrar defeitos de interface.", isCorrect: false, explanation: "Incorreto. Permite encontrá-los, mas dificulta localizá-los." }
    ]
  },
  {
    id: "q_lev_7",
    moduleId: "test_levels",
    questionText: "A estratégia de integração **Sanduíche (híbrida)** caracteriza-se por:",
    options: [
      { id: "a", text: "Combinar Top-Down e Bottom-Up, atacando o núcleo do sistema a partir das duas direções.", isCorrect: true, explanation: "Correto! Ela mescla as duas abordagens para aproveitar as vantagens de ambas." },
      { id: "b", text: "Integrar todos os módulos de uma só vez.", isCorrect: false, explanation: "Incorreto. Isso é Big-Bang." },
      { id: "c", text: "Usar apenas drivers, nunca stubs.", isCorrect: false, explanation: "Incorreto. Por combinar as direções, usa tanto stubs quanto drivers." },
      { id: "d", text: "Dispensar completamente os dublês de teste.", isCorrect: false, explanation: "Incorreto. Continua precisando de dublês para as partes ausentes." }
    ]
  },
  {
    id: "q_lev_8",
    moduleId: "test_levels",
    questionText: "Segundo Vincenzi (2004), ao adotar a **classe** como unidade, o que acontece com a interação entre métodos da mesma classe (**InterMétodos**) e a **IntraClasse**?",
    options: [
      { id: "a", text: "Passam a ser exercitadas no nível **unitário**, restando apenas InterClasses como integração.", isCorrect: true, explanation: "Correto! No Caso 2, com a classe como unidade, InterMétodos e IntraClasse sobem para o unitário." },
      { id: "b", text: "Continuam sendo teste de integração.", isCorrect: false, explanation: "Incorreto. Isso vale para o Caso 1 (unidade = método); com a classe como unidade, elas viram unitário." },
      { id: "c", text: "Passam a ser teste de sistema.", isCorrect: false, explanation: "Incorreto. Sistema continua sendo o software completo." },
      { id: "d", text: "Deixam de ser testadas.", isCorrect: false, explanation: "Incorreto. Continuam sendo testadas, apenas em outro nível." }
    ]
  },
  {
    id: "q_lev_9",
    moduleId: "test_levels",
    questionText: "No **teste de módulo**, o que é tratado como unidade?",
    options: [
      { id: "a", text: "A classe (ou arquivo/componente) inteira, incluindo a colaboração entre seus métodos e o estado interno.", isCorrect: true, explanation: "Correto! O módulo trata a classe como unidade, verificando a interação entre seus próprios métodos." },
      { id: "b", text: "Um único método isolado.", isCorrect: false, explanation: "Incorreto. Método isolado é a unidade no sentido estrito (procedimental)." },
      { id: "c", text: "A interface gráfica.", isCorrect: false, explanation: "Incorreto. UI não define a unidade de módulo." },
      { id: "d", text: "O banco de dados.", isCorrect: false, explanation: "Incorreto. Dependências externas são, inclusive, substituídas por dublês." }
    ]
  },
  {
    id: "q_lev_open_1",
    moduleId: "test_levels",
    type: "open",
    questionText: "Diferencie **teste de sistema** e **teste de aceitação** quanto a foco, executor e à relação com verificação/validação.",
    answerHint: "Lembre que verificação = 'construir certo' e validação = 'construir o certo'.",
    expectedAnswer: `**Teste de Sistema**
- *Foco:* o produto completo e integrado, validado de ponta a ponta (end-to-end), cobrindo requisitos **funcionais** e **não funcionais** (desempenho, segurança, usabilidade).
- *Executor:* normalmente o time de teste, em ambiente que simula produção (visão caixa-preta).
- *V&V:* ainda predominantemente **verificação** — confirmar que o sistema atende à especificação.

**Teste de Aceitação**
- *Foco:* confirmar que o software resolve o problema real do negócio.
- *Executor:* o **usuário/cliente** ou área de negócio.
- *V&V:* é **validação** — 'construímos o produto certo?'.

Em geral, a aceitação ocorre **após** o teste de sistema, em condições próximas às de uso real.`,
  },
  {
    id: "q_lev_open_2",
    moduleId: "test_levels",
    type: "open",
    questionText: "**Escreva um caso de teste de unidade** (pré-condições, entrada/ação e saída esperada) para o método `int somar(int a, int b)` e indique a qual **nível de teste** ele pertence, justificando.",
    answerHint: "Descreva entrada, ação e oráculo (saída esperada); depois classifique o nível.",
    codeContext: `int somar(int a, int b) { return a + b; }`,
    codeLanguage: "java",
    expectedAnswer: `**Caso de teste**
- *Pré-condição:* instância da classe disponível, sem dependências externas.
- *Entrada/ação:* chamar \`somar(2, 3)\`.
- *Saída esperada (oráculo):* \`5\`.

Exemplo em JUnit 5:

\`\`\`java
@Test
void deveSomarDoisInteiros() {
    Calculadora calc = new Calculadora();
    assertEquals(5, calc.somar(2, 3));
}
\`\`\`

**Nível:** teste de **unidade** — exercita um único método isolado, sem colaborar com outras classes nem usar dependências externas. Se falhar, o defeito está naquela unidade.`,
  },
  {
    id: "q_lev_draw_1",
    moduleId: "test_levels",
    type: "drawing",
    questionText: "**Preencha a tabela** de classificação de Vincenzi (Caso 1: unidade = método), relacionando Fase × Teste procedimental × Teste orientado a objetos para Unitário, Integração e Sistema.",
    answerHint: "Use os termos Intra/Inter (procedimental e métodos/classes).",
    expectedAnswer: `| Fase | Teste procedimental | Teste orientado a objetos |
| :-- | :-- | :-- |
| Unitário | Intraprocedimental | IntraMétodo |
| Integração | Interprocedimental | InterMétodos, IntraClasse e InterClasses |
| Sistema | Todo o sistema | Todo o sistema |

No Caso 2 (unidade = classe), InterMétodos e IntraClasse migram para o **Unitário**, deixando apenas **InterClasses** na Integração.`,
  },

  // ===================================================================
  // DRIVERS E STUBS — QUESTÕES APLICADAS, DISSERTATIVAS E DE DESENHO
  // ===================================================================
  {
    id: "q_drv_4",
    moduleId: "drivers_stubs",
    questionText: "Considere que o método `A` invoca o método `B`. Se simularmos a parte que **é invocada** (`B`), criamos um:",
    options: [
      { id: "a", text: "Stub (simula o chamado).", isCorrect: true, explanation: "Correto! O Stub substitui a parte invocada (B), fica abaixo e devolve respostas fixas." },
      { id: "b", text: "Driver (simula o chamador).", isCorrect: false, explanation: "Incorreto. O Driver simula quem chama (A), não quem é chamado." },
      { id: "c", text: "Oráculo.", isCorrect: false, explanation: "Incorreto. Oráculo decide se a saída está correta; não substitui módulos." },
      { id: "d", text: "Mutante.", isCorrect: false, explanation: "Incorreto. Mutante é uma versão alterada do código no teste de mutação." }
    ]
  },
  {
    id: "q_drv_5",
    moduleId: "drivers_stubs",
    questionText: "Qual associação entre dublê e estratégia de integração está correta?",
    options: [
      { id: "a", text: "Stub → Top-Down; Driver → Bottom-Up.", isCorrect: true, explanation: "Correto! Top-Down precisa de stubs para os módulos inferiores; Bottom-Up precisa de drivers para os superiores." },
      { id: "b", text: "Stub → Bottom-Up; Driver → Top-Down.", isCorrect: false, explanation: "Incorreto. Está invertido." },
      { id: "c", text: "Ambos são usados apenas no Big-Bang.", isCorrect: false, explanation: "Incorreto. Big-Bang integra tudo de uma vez e tende a usar menos dublês." },
      { id: "d", text: "Driver → Top-Down; Stub → Sanduíche.", isCorrect: false, explanation: "Incorreto. Driver é do Bottom-Up; Sanduíche combina ambos." }
    ]
  },
  {
    id: "q_drv_6",
    moduleId: "drivers_stubs",
    questionText: "Qual a razão fundamental para a existência de drivers e stubs?",
    options: [
      { id: "a", text: "Simular partes do software ainda não implementadas (ou indisponíveis) no momento do teste de integração.", isCorrect: true, explanation: "Correto! Ambos preenchem lacunas de módulos ausentes para viabilizar o teste." },
      { id: "b", text: "Aumentar o escore de mutação.", isCorrect: false, explanation: "Incorreto. Isso é do teste baseado em defeitos." },
      { id: "c", text: "Medir a complexidade ciclomática do código.", isCorrect: false, explanation: "Incorreto. Isso é uma métrica estrutural." },
      { id: "d", text: "Substituir o oráculo de teste.", isCorrect: false, explanation: "Incorreto. Eles simulam módulos, não o oráculo." }
    ]
  },
  {
    id: "q_drv_7",
    moduleId: "drivers_stubs",
    questionText: "O módulo sob teste consulta um webservice de CEP que está fora do ar. Você cria o componente abaixo, que sempre retorna um endereço fixo. Ele é um:",
    codeContext: `class ConsultaCepStub implements ConsultaCep {
    public String buscar(String cep) {
        return "Rua X, São Paulo, SP"; // resposta fixa
    }
}`,
    codeLanguage: "java",
    options: [
      { id: "a", text: "Stub — simula o módulo chamado e retorna dado fixo.", isCorrect: true, explanation: "Correto! Ele substitui a dependência invocada (consulta de CEP), devolvendo resposta enlatada." },
      { id: "b", text: "Driver — simula o chamador.", isCorrect: false, explanation: "Incorreto. Aqui é o módulo CHAMADO que está sendo simulado." },
      { id: "c", text: "Spy — embrulha o objeto real.", isCorrect: false, explanation: "Incorreto. Não há objeto real sendo embrulhado; é uma implementação falsa com retorno fixo." },
      { id: "d", text: "Oráculo — decide se a saída está correta.", isCorrect: false, explanation: "Incorreto. Ele apenas fornece dados, não julga a correção." }
    ]
  },
  {
    id: "q_drv_8",
    moduleId: "drivers_stubs",
    questionText: "Você tem uma função de processamento de imagem pronta, mas a UI que a chamaria ainda não existe. Você escreve o `main` abaixo para alimentá-la e capturar a saída. Ele é um:",
    codeContext: `public static void main(String[] args) {
    Imagem entrada = Imagem.ler("foto.png");
    Imagem saida = new FiltroImagem().aplicarSepia(entrada);
    saida.salvar("foto_sepia.png");
}`,
    codeLanguage: "java",
    options: [
      { id: "a", text: "Driver — simula o chamador, envia entradas e captura saídas.", isCorrect: true, explanation: "Correto! Ele ativa o módulo de baixo nível no lugar da UI ausente (típico do Bottom-Up)." },
      { id: "b", text: "Stub — retorna respostas fixas.", isCorrect: false, explanation: "Incorreto. Aqui simulamos quem CHAMA o módulo, não quem é chamado." },
      { id: "c", text: "Mock do Mockito.", isCorrect: false, explanation: "Incorreto. É um componente de controle escrito à mão, não um mock de framework." },
      { id: "d", text: "Mutante.", isCorrect: false, explanation: "Incorreto. Não há alteração sintática do código sob teste." }
    ]
  },
  {
    id: "q_drv_open_1",
    moduleId: "drivers_stubs",
    type: "open",
    questionText: "Usando a regra '`A` invoca `B`', explique a diferença entre **driver** e **stub**, indicando qual fica acima/abaixo do módulo sob teste e em qual estratégia de integração cada um é usado.",
    answerHint: "Relacione cada dublê a 'chamador' x 'chamado' e a Top-Down x Bottom-Up.",
    expectedAnswer: `Considerando que **A invoca B**:

**Driver** — simula a parte que **invoca** (A), o **chamador**.
- Fica **acima** do módulo sob teste.
- Envia entradas, ativa o teste e captura as saídas.
- Usado na integração **Bottom-Up** (a base já existe, falta quem a chame).

**Stub** — simula a parte que **é invocada** (B), o **chamado**.
- Fica **abaixo** do módulo sob teste.
- Recebe a chamada e devolve respostas fixas pré-programadas.
- Usado na integração **Top-Down** (o topo já existe, faltam os módulos inferiores).

Mnemônico: o **Driver dirige** (chama); o **Stub** é o **subordinado** (é chamado).`,
  },
  {
    id: "q_drv_open_2",
    moduleId: "drivers_stubs",
    type: "open",
    questionText: "Dada a interface `interface ConsultaCep { String buscar(String cep); }`, **escreva um Stub** que retorne um endereço fixo e mostre como injetá-lo em `CalculadoraFrete` num teste.",
    answerHint: "Implemente a interface com retorno fixo e passe a instância para o módulo sob teste.",
    codeContext: `interface ConsultaCep { String buscar(String cep); }`,
    codeLanguage: "java",
    expectedAnswer: `\`\`\`java
// 1) Stub: implementação falsa com resposta fixa
class ConsultaCepStub implements ConsultaCep {
    @Override
    public String buscar(String cep) {
        return "Rua X, São Paulo, SP"; // sem acesso à rede
    }
}

// 2) Injeção no módulo sob teste (Top-Down)
@Test
void deveCalcularFreteComCepStub() {
    ConsultaCep cep = new ConsultaCepStub();
    CalculadoraFrete frete = new CalculadoraFrete(cep);
    double valor = frete.calcular("01000-000");
    assertTrue(valor > 0);
}
\`\`\`

O Stub permite testar a \`CalculadoraFrete\` mesmo com o serviço real de CEP indisponível.`,
  },
  {
    id: "q_drv_draw_1",
    moduleId: "drivers_stubs",
    type: "drawing",
    questionText: "**Desenhe o diagrama** da integração Top-Down: o módulo sob teste `CalculadoraFrete` chama o serviço de CEP (ainda indisponível). Indique onde entra o **Stub** e o sentido das chamadas.",
    answerHint: "Mostre o módulo sob teste acima e o stub abaixo, com a seta de chamada e a seta de retorno do dado fixo.",
    expectedAnswer: `O módulo sob teste fica **acima** e chama o **Stub** (que substitui o serviço de CEP), que devolve um dado fixo:`,
    expectedDiagramMermaid: `flowchart TB
    MUT["Módulo sob teste<br/>(CalculadoraFrete)"] -->|chama / invoca| STUB["STUB<br/>(ConsultaCep simulada)"]
    STUB -.->|retorna dado fixo| MUT`,
    expectedDiagramCaption: "Integração Top-Down com Stub no lugar do serviço de CEP",
  },

  // ===================================================================
  // JUNIT / MOCKITO — QUESTÕES APLICADAS, DISSERTATIVAS E DE DESENHO
  // ===================================================================
  {
    id: "q_jum_4",
    moduleId: "junit_mockito",
    questionText: "No trecho `assertEquals(3.0, calc.subtracao(5.0, 2.0), 0.1)`, qual o papel do terceiro parâmetro `0.1`?",
    codeContext: `assertEquals(3.0, calc.subtracao(5.0, 2.0), 0.1);`,
    codeLanguage: "java",
    options: [
      { id: "a", text: "É o **delta**: a margem de erro tolerada ao comparar números de ponto flutuante (double/float).", isCorrect: true, explanation: "Correto! Por causa de imprecisões do ponto flutuante, compara-se com uma tolerância." },
      { id: "b", text: "É o número de vezes que o teste será repetido.", isCorrect: false, explanation: "Incorreto. assertEquals não repete o teste." },
      { id: "c", text: "É o timeout em segundos.", isCorrect: false, explanation: "Incorreto. Timeout não é parâmetro do assertEquals." },
      { id: "d", text: "É o índice do parâmetro testado.", isCorrect: false, explanation: "Incorreto. Não existe esse conceito de índice aqui." }
    ]
  },
  {
    id: "q_jum_5",
    moduleId: "junit_mockito",
    questionText: "Qual asserção do JUnit 5 é apropriada para verificar que um trecho **lança uma exceção**?",
    codeContext: `// divisão por zero deve lançar ArithmeticException
calc.divisao(10, 0);`,
    codeLanguage: "java",
    options: [
      { id: "a", text: "assertThrows(ArithmeticException.class, () -> calc.divisao(10, 0))", isCorrect: true, explanation: "Correto! assertThrows verifica se o bloco lança a exceção esperada." },
      { id: "b", text: "assertEquals(0, calc.divisao(10, 0))", isCorrect: false, explanation: "Incorreto. Isso espera um valor de retorno, não uma exceção." },
      { id: "c", text: "assertNotNull(calc.divisao(10, 0))", isCorrect: false, explanation: "Incorreto. Verifica nulidade do retorno, não o lançamento de exceção." },
      { id: "d", text: "assertTrue(calc.divisao(10, 0) > 0)", isCorrect: false, explanation: "Incorreto. Avalia um booleano sobre o retorno; não captura exceções." }
    ]
  },
  {
    id: "q_jum_6",
    moduleId: "junit_mockito",
    questionText: "Qual a diferença entre `@BeforeEach` e `@BeforeAll` no JUnit 5?",
    options: [
      { id: "a", text: "@BeforeEach roda antes de **cada** teste; @BeforeAll roda **uma vez** antes de todos (método estático).", isCorrect: true, explanation: "Correto! Essa é a distinção de ciclo de vida entre os dois." },
      { id: "b", text: "São sinônimos.", isCorrect: false, explanation: "Incorreto. Têm frequências de execução diferentes." },
      { id: "c", text: "@BeforeAll roda depois dos testes.", isCorrect: false, explanation: "Incorreto. 'Before' indica execução antes; depois seria @AfterAll." },
      { id: "d", text: "@BeforeEach precisa ser estático.", isCorrect: false, explanation: "Incorreto. Quem precisa ser estático é o @BeforeAll." }
    ]
  },
  {
    id: "q_jum_7",
    moduleId: "junit_mockito",
    questionText: "Qual a correspondência correta entre anotações do JUnit 4 e do JUnit 5?",
    options: [
      { id: "a", text: "@Before → @BeforeEach; @After → @AfterEach; @BeforeClass → @BeforeAll.", isCorrect: true, explanation: "Correto! São os renomeamentos do ciclo de vida no JUnit 5." },
      { id: "b", text: "@Before → @BeforeAll.", isCorrect: false, explanation: "Incorreto. @Before (JUnit 4) corresponde a @BeforeEach." },
      { id: "c", text: "@After → @BeforeEach.", isCorrect: false, explanation: "Incorreto. @After corresponde a @AfterEach." },
      { id: "d", text: "Os nomes são idênticos nas duas versões.", isCorrect: false, explanation: "Incorreto. Vários nomes mudaram do JUnit 4 para o 5." }
    ]
  },
  {
    id: "q_jum_8",
    moduleId: "junit_mockito",
    questionText: "Qual o papel da anotação `@InjectMocks` do Mockito?",
    options: [
      { id: "a", text: "Cria uma instância real do objeto sob teste e injeta nele os campos anotados com @Mock.", isCorrect: true, explanation: "Correto! Ela monta o objeto sob teste já com suas dependências mockadas." },
      { id: "b", text: "Marca um método como teste.", isCorrect: false, explanation: "Incorreto. Isso é o @Test." },
      { id: "c", text: "Cria um mock que sempre lança exceção.", isCorrect: false, explanation: "Incorreto. Não é a função do @InjectMocks." },
      { id: "d", text: "Executa código antes de cada teste.", isCorrect: false, explanation: "Incorreto. Isso é o @BeforeEach." }
    ]
  },
  {
    id: "q_jum_9",
    moduleId: "junit_mockito",
    questionText: "O que a linha `verify(gatewayMock, times(1)).cobrar(100.0)` valida?",
    codeContext: `verify(gatewayMock, times(1)).cobrar(100.0);`,
    codeLanguage: "java",
    options: [
      { id: "a", text: "Que o método `cobrar(100.0)` do mock foi realmente invocado exatamente 1 vez.", isCorrect: true, explanation: "Correto! verify confere as interações ocorridas com o mock (método, argumento e quantidade)." },
      { id: "b", text: "Que `cobrar` retorna 100.0.", isCorrect: false, explanation: "Incorreto. verify não checa retorno; isso seria stubbing/assert." },
      { id: "c", text: "Que o mock não é nulo.", isCorrect: false, explanation: "Incorreto. Nulidade seria assertNotNull." },
      { id: "d", text: "Que o teste lançou uma exceção.", isCorrect: false, explanation: "Incorreto. Exceções seriam verificadas com assertThrows." }
    ]
  },
  {
    id: "q_jum_10",
    moduleId: "junit_mockito",
    questionText: "Nos slides, o mock é criado no `setUp` com `calculadora = mock(Calculadora.class);`. Essa forma é:",
    codeContext: `@BeforeEach
public void setUp() {
    calculadora = mock(Calculadora.class);
}`,
    codeLanguage: "java",
    options: [
      { id: "a", text: "A criação **programática** do mock (alternativa à anotação @Mock).", isCorrect: true, explanation: "Correto! mock(Classe.class) cria o dublê via código, sem anotação." },
      { id: "b", text: "A criação de um Spy.", isCorrect: false, explanation: "Incorreto. Spy seria spy(...), embrulhando um objeto real." },
      { id: "c", text: "Uma asserção do JUnit.", isCorrect: false, explanation: "Incorreto. mock() é do Mockito, não uma asserção." },
      { id: "d", text: "Injeção automática de dependências.", isCorrect: false, explanation: "Incorreto. A injeção automática seria via @InjectMocks." }
    ]
  },
  {
    id: "q_jum_11",
    moduleId: "junit_mockito",
    questionText: "Por padrão (sem stubbing explícito), como se comportam um **Mock** e um **Spy** ao terem seus métodos chamados?",
    options: [
      { id: "a", text: "Mock retorna valores 'vazios' (null/0/false); Spy executa o código real do objeto.", isCorrect: true, explanation: "Correto! Mock substitui tudo; Spy embrulha um objeto real e chama os métodos reais por padrão." },
      { id: "b", text: "Ambos executam o código real.", isCorrect: false, explanation: "Incorreto. Apenas o Spy executa o real por padrão." },
      { id: "c", text: "Ambos retornam sempre null.", isCorrect: false, explanation: "Incorreto. O Spy executa o método real por padrão." },
      { id: "d", text: "Mock executa o real; Spy retorna null.", isCorrect: false, explanation: "Incorreto. Está invertido." }
    ]
  },
  {
    id: "q_jum_open_1",
    moduleId: "junit_mockito",
    type: "open",
    questionText: "**Escreva um teste JUnit 5 + Mockito** para `PagamentoService`, que depende de `GatewayPagamento`. Teste o cenário de pagamento aprovado (`cobrar` retorna `true`), usando @Mock, @InjectMocks, when/thenReturn, assertTrue e verify.",
    answerHint: "Use @ExtendWith(MockitoExtension.class), programe o mock e verifique a interação.",
    expectedAnswer: `\`\`\`java
@ExtendWith(MockitoExtension.class)
class PagamentoServiceTest {

    @Mock
    private GatewayPagamento gatewayMock;

    @InjectMocks
    private PagamentoService service;

    @Test
    void deveAprovarPagamento() {
        // Stubbing
        when(gatewayMock.cobrar(100.0)).thenReturn(true);

        boolean resultado = service.processar(100.0);

        assertTrue(resultado);
        verify(gatewayMock, times(1)).cobrar(100.0);
    }
}
\`\`\`

@Mock cria o dublê do gateway, @InjectMocks injeta-o no serviço, when/thenReturn programa a resposta, assertTrue valida o resultado e verify confere que o gateway foi chamado uma vez.`,
  },
  {
    id: "q_jum_open_2",
    moduleId: "junit_mockito",
    type: "open",
    questionText: "Explique a diferença entre **@Mock** e **@Spy** no Mockito e dê um cenário em que cada um é mais apropriado.",
    answerHint: "Foque em 'substituição total' x 'embrulho de objeto real' e nos comportamentos padrão.",
    expectedAnswer: `**@Mock** cria um dublê que **substitui completamente** o objeto real. Por padrão, todos os métodos retornam valores vazios (null/0/false) até que se programe o comportamento com \`when(...).thenReturn(...)\`.
- *Cenário:* isolar uma dependência externa cara/indisponível (gateway de pagamento, banco de dados), controlando totalmente suas respostas.

**@Spy** embrulha uma **instância real**. Por padrão, ao chamar seus métodos, o **código real** é executado, a menos que se faça stubbing parcial com \`doReturn(...).when(spy).metodo(...)\`.
- *Cenário:* usar o comportamento real de um objeto, sobrescrevendo apenas **um** método específico.

Resumo: Mock = substituição total; Spy = espionagem parcial sobre o objeto real.`,
  },
  {
    id: "q_jum_draw_1",
    moduleId: "junit_mockito",
    type: "drawing",
    questionText: "**Monte a tabela** de equivalência entre as anotações de ciclo de vida do **JUnit 4** e do **JUnit 5** para: `@Before`, `@After`, `@BeforeClass` e `@AfterClass`.",
    answerHint: "Cada anotação 'Each' roda por teste; as 'All' rodam uma vez (estáticas).",
    expectedAnswer: `| JUnit 4 | JUnit 5 | Quando executa |
| :-- | :-- | :-- |
| \`@Before\` | \`@BeforeEach\` | Antes de cada teste |
| \`@After\` | \`@AfterEach\` | Depois de cada teste |
| \`@BeforeClass\` | \`@BeforeAll\` | Uma vez, antes de todos (estático) |
| \`@AfterClass\` | \`@AfterAll\` | Uma vez, depois de todos (estático) |

Observação: \`@Test\` existe em ambas as versões, mas muda o pacote de importação (JUnit 5: \`org.junit.jupiter.api\`).`,
  }
];

export const simulationQuestions: SimulationQuestion[] = [
  {
    id: "s_dfg",
    title: "Aplicação de Critérios de Fluxo de Dados",
    statement: "Considere um método que recebe um vetor de inteiros, busca um valor e atualiza um contador de ocorrências. Se o vetor estiver vazio, ele retorna 0. Descreva as triplas de associação def-uso para o contador e identifique onde ocorre um c-uso e um p-uso.",
    expectedResponse: "A variável contador é definida com valor 0 no início (nó de inicialização: def). Se o vetor tiver elementos, ocorre uma condicional (p-uso das variáveis vetor e tamanho). Dentro do loop, se vetor[i] == número, o contador é incrementado (c-uso e def). No final, o contador é retornado (c-uso). As triplas de c-uso para o contador seriam <1, 4, contador> (def na linha 1 e retorno na linha 4) e <3, 4, contador> (def no incremento e retorno).",
    checklist: [
      { id: "c1", description: "Identificou corretamente o nó de definição inicial do contador.", points: 30 },
      { id: "c2", description: "Apontou a diferença entre o p-uso no condicional do loop e o c-uso no incremento.", points: 40 },
      { id: "c3", description: "Construiu pelo menos uma tripla de associação def-uso corretamente.", points: 30 }
    ],
    totalPoints: 100
  },
  {
    id: "s_mut",
    title: "Análise de Escore de Mutação",
    statement: "Sua ferramenta de testes gerou um total de 80 mutantes para uma classe Java. Ao rodar sua suíte de testes, 55 mutantes foram mortos e 15 ficaram vivos. A análise manual revelou que 10 mutantes eram equivalentes. Calcule o escore de mutação obtido.",
    expectedResponse: "A fórmula é: ms = DM / (M - ME). Onde:\n- M (Total de mutantes) = 80\n- DM (Mutantes mortos) = 55\n- ME (Equivalentes) = 10\nSubstituindo na fórmula:\nms = 55 / (80 - 10) = 55 / 70 ≈ 0.7857 ou 78.57%. O escore de mutação obtido é de aproximadamente 78.6%.",
    checklist: [
      { id: "m1", description: "Demonstrou conhecimento da fórmula ms = DM / (M - ME).", points: 30 },
      { id: "m2", description: "Identificou corretamente as variáveis (DM=55, M=80, ME=10).", points: 35 },
      { id: "m3", description: "Chegou ao resultado numérico correto de 78.57% (ou 78.6%).", points: 35 }
    ],
    totalPoints: 100
  },
  {
    id: "s_junit",
    title: "Escrita de Teste com JUnit e Mockito",
    statement: "Escreva um método de teste JUnit 5 usando Mockito para testar a classe 'ProcessadorPedidos'. Ela depende de 'EstoqueService' (que deve ser mockado) para verificar a disponibilidade de um produto. Queremos testar o cenário em que o produto está esgotado (deve retornar falso).",
    expectedResponse: "```java\n@ExtendWith(MockitoExtension.class)\nclass ProcessadorPedidosTest {\n    @Mock\n    private EstoqueService estoqueMock;\n    @InjectMocks\n    private ProcessadorPedidos processador;\n\n    @Test\n    void testProcessarPedido_ProdutoEsgotado() {\n        when(estoqueMock.temEstoque(\"Prod1\", 5)).thenReturn(false);\n        boolean resultado = processador.processar(\"Prod1\", 5);\n        assertFalse(resultado);\n        verify(estoqueMock).temEstoque(\"Prod1\", 5);\n    }\n}\n```",
    checklist: [
      { id: "j1", description: "Declarou as anotações @Mock e @InjectMocks de forma correta.", points: 30 },
      { id: "j2", description: "Configurou o comportamento do stub com 'when(...).thenReturn(false)'.", points: 40 },
      { id: "j3", description: "Efetuou a asserção correta (assertFalse ou similar) e a verificação (verify).", points: 30 }
    ],
    totalPoints: 100
  }
];
