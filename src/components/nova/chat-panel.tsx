import * as React from "react";
import { cn } from "@/lib/utils";
import { Sparkles, Send, Paperclip, Mic, Mail, Instagram, MessageCircle } from "lucide-react";

interface Message {
  id: string;
  from: "them" | "me" | "ai";
  channel?: "whatsapp" | "instagram" | "email";
  text: string;
  time: string;
}

const channelIcon = {
  whatsapp: MessageCircle,
  instagram: Instagram,
  email: Mail,
};

export function ChatPanel({
  contact,
  messages,
  aiSuggestion,
}: {
  contact: { name: string; meta: string; avatar: string };
  messages: Message[];
  aiSuggestion?: string;
}) {
  return (
    <div className="glass-strong flex h-[560px] flex-col overflow-hidden rounded-2xl">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-hairline px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-primary/60 to-cyan/40 font-display text-sm font-semibold">
              {contact.avatar}
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full bg-success ring-2 ring-[var(--surface-overlay)]" />
          </div>
          <div>
            <p className="font-display text-sm font-semibold tracking-tight">
              {contact.name}
            </p>
            <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              {contact.meta}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-border bg-white/5 px-3 py-1.5 text-[11px] text-muted-foreground">
          <span className="size-1.5 rounded-full bg-cyan pulse-ring" />
          NOVA · live
        </div>
      </header>

      {/* Timeline */}
      <div className="relative flex-1 space-y-4 overflow-y-auto px-5 py-6">
        {messages.map((m, i) => {
          if (m.from === "ai") {
            return (
              <div
                key={m.id}
                className="anim-in mx-auto max-w-[88%] rounded-xl border border-amber/25 bg-amber/5 p-3"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="mb-1 flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-amber">
                  <Sparkles className="size-3" /> NOVA Insight
                </div>
                <p className="text-[13px] leading-relaxed text-foreground/90">
                  {m.text}
                </p>
              </div>
            );
          }
          const mine = m.from === "me";
          const Ch = m.channel ? channelIcon[m.channel] : null;
          return (
            <div
              key={m.id}
              className={cn(
                "anim-in flex items-end gap-2",
                mine ? "justify-end" : "justify-start",
              )}
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div
                className={cn(
                  "max-w-[72%] rounded-2xl px-4 py-2.5 text-[13.5px] leading-relaxed shadow-[var(--elev-1)]",
                  mine
                    ? "rounded-br-md bg-gradient-to-br from-primary/85 to-primary text-primary-foreground"
                    : "rounded-bl-md border border-border bg-[var(--surface-raised)] text-foreground",
                )}
              >
                {m.text}
                <div
                  className={cn(
                    "mt-1 flex items-center gap-1.5 text-[10px]",
                    mine ? "text-primary-foreground/70" : "text-muted-foreground",
                  )}
                >
                  {Ch && <Ch className="size-3" />}
                  <span className="num">{m.time}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {aiSuggestion && (
        <div className="mx-5 mb-3 flex items-center gap-3 rounded-xl border border-primary/30 bg-primary/8 p-3">
          <Sparkles className="size-4 shrink-0 text-primary" />
          <p className="flex-1 text-[12.5px] text-foreground/90">{aiSuggestion}</p>
          <button className="rounded-md border border-primary/40 bg-primary/15 px-2.5 py-1 text-[11px] font-medium text-primary transition-colors hover:bg-primary/25">
            Usar
          </button>
        </div>
      )}

      {/* Composer */}
      <div className="border-t border-hairline bg-[var(--surface)]/60 p-3">
        <div className="flex items-center gap-2 rounded-xl border border-border bg-[var(--surface-raised)] px-3 py-2 focus-within:border-primary/50 focus-within:shadow-[0_0_0_4px_oklch(0.72_0.15_232/0.1)]">
          <button className="text-muted-foreground hover:text-foreground">
            <Paperclip className="size-4" />
          </button>
          <input
            placeholder="Escreva uma mensagem ou peça à NOVA…"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <button className="text-muted-foreground hover:text-foreground">
            <Mic className="size-4" />
          </button>
          <button className="grid size-8 place-items-center rounded-lg [background:var(--gradient-primary)] text-primary-foreground shadow-[var(--glow-primary)] transition-transform hover:-translate-y-0.5">
            <Send className="size-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
