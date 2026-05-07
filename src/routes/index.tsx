import { createFileRoute } from "@tanstack/react-router";
import {
  Activity,
  ArrowUpRight,
  Bot,
  Command as CommandIcon,
  Layers,
  Search,
  Sparkles,
  TrendingUp,
  Wand2,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { LuxCard } from "@/components/nova/lux-card";
import { SmartInput } from "@/components/nova/smart-input";
import { NovaSidebar } from "@/components/nova/sidebar";
import { KanbanBoard, type KanbanColumnData } from "@/components/nova/kanban";
import { ChatPanel } from "@/components/nova/chat-panel";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NOVA OS — Design System for the Commercial Future" },
      {
        name: "description",
        content:
          "NOVA OS is a proprietary design system for a futuristic, premium CRM with Kanban, omnichannel chat and integrated AI.",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter+Tight:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  component: NovaShowcase,
});

const columns: KanbanColumnData[] = [
  {
    id: "qual",
    title: "Qualificação",
    hint: "12 oportunidades · 24h",
    total: "R$ 482k",
    cards: [
      {
        id: "1",
        title: "Expansão regional Sul",
        company: "Vértice Logística",
        value: "R$ 124.000",
        tag: "Quente",
        tagTone: "amber",
        messages: 8,
        attachments: 2,
        ai: "Decisor confirmou orçamento. Próximo passo: agendar demo executiva.",
        avatar: "VL",
      },
      {
        id: "2",
        title: "Migração ERP completa",
        company: "Hólos Indústria",
        value: "R$ 86.500",
        tag: "Novo",
        tagTone: "cyan",
        messages: 3,
        attachments: 1,
        avatar: "HI",
      },
    ],
  },
  {
    id: "prop",
    title: "Proposta",
    hint: "9 oportunidades · em revisão",
    total: "R$ 318k",
    cards: [
      {
        id: "3",
        title: "Plano Enterprise anual",
        company: "Aurora Capital",
        value: "R$ 240.000",
        tag: "Prioridade",
        tagTone: "primary",
        messages: 14,
        attachments: 5,
        ai: "Sentimento positivo nas últimas 3 mensagens. Probabilidade: 78%.",
        avatar: "AC",
      },
      {
        id: "4",
        title: "Implantação multi-loja",
        company: "Núcleo Retail",
        value: "R$ 78.000",
        tag: "Negociando",
        tagTone: "amber",
        messages: 6,
        attachments: 3,
        avatar: "NR",
      },
    ],
  },
  {
    id: "fechamento",
    title: "Fechamento",
    hint: "previsão para esta semana",
    total: "R$ 612k",
    cards: [
      {
        id: "5",
        title: "Contrato 24 meses",
        company: "Pólux Energia",
        value: "R$ 412.000",
        tag: "Ganho",
        tagTone: "success",
        messages: 22,
        attachments: 9,
        ai: "Cliente aceitou termos finais. Gerar contrato e enviar para assinatura.",
        avatar: "PE",
      },
      {
        id: "6",
        title: "Renovação anual premium",
        company: "Cerne Studio",
        value: "R$ 200.000",
        tag: "Em análise",
        tagTone: "primary",
        messages: 11,
        attachments: 4,
        avatar: "CS",
      },
    ],
  },
];

const chatMessages = [
  {
    id: "m1",
    from: "them" as const,
    channel: "whatsapp" as const,
    text: "Recebemos a proposta. A diretoria gostou da arquitetura, mas temos dúvidas sobre o SLA.",
    time: "09:42",
  },
  {
    id: "m2",
    from: "ai" as const,
    text: "Cliente demonstra interesse alto. Sugiro responder com o detalhamento do SLA Enterprise (99,99%) e oferecer reunião com o time técnico nesta semana.",
    time: "",
  },
  {
    id: "m3",
    from: "me" as const,
    channel: "whatsapp" as const,
    text: "Perfeito, Marina. Nosso SLA Enterprise garante 99,99% com resposta em até 15 minutos. Posso agendar uma call com nosso CTO ainda esta semana?",
    time: "09:44",
  },
  {
    id: "m4",
    from: "them" as const,
    channel: "whatsapp" as const,
    text: "Top. Quinta às 15h funciona pra vocês?",
    time: "09:46",
  },
];

