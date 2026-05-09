import * as React from "react";
import {
  AlertTriangle,
  ArrowLeftRight,
  Bot,
  CheckCircle2,
  ChevronDown,
  Clock,
  Flag,
  GitBranch,
  Globe,
  Image as ImageIcon,
  Mail,
  MessageSquare,
  MousePointer2,
  Plus,
  Search,
  Sparkles,
  StopCircle,
  X,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* =========================================================
   NOVA · Automation Builder (node-based canvas)
   - Sidebar com blocos categorizados (drag-source visual)
   - Canvas com nós absolutos e conectores SVG curvos
   - Mini-mapa, zoom controls, run bar
   ========================================================= */

type Tone = "primary" | "amber" | "cyan" | "success" | "destructive" | "muted";
type NodeKind = "trigger" | "action" | "logic" | "integration" | "ai" | "end";

interface FlowNode {
  id: string;
  kind: NodeKind;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  x: number;
  y: number;
  status?: "ok" | "warn" | "error";
  tone: Tone;
}

const nodes: FlowNode[] = [
  { id: "n1", kind: "trigger", icon: Zap, title: "Contato criado", subtitle: "Novo contato", x: 40, y: 200, tone: "primary", status: "ok" },
  { id: "n2", kind: "action", icon: Mail, title: "Enviar e-mail", subtitle: "Configurar e-mail", x: 320, y: 200, tone: "amber", status: "warn" },
  { id: "n3", kind: "action", icon: MessageSquare, title: "Mensagem WhatsApp", subtitle: "Mensagem", x: 600, y: 200, tone: "amber", status: "warn" },
  { id: "n4", kind: "logic", icon: GitBranch, title: "Condição", subtitle: "Cliente respondeu?", x: 880, y: 200, tone: "cyan", status: "ok" },
  { id: "n5", kind: "ai", icon: Bot, title: "Agente IA", subtitle: "Qualificar lead", x: 1160, y: 100, tone: "primary", status: "ok" },
  { id: "n6", kind: "end", icon: Flag, title: "Finalizar fluxo", subtitle: "Sem resposta em 48h", x: 1160, y: 300, tone: "destructive", status: "ok" },
];

const edges: { from: string; to: string }[] = [
  { from: "n1", to: "n2" },
  { from: "n2", to: "n3" },
  { from: "n3", to: "n4" },
  { from: "n4", to: "n5" },
  { from: "n4", to: "n6" },
];

const NODE_W = 220;
const NODE_H = 76;

const toneRing: Record<Tone, string> = {
  primary: "ring-primary/40 shadow-[var(--glow-primary)]",
  amber: "ring-amber/40 shadow-[var(--glow-amber)]",
  cyan: "ring-cyan/40 shadow-[var(--glow-cyan)]",
  success: "ring-success/40",
  destructive: "ring-destructive/40",
  muted: "ring-border",
};
const toneText: Record<Tone, string> = {
  primary: "text-primary", amber: "text-amber", cyan: "text-cyan",
  success: "text-success", destructive: "text-destructive", muted: "text-muted-foreground",
};
const toneBg: Record<Tone, string> = {
  primary: "border-primary/35 bg-primary/12 text-primary",
  amber: "border-amber/35 bg-amber/12 text-amber",
  cyan: "border-cyan/35 bg-cyan/12 text-cyan",
  success: "border-success/35 bg-success/12 text-success",
  destructive: "border-destructive/40 bg-destructive/12 text-destructive",
  muted: "border-border bg-foreground/5 text-muted-foreground",
};

/* ----------------- Sidebar de blocos ----------------- */

interface BlockGroup { label: string; items: { icon: React.ElementType; label: string; tone: Tone; kind: NodeKind }[] }
const groups: BlockGroup[] = [
  {
    label: "Fluxo",
    items: [
      { icon: ArrowLeftRight, label: "Transferir automação", tone: "cyan", kind: "action" },
      { icon: CheckCircle2, label: "Encerrar conversa", tone: "success", kind: "end" },
      { icon: StopCircle, label: "Finalizar fluxo", tone: "destructive", kind: "end" },
    ],
  },
  {
    label: "Lógica",
    items: [
      { icon: Clock, label: "Atraso", tone: "muted", kind: "logic" },
      { icon: GitBranch, label: "Condição", tone: "cyan", kind: "logic" },
    ],
  },
  {
    label: "WhatsApp",
    items: [
      { icon: MessageSquare, label: "Mensagem WhatsApp", tone: "success", kind: "action" },
      { icon: Mail, label: "Template WhatsApp", tone: "primary", kind: "action" },
      { icon: ImageIcon, label: "Mídia WhatsApp", tone: "amber", kind: "action" },
      { icon: MousePointer2, label: "Botões WhatsApp", tone: "primary", kind: "action" },
    ],
  },
  {
    label: "Integrações",
    items: [{ icon: Globe, label: "Webhook", tone: "muted", kind: "integration" }],
  },
  {
    label: "IA",
    items: [
      { icon: Bot, label: "Transferir para agente", tone: "primary", kind: "ai" },
      { icon: Sparkles, label: "Qualificar lead (IA)", tone: "cyan", kind: "ai" },
    ],
  },
];

function BlocksSidebar() {
  return (
    <aside className="glass-strong relative flex h-full w-[280px] shrink-0 flex-col rounded-2xl">
      <div className="border-b border-hairline p-3">
        <div className="relative flex items-center">
          <Search className="absolute left-2.5 size-3.5 text-muted-foreground" />
          <input
            placeholder="Buscar blocos…"
            className="w-full rounded-lg border border-hairline bg-foreground/5 py-1.5 pl-8 pr-2 text-[12px] text-foreground placeholder:text-muted-foreground outline-none transition focus:border-primary/40 focus:shadow-[var(--glow-primary)]"
          />
        </div>
      </div>
      <div className="flex-1 space-y-5 overflow-y-auto p-3">
        {groups.map((g) => (
          <div key={g.label} className="space-y-1.5">
            <p className="px-1 font-display text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground/60">
              {g.label}
            </p>
            <div className="space-y-1">
              {g.items.map((it) => (
                <button
                  key={it.label}
                  className="group flex w-full items-center gap-2.5 rounded-xl border border-hairline bg-foreground/[0.03] px-2.5 py-2 text-left transition hover:border-primary/35 hover:bg-foreground/5 hover:shadow-[var(--elev-1)]"
                >
                  <span className={cn("grid size-7 place-items-center rounded-lg border border-hairline bg-background/60", toneText[it.tone])}>
                    <it.icon className="size-3.5" />
                  </span>
                  <span className="flex-1 truncate text-[12px] text-foreground/90">{it.label}</span>
                  <Plus className="size-3 text-muted-foreground/50 transition group-hover:text-primary" />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}

/* ----------------- Nó ----------------- */

function FlowNodeCard({ node, index }: { node: FlowNode; index: number }) {
  const isTrigger = node.kind === "trigger";
  return (
    <div
      className={cn(
        "absolute select-none anim-in",
        "transition-transform hover:-translate-y-0.5",
      )}
      style={{ left: node.x, top: node.y, width: NODE_W, animationDelay: `${index * 60}ms` }}
    >
      {/* Step badge */}
      {!isTrigger && (
        <div className="absolute -top-3 left-3 z-10 grid size-6 place-items-center rounded-full bg-gradient-to-br from-primary to-cyan/80 text-[10px] font-semibold text-primary-foreground shadow-[var(--glow-primary)] ring-2 ring-background">
          {index}
        </div>
      )}

      {/* Status dot */}
      {node.status === "warn" && (
        <div className="absolute -top-2 -right-2 z-10 grid size-6 place-items-center rounded-full bg-amber text-background shadow-[var(--glow-amber)] ring-2 ring-background">
          <AlertTriangle className="size-3" />
        </div>
      )}

      {isTrigger ? (
        <article className={cn(
          "relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/30 via-cyan/20 to-primary/10 p-3.5 ring-1 ring-inset",
          toneRing[node.tone],
        )}>
          <span className="absolute inset-x-3 top-0 h-px bg-[linear-gradient(90deg,transparent,color-mix(in_oklab,var(--primary)_70%,transparent)_50%,transparent)]" />
          <div className="flex items-center gap-2">
            <span className={cn("inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.16em]", toneBg.primary)}>
              <Zap className="size-2.5" /> Gatilho
            </span>
          </div>
          <h4 className="mt-2 font-display text-[13px] font-semibold text-foreground">{node.title}</h4>
          <p className="mt-0.5 font-mono text-[10px] text-muted-foreground">{node.subtitle}</p>
        </article>
      ) : (
        <article className={cn(
          "lux-card relative p-3 ring-1 ring-inset",
          node.status === "warn" ? "ring-amber/40" : "ring-hairline",
        )}>
          <header className="flex items-center gap-2">
            <span className={cn("grid size-8 place-items-center rounded-lg border border-hairline bg-foreground/5", toneText[node.tone])}>
              <node.icon className="size-4" />
            </span>
            <div className="min-w-0 flex-1">
              <h4 className="truncate font-display text-[12px] font-semibold text-foreground">{node.title}</h4>
              <p className="truncate font-mono text-[10px] text-muted-foreground">{node.subtitle}</p>
            </div>
          </header>
        </article>
      )}

      {/* Handles */}
      {!isTrigger && (
        <span className="absolute -left-1.5 top-1/2 size-3 -translate-y-1/2 rounded-full border-2 border-background bg-cyan shadow-[0_0_8px_var(--cyan)]" />
      )}
      <span className="absolute -right-1.5 top-1/2 size-3 -translate-y-1/2 rounded-full border-2 border-background bg-primary shadow-[0_0_8px_var(--primary)]" />
    </div>
  );
}

/* ----------------- Conectores SVG ----------------- */

function Edges() {
  const map = new Map(nodes.map((n) => [n.id, n]));
  return (
    <svg className="pointer-events-none absolute inset-0 size-full" style={{ zIndex: 0 }}>
      <defs>
        <linearGradient id="edge-grad" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--cyan)" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      {edges.map((e, i) => {
        const a = map.get(e.from)!;
        const b = map.get(e.to)!;
        const x1 = a.x + NODE_W;
        const y1 = a.y + NODE_H / 2;
        const x2 = b.x;
        const y2 = b.y + NODE_H / 2;
        const dx = (x2 - x1) * 0.5;
        const d = `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
        const mx = (x1 + x2) / 2;
        const my = (y1 + y2) / 2;
        return (
          <g key={i}>
            <path d={d} fill="none" stroke="url(#edge-grad)" strokeWidth={2} strokeLinecap="round" />
            <path d={d} fill="none" stroke="url(#edge-grad)" strokeWidth={6} strokeLinecap="round" opacity={0.15} />
            {/* delete marker */}
            <foreignObject x={mx - 9} y={my - 9} width={18} height={18}>
              <button className="grid size-[18px] place-items-center rounded-full border border-hairline bg-background/80 text-muted-foreground backdrop-blur-md transition hover:text-destructive hover:border-destructive/40">
                <X className="size-2.5" />
              </button>
            </foreignObject>
          </g>
        );
      })}
    </svg>
  );
}

/* ----------------- Canvas ----------------- */

function Canvas() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl glass-strong">
      {/* dotted grid background */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, color-mix(in oklab, var(--foreground) 10%, transparent) 1px, transparent 0)",
          backgroundSize: "22px 22px",
        }}
      />
      {/* halos */}
      <div className="pointer-events-none absolute -top-32 left-1/4 size-[420px] rounded-full bg-primary/8 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 size-[380px] rounded-full bg-cyan/8 blur-[120px]" />

      <div className="relative h-full w-full overflow-auto">
        <div className="relative" style={{ width: 1500, height: 540 }}>
          <Edges />
          {nodes.map((n, i) => (
            <FlowNodeCard key={n.id} node={n} index={i} />
          ))}
          {/* Add next step */}
          <button
            className="absolute flex items-center gap-1.5 rounded-xl border border-dashed border-border bg-foreground/[0.02] px-3 py-2 text-[11px] text-muted-foreground transition hover:border-primary/40 hover:text-primary"
            style={{ left: 1400, top: 215 }}
          >
            <Plus className="size-3.5" /> Próximo passo
          </button>
        </div>
      </div>

      {/* Zoom controls */}
      <div className="absolute bottom-4 left-4 z-20 flex flex-col gap-1 rounded-xl border border-hairline bg-background/70 p-1 backdrop-blur-md">
        <button className="grid size-7 place-items-center rounded-md text-muted-foreground transition hover:bg-foreground/8 hover:text-foreground"><Plus className="size-3.5" /></button>
        <span className="text-center font-mono text-[10px] text-muted-foreground">100%</span>
        <button className="grid size-7 place-items-center rounded-md text-muted-foreground transition hover:bg-foreground/8 hover:text-foreground"><X className="size-3.5 rotate-45" /></button>
      </div>

      {/* Mini-map */}
      <div className="absolute bottom-4 right-4 z-20 size-[140px] rounded-xl border border-hairline bg-background/70 p-2 backdrop-blur-md">
        <div className="relative size-full overflow-hidden rounded-md bg-foreground/[0.04]">
          {nodes.map((n) => (
            <span
              key={n.id}
              className={cn("absolute h-1.5 rounded-sm", toneText[n.tone].replace("text-", "bg-"))}
              style={{
                left: `${(n.x / 1500) * 100}%`,
                top: `${(n.y / 540) * 100}%`,
                width: `${(NODE_W / 1500) * 100}%`,
              }}
            />
          ))}
          <div className="absolute inset-2 rounded-sm border border-primary/40 bg-primary/5" />
        </div>
      </div>
    </div>
  );
}

/* ----------------- Top bar ----------------- */

function TopBar() {
  return (
    <header className="glass-strong flex flex-wrap items-center gap-3 rounded-2xl px-4 py-2.5">
      <div className="flex items-center gap-2">
        <span className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-primary to-cyan/80 text-primary-foreground shadow-[var(--glow-primary)]">
          <Sparkles className="size-4" />
        </span>
        <div>
          <h1 className="font-display text-[13px] font-semibold text-foreground">Boas-vindas EduIT</h1>
          <p className="font-mono text-[10px] text-muted-foreground">v3 · rascunho · 2 avisos</p>
        </div>
      </div>
      <span className={cn("inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-[10px] font-medium uppercase tracking-[0.14em]", toneBg.amber)}>
        <AlertTriangle className="size-3" /> Configuração pendente
      </span>
      <div className="ml-auto flex items-center gap-2">
        <button className="inline-flex items-center gap-1.5 rounded-lg border border-hairline bg-foreground/5 px-3 py-1.5 text-[12px] text-muted-foreground transition hover:text-foreground">
          <Bot className="size-3.5" /> Testar com IA
        </button>
        <button className="inline-flex items-center gap-1.5 rounded-lg border border-hairline bg-foreground/5 px-3 py-1.5 text-[12px] text-muted-foreground transition hover:text-foreground">
          Salvar rascunho
        </button>
        <button className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-br from-success to-cyan/80 px-3.5 py-1.5 text-[12px] font-semibold text-primary-foreground shadow-[var(--glow-cyan)] transition hover:brightness-110">
          <Zap className="size-3.5" /> Publicar
        </button>
      </div>
    </header>
  );
}

/* ----------------- Inspector (direita) ----------------- */

function Inspector() {
  return (
    <aside className="glass-strong flex h-full w-[300px] shrink-0 flex-col rounded-2xl">
      <div className="border-b border-hairline px-4 py-3">
        <p className="font-display text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground/60">Selecionado</p>
        <h3 className="mt-1 font-display text-[14px] font-semibold text-foreground">Enviar e-mail</h3>
        <p className="font-mono text-[10px] text-amber">⚠ campos obrigatórios</p>
      </div>
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        <Field label="Para" value="{{contato.email}}" mono />
        <Field label="Assunto" value="Bem-vindo(a) ao EduIT" />
        <Field label="Template" value="welcome_v3" mono />
        <div className="rounded-xl border border-amber/30 bg-amber/5 p-3">
          <p className="text-[11px] font-medium text-amber">Falta configurar</p>
          <p className="mt-1 text-[11px] text-foreground/80">Remetente padrão não definido. Selecione um.</p>
          <button className="mt-2 w-full rounded-md bg-amber/15 px-2 py-1 text-[11px] font-medium text-amber transition hover:bg-amber/25">
            Configurar agora
          </button>
        </div>
        <div className="hairline" />
        <div className="space-y-2">
          <p className="font-display text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground/60">Em caso de erro</p>
          <button className="flex w-full items-center justify-between rounded-lg border border-hairline bg-foreground/5 px-3 py-1.5 text-[12px] text-foreground/85 transition hover:border-primary/40">
            <span>Continuar fluxo</span>
            <ChevronDown className="size-3.5 text-muted-foreground" />
          </button>
        </div>
      </div>
    </aside>
  );
}

function Field({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="space-y-1">
      <label className="font-display text-[10px] font-semibold uppercase tracking-[0.16em] text-foreground/60">{label}</label>
      <input
        defaultValue={value}
        className={cn(
          "w-full rounded-lg border border-hairline bg-foreground/5 px-3 py-1.5 text-[12px] text-foreground outline-none transition focus:border-primary/40 focus:shadow-[var(--glow-primary)]",
          mono && "font-mono",
        )}
      />
    </div>
  );
}

/* ----------------- Root ----------------- */

export function NovaAutomationBuilder() {
  return (
    <div className="grid h-full min-h-0 grid-rows-[auto_minmax(0,1fr)] gap-3 p-3">
      <TopBar />
      <div className="flex min-h-0 gap-3">
        <BlocksSidebar />
        <div className="flex-1 min-h-0">
          <Canvas />
        </div>
        <Inspector />
      </div>
    </div>
  );
}
