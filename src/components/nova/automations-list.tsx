import * as React from "react";
import { Link } from "@tanstack/react-router";
import { AlertTriangle, CheckCircle2, MoreHorizontal, Plus, Search, Sparkles, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

type Tone = "primary" | "amber" | "cyan" | "success" | "destructive" | "muted";
type Status = "active" | "draft" | "paused" | "error";

interface Automation {
  id: string;
  name: string;
  trigger: string;
  steps: number;
  runs: string;
  conv: string;
  status: Status;
  updated: string;
}

const items: Automation[] = [
  { id: "a1", name: "Boas-vindas EduIT", trigger: "Contato criado", steps: 4, runs: "1.284", conv: "62%", status: "active", updated: "há 2h" },
  { id: "a2", name: "Recuperação de carrinho", trigger: "Pedido abandonado 30min", steps: 6, runs: "812", conv: "21%", status: "active", updated: "ontem" },
  { id: "a3", name: "NPS pós-aula", trigger: "Aula concluída", steps: 3, runs: "342", conv: "48%", status: "draft", updated: "há 5min" },
  { id: "a4", name: "Reativação 30 dias", trigger: "Inatividade > 30d", steps: 5, runs: "0", conv: "—", status: "error", updated: "há 1d" },
  { id: "a5", name: "Onboarding aluno", trigger: "Matrícula confirmada", steps: 8, runs: "2.741", conv: "74%", status: "active", updated: "há 3d" },
  { id: "a6", name: "Cobrança 7 dias", trigger: "Fatura vencida", steps: 4, runs: "98", conv: "55%", status: "paused", updated: "há 1sem" },
];

const statusMap: Record<Status, { label: string; tone: Tone; icon: React.ElementType }> = {
  active: { label: "Ativa", tone: "success", icon: CheckCircle2 },
  draft: { label: "Rascunho", tone: "cyan", icon: Sparkles },
  paused: { label: "Pausada", tone: "muted", icon: AlertTriangle },
  error: { label: "Com erro", tone: "destructive", icon: AlertTriangle },
};

const toneBg: Record<Tone, string> = {
  primary: "border-primary/35 bg-primary/12 text-primary",
  amber: "border-amber/35 bg-amber/12 text-amber",
  cyan: "border-cyan/35 bg-cyan/12 text-cyan",
  success: "border-success/35 bg-success/12 text-success",
  destructive: "border-destructive/40 bg-destructive/12 text-destructive",
  muted: "border-border bg-foreground/5 text-muted-foreground",
};

export function NovaAutomationsList() {
  return (
    <div className="space-y-5 p-6">
      {/* Header */}
      <header className="glass-strong relative overflow-hidden rounded-2xl px-5 py-4">
        <span className="absolute inset-x-4 top-0 h-px bg-[linear-gradient(90deg,transparent,color-mix(in_oklab,var(--primary)_70%,transparent)_50%,transparent)]" />
        <div className="flex flex-wrap items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-primary to-cyan/80 text-primary-foreground shadow-[var(--glow-primary)]">
            <Zap className="size-5" />
          </span>
          <div>
            <h1 className="font-display text-[18px] font-semibold text-foreground">Automações</h1>
            <p className="font-mono text-[11px] text-muted-foreground">6 automações · 4 ativas · 5.277 execuções nos últimos 30d</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="relative flex items-center">
              <Search className="absolute left-3 size-3.5 text-muted-foreground" />
              <input
                placeholder="Buscar automação…"
                className="w-[260px] rounded-xl border border-hairline bg-foreground/5 py-1.5 pl-9 pr-3 text-[12px] text-foreground placeholder:text-muted-foreground outline-none transition focus:border-primary/40 focus:shadow-[var(--glow-primary)]"
              />
            </div>
            <Link
              to="/automations/new"
              className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-br from-primary to-cyan/80 px-3.5 py-2 text-[12px] font-semibold text-primary-foreground shadow-[var(--glow-primary)] transition hover:brightness-110"
            >
              <Plus className="size-3.5" /> Nova automação
            </Link>
          </div>
        </div>
      </header>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {items.map((it, i) => {
          const s = statusMap[it.status];
          return (
            <Link
              key={it.id}
              to="/automations/new"
              className="lux-card group block p-4 anim-in"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <header className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-display text-[14px] font-semibold text-foreground">{it.name}</h3>
                  <p className="mt-0.5 truncate font-mono text-[11px] text-muted-foreground">
                    quando: {it.trigger}
                  </p>
                </div>
                <span className={cn("inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em]", toneBg[s.tone])}>
                  <s.icon className="size-2.5" /> {s.label}
                </span>
              </header>

              <div className="mt-4 grid grid-cols-3 gap-2">
                <Stat label="Passos" value={String(it.steps)} />
                <Stat label="Execuções" value={it.runs} />
                <Stat label="Conversão" value={it.conv} accent />
              </div>

              <footer className="mt-4 flex items-center justify-between rounded-lg border border-hairline bg-background/40 px-2.5 py-1.5">
                <span className="font-mono text-[10px] text-muted-foreground">atualizado {it.updated}</span>
                <button className="grid size-5 place-items-center rounded-md text-muted-foreground transition hover:bg-foreground/8 hover:text-foreground" onClick={(e) => e.preventDefault()}>
                  <MoreHorizontal className="size-3.5" />
                </button>
              </footer>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="rounded-lg border border-hairline bg-foreground/[0.03] px-2.5 py-1.5">
      <p className="font-display text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground/60">{label}</p>
      <p className={cn("num mt-0.5 font-mono text-[13px] font-semibold", accent ? "text-aurora" : "text-foreground")}>{value}</p>
    </div>
  );
}