function NovaShowcase() {
  return (
    <div className="relative flex min-h-screen w-full overflow-hidden bg-background text-foreground">
      {/* Ambient HUD background */}
      <div className="pointer-events-none absolute inset-0 hud-grid opacity-60" />
      <div className="pointer-events-none absolute -top-40 left-1/3 size-[600px] rounded-full bg-primary/15 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 size-[500px] rounded-full bg-amber/10 blur-[160px]" />

      <NovaSidebar />

      <main className="relative flex-1 overflow-y-auto">
        {/* Top bar */}
        <header className="sticky top-0 z-20 flex items-center justify-between gap-6 border-b border-hairline bg-background/60 px-10 py-4 backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              NOVA · Operations
            </p>
            <span className="hairline h-4 w-px bg-border" />
            <h1 className="font-display text-lg font-semibold tracking-tight">
              Pipeline · Q2 / Time Alfa
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 rounded-lg border border-border bg-white/5 px-3 py-2 text-[12px] text-muted-foreground">
              <Search className="size-3.5" />
              Buscar contatos, deals, mensagens…
              <kbd className="ml-3 rounded border border-border bg-background/60 px-1.5 font-mono text-[10px]">
                ⌘K
              </kbd>
            </div>
            <Button variant="smart" size="sm">
              <Sparkles className="size-3.5" /> NOVA Copilot
            </Button>
          </div>
        </header>

        <div className="mx-auto max-w-[1480px] space-y-12 px-10 py-10">
          {/* Hero */}
          <section className="relative overflow-hidden rounded-3xl border border-border-strong glass-strong p-10">
            <div className="scan-line absolute inset-0 opacity-40" />
            <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="anim-in space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/8 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-primary">
                  <span className="size-1.5 rounded-full bg-primary pulse-ring" />
                  Design System v1.0 · NOVA OS
                </div>
                <h2 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
                  Não é um <span className="text-aurora">CRM</span>.
                  <br />É um sistema operacional comercial.
                </h2>
                <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
                  Uma central de comando cinematográfica para times de alta performance.
                  Kanban fluido, chat omnichannel e inteligência integrada — tudo
                  desenhado com a precisão de um cockpit e a elegância de um produto Apple.
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Button size="lg">
                    <Zap className="size-4" /> Iniciar operação
                  </Button>
                  <Button variant="floating" size="lg">
                    <Wand2 className="size-4" /> Ver linguagem visual
                  </Button>
                </div>
                <dl className="grid grid-cols-3 gap-6 pt-6">
                  {[
                    { k: "Latência média", v: "42ms" },
                    { k: "Conversão IA", v: "+38%" },
                    { k: "Tempo de resposta", v: "1.2s" },
                  ].map((s) => (
                    <div key={s.k}>
                      <p className="num font-display text-3xl font-semibold text-aurora">
                        {s.v}
                      </p>
                      <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                        {s.k}
                      </p>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Cockpit gauge */}
              <div className="relative grid place-items-center">
                <div className="float-soft relative aspect-square w-[360px]">
                  <div className="absolute inset-0 rounded-full border border-border bg-[radial-gradient(circle_at_50%_30%,oklch(0.72_0.15_232/0.25),transparent_60%)]" />
                  <div className="absolute inset-6 rounded-full border border-border-strong [background:var(--gradient-metal)] shadow-[var(--elev-4),inset_0_1px_0_oklch(1_0_0/0.1)]" />
                  <div className="absolute inset-12 rounded-full border border-primary/30 bg-background/60 backdrop-blur-2xl" />
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="text-center">
                      <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                        Performance Index
                      </p>
                      <p className="num mt-2 font-display text-7xl font-semibold text-aurora">
                        94
                      </p>
                      <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-success">
                        ▲ 12 vs semana
                      </p>
                    </div>
                  </div>
                  {/* tick marks */}
                  {Array.from({ length: 36 }).map((_, i) => (
                    <span
                      key={i}
                      className="absolute left-1/2 top-1/2 h-[180px] w-[1px] origin-bottom"
                      style={{
                        transform: `translate(-50%,-100%) rotate(${i * 10}deg)`,
                      }}
                    >
                      <span
                        className={`absolute top-0 h-2 w-px ${
                          i % 3 === 0 ? "bg-primary/60" : "bg-border"
                        }`}
                      />
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Foundation tokens */}
          <section className="space-y-6">
            <SectionHeader
              eyebrow="Foundation"
              title="Tokens vivos, profundidade física"
              caption="Cores luxuosas, superfícies em camadas e iluminação contextual formam a base do NOVA OS."
            />
            <div className="grid gap-5 md:grid-cols-3">
              <LuxCard>
                <h4 className="mb-4 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  Color System
                </h4>
                <div className="grid grid-cols-5 gap-2">
                  {[
                    ["Graphite", "var(--background)"],
                    ["Surface", "var(--surface)"],
                    ["Raised", "var(--surface-raised)"],
                    ["Overlay", "var(--surface-overlay)"],
                    ["Hairline", "var(--border-strong)"],
                  ].map(([n, c]) => (
                    <div key={n} className="space-y-1.5">
                      <div
                        className="aspect-square rounded-lg border border-border shadow-[var(--elev-1)]"
                        style={{ background: c }}
                      />
                      <p className="text-[10px] text-muted-foreground">{n}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 grid grid-cols-4 gap-2">
                  {[
                    ["Primary", "var(--gradient-primary)"],
                    ["Amber", "var(--gradient-amber)"],
                    ["Cyan", "oklch(0.84 0.13 200)"],
                    ["Success", "oklch(0.78 0.15 158)"],
                  ].map(([n, c]) => (
                    <div key={n} className="space-y-1.5">
                      <div
                        className="h-12 rounded-lg shadow-[var(--elev-2)]"
                        style={{ background: c }}
                      />
                      <p className="text-[10px] text-muted-foreground">{n}</p>
                    </div>
                  ))}
                </div>
              </LuxCard>

              <LuxCard>
                <h4 className="mb-4 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  Typography
                </h4>
                <p className="font-display text-4xl font-semibold tracking-tight text-aurora">
                  Aa Bb Cc
                </p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  Space Grotesk · Display
                </p>
                <div className="my-4 hairline" />
                <p className="text-2xl font-medium tracking-tight">Inter Tight · Body</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Leitura confortável em ambientes densos com hierarquia clara e ritmo
                  visual consistente.
                </p>
                <p className="num mt-4 font-mono text-base text-cyan">
                  R$ 4.218.502,00 · +24.6% · 99.99%
                </p>
              </LuxCard>

              <LuxCard>
                <h4 className="mb-4 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  Depth & Glow
                </h4>
                <div className="space-y-3">
                  {[
                    { label: "Elevation 1", cls: "shadow-[var(--elev-1)]" },
                    { label: "Elevation 2", cls: "shadow-[var(--elev-2)]" },
                    { label: "Elevation 3", cls: "shadow-[var(--elev-3)]" },
                    {
                      label: "Glow Primary",
                      cls: "shadow-[var(--glow-primary)] border-primary/30",
                    },
                  ].map((d) => (
                    <div
                      key={d.label}
                      className={`flex items-center justify-between rounded-xl border border-border bg-[var(--surface-raised)] px-4 py-3 ${d.cls}`}
                    >
                      <span className="text-sm">{d.label}</span>
                      <Layers className="size-4 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </LuxCard>
            </div>
          </section>

          {/* Components */}
          <section className="space-y-6">
            <SectionHeader
              eyebrow="Component System"
              title="Componentes proprietários"
              caption="Botões táteis, inputs inteligentes, cards-assinatura — todos com microinterações refinadas."
            />
            <div className="grid gap-5 lg:grid-cols-2">
              <LuxCard className="space-y-6">
                <h4 className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  Smart Actions
                </h4>
                <div className="flex flex-wrap gap-3">
                  <Button>
                    <Zap className="size-4" /> Primary
                  </Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="floating">
                    <ArrowUpRight className="size-4" /> Floating
                  </Button>
                  <Button variant="smart">
                    <Sparkles className="size-4" /> Smart
                  </Button>
                </div>
                <div className="hairline" />
                <h4 className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  Smart Inputs
                </h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <SmartInput label="Nome do contato" />
                  <SmartInput
                    label="Buscar oportunidade"
                    icon={<Search className="size-4" />}
                  />
                </div>
              </LuxCard>

              <LuxCard className="relative overflow-hidden" glow="primary">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-primary">
                      NOVA AI · Insight
                    </p>
                    <h4 className="mt-1 font-display text-xl font-semibold">
                      Próxima ação recomendada
                    </h4>
                  </div>
                  <Bot className="size-6 text-primary" />
                </div>
                <p className="text-sm leading-relaxed text-foreground/85">
                  3 oportunidades em "Proposta" estão sem resposta há mais de 48h.
                  <span className="text-primary">
                    {" "}
                    Sugiro disparar follow-ups personalizados agora
                  </span>
                  — projeção de recuperação de R$ 168k.
                </p>
                <div className="mt-5 flex items-center gap-2">
                  <Button size="sm">Executar agora</Button>
                  <Button size="sm" variant="ghost">
                    Ver detalhes
                  </Button>
                </div>
                <div className="mt-6 grid grid-cols-3 gap-3">
                  {[
                    { k: "Leads ativos", v: "284", trend: "+12%" },
                    { k: "Resposta IA", v: "1.4s", trend: "-0.3s" },
                    { k: "Conversão", v: "32%", trend: "+6.2%" },
                  ].map((m) => (
                    <div
                      key={m.k}
                      className="rounded-xl border border-border bg-background/40 p-3"
                    >
                      <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                        {m.k}
                      </p>
                      <p className="num mt-1 font-display text-xl font-semibold">
                        {m.v}
                      </p>
                      <p className="text-[10px] text-success">{m.trend}</p>
                    </div>
                  ))}
                </div>
              </LuxCard>
            </div>
          </section>

          {/* Kanban */}
          <section className="space-y-6">
            <SectionHeader
              eyebrow="Kanban Flow"
              title="Um fluxo comercial vivo"
              caption="Colunas fluidas, cards com personalidade e indicadores contextuais de IA."
            />
            <div className="rounded-3xl border border-border bg-[var(--surface)]/40 p-6 backdrop-blur-md">
              <KanbanBoard columns={columns} />
            </div>
          </section>

          {/* Chat */}
          <section className="space-y-6">
            <SectionHeader
              eyebrow="Omnichannel · IA"
              title="Conversas com inteligência integrada"
              caption="Timeline híbrida com WhatsApp, Instagram e e-mail. NOVA participa em tempo real."
            />
            <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
              <ChatPanel
                contact={{
                  name: "Marina Vieira",
                  meta: "Aurora Capital · CFO",
                  avatar: "MV",
                }}
                messages={chatMessages}
                aiSuggestion='NOVA sugere: "Quinta às 15h fechado. Vou enviar o convite com o link da call agora."'
              />
              <div className="space-y-5">
                <LuxCard>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                    Contexto da conversa
                  </p>
                  <h4 className="mt-2 font-display text-lg font-semibold">
                    Aurora Capital · R$ 240.000
                  </h4>
                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <Stat icon={<TrendingUp className="size-4" />} label="Probabilidade" value="78%" tone="success" />
                    <Stat icon={<Activity className="size-4" />} label="Sentimento" value="Positivo" tone="cyan" />
                    <Stat icon={<CommandIcon className="size-4" />} label="Estágio" value="Proposta" tone="amber" />
                    <Stat icon={<Sparkles className="size-4" />} label="Score IA" value="9.2" tone="primary" />
                  </div>
                </LuxCard>
                <LuxCard glow="amber" className="relative overflow-hidden">
                  <div className="mb-3 flex items-center gap-2">
                    <Sparkles className="size-4 text-amber" />
                    <p className="text-[11px] uppercase tracking-[0.2em] text-amber">
                      NOVA · Resumo automático
                    </p>
                  </div>
                  <p className="text-sm leading-relaxed text-foreground/85">
                    Marina aprovou proposta técnica. Pendência única é o SLA Enterprise.
                    Reunião agendada para quinta às 15h com o CTO. Probabilidade de
                    fechamento subiu para <span className="text-amber">78%</span>.
                  </p>
                  <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                    <div className="h-full w-[78%] [background:var(--gradient-amber)] shadow-[var(--glow-amber)]" />
                  </div>
                </LuxCard>
              </div>
            </div>
          </section>

          {/* Footer principles */}
          <section className="rounded-3xl border border-border glass p-10">
            <SectionHeader
              eyebrow="Visual Identity Rules"
              title="Princípios da linguagem"
            />
            <div className="mt-6 grid gap-6 md:grid-cols-4">
              {[
                ["Iluminação", "Glow contextual sutil. Nada agressivo."],
                ["Profundidade", "Camadas físicas, sombras inteligentes."],
                ["Tipografia", "Display cinemática, números tabulares."],
                ["Movimento", "Easing cinematográfico, sempre funcional."],
              ].map(([t, d]) => (
                <div key={t} className="space-y-2">
                  <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                    {t}
                  </p>
                  <p className="text-sm text-muted-foreground">{d}</p>
                </div>
              ))}
            </div>
          </section>

          <p className="pb-6 text-center text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            NOVA OS · Design System · feito para times que operam o futuro
          </p>
        </div>
      </main>
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  caption,
}: {
  eyebrow: string;
  title: string;
  caption?: string;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="text-[11px] uppercase tracking-[0.22em] text-primary/80">
          {eyebrow}
        </p>
        <h3 className="mt-2 font-display text-3xl font-semibold tracking-tight">
          {title}
        </h3>
      </div>
      {caption && (
        <p className="max-w-md text-sm text-muted-foreground">{caption}</p>
      )}
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  tone: "primary" | "amber" | "cyan" | "success";
}) {
  const tones: Record<string, string> = {
    primary: "text-primary",
    amber: "text-amber",
    cyan: "text-cyan",
    success: "text-success",
  };
  return (
    <div className="rounded-xl border border-border bg-[var(--surface-raised)] p-3">
      <div className={`flex items-center gap-2 ${tones[tone]}`}>
        {icon}
        <p className="text-[10px] uppercase tracking-[0.16em]">{label}</p>
      </div>
      <p className="num mt-1 font-display text-lg font-semibold">{value}</p>
    </div>
  );
}
