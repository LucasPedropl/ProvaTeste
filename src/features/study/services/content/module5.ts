import { StudyModule } from "../../schemas/studyTypes";

export const module5: StudyModule = {
  id: "drivers_stubs",
  title: "9. Drivers e Stubs",
  description: "Entenda o papel dos drivers e stubs como componentes de simulação essenciais para testes de integração.",
  estimatedMinutes: 15,
  tldr: "Drivers e stubs são dublês que preenchem módulos ausentes na integração. O Stub fica ABAIXO (simula quem é chamado, devolve dados fixos — usado no Top-Down). O Driver fica ACIMA (simula quem chama, envia entradas e captura saídas — usado no Bottom-Up).",
  keyTerms: [
    { term: "Stub", definition: "Dublê do módulo chamado (inferior); retorna respostas fixas. Top-Down." },
    { term: "Driver", definition: "Dublê do módulo chamador (superior); envia entradas e ativa o teste. Bottom-Up." },
    { term: "Dublê de teste", definition: "Componente artificial que substitui uma dependência real durante o teste." },
    { term: "Top-Down", definition: "Integração de cima para baixo; usa stubs para os módulos inferiores." },
    { term: "Bottom-Up", definition: "Integração de baixo para cima; usa drivers para os módulos superiores." },
  ],
  sections: [
    {
      id: "drivers_stubs_intro",
      title: "Dublês de Teste Estruturais",
      subtitle: "Preenchendo as lacunas do sistema",
      contentMarkdown: `No **teste de integração** verificamos como as partes do software trabalham juntas. O problema é que, no momento do teste, frequentemente um módulo ainda **não foi implementado** ou não está disponível.

> **Definição (slides):** *Drivers e stubs simulam partes do software que não foram implementadas no momento do teste.*

Imagine que precisamos testar um módulo $A$ que se comunica com um módulo $B$. O módulo $B$ pode estar:
* Ainda não desenvolvido (sendo construído em paralelo).
* Inacessível no ambiente de teste (ex: banco de dados pesado, API externa paga).
* Difícil de configurar para retornar erros específicos.

Para viabilizar o teste mesmo assim, substituímos a parte ausente por componentes artificiais de simulação: **Drivers** e **Stubs**.`,
    },
    {
      id: "regra_de_ouro",
      title: "A Regra de Ouro: \"A invoca B\"",
      subtitle: "Como diferenciar na prova",
      contentMarkdown: `Esta é a definição **exata dos slides** e a forma mais segura de não errar na prova. Considere que **um método $A$ invoca (chama) um método $B$**:

* Se a parte que **invoca** ($A$) for simulada → é um **DRIVER**.
* Se a parte que **é invocada** ($B$) for simulada → é um **STUB**.

Em outras palavras:
* **Driver** simula a parte que *irá chamar / invocar* uma parte (o **chamador**).
* **Stub** simula a parte *chamada / invocada* (o **chamado**).

> 💡 **Mnemônico:** o **S**tub é a peça do **S**ubordinado (quem é chamado, fica abaixo). O **Driver** é quem *dirige* a chamada (fica acima).`,
      visualDiagramMermaid: `flowchart LR
    A["Método A<br/>(invoca / chama)"] -->|invoca| B["Método B<br/>(é invocado / chamado)"]
    A -.->|"se A for simulado"| D(["= DRIVER"])
    B -.->|"se B for simulado"| S(["= STUB"])`,
    },
    {
      id: "stubs",
      title: "O que é um Stub?",
      subtitle: "Simulador de componentes chamados (Descendente)",
      contentMarkdown: `Um **Stub** é um módulo de simulação de nível inferior que substitui um componente que é **chamado** pelo módulo sob teste.

* **Direção**: Fluxo de chamada descendente (do módulo sob teste para o stub).
* **Uso**: Essencial na integração **Top-Down**.
* **Comportamento**: Recebe as requisições do módulo principal e responde com dados fixos pré-programados para permitir que o fluxo continue.

*Exemplo*: Se o seu módulo sob teste calcula o frete e precisa consultar um webservice de CEP dos Correios (que está fora do ar), você cria um *Stub* que, sempre que for chamado com qualquer CEP, retorna imediatamente \`"Rua X, São Paulo, SP"\` sem fazer a chamada real na rede.`,
      visualDiagramMermaid: `flowchart TB
    MUT["Módulo sob teste<br/>(CalculadoraFrete)"] -->|chama / invoca| STUB["STUB<br/>(ConsultaCep simulada)"]
    STUB -.->|retorna dado fixo| MUT`,
      codeExample: {
        language: "java",
        code: `// Interface real que o módulo sob teste depende (CHAMADO)
interface ConsultaCep {
    String buscar(String cep);
}

// STUB: substitui o serviço real, devolve dado fixo pré-programado
class ConsultaCepStub implements ConsultaCep {
    @Override
    public String buscar(String cep) {
        return "Rua X, São Paulo, SP"; // resposta enlatada, sem rede
    }
}

// Módulo sob teste (Top-Down) usa o stub no lugar do serviço real
CalculadoraFrete frete = new CalculadoraFrete(new ConsultaCepStub());`,
        explanation: "O Stub fica ABAIXO do módulo sob teste (é chamado por ele) e responde com dados fixos, permitindo testar a CalculadoraFrete mesmo com o serviço de CEP indisponível. Típico da integração Top-Down.",
      },
    },
    {
      id: "drivers",
      title: "O que é um Driver?",
      subtitle: "Simulador de componentes chamadores (Ascendente)",
      contentMarkdown: `Um **Driver** é um módulo de controle de nível superior que simula um componente que **chama** o módulo sob teste.

* **Direção**: Fluxo de chamada ascendente (do driver para o módulo sob teste).
* **Uso**: Essencial na integração **Bottom-Up**.
* **Comportamento**: Alimenta o módulo de nível inferior sob teste com parâmetros e dados de entrada apropriados, executa-o e captura suas saídas para fins de verificação.

*Exemplo*: Se você desenvolveu uma função complexa de processamento de imagem de baixo nível e ainda não tem a tela (UI) pronta para que o usuário clique e envie a imagem, você escreve um pequeno script de linha de comando (*Driver*) que simplesmente lê uma imagem do disco, passa para a sua função e salva o resultado.`,
      visualDiagramMermaid: `flowchart TB
    DRV["DRIVER<br/>(simula o chamador / UI ausente)"] -->|envia entradas e ativa| MUT["Módulo sob teste<br/>(FiltroImagem)"]
    MUT -.->|saída capturada p/ verificação| DRV`,
      codeExample: {
        language: "java",
        code: `// Módulo de baixo nível já pronto e testado unitariamente (CHAMADO)
class FiltroImagem {
    Imagem aplicarSepia(Imagem original) { /* ... */ }
}

// DRIVER: simula o chamador (a UI ainda não existe)
public class FiltroImagemDriver {
    public static void main(String[] args) {
        Imagem entrada = Imagem.ler("foto.png"); // alimenta entrada
        Imagem saida = new FiltroImagem().aplicarSepia(entrada); // ativa o teste
        saida.salvar("foto_sepia.png");           // captura a saída p/ verificação
    }
}`,
        explanation: "O Driver fica ACIMA do módulo sob teste (chama-o), fornecendo entradas e capturando saídas. Permite validar o FiltroImagem antes da UI existir. Típico da integração Bottom-Up.",
      },
    },
    {
      id: "comparison",
      title: "Comparativo Rápido",
      subtitle: "Driver vs Stub",
      contentMarkdown: `Aqui está um resumo prático para não confundir na prova:

| Característica | Driver | Stub |
| :--- | :--- | :--- |
| **Papel** | Simula o **Chamador** | Simula o **Chamado** |
| **Em "A invoca B"** | Simula o **A** (quem invoca) | Simula o **B** (quem é invocado) |
| **Direção** | Fica **acima** do módulo sob teste | Fica **abaixo** do módulo sob teste |
| **Integração** | Usado em abordagens **Bottom-Up** | Usado em abordagens **Top-Down** |
| **Ação** | Envia dados e ativa o teste | Recebe dados e retorna respostas fixas |

Lembre-se: ambos existem pela mesma razão — **simular partes do software ainda não implementadas (ou indisponíveis) no momento do teste de integração**.`,
    },
  ],
};
