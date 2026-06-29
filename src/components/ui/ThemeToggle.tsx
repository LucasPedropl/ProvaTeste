"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

const STORAGE_KEY = "provateste_theme";

/**
 * Botão de alternância entre tema claro e escuro.
 * Persiste a escolha no localStorage e aplica a classe `dark` no <html>.
 */
export default function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    const stored = (localStorage.getItem(STORAGE_KEY) as Theme | null) ?? (isDark ? "dark" : "light");
    setTheme(stored);
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch (e) {
      console.warn("Não foi possível salvar a preferência de tema:", e);
    }
  };

  const isLight = theme === "light";
  const Icon = isLight ? Moon : Sun;
  const label = isLight ? "Tema Escuro" : "Tema Claro";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Alternar para ${label}`}
      title={`Alternar para ${label}`}
      className="flex items-center gap-2 px-3 py-2 bg-secondary/60 hover:bg-secondary border border-border rounded-lg text-xs font-semibold text-foreground transition-all duration-200 cursor-pointer shrink-0"
    >
      {/* Evita mismatch de hidratação mostrando ícone neutro até montar */}
      <Icon className="w-4 h-4 text-primary" />
      {!compact && <span suppressHydrationWarning>{mounted ? label : "Tema"}</span>}
    </button>
  );
}
