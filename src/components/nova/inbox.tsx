import * as React from "react";
import {
  Activity,
  AlertCircle,
  ArrowLeftRight,
  Bell,
  Bot,
  CheckCheck,
  ChevronDown,
  ChevronRight,
  Clock,
  Download,
  FileText,
  Filter,
  Headphones,
  List,
  Mail,
  MessageSquare,
  Mic,
  Paperclip,
  Phone,
  Pin,
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
   NOVA · Inbox / Chat Operacional — V2
   - Dataset alinhado ao preview (Ana Beatriz Ramos ativa)
   - Novas variantes: template, attachment, note
   - Composer com estados: active | expired (sessão 24h)
   - Painel CRM com empty state de Negócio
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

/* Ordem do preview: Ana(ativa) ▸ Ana(IG) ▸ Karina ▸ Diego ▸ João ▸ Leonardo ▸ Jéssica */
const conversations: Conversation[] = [
  {
    id: "ana1",
    contact: "Ana Beatriz Ramos",
    initials: "AR",
    channel: "whatsapp",
    preview: "Tenho uma dúvida sobre o pagamento…",
    age: "3 sem",
    ownerInitials: "AE",
    unread: 2,
    active: true,
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
    id: "diego",
    contact: "Diego Alves",
    initials: "DA",
    channel: "whatsapp",
    preview: "oba",
    age: "3 sem",
    ownerInitials: "AE",
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
    age: "3 sem",
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
    age: "3 sem",
    ownerInitials: "AE",
    audio: true,
    read: true,
    tags: [
      { label: "Parceiro", tone: "success" },
      { label: "Quente", tone: "amber" },
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

/* ===================== Mensagens (Ana Beatriz) ===================== */

interface ChatMessage {
  id: string;
  from: "them" | "me" | "ai" | "note";
  variant?: "text" | "template" | "attachment";
  text?: string;
  templateId?: string;
  file?: { name: string; size: string; kind: "pdf" | "img" | "doc" };
  noteAuthor?: string;
  time: string;
  read?: boolean;
}

const messages: ChatMessage[] = [
  {
    id: "m1",
    from: "me",
    variant: "template",
    templateId: "promo_abril_2026",
    text:
      "Olá Ana! 🌟 Estamos com vagas abertas para a turma de Abril. Posso te enviar a grade completa e condições especiais para indicação?",
    time: "13:12",
    read: true,
  },
  {
    id: "m2",
    from: "them",
    text: "Oi! Sim, por favor. Recebi sua indicação pela Karina 💙",
    time: "13:35",
  },
  {
    id: "m3",
    from: "them",
    text: "Tenho uma dúvida sobre o pagamento — vocês parcelam em quantas vezes?",
    time: "13:38",
  },
  {
    id: "m4",
    from: "note",
    noteAuthor: "Admin EduIT",
    text:
      "Lead veio por indicação da Karina (parceira). Aplicar cupom INDICA20 e priorizar resposta — perfil quente.",
    time: "13:52",
  },
  {
    id: "m5",
    from: "me",
    variant: "attachment",
    file: { name: "grade-curso-ia-abril-2026.pdf", size: "2.4 MB", kind: "pdf" },
    time: "14:01",
    read: true,
  },
  {
    id: "m6",
    from: "me",
    text:
      "Ana, segue a grade. Parcelamos em até 12x sem juros no cartão e com 20% off via cupom INDICA20 (indicação da Karina).",
    time: "14:02",
    read: true,
  },
  {
    id: "m7",
    from: "ai",
    text:
      "Lead com 92% de probabilidade de conversão. Sugestão: agendar call de 15min ainda hoje e enviar contrato após confirmação.",
    time: "14:04",
  },
  {
    id: "m8",
    from: "them",
    text: "Perfeito! Consigo às 17h?",
    time: "14:06",
  },
];

/* ===================== Avatar ===================== */

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

      <div className="px-4 py-3">
        <InboxFilterMenu />
      </div>

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
        tone={
          conv.channel === "instagram"
            ? "amber"
            : conv.channel === "email"
              ? "cyan"
              : "success"
        }
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
  const [composer, setComposer] = React.useState<"active" | "expired">("expired");

  return (
    <section className="flex h-full flex-1 flex-col bg-background/30">
      <header className="flex items-center justify-between gap-4 border-b border-hairline bg-surface/40 px-5 py-3 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <ChannelAvatar initials="AR" channel="whatsapp" size="lg" tone="success" />
          <div>
            <h3 className="font-display text-[15px] font-semibold leading-tight">
              Ana Beatriz Ramos
            </h3>
            <p className="num font-mono text-[11px] text-muted-foreground">
              +55 11 92222-2222 · sessão expirada há 22h
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
          <button
            onClick={() =>
              setComposer((c) => (c === "active" ? "expired" : "active"))
            }
            title="Alternar estado do composer (demo)"
            className="grid size-8 place-items-center rounded-lg border border-hairline bg-foreground/5 text-muted-foreground transition hover:text-foreground"
          >
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

      <div className="relative flex-1 overflow-y-auto px-8 py-6">
        <div className="pointer-events-none absolute inset-0 hud-grid opacity-30" />
        <div className="relative mx-auto flex max-w-[720px] flex-col gap-4">
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

      {composer === "expired" && (
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
      )}

      <div className="border-t border-hairline bg-surface/40 px-5 py-3 backdrop-blur-xl">
        {composer === "active" ? <ComposerActive /> : <ComposerExpired />}
      </div>
    </section>
  );
}

function ComposerActive() {
  return (
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
  );
}

function ComposerExpired() {
  return (
    <div className="flex items-end gap-2 opacity-95">
      <button className="grid size-9 place-items-center rounded-lg border border-hairline bg-foreground/5 text-muted-foreground/60 transition">
        <Plus className="size-4" />
      </button>
      <div className="relative flex-1">
        <textarea
          rows={1}
          disabled
          placeholder="Sessão expirada — selecione um template aprovado para retomar a conversa"
          className="w-full resize-none rounded-xl border border-amber/25 bg-amber/[0.04] px-4 py-2.5 pr-32 text-[13px] text-muted-foreground placeholder:text-muted-foreground/80 backdrop-blur-md outline-none"
        />
        <div className="absolute right-2 top-1.5 flex items-center gap-1">
          <button className="inline-flex items-center gap-1 rounded-md border border-amber/35 bg-amber/12 px-2 py-1 text-[10px] font-medium text-amber transition hover:bg-amber/20">
            <Sparkles className="size-3" /> Templates
          </button>
        </div>
      </div>
      <button className="grid size-9 place-items-center rounded-lg border border-hairline bg-foreground/5 text-muted-foreground/60">
        <Mic className="size-4" />
      </button>
    </div>
  );
}

/* ===================== Bubbles (text · template · attachment · note · ai) ===================== */

function MessageBubble({ m, index }: { m: ChatMessage; index: number }) {
  const delay = { animationDelay: `${index * 50}ms` } as React.CSSProperties;

  if (m.from === "ai") {
    return (
      <div
        className="anim-in self-center max-w-[80%] rounded-2xl border border-primary/25 bg-primary/8 px-4 py-2.5 backdrop-blur-md"
        style={delay}
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

  if (m.from === "note") {
    return (
      <div
        className="anim-in self-stretch rounded-2xl border border-amber/30 bg-amber/[0.06] px-4 py-3 backdrop-blur-md"
        style={delay}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="grid size-5 place-items-center rounded-md bg-amber/20 text-amber">
              <Pin className="size-3" />
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-amber">
              Nota interna
            </span>
            {m.noteAuthor && (
              <span className="text-[10px] text-muted-foreground">· {m.noteAuthor}</span>
            )}
          </div>
          <span className="num font-mono text-[10px] text-muted-foreground">{m.time}</span>
        </div>
        <p className="mt-1.5 text-[12.5px] leading-relaxed text-foreground/90">{m.text}</p>
      </div>
    );
  }

  const isMe = m.from === "me";

  if (m.variant === "attachment" && m.file) {
    return (
      <div
        className={cn("anim-in flex items-end gap-2", isMe ? "justify-end" : "justify-start")}
        style={delay}
      >
        {!isMe && <ChannelAvatar initials="AR" size="sm" tone="success" />}
        <div className="max-w-[70%]">
          <div
            className={cn(
              "flex items-center gap-3 rounded-2xl border px-3 py-2.5 shadow-[var(--elev-1)] backdrop-blur-md",
              isMe
                ? "rounded-br-md border-primary/40 bg-primary/12"
                : "rounded-bl-md border-hairline bg-surface/70",
            )}
          >
            <span
              className={cn(
                "grid size-10 place-items-center rounded-lg",
                isMe ? "bg-primary/20 text-primary" : "bg-foreground/10 text-foreground",
              )}
            >
              <FileText className="size-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[12.5px] font-medium text-foreground">
                {m.file.name}
              </p>
              <p className="num font-mono text-[10px] text-muted-foreground">
                PDF · {m.file.size}
              </p>
            </div>
            <button
              className="grid size-8 place-items-center rounded-lg bg-foreground/5 text-muted-foreground transition hover:text-foreground"
            >
              <Download className="size-3.5" />
            </button>
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

  if (m.variant === "template") {
    return (
      <div
        className={cn("anim-in flex items-end gap-2", isMe ? "justify-end" : "justify-start")}
        style={delay}
      >
        {!isMe && <ChannelAvatar initials="AR" size="sm" tone="success" />}
        <div className="max-w-[70%]">
          <div
            className={cn(
              "rounded-2xl border px-4 py-2.5 text-[13px] leading-relaxed shadow-[var(--elev-1)] backdrop-blur-md",
              isMe
                ? "rounded-br-md border-success/35 bg-success/10 text-foreground"
                : "rounded-bl-md border-hairline bg-surface/70 text-foreground",
            )}
          >
            <div className="mb-1.5 flex items-center gap-1.5">
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-md border px-1.5 py-px text-[9px] font-semibold uppercase tracking-[0.16em]",
                  isMe
                    ? "border-success/40 bg-success/15 text-success"
                    : "border-amber/35 bg-amber/12 text-amber",
                )}
              >
                <Sparkles className="size-2.5" /> Template
              </span>
              {m.templateId && (
                <span className="num font-mono text-[10px] text-muted-foreground">
                  [TEMPLATE:{m.templateId}]
                </span>
              )}
            </div>
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

  return (
    <div
      className={cn("anim-in flex items-end gap-2", isMe ? "justify-end" : "justify-start")}
      style={delay}
    >
      {!isMe && <ChannelAvatar initials="AR" size="sm" tone="success" />}
      <div className="max-w-[70%]">
        <div
          className={cn(
            "rounded-2xl border px-4 py-2.5 text-[13px] leading-relaxed shadow-[var(--elev-1)] backdrop-blur-md",
            isMe
              ? "rounded-br-md border-primary/35 bg-primary/12 text-foreground"
              : "rounded-bl-md border-hairline bg-surface/70 text-foreground",
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

/* ===================== Coluna 3 — Deal & Contato (Ana) ===================== */

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
        {/* Identidade — Ana, sem tags */}
        <div className="flex items-start gap-3 pb-4">
          <ChannelAvatar initials="AR" channel="whatsapp" size="lg" tone="success" />
          <div className="min-w-0 flex-1">
            <h4 className="font-display text-[16px] font-semibold tracking-tight text-aurora">
              Ana Beatriz Ramos
            </h4>
            <p className="num mt-0.5 font-mono text-[11px] text-muted-foreground">
              +55 11 92222-2222
            </p>
          </div>
        </div>

        <SectionDivider label="Negócio" action="Layout" />

        {/* Empty state — sem negócio ativo */}
        <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border bg-foreground/[0.02] py-7 text-center">
          <span className="grid size-10 place-items-center rounded-full border border-hairline bg-foreground/5 text-muted-foreground">
            <Tag className="size-4" />
          </span>
          <p className="text-[12px] font-medium text-foreground">Nenhum negócio ativo</p>
          <p className="text-[11px] text-muted-foreground">
            Crie um deal para acompanhar a jornada
          </p>
          <button className="mt-1 inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-br from-primary to-cyan/80 px-3 py-1.5 text-[11px] font-semibold text-primary-foreground shadow-[var(--glow-primary)] transition hover:brightness-110">
            <Plus className="size-3" /> Criar
          </button>
        </div>

        <SectionDivider label="Contato" />

        <div className="space-y-2.5">
          <Field
            icon={<Phone className="size-3.5" />}
            label="Telefone"
            value={<span className="num font-mono">+55 11 92222-2222</span>}
          />
          <Field
            icon={<Mail className="size-3.5" />}
            label="E-mail"
            value={<span className="text-cyan">ana.ramos@example.com</span>}
          />
          <Field
            icon={<Star className="size-3.5" />}
            label="Fase"
            value={<SelectChip>Lead</SelectChip>}
          />
          <Field
            icon={<Zap className="size-3.5" />}
            label="Engajamento"
            value={
              <span
                className={cn(
                  "rounded-md border px-1.5 py-px text-[10px] font-medium uppercase tracking-wider",
                  tagTone.success,
                )}
              >
                Alto
              </span>
            }
          />
          <Field
            icon={<Headphones className="size-3.5" />}
            label="Interesses"
            value={
              <div className="flex gap-1">
                <span
                  className={cn(
                    "rounded-md border px-1.5 py-px text-[10px] font-medium uppercase tracking-wider",
                    tagTone.amber,
                  )}
                >
                  Quente
                </span>
                <span
                  className={cn(
                    "rounded-md border px-1.5 py-px text-[10px] font-medium uppercase tracking-wider",
                    tagTone.primary,
                  )}
                >
                  Indicação
                </span>
              </div>
            }
          />
        </div>

        <SectionDivider label="Todos os negócios" />

        <ul className="space-y-1.5">
          {[
            {
              title: "Curso de IA — Turma Abril",
              stage: "Proposta",
              tone: "amber" as Tone,
              value: "R$ 2.490,00",
            },
            {
              title: "Mentoria Indicação",
              stage: "Qualificação",
              tone: "primary" as Tone,
              value: "R$ 890,00",
            },
          ].map((d) => (
            <li
              key={d.title}
              className="group flex items-center justify-between gap-2 rounded-lg border border-hairline bg-foreground/[0.03] px-3 py-2 transition hover:border-primary/30 hover:bg-primary/5"
            >
              <div className="min-w-0">
                <p className="truncate text-[12px] font-medium text-foreground">{d.title}</p>
                <span
                  className={cn(
                    "mt-0.5 inline-block rounded-md border px-1.5 py-px text-[9px] font-medium uppercase tracking-wider",
                    tagTone[d.tone],
                  )}
                >
                  {d.stage}
                </span>
              </div>
              <span className="num shrink-0 font-mono text-[11px] text-aurora">{d.value}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer fixo */}
      <div className="border-t border-hairline bg-surface/60 px-5 py-3 backdrop-blur-xl">
        <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-3 py-2 text-[12px] font-semibold text-primary transition hover:bg-primary/15 hover:shadow-[var(--glow-primary)]">
          Abrir perfil completo <ChevronRight className="size-3.5" />
        </button>
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
