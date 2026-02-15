"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const workspace = [
  { name: "Home", href: "/", emoji: "🏠" },
  { name: "Canvas", href: "/canvas", emoji: "🎨" },
  { name: "To-Dos", href: "/todos", emoji: "☑️" },
];

const tools = [
  { name: "Database", href: "/database", emoji: "📊" },
  { name: "Activity", href: "/activity", emoji: "⚡" },
];

function NavSection({ label, items }: { label: string; items: typeof workspace }) {
  const pathname = usePathname();
  return (
    <div className="mb-4">
      <p className="px-3 mb-1 text-[11px] font-semibold text-[var(--secondary)] uppercase tracking-wider">
        {label}
      </p>
      {items.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`group flex items-center gap-2.5 px-3 py-[5px] rounded-[var(--radius)] text-[13px] transition-colors mb-px ${
              isActive
                ? "bg-[var(--active)] text-[var(--fg)] font-medium"
                : "text-[var(--secondary)] hover:bg-[var(--hover)] hover:text-[var(--fg)]"
            }`}
          >
            <span className="text-[15px] w-5 text-center flex-shrink-0 grayscale group-hover:grayscale-0 transition-all">
              {item.emoji}
            </span>
            <span className="truncate">{item.name}</span>
            {isActive && (
              <span className="ml-auto w-1 h-4 rounded-full bg-[var(--accent)] opacity-60" />
            )}
          </Link>
        );
      })}
    </div>
  );
}

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(true)}
        className="sidebar-toggle fixed top-3 left-3 z-50 p-2 rounded-[var(--radius)] bg-[var(--bg)] border border-[var(--border)] hover:bg-[var(--hover)] transition-colors"
        aria-label="Open sidebar"
      >
        <svg className="w-4 h-4 text-[var(--fg)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile overlay */}
      {open && (
        <div
          className="sidebar-overlay"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside className={`w-[var(--sidebar-width)] border-r border-[var(--border)] flex flex-col bg-[var(--surface)] select-none flex-shrink-0 ${open ? "sidebar-open fixed inset-y-0 left-0 z-50" : ""}`}>
        {/* Workspace header */}
        <div className="px-3 pt-3 pb-2">
          <div className="flex items-center gap-2 px-2 py-1.5 rounded-[var(--radius)] hover:bg-[var(--hover)] transition-colors cursor-pointer" role="button" tabIndex={0}>
            <div className="w-[22px] h-[22px] rounded-[5px] bg-gradient-to-br from-[var(--accent)] to-[#9b59b6] flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0">
              I
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-[var(--fg)] truncate leading-tight">Imas</p>
              <p className="text-[10px] text-[var(--secondary)] leading-tight">Control Center</p>
            </div>
            <svg className="w-3 h-3 text-[var(--tertiary)] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
            </svg>
          </div>
        </div>

        {/* Search hint */}
        <div className="px-3 mb-3">
          <div className="flex items-center gap-2 px-2.5 py-[5px] rounded-[var(--radius)] bg-[var(--hover)] text-[var(--tertiary)] text-[12px] cursor-pointer hover:bg-[var(--active)] transition-colors" role="button" tabIndex={0}>
            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span>Search</span>
            <kbd className="ml-auto text-[10px] bg-[var(--bg)] border border-[var(--border)] rounded px-1 py-0.5 font-mono">⌘K</kbd>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 overflow-auto">
          <NavSection label="Workspace" items={workspace} />
          <NavSection label="Tools" items={tools} />
        </nav>

        {/* Bottom status */}
        <div className="px-3 py-3 border-t border-[var(--border)]">
          <div className="flex items-center gap-2.5 px-2 py-1.5 rounded-[var(--radius)] hover:bg-[var(--hover)] transition-colors cursor-pointer">
            <span className="relative flex-shrink-0">
              <span className="w-2 h-2 rounded-full bg-[var(--success)] block" />
              <span className="absolute inset-0 w-2 h-2 rounded-full bg-[var(--success)] animate-ping opacity-20" />
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] text-[var(--fg)] leading-tight">Online</p>
              <p className="text-[10px] text-[var(--secondary)] leading-tight">Kimi K2.5 · 99.9% uptime</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
