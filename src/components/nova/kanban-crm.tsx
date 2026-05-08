import * as React from "react";
import {
  ChevronDown,
  Clock,
  Filter,
  Flame,
  GripVertical,
  LayoutGrid,
  List,
  MessageSquare,
  Plus,
  Search,
  SlidersHorizontal,
  Tag,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* =========================================================
   NOVA · CRM Kanban (real-app composition)
   Built from NOVA OS tokens: glass, hairline, lux-card,
   semantic colors, tabular nums, cinematic motion.
   ========================================================= */

type Channel = "whatsapp" | "instagram" | "email";
type Tone = "primary" | "amber" | "cyan" | "success" | "destructive" | "muted";

export interface CrmCard {
  id: string;
  ref: string;
  date: string;
  contact: string;
  initials: string;
  channel: Channel;
  title: string;
  age: string;
  product: string;
  value: string;
  tag?: { label: string; tone: Tone };
  owner: { name: string; initials: string; online?: boolean };
  accent: Tone;
}

export interface CrmColumn {
  id: string;
  title: string;
  total: string;
  count: number;
  accent: Tone;
  cards: CrmCard[];
}

const accentBar: Record<Tone, string> = {
  primary: "bg-primary",
  amber: "bg-amber",
  cyan: "bg-cyan",
  success: "bg-success",
  destructive: "bg-destructive",
  muted: "bg-muted-foreground",
};

const accentGlow: Record<Tone, string> = {
  primary: "shadow-[0_-8px_24px_-8px_var(--primary)]",
  amber: "shadow-[0_-8px_24px_-8px_var(--amber)]",
  cyan: "shadow-[0_-8px_24px_-8px_var(--cyan)]",
  success: "shadow-[0_-8px_24px_-8px_var(--success)]",
  destructive: "shadow-[0_-8px_24px_-8px_var(--destructive)]",
  muted: "",
};

const tagTone: Record<Tone, string> = {
  primary: "border-primary/35 bg-primary/12 text-primary",
  amber: "border-amber/35 bg-amber/12 text-amber",
  cyan: "border-cyan/35 bg-cyan/12 text-cyan",
  success: "border-success/35 bg-success/12 text-success",
  destructive: "border-destructive/40 bg-destructive/12 text-destructive",
  muted: "border-border bg-foreground/5 text-muted-foreground",
};

const channelDot: Record<Channel, string> = {
  whatsapp: "bg-success",
  instagram: "bg-amber",
  email: "bg-cyan",
};

function Avatar({
  initials,
  channel,
  size = "md",
  tone = "primary",
}: {
  initials: string;
  channel?: Channel;
  size?: "sm" | "md";
  tone?: Tone;
}) {
  const sz = size === "sm" ? "size-7 text-[10px]" : "size-9 text-[11px]";
  const ringTone: Record<Tone, string> = {
    primary: "from-primary/50 to-cyan/40",
    amber: "from-amber/55 to-destructive/35",
    cyan: "from-cyan/55 to-primary/35",
    success: "from-success/55 to-cyan/35",
    destructive: "from-destructive/55 to-amber/35",
    muted: "from-muted to-muted",
  };
  return (
    <div className="relative">
      <div
        className={cn(
          "grid place-items-center rounded-full bg-gradient-to-br font-display font-semibold text-foreground ring-2 ring-background",
          ringTone[tone],
          sz,
        )}
      >
        {initials}
      </div>
      {channel && (
        <span
          className={cn(
            "absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full ring-2 ring-background",
            channelDot[channel],
          )}
        />
      )}
    </div>
  );
}

function CrmKanbanCard({ card, index }: { card: CrmCard; index: number }) {
  return (
    <article
      className="lux-card group relative cursor-grab p-3.5 active:cursor-grabbing anim-in"
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <header className="flex items-start gap-2.5">
        <button
          aria-label="Reordenar"
          className="mt-1 text-muted-foreground/60 opacity-0 transition-opacity group-hover:opacity-100"
        >
          <GripVertical className="size-3.5" />
        </button>
        <Avatar initials={card.initials} channel={card.channel} tone={card.accent} />
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-2">
            <p
              className={cn(
                "truncate text-[12px] font-medium",
                card.accent === "amber" && "text-amber",
                card.accent === "primary" && "text-primary",
                card.accent === "cyan" && "text-cyan",
                card.accent === "success" && "text-success",
                card.accent === "destructive" && "text-destructive",
                card.accent === "muted" && "text-muted-foreground",
              )}
            >
              {card.contact}
            </p>
            <div className="flex shrink-0 items-center gap-1.5 font-mono text-[10px] text-muted-foreground">
              <span className="rounded-md border border-hairline bg-foreground/5 px-1 py-px">
                {card.ref}
              </span>
              <span>{card.date}</span>
            </div>
          </div>
          <h4 className="mt-1 truncate font-display text-[14px] font-semibold text-foreground">
            {card.title}
          </h4>
        </div>
      </header>

      <div className="mt-2.5 inline-flex items-center gap-1.5 rounded-md border border-hairline bg-foreground/5 px-1.5 py-0.5 text-[10px] text-muted-foreground">
        <Clock className="size-3" /> {card.age}
      </div>

      <div className="mt-3 flex items-baseline justify-between gap-3">
        <p className="truncate text-[12px] text-muted-foreground">{card.product}</p>
        <span className="num shrink-0 font-display text-[15px] font-semibold text-aurora">
          {card.value}
        </span>
      </div>

      <div className="mt-3 flex items-center gap-2">
        {card.tag && (
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider",
              tagTone[card.tag.tone],
            )}
          >
            <Tag className="size-2.5" /> {card.tag.label}
          </span>
        )}
        <button
          aria-label="Adicionar tag"
          className="grid size-5 place-items-center rounded-md border border-hairline bg-foreground/5 text-muted-foreground transition hover:border-primary/40 hover:text-primary"
        >
          <Plus className="size-3" />
        </button>
      </div>

      <footer className="mt-3 flex items-center justify-between rounded-lg border border-hairline bg-background/40 px-2.5 py-1.5">
        <div className="flex min-w-0 items-center gap-2">
          <Avatar initials={card.owner.initials} size="sm" tone="amber" />
          <span className="truncate text-[12px] text-foreground/85">
            {card.owner.name}
          </span>
          {card.owner.online && (
            <span className="size-1.5 rounded-full bg-success shadow-[0_0_8px_var(--success)]" />
          )}
        </div>
        <ChevronDown className="size-3.5 text-muted-foreground" />
      </footer>
    </article>
  );
}

