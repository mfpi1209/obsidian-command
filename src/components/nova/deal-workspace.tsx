import * as React from "react";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  Clock,
  Flame,
  MessageSquare,
  Mic,
  Paperclip,
  Phone,
  Plus,
  Send,
  Smile,
  Sparkles,
  StickyNote,
  Tag,
  User,
  Video,
  Zap,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

/* =========================================================
   NOVA · Deal Workspace (redesign)
   - Header: contexto do contato + status do deal
   - Coluna esquerda: pipeline vertical com estágio atual
   - Centro: timeline integrada ao chat (eventos + mensagens)
   - Coluna direita: contato + produtos + campos colapsáveis
   - Ações rápidas flutuantes
   ========================================================= */

type Tone = "primary" | "amber" | "cyan" | "success" | "destructive" | "muted";

const stages: { id: string; label: string; tone: Tone }[] = [
  { id: "qual", label: "Qualificação", tone: "primary" },
  { id: "contact", label: "Contato Feito", tone: "cyan" },
  { id: "prop", label: "Proposta Enviada", tone: "primary" },
  { id: "neg", label: "Negociação", tone: "amber" },
  { id: "close", label: "Fechamento", tone: "success" },
];

const accentDot: Record<Tone, string> = {
  primary: "bg-primary shadow-[0_0_10px_var(--primary)]",
  amber: "bg-amber shadow-[0_0_10px_var(--amber)]",
  cyan: "bg-cyan shadow-[0_0_10px_var(--cyan)]",
  success: "bg-success shadow-[0_0_10px_var(--success)]",
  destructive: "bg-destructive shadow-[0_0_10px_var(--destructive)]",
  muted: "bg-muted-foreground",
};

const toneText: Record<Tone, string> = {
  primary: "text-primary",
  amber: "text-amber",
  cyan: "text-cyan",
  success: "text-success",
  destructive: "text-destructive",
  muted: "text-muted-foreground",
};

const toneBg: Record<Tone, string> = {
  primary: "border-primary/35 bg-primary/12 text-primary",
  amber: "border-amber/35 bg-amber/12 text-amber",
  cyan: "border-cyan/35 bg-cyan/12 text-cyan",
  success: "border-success/35 bg-success/12 text-success",
  destructive: "border-destructive/40 bg-destructive/12 text-destructive",
  muted: "border-border bg-foreground/5 text-muted-foreground",
};

/* ---------------- Header ---------------- */

