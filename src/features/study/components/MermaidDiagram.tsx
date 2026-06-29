"use client";

import { useEffect, useRef, useState } from "react";
import { Workflow } from "lucide-react";

interface MermaidDiagramProps {
  chart: string;
  caption?: string;
}

let mermaidIdCounter = 0;

/**
 * Renderiza um diagrama Mermaid (grafos de fluxo, estados, etc.) com tema
 * sincronizado ao modo claro/escuro da aplicação. Observa mudanças na classe
 * `dark` do <html> para re-renderizar quando o tema é alternado.
 */
export default function MermaidDiagram({ chart, caption }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    let cancelled = false;

    const renderChart = async () => {
      try {
        const mermaid = (await import("mermaid")).default;
        const isDark = document.documentElement.classList.contains("dark");

        mermaid.initialize({
          startOnLoad: false,
          theme: isDark ? "dark" : "default",
          securityLevel: "strict",
          themeVariables: isDark
            ? { primaryColor: "#1f1d2f", primaryTextColor: "#f4f4f7", lineColor: "#a855f7" }
            : { primaryColor: "#f1eefb", primaryTextColor: "#1b1a2e", lineColor: "#7c3aed" },
        });

        const id = `mermaid-diagram-${mermaidIdCounter++}`;
        const { svg: rendered } = await mermaid.render(id, chart.trim());
        if (!cancelled) {
          setSvg(rendered);
          setError(false);
        }
      } catch (e) {
        console.error("Falha ao renderizar diagrama Mermaid:", e);
        if (!cancelled) setError(true);
      }
    };

    renderChart();

    const observer = new MutationObserver((mutations) => {
      if (mutations.some((m) => m.attributeName === "class")) {
        renderChart();
      }
    });
    observer.observe(document.documentElement, { attributes: true });

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [chart]);

  if (error) {
    return (
      <div className="my-4 rounded-lg border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
        Não foi possível renderizar o diagrama.
      </div>
    );
  }

  return (
    <figure className="my-5 rounded-xl border border-border bg-card/60 overflow-hidden glass-panel">
      <figcaption className="flex items-center gap-1.5 px-4 py-2 bg-secondary/50 border-b border-border text-xs font-semibold text-primary uppercase tracking-wide">
        <Workflow className="w-3.5 h-3.5" /> {caption ?? "Diagrama"}
      </figcaption>
      <div
        ref={containerRef}
        className="flex justify-center p-5 overflow-x-auto [&_svg]:max-w-full [&_svg]:h-auto"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </figure>
  );
}
