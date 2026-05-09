import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Moon, Sun, Terminal } from "lucide-react";
import { NovaSidebar } from "@/components/nova/sidebar";
import { CrmKanbanBoard, type CrmColumn, type CrmTab } from "@/components/nova/kanban-crm";

const tabs: CrmTab[] = [
  { id: "open", label: "Abertos", count: 16, tone: "primary" },
  { id: "won", label: "Ganhos", count: 8, tone: "success" },
  { id: "lost", label: "Perdidos", count: 3, tone: "destructive" },
  { id: "all", label: "Todos", count: 18, tone: "muted", active: true },
];

type Theme = "dark" | "light" | "carbon";
const ORDER: Theme[] = ["dark", "light", "carbon"];

export const Route = createFileRoute("/kanban")({
  head: () => ({
    meta: [
      { title: "NOVA · Pipeline — Kanban" },
      {
        name: "description",
        content:
          "Kanban NOVA: pipeline visual com tokens, halos e malha HUD do design system.",
      },
    ],
  }),
  component: KanbanPage,
});

/* Mock simples só pra demonstrar o shell — substitua pelos seus dados reais. */
const columns: CrmColumn[] = [
  {
    id: "qual",
    title: "Qualificação",
    total: "R$ 15.209,00",
    count: 4,
    accent: "primary",
    cards: [],
  },
  {
    id: "contact",
    title: "Contato Feito",
    total: "R$ 3.200,00",
    count: 1,
    accent: "cyan",
    cards: [],
  },
  {
    id: "prop",
    title: "Proposta Enviada",
    total: "R$ 119,00",
    count: 1,
    accent: "primary",
    cards: [],
  },
  {
    id: "neg",
    title: "Negociação",
    total: "R$ 27.609,00",
    count: 3,
    accent: "amber",
    cards: [],
  },
  {
    id: "close",
    title: "Fechamento",
    total: "R$ 76.607,00",
    count: 4,
    accent: "success",
    cards: [],
  },
];

function KanbanPage() {
  const [theme, setTheme] = useState<Theme>("dark");
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark", "light", "carbon");
    root.classList.add(theme);
  }, [theme]);
  const cycle = () =>
    setTheme((t) => ORDER[(ORDER.indexOf(t) + 1) % ORDER.length]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background text-foreground">
      {/* === SHELL VISUAL idêntico ao Inbox === */}
      <div className="pointer-events-none absolute inset-0 hud-grid opacity-40" />
      <div className="pointer-events-none absolute -top-40 left-1/3 size-[600px] rounded-full bg-primary/10 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 size-[500px] rounded-full bg-cyan/8 blur-[160px]" />

      {/* Tema + voltar */}
      <div className="absolute right-4 top-3 z-30 flex items-center gap-2">
        <Link
          to="/"
          className="rounded-lg border border-hairline bg-surface/60 px-3 py-1.5 text-[11px] uppercase tracking-[0.16em] text-muted-foreground backdrop-blur-md transition hover:text-foreground"
        >
          ← NOVA OS
        </Link>
        <button
          onClick={cycle}
          title={`Tema: ${theme}`}
          className="grid size-8 place-items-center rounded-lg border border-hairline bg-surface/60 text-muted-foreground backdrop-blur-md transition hover:text-foreground hover:shadow-[var(--glow-primary)]"
        >
          {theme === "dark" ? (
            <Sun className="size-4" />
          ) : theme === "light" ? (
            <Terminal className="size-4" />
          ) : (
            <Moon className="size-4" />
          )}
        </button>
      </div>

      {/* === Layout: Sidebar + Board === */}
      <div className="relative flex min-h-screen">
        <NovaSidebar />
        <main className="flex-1 overflow-x-auto px-6 py-6">
          <CrmKanbanBoard columns={columns} tabs={tabs} />
        </main>
      </div>
    </div>
  );
}