function DealHeader() {
  return (
    <header className="glass-strong relative overflow-hidden rounded-2xl px-5 py-4">
      <span className="absolute inset-x-4 top-0 h-px bg-[linear-gradient(90deg,transparent,color-mix(in_oklab,var(--amber)_70%,transparent)_50%,transparent)]" />
      <div className="flex flex-wrap items-center gap-4">
        <Link
          to="/kanban"
          className="grid size-9 place-items-center rounded-lg border border-hairline bg-foreground/5 text-muted-foreground transition hover:text-foreground hover:shadow-[var(--glow-primary)]"
          aria-label="Voltar ao Kanban"
        >
          <ArrowLeft className="size-4" />
        </Link>

        {/* Avatar + identidade */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="grid size-12 place-items-center rounded-full bg-gradient-to-br from-amber/55 to-destructive/35 font-display text-[14px] font-semibold ring-2 ring-background">
              MD
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full bg-success ring-2 ring-background shadow-[0_0_8px_var(--success)]" />
          </div>
          <div className="min-w-0">
            <h1 className="font-display text-[16px] font-semibold leading-tight text-foreground">
              Marcilio Dias
            </h1>
            <div className="mt-0.5 flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
              <span>+55 11 98439-325</span>
              <span className="size-1 rounded-full bg-muted-foreground/40" />
              <span className="text-success">Online</span>
            </div>
          </div>
        </div>

        <div className="hidden h-8 w-px bg-hairline md:block" />

        {/* Status do Deal */}
        <div className="flex flex-wrap items-center gap-2">
          <span className={cn("inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-[10px] font-medium uppercase tracking-[0.16em]", toneBg.amber)}>
            <span className={cn("size-1.5 rounded-full", accentDot.amber)} />
            Negociação
          </span>
          <span className="num inline-flex items-center gap-1.5 rounded-md border border-hairline bg-foreground/5 px-2 py-1 font-mono text-[11px] text-muted-foreground">
            <Tag className="size-3" /> #DL-7421
          </span>
          <span className="font-display text-[18px] font-semibold text-aurora num">
            R$ 119,00
          </span>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button className="inline-flex items-center gap-1.5 rounded-lg border border-hairline bg-foreground/5 px-3 py-1.5 text-[12px] text-muted-foreground transition hover:text-foreground">
            <Phone className="size-3.5" /> Ligar
          </button>
          <button className="inline-flex items-center gap-1.5 rounded-lg border border-hairline bg-foreground/5 px-3 py-1.5 text-[12px] text-muted-foreground transition hover:text-foreground">
            <Video className="size-3.5" /> Vídeo
          </button>
          <button className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-br from-success to-cyan/80 px-3 py-1.5 text-[12px] font-semibold text-primary-foreground shadow-[var(--glow-cyan)] transition hover:brightness-110">
            <CheckCircle2 className="size-3.5" /> Marcar Ganho
          </button>
        </div>
      </div>
    </header>
  );
}

/* ---------------- Pipeline lateral ---------------- */

function PipelineRail({ activeId = "neg" }: { activeId?: string }) {
  const activeIndex = stages.findIndex((s) => s.id === activeId);
  return (
    <aside className="glass-strong relative flex h-full flex-col gap-1 rounded-2xl p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-display text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/90">
          Pipeline
        </h3>
        <span className="num font-mono text-[10px] text-muted-foreground">
          {activeIndex + 1}/{stages.length}
        </span>
      </div>

      <ol className="relative flex flex-col gap-1">
        <span className="absolute left-[11px] top-2 bottom-2 w-px bg-hairline" />
        {stages.map((s, i) => {
          const done = i < activeIndex;
          const active = i === activeIndex;
          return (
            <li key={s.id} className="relative">
              <button
                className={cn(
                  "group flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition",
                  active && "bg-foreground/5 shadow-[var(--elev-1)]",
                  !active && "hover:bg-foreground/[0.03]",
                )}
              >
                <span
                  className={cn(
                    "relative z-10 grid size-[22px] shrink-0 place-items-center rounded-full border",
                    active && "border-amber/50 bg-amber/15",
                    done && "border-success/50 bg-success/15",
                    !active && !done && "border-hairline bg-background",
                  )}
                >
                  {done ? (
                    <CheckCircle2 className="size-3 text-success" />
                  ) : (
                    <span className={cn("size-1.5 rounded-full", active ? accentDot.amber : "bg-muted-foreground/40")} />
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <p className={cn(
                    "truncate text-[12px] font-medium",
                    active ? "text-foreground" : done ? "text-muted-foreground" : "text-muted-foreground/70",
                  )}>
                    {s.label}
                  </p>
                  {active && (
                    <p className="font-mono text-[10px] text-amber">há 3 dias</p>
                  )}
                </div>
                {active && <ChevronRight className="size-3.5 text-amber" />}
              </button>
            </li>
          );
        })}
      </ol>

      <div className="hairline my-4" />

      <div className="space-y-2">
        <p className="font-display text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground/60">
          Próxima ação
        </p>
        <div className="lux-card p-3">
          <div className="flex items-center gap-2">
            <Sparkles className="size-3.5 text-cyan" />
            <p className="text-[11px] text-foreground/85">Enviar contrato</p>
          </div>
          <p className="mt-1 font-mono text-[10px] text-muted-foreground">
            sugerido pela IA · 2min
          </p>
          <button className="mt-2 inline-flex w-full items-center justify-center gap-1 rounded-md bg-gradient-to-br from-primary to-cyan/80 px-2 py-1 text-[11px] font-semibold text-primary-foreground shadow-[var(--glow-primary)] transition hover:brightness-110">
            <Zap className="size-3" /> Executar
          </button>
        </div>
      </div>
    </aside>
  );
}

/* ---------------- Timeline + Chat unificados ---------------- */

type TLItem =
  | { kind: "stage"; tone: Tone; label: string; time: string }
  | { kind: "msg"; from: "me" | "them"; author?: string; text: string; time: string }
  | { kind: "note"; author: string; text: string; time: string }
  | { kind: "event"; icon: React.ElementType; tone: Tone; text: string; time: string };

const items: TLItem[] = [
  { kind: "stage", tone: "primary", label: "Deal criado em Qualificação", time: "01/04 · 10:12" },
  { kind: "msg", from: "them", text: "Bom dia! Como funciona o EduIT? Qual o valor?", time: "11:16" },
  { kind: "msg", from: "me", author: "Admin EduIT", text: "Oi Marcilio, tudo bem? Que bom que você se interessou por EduIT. Posso te ligar pra explicar com calma?", time: "12:16" },
  { kind: "event", icon: Phone, tone: "cyan", text: "Ligação · 4min · resumo IA: cliente interessado em plano anual", time: "13:02" },
  { kind: "stage", tone: "amber", label: "Movido para Negociação", time: "03/04 · 09:45" },
  { kind: "note", author: "Você", text: "Cliente pediu desconto de 15% — autorizar até 10%.", time: "10:00" },
  { kind: "msg", from: "me", author: "Admin EduIT", text: "🎙 Áudio (0:02)", time: "16:27" },
];

function TimelineChat() {
  return (
    <section className="glass-strong relative flex h-full min-h-0 flex-col rounded-2xl">
      {/* abas */}
      <div className="flex items-center gap-1 border-b border-hairline px-4 py-2.5">
        {[
          { label: "Timeline", active: true, icon: Sparkles },
          { label: "Conversa", icon: MessageSquare },
          { label: "Atividades", icon: Zap },
          { label: "Notas", icon: StickyNote },
        ].map((t) => (
          <button
            key={t.label}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] transition",
              t.active
                ? "bg-foreground/8 text-foreground shadow-[var(--elev-1)]"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <t.icon className="size-3" /> {t.label}
          </button>
        ))}
        <div className="ml-auto inline-flex items-center gap-1.5 rounded-md border border-hairline bg-foreground/5 px-2 py-1 font-mono text-[10px] text-muted-foreground">
          <Clock className="size-3" /> Sessão expira em 22h
        </div>
      </div>

      {/* feed */}
      <div className="flex-1 space-y-3 overflow-y-auto px-5 py-5">
        {items.map((it, i) => {
          if (it.kind === "stage") {
            return (
              <div key={i} className="flex items-center gap-3">
                <div className="flex-1 hairline" />
                <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-[0.14em]", toneBg[it.tone])}>
                  <span className={cn("size-1.5 rounded-full", accentDot[it.tone])} />
                  {it.label}
                </span>
                <span className="font-mono text-[10px] text-muted-foreground">{it.time}</span>
                <div className="flex-1 hairline" />
              </div>
            );
          }
          if (it.kind === "event") {
            return (
              <div key={i} className="lux-card flex items-center gap-3 p-3">
                <span className={cn("grid size-8 place-items-center rounded-lg border border-hairline bg-foreground/5", toneText[it.tone])}>
                  <it.icon className="size-4" />
                </span>
                <p className="flex-1 text-[12px] text-foreground/85">{it.text}</p>
                <span className="font-mono text-[10px] text-muted-foreground">{it.time}</span>
              </div>
            );
          }
          if (it.kind === "note") {
            return (
              <div key={i} className="rounded-2xl border border-amber/30 bg-amber/5 p-3 anim-in">
                <div className="mb-1 flex items-center gap-2">
                  <StickyNote className="size-3.5 text-amber" />
                  <span className="text-[11px] font-medium text-amber">{it.author}</span>
                  <span className="ml-auto font-mono text-[10px] text-muted-foreground">{it.time}</span>
                </div>
                <p className="text-[12px] text-foreground/90">{it.text}</p>
              </div>
            );
          }
          // msg
          const mine = it.from === "me";
          return (
            <div key={i} className={cn("flex items-end gap-2", mine && "justify-end")}>
              {!mine && (
                <div className="grid size-7 place-items-center rounded-full bg-gradient-to-br from-amber/55 to-destructive/35 text-[10px] font-semibold ring-2 ring-background">
                  MD
                </div>
              )}
              <div
                className={cn(
                  "max-w-[70%] rounded-2xl border px-3.5 py-2 text-[13px]",
                  mine
                    ? "border-cyan/30 bg-cyan/10 text-foreground shadow-[var(--glow-cyan)]"
                    : "border-hairline bg-foreground/5 text-foreground/90",
                )}
              >
                {it.author && (
                  <p className="mb-0.5 text-[10px] font-medium text-cyan">{it.author}</p>
                )}
                <p>{it.text}</p>
                <p className="mt-1 text-right font-mono text-[10px] text-muted-foreground">{it.time}</p>
              </div>
              {mine && (
                <div className="grid size-7 place-items-center rounded-full bg-gradient-to-br from-success/55 to-cyan/35 text-[10px] font-semibold ring-2 ring-background">
                  AE
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* composer expirado */}
      <div className="border-t border-hairline p-3">
        <div className="flex items-center gap-3 rounded-xl border border-amber/35 bg-amber/8 px-3 py-2.5">
          <Flame className="size-4 text-amber" />
          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-medium text-amber">Sessão de 24h encerrada</p>
            <p className="font-mono text-[10px] text-muted-foreground">Só templates aprovados pelo WhatsApp</p>
          </div>
          <button className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-br from-amber to-destructive/70 px-3 py-1.5 text-[11px] font-semibold text-primary-foreground shadow-[var(--glow-amber)] transition hover:brightness-110">
            Usar Template
          </button>
        </div>
        <div className="mt-2 flex items-center gap-2 rounded-xl border border-hairline bg-background/40 px-2 py-1.5">
          <button className="grid size-7 place-items-center rounded-md text-muted-foreground transition hover:text-foreground"><Plus className="size-4" /></button>
          <button className="grid size-7 place-items-center rounded-md text-muted-foreground transition hover:text-foreground"><Smile className="size-4" /></button>
          <button className="grid size-7 place-items-center rounded-md text-muted-foreground transition hover:text-foreground"><Paperclip className="size-4" /></button>
          <input
            disabled
            placeholder="Sessão expirada. Envie um template…"
            className="flex-1 bg-transparent px-2 text-[12px] text-muted-foreground placeholder:text-muted-foreground outline-none"
          />
          <button className="grid size-7 place-items-center rounded-md text-muted-foreground transition hover:text-foreground"><Mic className="size-4" /></button>
          <button disabled className="grid size-7 place-items-center rounded-md bg-foreground/10 text-muted-foreground/50">
            <Send className="size-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Coluna direita ---------------- */

function Section({ title, action, children }: { title: string; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground/60">{title}</h3>
        {action}
      </div>
      {children}
    </div>
  );
}

function FieldRow({ label, value, mono }: { label: string; value: React.ReactNode; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3 py-1.5">
      <span className="text-[11px] text-muted-foreground">{label}</span>
      <span className={cn("text-[12px] text-foreground/90 truncate", mono && "font-mono num")}>{value}</span>
    </div>
  );
}

function DealAside() {
  return (
    <aside className="glass-strong relative flex h-full flex-col gap-5 overflow-y-auto rounded-2xl p-4">
      <Section title="Negócio" action={
        <button className="text-[10px] font-medium text-cyan hover:underline">Layout</button>
      }>
        <FieldRow label="Responsável" value={
          <span className="inline-flex items-center gap-1.5">
            <span className="grid size-5 place-items-center rounded-full bg-gradient-to-br from-success/55 to-cyan/35 text-[9px] font-semibold">AE</span>
            Admin EduIT
          </span>
        } />
        <FieldRow label="Origem" value="—" />
        <FieldRow label="Previsão" value="03/04/2026" mono />
        <FieldRow label="Tags" value={
          <span className="inline-flex gap-1">
            <span className={cn("rounded-md border px-1.5 py-0.5 text-[9px] font-medium uppercase", toneBg.success)}>Licenciado</span>
            <span className={cn("rounded-md border px-1.5 py-0.5 text-[9px] font-medium uppercase", toneBg.cyan)}>abc</span>
          </span>
        } />
      </Section>

      <div className="hairline" />

      <Section title="Produtos" action={
        <button className="grid size-5 place-items-center rounded-md border border-hairline bg-foreground/5 text-muted-foreground transition hover:border-primary/40 hover:text-primary">
          <Plus className="size-3" />
        </button>
      }>
        {[1, 2].map((k) => (
          <div key={k} className="lux-card flex items-center justify-between p-2.5">
            <div className="flex items-center gap-2">
              <span className="grid size-7 place-items-center rounded-md border border-hairline bg-primary/10 text-primary">
                <Tag className="size-3.5" />
              </span>
              <p className="text-[12px] font-medium text-foreground">Administração EAD</p>
            </div>
            <span className="num font-mono text-[12px] font-semibold text-aurora">R$ 119,00</span>
          </div>
        ))}
      </Section>

      <div className="hairline" />

      <Section title="Contato" action={
        <button className="text-[10px] font-medium text-cyan hover:underline">Editar</button>
      }>
        <FieldRow label="Telefone" value={<span className="text-cyan">+55 11 98439-325</span>} mono />
        <FieldRow label="E-mail" value={<span className="text-cyan">marcilio@eduit.com.br</span>} />
      </Section>

      <div className="hairline" />

      <Section title="Campos do negócio">
        <FieldRow label="CPF" value="218.731.238-09" mono />
        <FieldRow label="Curso" value="Administração" />
        <FieldRow label="Data Matrícula" value="2025-12-09" mono />
        <FieldRow label="Email Acadêmico" value="marcelo.pin…" />
        <FieldRow label="Financeiro" value={
          <span className={cn("rounded-md border px-1.5 py-0.5 text-[9px] font-medium uppercase", toneBg.success)}>Adimplente</span>
        } />
      </Section>
    </aside>
  );
}

/* ---------------- Quick actions flutuantes ---------------- */

function QuickActions() {
  const acts = [
    { icon: Sparkles, label: "IA", tone: "cyan" as Tone },
    { icon: StickyNote, label: "Nota", tone: "amber" as Tone },
    { icon: Zap, label: "Tarefa", tone: "primary" as Tone },
    { icon: User, label: "Atribuir", tone: "muted" as Tone },
  ];
  return (
    <div className="absolute bottom-6 left-1/2 z-30 -translate-x-1/2">
      <div className="glass-strong flex items-center gap-1 rounded-full px-2 py-1.5 shadow-[var(--elev-2)]">
        {acts.map((a) => (
          <button
            key={a.label}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium transition hover:bg-foreground/8",
              toneText[a.tone],
            )}
          >
            <a.icon className="size-3.5" /> {a.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Root ---------------- */

export function NovaDealWorkspace() {
  return (
    <div className="relative grid h-full min-h-0 grid-rows-[auto_minmax(0,1fr)] gap-4 p-4">
      <DealHeader />
      <div className="grid min-h-0 grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-3 lg:col-span-2 min-h-0">
          <PipelineRail activeId="neg" />
        </div>
        <div className="col-span-12 md:col-span-9 lg:col-span-7 min-h-0">
          <TimelineChat />
        </div>
        <div className="col-span-12 lg:col-span-3 min-h-0">
          <DealAside />
        </div>
      </div>
      <QuickActions />
    </div>
  );
}
