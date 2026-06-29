"use client";

import React from "react";
import katex from "katex";
import { AlertTriangle, Lightbulb, Info } from "lucide-react";
import CodeBlock from "../../../components/ui/CodeBlock";

interface MarkdownContentProps {
  content: string;
}

/**
 * Divide o conteúdo em blocos separados por linha em branco, mas mantém as
 * cercas de código (```) como um único bloco — preservando linhas em branco
 * internas ao código.
 */
function splitBlocks(content: string): string[] {
  const lines = content.split("\n");
  const blocks: string[] = [];
  let buffer: string[] = [];
  let inFence = false;

  const flush = () => {
    if (buffer.length > 0) {
      blocks.push(buffer.join("\n"));
      buffer = [];
    }
  };

  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      if (!inFence) {
        flush();
        inFence = true;
        buffer.push(line);
      } else {
        buffer.push(line);
        inFence = false;
        flush();
      }
      continue;
    }
    if (!inFence && line.trim() === "") {
      flush();
    } else {
      buffer.push(line);
    }
  }
  flush();
  return blocks;
}

/**
 * Renderiza uma expressão LaTeX (KaTeX) de forma segura, sem lançar exceção
 * em caso de sintaxe inválida — apenas exibe o erro inline.
 */
function renderMath(tex: string, displayMode: boolean): string {
  return katex.renderToString(tex, {
    displayMode,
    throwOnError: false,
    output: "htmlAndMathml",
  });
}

/**
 * Renderiza **negrito**, `código` e matemática inline ($...$) dentro de um
 * trecho de texto. A matemática é resolvida primeiro para não conflitar com a
 * formatação de negrito/código.
 */
function renderInline(text: string): React.ReactElement[] {
  // Separa segmentos de matemática inline ($...$) do texto comum.
  const segments = text.split(/(\$[^$\n]+\$)/g);

  return segments.flatMap((segment, segIdx) => {
    const mathMatch = segment.match(/^\$([^$\n]+)\$$/);
    if (mathMatch) {
      return [
        <span
          key={`math-${segIdx}`}
          dangerouslySetInnerHTML={{ __html: renderMath(mathMatch[1], false) }}
        />,
      ];
    }
    return renderRichText(segment, segIdx);
  });
}

/**
 * Aplica formatação de **negrito** e `código` a um trecho de texto puro.
 */
function renderRichText(text: string, segIdx: number): React.ReactElement[] {
  const boldParts = text.split("**");
  return boldParts.flatMap((part, boldIdx) => {
    const nodes: React.ReactElement[] = [];
    const codeParts = part.split("`");

    codeParts.forEach((chunk, codeIdx) => {
      if (chunk === "") return;
      const key = `${segIdx}-${boldIdx}-${codeIdx}`;
      if (codeIdx % 2 === 1) {
        nodes.push(
          <code
            key={key}
            className="px-1.5 py-0.5 bg-secondary border border-border text-secondary-foreground rounded text-[0.85em] font-mono"
          >
            {chunk}
          </code>
        );
      } else if (boldIdx % 2 === 1) {
        nodes.push(
          <strong key={key} className="text-foreground font-semibold">
            {chunk}
          </strong>
        );
      } else {
        nodes.push(<React.Fragment key={key}>{chunk}</React.Fragment>);
      }
    });

    return nodes;
  });
}

/** Divide uma linha de tabela markdown em células. */
function splitRow(row: string): string[] {
  return row
    .trim()
    .replace(/^\||\|$/g, "")
    .split("|")
    .map((cell) => cell.trim());
}

