# 🎯 Prompt cirúrgico — Refatorar Deal Workspace (NOVA OS)

> **Contexto:** o Deal Workspace é a tela aberta ao clicar num card do Kanban. Ele precisa adotar **100%** o padrão visual do NOVA OS (mesmo shell de `/inbox` e `/kanban`) e seguir o redesign que já está validado no preview em `/deal`.
>
> **Objetivo do Cursor:** **NÃO editar incrementalmente** os arquivos antigos. Substituir por completo usando o drop-in `nova-deal-workspace-dropin.zip`.

---

## 0. Procedimento atômico (executar nesta ordem, sem desviar)

```bash
# 1) APAGAR qualquer versão antiga (se existir)
rm -f src/components/nova/deal-workspace.tsx
rm -f src/components/nova/deal.tsx
rm -f src/routes/deal.tsx
rm -f src/routes/deal.\$dealId.tsx

# 2) EXTRAIR o drop-in na raiz do projeto
unzip -o nova-deal-workspace-dropin.zip -d .

# 3) VALIDAR fingerprints obrigatórias (ver §2)
grep -RIn "glass-strong\|lux-card\|hud-grid\|text-aurora\|hairline" src/components/nova/deal-workspace.tsx
grep -RIn "PipelineRail\|TimelineChat\|DealAside\|QuickActions" src/components/nova/deal-workspace.tsx

# 4) VALIDAR que NENHUMA fingerprint proibida sobreviveu (ver §3)
! grep -RIn "bg-zinc-\|text-white\b\|from-zinc-\|ring-zinc\|border-zinc-\|bg-slate-9\|bg-gray-9" src/components/nova/deal-workspace.tsx src/routes/deal.tsx

# 5) Build
bun run build
```

Se qualquer passo falhar, **pare e reporte**. Não invente edits.

---

## 1. Arquivos que devem existir após o drop-in

```
src/
├── components/nova/
│   └── deal-workspace.tsx     ← componente único, exporta NovaDealWorkspace
└── routes/
    └── deal.tsx                ← rota /deal com shell NOVA (halos, hud-grid, theme toggle)
```

`src/routeTree.gen.ts` é regenerado pelo plugin do TanStack — **não editar manualmente**.

---

## 2. Fingerprints OBRIGATÓRIAS (devem aparecer no diff final)

Tokens do design system:
- `glass-strong` (header, pipeline, chat, aside)
- `lux-card` (cards de produto, eventos, próxima ação IA)
- `hairline` (separadores)
- `text-aurora` (valores monetários: R$ 119,00)
- `hud-grid` (na rota, opacidade 40)
- `shadow-[var(--glow-primary)]` / `--glow-cyan` / `--glow-amber`
- `border-hairline` / `bg-foreground/5` / `bg-foreground/[0.04]`
- `font-display` para títulos, `font-mono` + classe `num` para números