function CrmKanbanColumn({ column }: { column: CrmColumn }) {
  return (
    <section className="flex w-[300px] shrink-0 flex-col gap-3">
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl border border-border bg-[var(--surface)]/60 px-4 py-3 backdrop-blur-md",
          accentGlow[column.accent],
        )}
      >
        <span
          className={cn("absolute inset-x-0 top-0 h-[2px]", accentBar[column.accent])}
        />
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-display text-[13px] font-semibold uppercase tracking-[0.16em] text-foreground/90">
              {column.title}
            </h3>
            <p className="num mt-1 font-mono text-[11px] text-muted-foreground">
              {column.total}
            </p>
          </div>
          <span className="num grid size-6 place-items-center rounded-md bg-foreground/8 font-mono text-[11px] text-muted-foreground">
            {column.count}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        {column.cards.map((c, i) => (
          <CrmKanbanCard key={c.id} card={c} index={i} />
        ))}
        <button className="group flex items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-foreground/[0.02] px-3 py-2.5 text-[12px] text-muted-foreground transition hover:border-primary/40 hover:text-primary">
          <Plus className="size-3.5" /> Adicionar negócio
        </button>
      </div>
    </section>
  );
}

/* ===================== Tabs ===================== */

interface CrmTab {
  id: string;
  label: string;
  count: number;
  tone: Tone;
}

