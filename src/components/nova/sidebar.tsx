import { Link } from "@tanstack/react-router";
import {
  LayoutGrid,
  MessageSquare,
  Sparkles,
  Users,
  BarChart3,
  Settings,
  Command,
} from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { icon: LayoutGrid, label: "Pipeline", active: true },
  { icon: MessageSquare, label: "Inbox" },
  { icon: Users, label: "Contatos" },
  { icon: Sparkles, label: "NOVA AI" },
  { icon: BarChart3, label: "Insights" },
  { icon: Settings, label: "Sistema" },
];

export function NovaSidebar() {
  return (
    <aside className="glass relative flex h-screen w-[76px] flex-col items-center justify-between rounded-r-3xl border-l-0 py-6">
      <div className="flex flex-col items-center gap-8">
        {/* Logo */}
        <Link
          to="/"
          className="grid size-11 place-items-center rounded-xl border border-primary/30 [background:var(--gradient-primary)] shadow-[var(--glow-primary)]"
        >
          <Command className="size-5 text-primary-foreground" strokeWidth={2.5} />
        </Link>

        <nav className="flex flex-col gap-2">
          {items.map((it) => (
            <button
              key={it.label}
              className={cn(
                "group relative grid size-11 place-items-center rounded-xl border transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                it.active
                  ? "border-primary/40 bg-primary/10 text-primary shadow-[var(--glow-primary)]"
                  : "border-transparent text-muted-foreground hover:border-border hover:bg-white/5 hover:text-foreground",
              )}
              aria-label={it.label}
            >
              {it.active && (
                <span className="absolute -left-3 h-6 w-[3px] rounded-r-full [background:var(--gradient-primary)] shadow-[var(--glow-primary)]" />
              )}
              <it.icon className="size-[18px]" />
              <span className="pointer-events-none absolute left-full ml-3 hidden whitespace-nowrap rounded-md border border-border bg-[var(--surface-overlay)] px-2.5 py-1 text-[11px] font-medium text-foreground shadow-[var(--elev-2)] group-hover:block">
                {it.label}
              </span>
            </button>
          ))}
        </nav>
      </div>

      <div className="grid size-11 place-items-center rounded-full bg-gradient-to-br from-amber/40 to-primary/40 font-display text-sm font-semibold text-foreground ring-2 ring-border">
        VR
      </div>
    </aside>
  );
}
