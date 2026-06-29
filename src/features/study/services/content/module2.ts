import { StudyModule } from "../../schemas/studyTypes";

export const module2: StudyModule = {
  id: "defect_based",
  title: "6. Testes Baseados em Defeitos",
  description: "Aprenda sobre semeadura de defeitos e teste de mutação para avaliar a eficácia dos seus casos de teste.",
  estimatedMinutes: 20,
  tldr: "Testes baseados em defeitos usam informação sobre defeitos comuns. Apoiam-se na hipótese do programador competente e no efeito do acoplamento. O teste de mutação gera mutantes (versões alteradas do código) e avalia se a suíte os 'mata'. Segue um passo a passo: gerar mutantes → rodar T no original → rodar nos mutantes → identificar mortos/vivos → analisar equivalentes → calcular ms = DM/(M−ME). Ferramentas: muJava, Proteum, Jumble. Semeadura estima defeitos residuais: N = (n×S)/s.",
  keyTerms: [
    { term: "Hipótese do programador competente", definition: "Programadores experientes escrevem programas corretos ou muito próximos do correto, errando por defeitos simples." },
    { term: "Efeito do acoplamento", definition: "Testes capazes de revelar defeitos simples também revelam, implicitamente, defeitos complexos." },
    { term: "Mutante", definition: "Versão modificada do programa, possivelmente com defeito, gerada por um operador de mutação." },
    { term: "Mutante morto/vivo", definition: "Morto: algum teste falha nele (bom). Vivo (sobrevivente): todos passam (teste fraco)." },
    { term: "Mutante equivalente", definition: "Comporta-se igual ao original para toda entrada; nenhum teste pode matá-lo." },
    { term: "Escore de mutação (ms)", definition: "DM / (M − ME): proporção de mutantes mortos sobre os não equivalentes." },
    { term: "Semeadura de defeitos", definition: "Inserir S defeitos conhecidos para estimar o total real: N = (n×S)/s." },
  ],
  sections: [
    {
      id: "defect_intro",
      title: "Introdução aos Testes Baseados em Defeitos",
      subtitle: "Focar onde os erros costumam se esconder",
      contentMarkdown: `Os testes baseados em defeitos utilizam conhecimentos sobre erros historicamente cometidos por programadores para projetar casos de teste.
      
Em vez de focar apenas em requisitos (funcional) ou estrutura (caixa-branca), criamos testes focados em revelar defeitos típicos (como erros de limite, troca de operadores ou lógica invertida).

As principais técnicas deste tipo de teste são a **semeadura de defeitos** e o **teste (ou análise) de mutação**.`,
    },
    {
      id: "fault_seeding",
      title: "Semeadura de Defeitos (Fault Seeding)",
      subtitle: "Estimando defeitos residuais com matemática",
      contentMarkdown: `A **Semeadura de Defeitos** é uma técnica estatística para estimar a quantidade de defeitos que ainda restam no software antes de sua liberação.

**Como funciona**:
1. Um engenheiro de testes insere um número conhecido de defeitos artificiais ($S$) no código.
2. A equipe de testes executa o processo de testes sem saber quais ou onde estão esses defeitos semeados.
3. Ao final, a equipe reporta $s$ defeitos semeados encontrados e $n$ defeitos reais encontrados.
4. Estimamos o número de defeitos reais totais ($N$) e restantes com base na proporção.

**Fórmula de Estimativa**:
$$N = \\frac{n \\times S}{s}$$

**Exemplo**:
Se semeamos $S = 20$ defeitos e nossos testes encontraram $s = 15$ dos semeados e $n = 30$ defeitos reais:
* O total estimado de defeitos reais é: $N = \\frac{30 \\times 20}{15} = 40$.
* Os defeitos reais ainda não encontrados estimam-se em: $N - n = 40 - 30 = 10$ defeitos restantes.`,
    },
    {
      id: "mutation_fundamentals",
      title: "Fundamentos da Análise de Mutação",
      subtitle: "As duas hipóteses que sustentam a técnica",
      contentMarkdown: `A **análise de mutação** se apoia em duas hipóteses fundamentais que justificam por que mexer em pequenos trechos do código é suficiente para avaliar a qualidade dos testes.

**1. Hipótese do Programador Competente**
Programadores experientes escrevem programas **corretos ou muito próximos do correto**. Ou seja, quando há defeitos, eles tendem a ser **pequenos/simples** (um operador trocado, um limite errado), e não erros estruturais grosseiros. Por isso faz sentido simular defeitos por meio de pequenas alterações sintáticas.

**2. Efeito do Acoplamento (Coupling Effect)**
Casos de teste capazes de revelar falhas causadas por **defeitos simples** são tão sensíveis que, **implicitamente**, também são capazes de revelar falhas causadas por **defeitos mais complexos** (combinações de defeitos simples).

> Conclusão: se a sua suíte mata mutantes com defeitos simples, ela provavelmente também detectaria defeitos reais mais elaborados.`,
    },
    {
      id: "mutation_testing",
      title: "Teste de Mutação",
      subtitle: "Quem testa os testadores?",
      contentMarkdown: `O **Teste de Mutação** avalia a qualidade da sua suíte de testes (casos de teste). Em vez de testar o programa, testamos os próprios testes.

**Terminologia**:
* **Mutante**: Uma cópia do programa original com uma pequena alteração sintática deliberada (ex: mudar \`+\` para \`-\`).
* **Mutante Morto (Killed)**: Quando pelo menos um caso de teste falha ao rodar no mutante. Indica que os testes detectaram a falha (comportamento desejado!).
* **Mutante Vivo (Alive)**: Quando todos os casos de teste passam no mutante. Significa que os testes falharam em detectar o defeito inserido.
* **Mutante Equivalente**: Um mutante que, embora alterado, comporta-se exatamente igual ao programa original para todas as entradas possíveis. **Nenhum teste pode matá-lo**.

**Fórmula do Escore de Mutação ($ms$)**:
$$ms(P, T) = \\frac{DM}{M - ME}$$
* $DM$ = Mutantes Mortos
* $M$ = Total de Mutantes Gerados
* $ME$ = Mutantes Equivalentes

O objetivo é ter um escore de $1.0$ (ou $100\\%$).`,
      codeExample: {
        language: "java",
        code: `// Código Original
public boolean isAdult(int age) {
    return age >= 18;
}

// Mutante Gerado (Operador ROR)
public boolean isAdult_Mutant(int age) {
    return age > 18; // Alterado de >= para >
}`,
        explanation: "Se a sua suíte de teste tiver apenas o caso de teste isAdult(20) -> true, o mutante sobreviverá. Para matá-lo, é necessário testar o limite: isAdult(18) -> true, que no mutante resultará em false, causando a falha do teste e a morte do mutante.",
      },
    },
    {
      id: "equivalent_mutants",
      title: "Mutantes Equivalentes em Detalhe",
      subtitle: "A alteração que não muda o comportamento",
      contentMarkdown: `Ao gerar mutantes, um **número grande** deles é produzido e alguns podem **sobreviver**. Um caso especial são os **mutantes equivalentes**: a modificação feita no software original **não altera a funcionalidade implementada** — o mutante funciona exatamente como o original para toda entrada possível.

Por isso, **nenhum caso de teste é capaz de matá-los** (não há entrada que produza saída diferente). Eles precisam ser identificados e **removidos do cálculo** do escore de mutação.

**Exemplos clássicos (comando original → mutante equivalente):**

* \`numero = 0;\` → \`numero *= 0;\` — qualquer valor multiplicado por 0 resulta em 0.
* \`for (i = 0; i < n; i++)\` → \`for (i = 0; i != n; i++)\` — com \`i\` iniciando em 0 e incremento de 1, \`i != n\` para no mesmo ponto que \`i < n\`.
* \`if ((a > b) || (c < d))\` → \`if ((a > b) + (c < d))\` — a soma dos booleanos (0/1) é diferente de 0 exatamente quando o OR seria verdadeiro.

> Atenção: detectar mutantes equivalentes é, em geral, um problema **indecidível** e exige análise manual — é uma das partes mais custosas do teste de mutação.`,
    },
    {
      id: "mutation_process",
      title: "Passo a Passo do Teste de Mutação",
      subtitle: "Da geração dos mutantes ao escore",
      contentMarkdown: `O teste de mutação segue um processo bem definido (formalizado por **Delamaro**), partindo do programa $P$ e do conjunto de casos de teste $T$:

1. **Geração dos mutantes** a partir dos **operadores de mutação** selecionados e do software original.
2. **Execução de $T$ contra o software original $P$**. Se as saídas geradas estiverem de acordo com as esperadas, o mesmo conjunto $T$ é executado contra os mutantes. (Se o original já falhar, corrige-se antes de prosseguir.)
3. **Identificação dos mutantes mortos e sobreviventes** (vivos).
4. **Análise dos mutantes sobreviventes**, incluindo a **verificação dos mutantes equivalentes**.
5. **Aplicação do escore de mutação** ($ms$) para medir a efetividade da suíte.

Quanto mais próximo de $1.0$ o escore, mais efetivo é o conjunto de testes em revelar defeitos.`,
      visualDiagramMermaid: `flowchart TD
  P["Programa original P"] --> G["1. Gerar mutantes<br/>(operadores de mutação)"]
  T["Casos de teste T"] --> EO{"2. Saídas de P<br/>corretas?"}
  EO -->|Não| FIX["Corrigir P / testes"]
  EO -->|Sim| EM["Executar T nos mutantes"]
  G --> EM
  EM --> ID["3. Identificar mortos<br/>e sobreviventes"]
  ID --> AN["4. Analisar sobreviventes<br/>e equivalentes"]
  AN --> MS["5. Calcular escore ms"]`,
    },
    {
      id: "mutation_operators",
      title: "Operadores de Mutação",
      subtitle: "Tipos de mutações geradas",
      contentMarkdown: `Os operadores definem as regras sintáticas para gerar os mutantes:

* **AOR (Arithmetic Operator Replacement)**: Substitui operadores aritméticos (\`+\`, \`-\`, \`*\`, \`/\`).
* **ROR (Relational Operator Replacement)**: Substitui operadores relacionais (\`<\`, \`>\`, \`==\`, \`!=\`, \`>=\`, \`<=\`).
* **LOR (Logical Operator Replacement)**: Substitui operadores lógicos (\`&&\`, \`||\`, \`!\`).
* **VDL (Variable DeLetion)**: Remove uma variável de uma expressão.
* **CDL (Constant DeLetion)**: Remove um valor constante.`,
    },
    {
      id: "mutation_tools",
      title: "Ferramentas para Teste de Mutação",
      subtitle: "Automatizando a geração e execução de mutantes",
      contentMarkdown: `Gerar e executar mutantes manualmente é inviável em escala, por isso existem ferramentas dedicadas, geralmente específicas por linguagem:

| Ferramenta | Linguagem / Ambiente |
| --- | --- |
| **Mothra** | Fortran |
| **Proteum** | C |
| **Jumble** | Java |
| **JesTer** | Java |
| **muJava** | Java |
| **MuClipse** | Java — extensão da muJava para o ambiente Eclipse |

**muJava** (página oficial: \`albany.edu/faculty/offutt/mujava\`) é uma das mais conhecidas para Java. Em linhas gerais, seu uso envolve:

* **Estrutura de diretórios**: \`src\`, \`classes\`, \`testset\` e \`result\` (criados via \`java mujava.makeMuJavaStructure\`).
* **Configuração** do \`CLASSPATH\` apontando para \`mujava.jar\`, \`openjava.jar\` e \`tools.jar\` do JDK.
* Colocar os \`.java\` em \`src\` e os \`.class\` em \`classes\`.
* **Gerar mutantes** pela interface: \`java mujava.gui.GenMutantsMain\`.`,
    },
  ],
};