function StatusTabs({
  tabs,
  active,
  onChange,
}: {
  tabs: CrmTab[];
  active: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex items-center gap-1 rounded-xl border border-hairline bg-background/40 p-1 backdrop-blur-md">
      {tabs.map((t) => {
        const isActive = active === t.id;
        return (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            className={cn(
              "group inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-[12px] font-medium uppercase tracking-[0.12em] transition",
              isActive
                ? "bg-foreground/8 text-foreground shadow-[var(--elev-1)]"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <span
              className={cn(
                "size-1.5 rounded-full transition",
                isActive ? accentBar[t.tone] : "bg-muted-foreground/40",
              )}
            />
            {t.label}
            <span
              className={cn(
                "num rounded-md px-1.5 py-px font-mono text-[10px]",
                isActive
                  ? "bg-foreground/10 text-foreground"
                  : "bg-foreground/5 text-muted-foreground",
              )}
            >
              {t.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ===================== Toolbar ===================== */

function Toolbar() {
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <div className="inline-flex items-center gap-2 rounded-xl border border-hairline bg-background/40 px-3 py-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground backdrop-blur-md">
        <Filter className="size-3.5 text-primary" /> Funil
      </div>
      <button className="inline-flex items-center gap-2 rounded-xl border border-border bg-[var(--surface-raised)]/70 px-3 py-2 text-[12px] font-medium text-foreground backdrop-blur-md transition hover:border-primary/40">
        Pipeline Principal <ChevronDown className="size-3.5 text-muted-foreground" />
      </button>

      <div className="relative flex min-w-[260px] flex-1 items-center">
        <Search className="absolute left-3 size-3.5 text-muted-foreground" />
        <input
          placeholder="Buscar contatos, deals, mensagens…"
          className="w-full rounded-xl border border-hairline bg-background/40 py-2 pl-9 pr-3 text-[12px] text-foreground placeholder:text-muted-foreground backdrop-blur-md outline-none transition focus:border-primary/40 focus:shadow-[var(--glow-primary)]"
        />
      </div>

      <button className="inline-flex items-center gap-2 rounded-xl border border-hairline bg-background/40 px-3 py-2 text-[12px] text-muted-foreground backdrop-blur-md transition hover:text-foreground">
        <SlidersHorizontal className="size-3.5" /> Filtros
      </button>

      <div className="inline-flex items-center gap-1 rounded-xl border border-hairline bg-background/40 p-1 backdrop-blur-md">
        <button className="grid size-7 place-items-center rounded-md bg-foreground/10 text-foreground">
          <LayoutGrid className="size-3.5" />
        </button>
        <button className="grid size-7 place-items-center rounded-md text-muted-foreground transition hover:text-foreground">
          <List className="size-3.5" />
        </button>
        <button className="grid size-7 place-items-center rounded-md text-muted-foreground transition hover:text-foreground">
          <MessageSquare className="size-3.5" />
        </button>
      </div>

      <button className="inline-flex items-center gap-2 rounded-xl border border-hairline bg-background/40 px-3 py-2 text-[12px] text-muted-foreground backdrop-blur-md transition hover:text-foreground">
        <User className="size-3.5" /> Meus
      </button>
      <button className="inline-flex items-center gap-2 rounded-xl border border-amber/30 bg-amber/10 px-3 py-2 text-[12px] font-medium text-amber backdrop-blur-md transition hover:shadow-[var(--glow-amber)]">
        <Flame className="size-3.5" /> Urgentes
      </button>
      <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-primary to-cyan/80 px-3.5 py-2 text-[12px] font-semibold text-primary-foreground shadow-[var(--glow-primary)] transition hover:brightness-110">
        <Plus className="size-3.5" /> Novo
      </button>
    </div>
  );
}

/* ===================== Board ===================== */

export function CrmKanbanBoard({
  columns,
  tabs,
}: {
  columns: CrmColumn[];
  tabs: CrmTab[];
}) {
  const [active, setActive] = React.useState(tabs[0]?.id ?? "open");
  return (
    <div className="space-y-5">
      <Toolbar />
      <StatusTabs tabs={tabs} active={active} onChange={setActive} />
      <div className="hairline" />
      <div className="-mx-2 flex gap-4 overflow-x-auto px-2 pb-4">
        {columns.map((col) => (
          <CrmKanbanColumn key={col.id} column={col} />
        ))}
      </div>
    </div>
  );
}