function MarkdownTable({ block }: { block: string }) {
  const rows = block.split("\n").filter((l) => l.trim().startsWith("|"));
  if (rows.length < 2) return null;

  const headers = splitRow(rows[0]);
  const bodyRows = rows.slice(2).map(splitRow);

  return (
    <div className="overflow-x-auto rounded-lg border border-border my-3">
      <table className="w-full text-[0.95em] border-collapse">
        <thead>
          <tr className="bg-secondary/60">
            {headers.map((header, idx) => (
              <th
                key={idx}
                className="text-left font-semibold text-foreground px-4 py-3 border-b border-border"
              >
                {renderInline(header)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bodyRows.map((cells, rIdx) => (
            <tr key={rIdx} className="even:bg-muted/40">
              {cells.map((cell, cIdx) => (
                <td
                  key={cIdx}
                  className="px-4 py-3 border-b border-border/60 text-muted-foreground align-top"
                >
                  {renderInline(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface ListItem {
  content: string;
  children: string[];
}

/**
 * Renderiza listas ordenadas (1. 2. 3.) e não-ordenadas (* / -),
 * preservando a numeração e suportando um nível de aninhamento (indentação).
 */
function MarkdownList({ block }: { block: string }) {
  const rawLines = block.split("\n").filter((l) => l.trim() !== "");
  if (rawLines.length === 0) return null;

  const ordered = /^\d+\.\s/.test(rawLines[0].trim());
  const items: ListItem[] = [];

  for (const line of rawLines) {
    const indent = line.length - line.trimStart().length;
    const clean = line.trim().replace(/^([*\-]|\d+\.)\s*/, "");
    if (indent >= 2 && items.length > 0) {
      items[items.length - 1].children.push(clean);
    } else {
      items.push({ content: clean, children: [] });
    }
  }

  const ListTag = ordered ? "ol" : "ul";
  const listClass = ordered ? "list-decimal" : "list-disc";

  return (
    <ListTag className={`${listClass} pl-6 space-y-2.5 marker:text-primary marker:font-semibold`}>
      {items.map((item, idx) => (
        <li key={idx} className="pl-1">
          {renderInline(item.content)}
          {item.children.length > 0 && (
            <ul className="list-[circle] pl-5 mt-2 space-y-1.5 marker:text-accent">
              {item.children.map((child, cIdx) => (
                <li key={cIdx} className="pl-1 text-muted-foreground">
                  {renderInline(child)}
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ListTag>
  );
}

const CALLOUT_STYLES = {
  warn: {
    icon: AlertTriangle,
    box: "bg-amber-500/10 border-amber-500/40",
    iconColor: "text-amber-500",
    label: "Pegadinha de prova",
  },
  tip: {
    icon: Lightbulb,
    box: "bg-accent/10 border-accent/40",
    iconColor: "text-accent",
    label: "Dica",
  },
  note: {
    icon: Info,
    box: "bg-primary/10 border-primary/40",
    iconColor: "text-primary",
    label: "Nota",
  },
} as const;

type CalloutType = keyof typeof CALLOUT_STYLES;

function MarkdownCallout({ block }: { block: string }) {
  const lines = block
    .split("\n")
    .map((l) => l.replace(/^>\s?/, "").trim())
    .filter((l) => l !== "");

  let type: CalloutType = "note";
  const tagMatch = lines[0]?.match(/^\[!(warn|tip|note)\]\s*(.*)$/i);
  if (tagMatch) {
    type = tagMatch[1].toLowerCase() as CalloutType;
    lines[0] = tagMatch[2];
    if (lines[0] === "") lines.shift();
  }

  const style = CALLOUT_STYLES[type];
  const Icon = style.icon;
  const text = lines.join(" ");

  return (
    <div className={`flex gap-3 rounded-lg border px-4 py-3.5 my-3 ${style.box}`}>
      <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${style.iconColor}`} />
      <div className="text-foreground/90">
        <span className={`block font-bold text-sm mb-1 ${style.iconColor}`}>
          {style.label}
        </span>
        {renderInline(text)}
      </div>
    </div>
  );
}

/**
 * Renderizador de markdown leve e dedicado ao conteúdo de estudo.
 * Suporta títulos (#, ##, ###), listas ordenadas/aninhadas, tabelas,
 * callouts (> [!warn|tip|note]), linha horizontal (---), negrito e código inline.
 */
export default function MarkdownContent({ content }: MarkdownContentProps) {
  const blocks = splitBlocks(content);

  return (
    <div className="text-foreground/90 leading-7 md:leading-8 text-[15px] md:text-[17px] space-y-5">
      {blocks.map((block, idx) => {
        const trimmed = block.trim();
        if (trimmed === "") return null;

        if (trimmed.startsWith("```")) {
          const inner = trimmed.replace(/^```/, "").replace(/```$/, "");
          const nlIdx = inner.indexOf("\n");
          const language = nlIdx >= 0 ? inner.slice(0, nlIdx).trim() : "";
          const code = (nlIdx >= 0 ? inner.slice(nlIdx + 1) : inner).replace(/\s+$/, "");
          return <CodeBlock key={idx} language={language || undefined} code={code} />;
        }

        if (/^(-{3,}|\*{3,})$/.test(trimmed)) {
          return <hr key={idx} className="border-border/70 my-2" />;
        }

        if (trimmed.startsWith("$$") && trimmed.endsWith("$$") && trimmed.length > 4) {
          const tex = trimmed.slice(2, -2).trim();
          return (
            <div
              key={idx}
              className="overflow-x-auto py-2 text-center"
              dangerouslySetInnerHTML={{ __html: renderMath(tex, true) }}
            />
          );
        }

        if (trimmed.startsWith(">")) {
          return <MarkdownCallout key={idx} block={trimmed} />;
        }

        if (trimmed.startsWith("|")) {
          return <MarkdownTable key={idx} block={trimmed} />;
        }

        if (trimmed.startsWith("### ")) {
          return (
            <h4 key={idx} className="text-xl font-bold text-foreground pt-3 tracking-tight">
              {renderInline(trimmed.replace(/^###\s+/, ""))}
            </h4>
          );
        }

        if (trimmed.startsWith("## ")) {
          return (
            <h3 key={idx} className="text-2xl font-bold text-foreground pt-4 tracking-tight">
              {renderInline(trimmed.replace(/^##\s+/, ""))}
            </h3>
          );
        }

        if (trimmed.startsWith("# ")) {
          return (
            <h2 key={idx} className="text-3xl font-black text-foreground pt-4 tracking-tight">
              {renderInline(trimmed.replace(/^#\s+/, ""))}
            </h2>
          );
        }

        if (/^[*\-]\s/.test(trimmed) || /^\d+\.\s/.test(trimmed)) {
          return <MarkdownList key={idx} block={trimmed} />;
        }

        return (
          <p key={idx} className="whitespace-pre-line">
            {renderInline(trimmed)}
          </p>
        );
      })}
    </div>
  );
}
