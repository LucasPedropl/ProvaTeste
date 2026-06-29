"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { studyModules } from "../services/contentData";
import SearchSelect from "../../../components/ui/SearchSelect";

interface TopicQuickNavProps {
  currentId: string;
}

/**
 * Barra de navegação rápida entre tópicos, fixada no topo da página de leitura.
 * Permite saltar para qualquer tópico via select pesquisável e avançar/retroceder
 * sequencialmente. Totalmente responsiva (botões viram ícones em telas pequenas).
 */
export default function TopicQuickNav({ currentId }: TopicQuickNavProps) {
  const router = useRouter();

  const currentIndex = studyModules.findIndex((m) => m.id === currentId);
  const previousModule = currentIndex > 0 ? studyModules[currentIndex - 1] : null;
  const nextModule =
    currentIndex >= 0 && currentIndex < studyModules.length - 1
      ? studyModules[currentIndex + 1]
      : null;

  const options = studyModules.map((studyModule, idx) => ({
    value: studyModule.id,
    label: `${String(idx + 1).padStart(2, "0")}. ${studyModule.title.replace(/^\d+\.\s*/, "")}`,
    description: studyModule.description,
  }));

  const handleNavigate = (id: string) => {
    if (id !== currentId) router.push(`/topico/${id}`);
  };

  const navButtonBase =
    "flex items-center justify-center shrink-0 h-11 w-11 rounded-lg border border-border text-foreground transition-all duration-200";

  return (
    <div className="flex items-center gap-2">
      {previousModule ? (
        <button
          type="button"
          onClick={() => handleNavigate(previousModule.id)}
          title={`Anterior: ${previousModule.title}`}
          aria-label={`Tópico anterior: ${previousModule.title}`}
          className={`${navButtonBase} bg-secondary/60 hover:bg-secondary cursor-pointer`}
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
      ) : (
        <span
          aria-hidden
          className={`${navButtonBase} border-border/40 text-muted-foreground/40 cursor-not-allowed`}
        >
          <ArrowLeft className="w-4 h-4" />
        </span>
      )}

      <SearchSelect
        options={options}
        value={currentId}
        onChange={handleNavigate}
        placeholder="Ir para o tópico..."
        searchPlaceholder="Buscar tópico..."
        className="flex-1 min-w-0"
      />

      {nextModule ? (
        <button
          type="button"
          onClick={() => handleNavigate(nextModule.id)}
          title={`Próximo: ${nextModule.title}`}
          aria-label={`Próximo tópico: ${nextModule.title}`}
          className={`${navButtonBase} bg-secondary/60 hover:bg-secondary cursor-pointer`}
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      ) : (
        <span
          aria-hidden
          className={`${navButtonBase} border-border/40 text-muted-foreground/40 cursor-not-allowed`}
        >
          <ArrowRight className="w-4 h-4" />
        </span>
      )}
    </div>
  );
}
