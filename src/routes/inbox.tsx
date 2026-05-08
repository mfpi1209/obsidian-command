import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Moon, Sun, Terminal } from "lucide-react";
import { NovaInbox } from "@/components/nova/inbox";

type Theme = "dark" | "light" | "carbon";
const ORDER: Theme[] = ["dark", "light", "carbon"];

export const Route = createFileRoute("/inbox")({
  head: () => ({
    meta: [
      { title: "NOVA · Inbox — Chat operacional" },
      {
        name: "description",
        content:
          "Inbox NOVA: lista de conversas, conversa central e painel de deal/contato — dark e light.",
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
  component: InboxPage,
});

function InboxPage() {
  const [theme, setTheme] = useState<Theme>("dark");
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark", "light", "carbon");
    root.classList.add(theme);
  }, [theme]);
  const cycle = () =>
    setTheme((t) => ORDER[(ORDER.indexOf(t) + 1) % ORDER.length]);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 hud-grid opacity-40" />
      <div className="pointer-events-none absolute -top-40 left-1/3 size-[600px] rounded-full bg-primary/10 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 size-[500px] rounded-full bg-cyan/8 blur-[160px]" />

      {/* Floating theme + back */}
      <div className="absolute right-4 top-3 z-30 flex items-center gap-2">
        <Link
          to="/"
          className="rounded-lg border border-hairline bg-surface/60 px-3 py-1.5 text-[11px] uppercase tracking-[0.16em] text-muted-foreground backdrop-blur-md transition hover:text-foreground"
        >
          ← NOVA OS
        </Link>
        <button
          onClick={cycle}
          title={`Tema: ${theme}`}
          className="grid size-8 place-items-center rounded-lg border border-hairline bg-surface/60 text-muted-foreground backdrop-blur-md transition hover:text-foreground hover:shadow-[var(--glow-primary)]"
        >
          {theme === "dark" ? (
            <Sun className="size-4" />
          ) : theme === "light" ? (
            <Terminal className="size-4" />
          ) : (
            <Moon className="size-4" />
          )}
        </button>
      </div>

      <div className="relative h-full">
        <NovaInbox />
      </div>
    </div>
  );
}