Estrutura semântica:
- `<DealHeader>` — avatar com ring-2, status do deal (estágio + #ref + valor aurora), botões Ligar/Vídeo/Marcar Ganho
- `<PipelineRail>` — lista vertical de 5 estágios com check de concluídos, estágio ativo destacado, card "Próxima ação IA"
- `<TimelineChat>` — abas (Timeline ativa | Conversa | Atividades | Notas), feed unificado com 4 tipos de item (`stage`, `event`, `note`, `msg`), composer expirado com banner âmbar + "Usar Template"
- `<DealAside>` — seções colapsáveis: Negócio, Produtos, Contato, Campos do negócio
- `<QuickActions>` — barra flutuante centralizada inferior (IA, Nota, Tarefa, Atribuir)

Layout root: `grid-rows-[auto_minmax(0,1fr)]` + `grid-cols-12` (2 / 7 / 3 em `lg`).

---

## 3. Fingerprints PROIBIDAS (NÃO podem aparecer no diff)

Cores hardcoded e tokens do visual antigo:
- ❌ `bg-zinc-*`, `text-white`, `from-zinc-*`, `ring-zinc`, `border-zinc-`
- ❌ `bg-slate-900`, `bg-gray-900`, `bg-neutral-*`
- ❌ `#ffffff`, `rgb(`, `rgba(` em className
- ❌ `border border-gray-200`
- ❌ Sidebar antiga do CRM com fundo branco/zinc
- ❌ Composer com `bg-white` ou `bg-zinc-50`
- ❌ Timeline em formato de lista plana sem cards
- ❌ Painel direito com `divide-y divide-zinc-*`

Uso semântico: **sempre** `bg-background`, `text-foreground`, `text-muted-foreground`, `border-border`, `border-hairline`, `bg-foreground/5`.

---

## 4. Contrato visual — pontos críticos

### 4.1 Header do Deal
```tsx
<header className="glass-strong relative overflow-hidden rounded-2xl px-5 py-4">
  <span className="absolute inset-x-4 top-0 h-px bg-[linear-gradient(90deg,transparent,color-mix(in_oklab,var(--amber)_70%,transparent)_50%,transparent)]" />
  {/* ← back, avatar c/ status online, identidade, badge estágio, #ref, valor aurora, ações */}
</header>
```
- Valor monetário SEMPRE: `font-display text-[18px] font-semibold text-aurora num`
- Badge de estágio usa `toneBg[tone]` + `accentDot[tone]`
- Botão "Marcar Ganho" usa gradient `from-success to-cyan/80 shadow-[var(--glow-cyan)]`

### 4.2 Pipeline Rail (lateral esquerda)
- Linha vertical de hairline conectando bullets: `<span className="absolute left-[11px] top-2 bottom-2 w-px bg-hairline" />`
- Estados: `done` (CheckCircle2 success), `active` (border-amber + bg-amber/15), futuros (border-hairline)
- Card "Próxima ação" usa `lux-card` + `Sparkles cyan` + botão gradient primary→cyan

### 4.3 Timeline + Chat unificados
4 tipos de item no mesmo feed cronológico:
- **stage** → divisor com hairline em ambos lados + pill colorida central
- **event** → `lux-card` com ícone à esquerda em quadrado bordered
- **note** → bloco `border-amber/30 bg-amber/5` com ícone StickyNote
- **msg** (from: me|them) → bolha `border-cyan/30 bg-cyan/10 shadow-[var(--glow-cyan)]` (mine) ou `border-hairline bg-foreground/5` (them); avatares 7×7 em ring-2

### 4.4 Composer expirado (sessão WhatsApp 24h)
```tsx
<div className="border-t border-hairline p-3">
  {/* Banner âmbar */}
  <div className="flex items-center gap-3 rounded-xl border border-amber/35 bg-amber/8 px-3 py-2.5">
    <Flame className="size-4 text-amber" />
    <p className="text-[12px] font-medium text-amber">Sessão de 24h encerrada</p>
    <button className="...from-amber to-destructive/70 shadow-[var(--glow-amber)]">Usar Template</button>
  </div>
  {/* Input desabilitado abaixo */}
</div>
```

### 4.5 Quick Actions flutuantes
Pill `glass-strong rounded-full` centralizada (`absolute bottom-6 left-1/2 -translate-x-1/2`) com 4 botões coloridos por `toneText`.

---

## 5. Rota `/deal` — Shell NOVA

A rota **não pinta o background do componente** — ela aplica o shell:
```tsx
<div className="relative h-screen w-full overflow-hidden bg-background text-foreground">
  <div className="pointer-events-none absolute inset-0 hud-grid opacity-40" />
  <div className="pointer-events-none absolute -top-40 left-1/3 size-[600px] rounded-full bg-primary/10 blur-[140px]" />
  <div className="pointer-events-none absolute bottom-0 right-0 size-[500px] rounded-full bg-cyan/8 blur-[160px]" />
  {/* theme toggle dark/light/carbon */}
  <NovaDealWorkspace />
</div>
```

O componente `NovaDealWorkspace` **NUNCA** define `bg-zinc-*`, `bg-white`, `bg-slate-*` no wrapper. Herda do route.

---

## 6. Acceptance checklist (rodar antes de marcar "done")

- [ ] `bun run build` passa sem erros
- [ ] `/deal` renderiza nos 3 temas (dark / light / carbon) sem cores quebradas
- [ ] `grep "bg-zinc\|text-white\|from-zinc" src/components/nova/deal-workspace.tsx` retorna **vazio**
- [ ] Header mostra avatar com dot de online (success), badge "Negociação" amber, valor "R$ 119,00" em `text-aurora`
- [ ] Pipeline lateral mostra 5 estágios; "Negociação" ativo com bullet âmbar + "há 3 dias"
- [ ] Card "Próxima ação" tem `Sparkles cyan` e botão "Executar" gradient
- [ ] Timeline mistura: 1+ divisor de stage, 1 card de evento (Phone/cyan), 1 nota amber, 3+ mensagens (umas mine cyan, outras them)
- [ ] Composer mostra banner âmbar "Sessão de 24h encerrada" + botão "Usar Template" + input disabled
- [ ] Barra flutuante inferior visível com 4 ações coloridas
- [ ] Botão "← Kanban" no canto superior direito navega para `/kanban`
- [ ] Toggle de tema cicla dark → light → carbon

---

## 7. Se algo divergir do screenshot do `/deal` em preview…

**NÃO improvise**. Reporte exatamente:
1. Qual elemento divergiu
2. O className renderizado
3. O className esperado (do drop-in)

E peça nova versão do ZIP. **Nunca** "ajeite manualmente" reintroduzindo cores hardcoded.
