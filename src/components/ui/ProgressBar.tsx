"use client";

interface ProgressBarProps {
  value: number; // 0 a 100
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * Componente de barra de progresso simples com visual premium gradiente.
 */
export default function ProgressBar({
  value,
  size = "md",
  className = "",
}: ProgressBarProps) {
  // Garante que o valor está entre 0 e 100
  const normalizedValue = Math.min(100, Math.max(0, value));

  const sizeClasses = {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-4",
  };

  return (
    <div className={`w-full bg-muted rounded-full overflow-hidden border border-border/30 ${sizeClasses[size]} ${className}`}>
      <div
        className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500 ease-out"
        style={{ width: `${normalizedValue}%` }}
      />
    </div>
  );
}
