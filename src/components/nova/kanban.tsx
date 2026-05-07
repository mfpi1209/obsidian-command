import * as React from "react";
import { cn } from "@/lib/utils";
import { GripVertical, MessageSquare, Paperclip, Sparkles } from "lucide-react";

export interface KanbanCardData {
  id: string;
  title: string;
  company: string;
  value: string;
  tag: string;
  tagTone: "primary" | "amber" | "cyan" | "success";
  messages: number;
  attachments: number;
  ai?: string;
  avatar: string;
}

export interface KanbanColumnData {
  id: string;
  title: string;
  hint: string;
  total: string;
  cards: KanbanCardData[];
}

const toneMap: Record<KanbanCardData["tagTone"], string> = {
  primary: "bg-primary/15 text-primary border-primary/30",
  amber: "bg-amber/15 text-amber border-amber/30",
  cyan: "bg-cyan/15 text-cyan border-cyan/30",
  success: "bg-success/15 text-success border-success/30",
};

function KanbanCard({ card, index }: { card: KanbanCardData; index: number }) {
  return (
    <article
      className="lux-card group cursor-grab p-4 active:cursor-grabbing anim-in"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <header className="mb-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            {card.company}
          </p>
          <h4 className="mt-1 truncate font-display text-[15px] font-semibold text-foreground">
            {card.title}
          </h4>
        </div>
        <GripVertical className="size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
      </header>

      <div className="mb-3 flex items-baseline justify-between">
        <span className="num text-xl font-semibold text-aurora">{card.value}</span>
        <span
          className={cn(
            "rounded-md border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider",
            toneMap[card.tagTone],
          )}
        >
          {card.tag}
        </span>
      </div>

      {card.ai && (
        <div className="mb-3 flex items-start gap-2 rounded-lg border border-amber/20 bg-amber/5 p-2.5 text-[12px] text-foreground/85">
          <Sparkles className="mt-0.5 size-3.5 shrink-0 text-amber" />
          <p className="leading-snug">{card.ai}</p>
        </div>
      )}

      <footer className="flex items-center justify-between border-t border-hairline pt-3">
        <div
          className="grid size-7 place-items-center rounded-full bg-gradient-to-br from-primary/40 to-cyan/40 text-[10px] font-semibold text-foreground ring-2 ring-background"
        >
          {card.avatar}
        </div>
        <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <MessageSquare className="size-3" /> {card.messages}
          </span>
          <span className="inline-flex items-center gap-1">
            <Paperclip className="size-3" /> {card.attachments}
          </span>
        </div>
      </footer>
    </article>
  );
}

export function KanbanColumn({ column }: { column: KanbanColumnData }) {
  return (
    <section className="flex w-[300px] shrink-0 flex-col gap-3">
      <header className="flex items-center justify-between px-1">
        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-foreground/90">
            {column.title}
          </h3>
          <p className="mt-1 text-[11px] text-muted-foreground">{column.hint}</p>
        </div>
        <span className="num rounded-md bg-foreground/5 px-2 py-1 text-[11px] text-muted-foreground">
          {column.total}
        </span>
      </header>
      <div className="hairline" />
      <div className="flex flex-col gap-3">
        {column.cards.map((c, i) => (
          <KanbanCard key={c.id} card={c} index={i} />
        ))}
      </div>
    </section>
  );
}

export function KanbanBoard({ columns }: { columns: KanbanColumnData[] }) {
  return (
    <div className="flex gap-5 overflow-x-auto pb-4">
      {columns.map((col) => (
        <KanbanColumn key={col.id} column={col} />
      ))}
    </div>
  );
}
