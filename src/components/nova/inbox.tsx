import * as React from "react";
import {
  ArrowLeftRight,
  Bell,
  Bot,
  CheckCheck,
  ChevronDown,
  ChevronRight,
  Clock,
  Filter,
  Headphones,
  Mail,
  MessageSquare,
  Mic,
  Paperclip,
  Phone,
  Plus,
  Search,
  Send,
  Smile,
  Sparkles,
  Star,
  Tag,
  X,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* =========================================================
   NOVA · Inbox / Chat Operacional
   3 colunas: Conversas · Conversa · Deal & Contato
   Dark + Light suportados via tokens do design system.
   ========================================================= */

type Channel = "whatsapp" | "instagram" | "email";
type Tone = "primary" | "amber" | "cyan" | "success" | "destructive" | "muted";

const channelDot: Record<Channel, string> = {
  whatsapp: "bg-success",
  instagram: "bg-amber",
  email: "bg-cyan",
};

const tagTone: Record<Tone, string> = {
  primary: "border-primary/35 bg-primary/12 text-primary",
  amber: "border-amber/35 bg-amber/12 text-amber",
  cyan: "border-cyan/35 bg-cyan/12 text-cyan",
  success: "border-success/35 bg-success/12 text-success",
  destructive: "border-destructive/40 bg-destructive/12 text-destructive",
  muted: "border-border bg-foreground/5 text-muted-foreground",
};

interface Conversation {
  id: string;
  contact: string;
  initials: string;
  channel: Channel;
  preview: string;
  age: string;
  ownerInitials: string;
  unread?: number;
  active?: boolean;
  tags?: { label: string; tone: Tone }[];
  audio?: boolean;
  read?: boolean;
}

const conversations: Conversation[] = [
  {
    id: "diego",
    contact: "Diego Alves",
    initials: "DA",
    channel: "whatsapp",
    preview: "oba",
    age: "2 sem",
    ownerInitials: "AE",
    active: true,
    read: true,
    tags: [
      { label: "Frio", tone: "primary" },
      { label: "Em Curso", tone: "cyan" },
    ],
  },
  {
    id: "joao",
    contact: "João Pedro Silva",
    initials: "JS",
    channel: "whatsapp",
    preview: "João, enviei a agenda proposta…",
    age: "2 sem",
    ownerInitials: "AE",
    read: true,
    tags: [{ label: "Quente", tone: "amber" }],
  },
  {
    id: "leo",
    contact: "Leonardo Mendes",
    initials: "LM",
    channel: "whatsapp",
    preview: "Áudio · 0:47",
    age: "2 sem",
    ownerInitials: "AE",
    audio: true,
    read: true,
    tags: [
      { label: "Parceiro", tone: "success" },
      { label: "Quente", tone: "amber" },
    ],
  },
  {
    id: "karina",
    contact: "Karina Teixeira",
    initials: "KT",
    channel: "whatsapp",
    preview: "Áudio · 1:12",
    age: "4d",
    ownerInitials: "AE",
    audio: true,
    read: true,
    tags: [{ label: "Frio", tone: "primary" }],
  },
  {
    id: "ana1",
    contact: "Ana Beatriz Ramos",
    initials: "AR",
    channel: "whatsapp",
    preview: "Tenho uma dúvida sobre o pagamento…",
    age: "3 sem",
    ownerInitials: "AE",
    unread: 2,
    tags: [
      { label: "Quente", tone: "amber" },
      { label: "Indicação", tone: "primary" },
    ],
  },
  {
    id: "ana2",
    contact: "Ana Beatriz Ramos",
    initials: "AR",
    channel: "instagram",
    preview: "Nota: hello",
    age: "6d",
    ownerInitials: "AE",
    tags: [
      { label: "Quente", tone: "amber" },
      { label: "VIP", tone: "amber" },
    ],
  },
  {
    id: "jess",
    contact: "Jéssica Mendes",
    initials: "JM",
    channel: "whatsapp",
    preview: "Muito obrigada! 💙",
    age: "3 sem",
    ownerInitials: "AE",
    tags: [{ label: "Indicação", tone: "primary" }],
  },
];

interface ChatMessage {
  id: string;
  from: "them" | "me" | "ai";
  text: string;
  time: string;
  read?: boolean;
}

const messages: ChatMessage[] = [
  {
    id: "1",
    from: "them",
    text: "Oi, vi o anúncio e queria saber mais sobre o curso de IA.",
    time: "13:20",
  },
  {
    id: "2",
    from: "them",
    text: "O curso é online? Qual o valor?",
    time: "13:35",
  },
  {
    id: "3",
    from: "ai",
    text: "Sugestão: responder com o link do material e oferecer demo gratuita. Lead com perfil de conversão alta (87%).",
    time: "",
  },
  {
    id: "4",
    from: "me",
    text: "Oi Diego! Tudo bem? Sim, é 100% online com mentorias ao vivo. Te envio agora a grade completa e um cupom de R$ 200 off.",
    time: "15:28",
    read: true,
  },
  {
    id: "5",
    from: "them",
    text: "oba",
    time: "15:32",
  },
];

function ChannelAvatar({
  initials,
  channel,
  size = "md",
  tone = "primary",
}: {
  initials: string;
  channel?: Channel;
  size?: "sm" | "md" | "lg";
  tone?: Tone;
}) {
  const sz =
    size === "sm"
      ? "size-7 text-[10px]"
      : size === "lg"
        ? "size-11 text-[13px]"
        : "size-9 text-[11px]";
  const ringTone: Record<Tone, string> = {
    primary: "from-primary/55 to-cyan/40",
    amber: "from-amber/55 to-destructive/35",
    cyan: "from-cyan/55 to-primary/35",
    success: "from-success/55 to-cyan/35",
    destructive: "from-destructive/55 to-amber/35",
    muted: "from-muted to-muted",
  };
  return (
    <div className="relative shrink-0">
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

/* ===================== Coluna 1 — Lista de conversas ===================== */

function ConversationList() {
  return (
    <aside className="flex h-full w-[340px] shrink-0 flex-col border-r border-hairline bg-surface/40 backdrop-blur-xl">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 px-4 py-3">
        <div className="flex items-center gap-2">
          <h2 className="font-display text-[15px] font-semibold tracking-tight">
            Conversas
          </h2>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-foreground/5 px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            <span className="size-1.5 rounded-full bg-muted-foreground/60" />
            Offline
            <ChevronDown className="size-2.5" />
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <button className="relative grid size-7 place-items-center rounded-md border border-hairline bg-foreground/5 text-muted-foreground transition hover:text-foreground">
            <Clock className="size-3.5" />
            <span className="absolute -right-1 -top-1 grid size-3.5 place-items-center rounded-full bg-destructive text-[8px] font-bold text-destructive-foreground ring-2 ring-background">
              2
            </span>
          </button>
          <button className="grid size-7 place-items-center rounded-md bg-gradient-to-br from-primary to-cyan/80 text-primary-foreground shadow-[var(--glow-primary)] transition hover:brightness-110">
            <Plus className="size-3.5" />
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="px-4">
        <div className="relative flex items-center">
          <Search className="absolute left-3 size-3.5 text-muted-foreground" />
          <input
            placeholder="Nome, telefone ou responsável…"
            className="w-full rounded-xl border border-hairline bg-background/40 py-2 pl-9 pr-9 text-[12px] text-foreground placeholder:text-muted-foreground backdrop-blur-md outline-none transition focus:border-primary/40 focus:shadow-[var(--glow-primary)]"
          />
          <button className="absolute right-2 grid size-6 place-items-center rounded-md border border-hairline bg-foreground/5 text-muted-foreground transition hover:text-foreground">
            <Filter className="size-3" />
          </button>
        </div>
      </div>

      {/* Tabs / filtro */}
      <div className="px-4 py-3">
        <button className="flex w-full items-center justify-between rounded-xl border border-hairline bg-foreground/[0.04] px-3 py-2 text-[12px] text-muted-foreground transition hover:text-foreground">
          <span className="inline-flex items-center gap-2">
            <span className="grid size-5 place-items-center rounded-md bg-foreground/10 text-foreground">
              <MessageSquare className="size-3" />
            </span>
            <span className="font-medium uppercase tracking-[0.12em]">Todos</span>
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="num rounded-md border border-hairline bg-foreground/5 px-1.5 py-px font-mono text-[10px]">
              24
            </span>
            <ChevronDown className="size-3" />
          </span>
        </button>
      </div>

      {/* Lista */}
      <div className="flex-1 overflow-y-auto px-2 pb-4">
        <ul className="flex flex-col gap-1">
          {conversations.map((c, i) => (
            <li key={c.id}>
              <ConversationRow conv={c} index={i} />
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

function ConversationRow({ conv, index }: { conv: Conversation; index: number }) {
  return (
    <button
      className={cn(
        "anim-in group relative flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition",
        conv.active
          ? "bg-primary/10 ring-1 ring-primary/25 shadow-[var(--elev-1)]"
          : "hover:bg-foreground/[0.04]",
      )}
      style={{ animationDelay: `${index * 30}ms` }}
    >
      {conv.active && (
        <span className="absolute left-0 top-2 bottom-2 w-[2px] rounded-r bg-gradient-to-b from-primary to-cyan shadow-[0_0_8px_var(--primary)]" />
      )}
      <ChannelAvatar
        initials={conv.initials}
        channel={conv.channel}
        tone={conv.channel === "instagram" ? "amber" : conv.channel === "email" ? "cyan" : "success"}
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <p className="truncate text-[13px] font-medium text-foreground">
            {conv.contact}
          </p>
          <span className="num shrink-0 font-mono text-[10px] text-muted-foreground">
            {conv.age}
          </span>
        </div>
        <div className="mt-0.5 flex items-center gap-1.5">
          {conv.read && <CheckCheck className="size-3 shrink-0 text-cyan" />}
          {conv.audio && <Mic className="size-3 shrink-0 text-muted-foreground" />}
          <p className="truncate text-[12px] text-muted-foreground">{conv.preview}</p>
        </div>
        {conv.tags && (
          <div className="mt-1.5 flex flex-wrap items-center gap-1">
            {conv.tags.map((t) => (
              <span
                key={t.label}
                className={cn(
                  "inline-flex items-center gap-1 rounded-md border px-1.5 py-px text-[9px] font-medium uppercase tracking-wider",
                  tagTone[t.tone],
                )}
              >
                {t.label}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-col items-end gap-1">
        <ChannelAvatar initials={conv.ownerInitials} size="sm" tone="success" />
        {conv.unread && (
          <span className="num grid min-w-4 place-items-center rounded-full bg-primary px-1 text-[9px] font-bold text-primary-foreground shadow-[var(--glow-primary)]">
            {conv.unread}
          </span>
        )}
      </div>
    </button>
  );
}

/* ===================== Coluna 2 — Conversa ===================== */

function ConversationPanel() {
  return (
    <section className="flex h-full flex-1 flex-col bg-background/30">
      {/* Header da conversa */}
      <header className="flex items-center justify-between gap-4 border-b border-hairline bg-surface/40 px-5 py-3 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <ChannelAvatar initials="DA" channel="whatsapp" size="lg" tone="success" />
          <div>
            <h3 className="font-display text-[15px] font-semibold leading-tight">
              Diego Alves
            </h3>
            <p className="num font-mono text-[11px] text-muted-foreground">
              +55 41 99812-3456 · online há 4min
            </p>
          </div>
        </div>

        <nav className="flex items-center gap-1 rounded-xl border border-hairline bg-background/40 p-1 backdrop-blur-md">
          {[
            { id: "chat", label: "Conversa", active: true },
            { id: "act", label: "Atividades" },
            { id: "notes", label: "Notas" },
            { id: "tl", label: "Timeline" },
          ].map((t) => (
            <button
              key={t.id}
              className={cn(
                "rounded-lg px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.12em] transition",
                t.active
                  ? "bg-foreground/10 text-foreground shadow-[var(--elev-1)]"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {t.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button className="grid size-8 place-items-center rounded-lg border border-hairline bg-foreground/5 text-muted-foreground transition hover:text-foreground">
            <ArrowLeftRight className="size-3.5" />
          </button>
          <button className="grid size-8 place-items-center rounded-lg border border-hairline bg-foreground/5 text-muted-foreground transition hover:text-foreground">
            <Bell className="size-3.5" />
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg border border-success/35 bg-success/10 px-3 py-1.5 text-[12px] font-medium text-success transition hover:shadow-[0_0_20px_-4px_var(--success)]">
            <Phone className="size-3.5" /> Ligar <ChevronDown className="size-3" />
          </button>
          <button className="grid size-8 place-items-center rounded-lg border border-hairline bg-foreground/5 text-muted-foreground transition hover:text-foreground">
            <Search className="size-3.5" />
          </button>
          <button className="grid size-8 place-items-center rounded-lg border border-hairline bg-foreground/5 text-muted-foreground transition hover:text-foreground">
            <X className="size-3.5" />
          </button>
        </div>
      </header>

      {/* Mensagens */}
      <div className="relative flex-1 overflow-y-auto px-8 py-6">
        <div className="pointer-events-none absolute inset-0 hud-grid opacity-30" />
        <div className="relative mx-auto flex max-w-[720px] flex-col gap-4">
          {/* Date pill */}
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-hairline bg-surface/60 px-3 py-1 font-mono text-[10px] text-muted-foreground backdrop-blur-md">
              <span className="size-1 rounded-full bg-primary" />
              18 / 04 / 2026
            </span>
          </div>

          {messages.map((m, i) => (
            <MessageBubble key={m.id} m={m} index={i} />
          ))}
        </div>
      </div>

      {/* Aviso WhatsApp */}
      <div className="mx-5 mb-3 flex items-center justify-between gap-3 rounded-xl border border-amber/30 bg-amber/8 px-4 py-2.5 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <span className="grid size-8 place-items-center rounded-lg bg-amber/15 text-amber">
            <Clock className="size-4" />
          </span>
          <div>
            <p className="text-[12px] font-medium text-foreground">
              Sessão de 24h encerrada
            </p>
            <p className="text-[11px] text-muted-foreground">
              Apenas templates aprovados pelo WhatsApp podem ser enviados.
            </p>
          </div>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-br from-amber to-destructive/80 px-3 py-1.5 text-[12px] font-semibold text-background shadow-[var(--glow-amber)] transition hover:brightness-110">
          <Sparkles className="size-3.5" /> Usar template
        </button>
      </div>

      {/* Composer */}
      <div className="border-t border-hairline bg-surface/40 px-5 py-3 backdrop-blur-xl">
        <div className="flex items-end gap-2">
          <button className="grid size-9 place-items-center rounded-lg border border-hairline bg-foreground/5 text-muted-foreground transition hover:text-foreground">
            <Plus className="size-4" />
          </button>
          <button className="grid size-9 place-items-center rounded-lg border border-hairline bg-foreground/5 text-muted-foreground transition hover:text-foreground">
            <Smile className="size-4" />
          </button>
          <div className="relative flex-1">
            <textarea
              rows={1}
              placeholder="Digite uma mensagem… use / para comandos NOVA"
              className="w-full resize-none rounded-xl border border-hairline bg-background/50 px-4 py-2.5 pr-28 text-[13px] text-foreground placeholder:text-muted-foreground backdrop-blur-md outline-none transition focus:border-primary/40 focus:shadow-[var(--glow-primary)]"
            />
            <div className="absolute right-2 top-1.5 flex items-center gap-1">
              <button className="inline-flex items-center gap-1 rounded-md border border-primary/30 bg-primary/10 px-2 py-1 text-[10px] font-medium text-primary transition hover:bg-primary/20">
                <Bot className="size-3" /> NOVA
              </button>
              <button className="grid size-7 place-items-center rounded-md text-muted-foreground transition hover:text-foreground">
                <Paperclip className="size-3.5" />
              </button>
            </div>
          </div>
          <button className="grid size-9 place-items-center rounded-lg border border-hairline bg-foreground/5 text-muted-foreground transition hover:text-foreground">
            <Mic className="size-4" />
          </button>
          <button className="grid size-9 place-items-center rounded-lg bg-gradient-to-br from-primary to-cyan/80 text-primary-foreground shadow-[var(--glow-primary)] transition hover:brightness-110">
            <Send className="size-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

function MessageBubble({ m, index }: { m: ChatMessage; index: number }) {
  if (m.from === "ai") {
    return (
      <div
        className="anim-in self-center max-w-[80%] rounded-2xl border border-primary/25 bg-primary/8 px-4 py-2.5 backdrop-blur-md"
        style={{ animationDelay: `${index * 50}ms` }}
      >
        <div className="flex items-center gap-2">
          <span className="grid size-5 place-items-center rounded-md bg-primary/20 text-primary">
            <Sparkles className="size-3" />
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
            NOVA Copilot
          </span>
        </div>
        <p className="mt-1.5 text-[12px] leading-relaxed text-foreground/85">{m.text}</p>
      </div>
    );
  }

  const isMe = m.from === "me";
  return (
    <div
      className={cn("anim-in flex items-end gap-2", isMe ? "justify-end" : "justify-start")}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {!isMe && <ChannelAvatar initials="DA" size="sm" tone="success" />}
      <div className="max-w-[70%]">
        <div
          className={cn(
            "rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed shadow-[var(--elev-1)]",
            isMe
              ? "bg-gradient-to-br from-primary to-cyan/80 text-primary-foreground rounded-br-md"
              : "bg-surface/70 text-foreground border border-hairline rounded-bl-md backdrop-blur-md",
          )}
        >
          {m.text}
        </div>
        <div
          className={cn(
            "mt-1 flex items-center gap-1.5 px-2 num font-mono text-[10px] text-muted-foreground",
            isMe ? "justify-end" : "justify-start",
          )}
        >
          <Clock className="size-2.5" /> {m.time}
          {m.read && <CheckCheck className="size-3 text-cyan" />}
        </div>
      </div>
      {isMe && <ChannelAvatar initials="AE" size="sm" tone="amber" />}
    </div>
  );
}

/* ===================== Coluna 3 — Deal & Contato ===================== */

function DealPanel() {
  return (
    <aside className="flex h-full w-[360px] shrink-0 flex-col border-l border-hairline bg-surface/40 backdrop-blur-xl">
      <header className="flex items-center justify-between gap-2 px-5 py-3">
        <h3 className="font-display text-[14px] font-semibold tracking-tight">CRM</h3>
        <button className="grid size-7 place-items-center rounded-md border border-hairline bg-foreground/5 text-muted-foreground transition hover:text-foreground">
          <ChevronRight className="size-3.5" />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto px-5 pb-6">
        {/* Identidade */}
        <div className="flex items-start gap-3 pb-4">
          <ChannelAvatar initials="DA" channel="whatsapp" size="lg" tone="success" />
          <div className="min-w-0 flex-1">
            <h4 className="font-display text-[16px] font-semibold tracking-tight text-aurora">
              Diego Alves
            </h4>
            <p className="num mt-0.5 font-mono text-[11px] text-muted-foreground">
              +55 41 99812-3456
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-1">
              <span className={cn("rounded-md border px-1.5 py-px text-[9px] font-medium uppercase tracking-wider", tagTone.cyan)}>
                Em Curso
              </span>
              <span className={cn("rounded-md border px-1.5 py-px text-[9px] font-medium uppercase tracking-wider", tagTone.primary)}>
                Frio
              </span>
            </div>
          </div>
        </div>

        <SectionDivider label="Negócio" action="Layout" />

        {/* Deal card */}
        <div className="lux-card p-4">
          <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Negócio ativo
          </p>
          <h5 className="mt-1 font-display text-[15px] font-semibold text-foreground">
            Curso de IA — Diego Alves
          </h5>

          <div className="mt-3 flex items-baseline justify-between gap-2">
            <span className="num font-display text-2xl font-semibold text-aurora">
              R$ 119,00
            </span>
            <span className={cn("rounded-md border px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider", tagTone.primary)}>
              <Tag className="mr-1 inline size-2.5" /> Qualificação
            </span>
          </div>

          {/* Progress steps */}
          <div className="mt-3 flex items-center gap-1">
            {["primary", "muted", "muted", "muted", "muted"].map((tone, i) => (
              <span
                key={i}
                className={cn(
                  "h-1.5 flex-1 rounded-full",
                  tone === "primary"
                    ? "bg-gradient-to-r from-primary to-cyan shadow-[0_0_10px_var(--primary)]"
                    : "bg-foreground/8",
                )}
              />
            ))}
          </div>
          <div className="mt-1.5 flex justify-between text-[9px] uppercase tracking-wider text-muted-foreground">
            <span>Qualif.</span>
            <span>Contato</span>
            <span>Proposta</span>
            <span>Negoc.</span>
            <span>Fechado</span>
          </div>

          {/* Fields */}
          <div className="mt-4 space-y-2.5">
            <Field label="Responsável" value="Admin EduIT" />
            <Field
              label="Estágio"
              value={
                <span className={cn("rounded-md border px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider", tagTone.primary)}>
                  Qualificação
                </span>
              }
            />
            <Field label="Origem" value="Anúncio Meta" />
            <Field label="Próx. ação" value="Enviar grade + cupom" />
          </div>
        </div>

        <SectionDivider label="Contato" />

        <div className="space-y-2.5">
          <Field icon={<Phone className="size-3.5" />} label="Telefone" value={<span className="num font-mono">+55 41 99812-3456</span>} />
          <Field icon={<Mail className="size-3.5" />} label="E-mail" value={<span className="text-cyan">diego.alves@example.com</span>} />
          <Field icon={<Star className="size-3.5" />} label="Fase" value={<SelectChip>Lead</SelectChip>} />
          <Field
            icon={<Zap className="size-3.5" />}
            label="Engajamento"
            value={
              <span className={cn("rounded-md border px-1.5 py-px text-[10px] font-medium uppercase tracking-wider", tagTone.amber)}>
                Baixo
              </span>
            }
          />
          <Field
            icon={<Headphones className="size-3.5" />}
            label="Interesses"
            value={
              <div className="flex gap-1">
                <span className={cn("rounded-md border px-1.5 py-px text-[10px] font-medium uppercase tracking-wider", tagTone.primary)}>
                  Frio
                </span>
                <span className={cn("rounded-md border px-1.5 py-px text-[10px] font-medium uppercase tracking-wider", tagTone.cyan)}>
                  Em Curso
                </span>
              </div>
            }
          />
        </div>

        {/* Empty state */}
        <div className="mt-5 flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-foreground/[0.02] py-6 text-center">
          <span className="grid size-9 place-items-center rounded-full border border-hairline bg-foreground/5 text-muted-foreground">
            <Plus className="size-4" />
          </span>
          <p className="text-[11px] text-muted-foreground">Nenhum campo configurado</p>
          <button className="text-[11px] font-medium text-primary hover:underline">
            Adicionar campo customizado
          </button>
        </div>

        <SectionDivider label="Todos os negócios" />

        <ul className="space-y-1.5">
          {[
            { title: "Curso de IA — Diego Alves", stage: "Qualificação", tone: "primary" as Tone, value: "R$ 119,00" },
            { title: "Mentoria Premium", stage: "Proposta", tone: "amber" as Tone, value: "R$ 3.200,00" },
          ].map((d) => (
            <li
              key={d.title}
              className="group flex items-center justify-between gap-2 rounded-lg border border-hairline bg-foreground/[0.03] px-3 py-2 transition hover:border-primary/30 hover:bg-primary/5"
            >
              <div className="min-w-0">
                <p className="truncate text-[12px] font-medium text-foreground">{d.title}</p>
                <span className={cn("mt-0.5 inline-block rounded-md border px-1.5 py-px text-[9px] font-medium uppercase tracking-wider", tagTone[d.tone])}>
                  {d.stage}
                </span>
              </div>
              <span className="num shrink-0 font-mono text-[11px] text-aurora">{d.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

function SectionDivider({ label, action }: { label: string; action?: string }) {
  return (
    <div className="my-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="size-1 rounded-full bg-primary shadow-[0_0_6px_var(--primary)]" />
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
          {label}
        </p>
      </div>
      {action && (
        <button className="inline-flex items-center gap-1 rounded-md border border-hairline bg-foreground/5 px-2 py-0.5 text-[10px] text-muted-foreground transition hover:text-foreground">
          <ArrowLeftRight className="size-2.5" /> {action}
        </button>
      )}
    </div>
  );
}

function Field({
  label,
  value,
  icon,
}: {
  label: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-hairline bg-background/30 px-3 py-2 transition hover:border-primary/25 hover:bg-primary/5">
      <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
        {icon}
        {label}
      </span>
      <span className="text-[12px] text-foreground">{value}</span>
    </div>
  );
}

function SelectChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md border border-hairline bg-foreground/5 px-1.5 py-0.5 text-[11px] text-foreground">
      {children}
      <ChevronDown className="size-2.5 text-muted-foreground" />
    </span>
  );
}

/* ===================== Layout ===================== */

export function NovaInbox() {
  return (
    <div className="flex h-[calc(100vh-0px)] w-full overflow-hidden">
      <ConversationList />
      <ConversationPanel />
      <DealPanel />
    </div>
  );
}
