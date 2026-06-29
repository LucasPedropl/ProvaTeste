"use client";

import React from "react";
import { QuizQuestion } from "../schemas/studyTypes";
import MarkdownContent from "./MarkdownContent";
import MermaidDiagram from "./MermaidDiagram";
import CodeBlock from "../../../components/ui/CodeBlock";

/**
 * Enunciado reutilizável de uma questão de quiz: texto em markdown (tabelas,
 * listas, código inline e matemática), além de um grafo Mermaid e um bloco de
 * código opcionais. Usado por todos os tipos de questão.
 */
export default function QuizQuestionStem({ question }: { question: QuizQuestion }) {
  return (
    <>
      <div className="mb-5">
        <MarkdownContent content={question.questionText} />
      </div>

      {question.diagramMermaid && (
        <MermaidDiagram
          chart={question.diagramMermaid}
          caption={question.diagramCaption ?? "Grafo da questão"}
        />
      )}

      {question.codeContext && (
        <CodeBlock
          code={question.codeContext}
          language={question.codeLanguage ?? "java"}
          title="Código da questão"
        />
      )}
    </>
  );
}
