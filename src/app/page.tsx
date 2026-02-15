import Link from "next/link";

const stats = [
  { label: "Active Tasks", value: "3", detail: "+2 today", emoji: "📋" },
  { label: "Completed", value: "47", detail: "This week", emoji: "✅" },
  { label: "Files", value: "128", detail: "12.4 MB", emoji: "📁" },
  { label: "API Calls", value: "1.2k", detail: "Last 24h", emoji: "⚡" },
];

const quickActions = [
  { name: "Canvas", href: "/canvas", description: "Visual workspace for ideas", emoji: "🎨" },
  { name: "To-Dos", href: "/todos", description: "Task management", emoji: "☑️" },
  { name: "Database", href: "/database", description: "Explore your data", emoji: "📊" },
  { name: "Activity", href: "/activity", description: "Live event feed", emoji: "⚡" },
];

const recentActivity = [
  { time: "2 min ago", action: "2-Wochen Report erstellt", type: "task" },
  { time: "24 min ago", action: "Schlafenszeit-Cron gefixt", type: "system" },
  { time: "6h ago", action: "Reminder für morgen gesetzt", type: "cron" },
  { time: "6h ago", action: "Gute Nacht gesagt", type: "message" },
  { time: "8h ago", action: "Marokko-Buch Kapitel 28 geschrieben", type: "task" },
  { time: "Yesterday", action: "Dashboard deployed to Vercel", type: "system" },
];

const typeColors: Record<string, string> = {
  task: "bg-blue-50 text-blue-600",
  system: "bg-orange-50 text-orange-600",
  cron: "bg-purple-50 text-purple-600",
  message: "bg-green-50 text-green-600",
};

export default function Dashboard() {
  return (
    <div className="max-w-[960px] mx-auto px-6 py-8 sm:px-10 sm:py-10 lg:px-16">
      {/* Header */}
      <div className="mb-10">
        <p className="text-[12px] text-[var(--secondary)] mb-2">
          Sunday, February 15th, 2026 · 4:30 PM
        </p>
        <h1 className="text-[28px] sm:text-[32px] font-bold text-[var(--fg)] leading-tight">
          Good afternoon, Sami ✌️
        </h1>
        <p className="text-[15px] text-[var(--secondary)] mt-1">
          Here&apos;s what&apos;s happening with Imas today
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
        {stats.map((stat) => (
          <div key={stat.label} className="notion-card p-4">
            <div className="flex items-start justify-between mb-2">
              <span className="text-[18px]">{stat.emoji}</span>
            </div>
            <p className="text-[24px] font-semibold text-[var(--fg)] leading-tight">{stat.value}</p>
            <p className="text-[13px] text-[var(--fg)] mt-0.5">{stat.label}</p>
            <p className="text-[11px] text-[var(--secondary)]">{stat.detail}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-3">
          <h2 className="section-heading">Quick Actions</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {quickActions.map((action) => (
            <Link
              key={action.name}
              href={action.href}
              className="notion-card p-4 group cursor-pointer"
            >
              <span className="text-[20px] mb-2 inline-block group-hover:scale-110 transition-transform">
                {action.emoji}
              </span>
              <p className="text-[13px] font-medium text-[var(--fg)] mb-0.5 group-hover:text-[var(--accent)] transition-colors">
                {action.name}
              </p>
              <p className="text-[12px] text-[var(--secondary)]">{action.description}</p>
              <span className="text-[var(--tertiary)] text-[12px] mt-2 block group-hover:text-[var(--accent)] transition-colors">
                Open →
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-3">
          <h2 className="section-heading">Recent Activity</h2>
          <Link href="/activity" className="text-[12px] text-[var(--secondary)] hover:text-[var(--fg)] transition-colors">
            View all →
          </Link>
        </div>
        <div className="notion-card overflow-hidden">
          {/* Mobile: stacked list */}
          <div className="sm:hidden divide-y divide-[var(--border)]">
            {recentActivity.map((item, i) => (
              <div key={i} className="px-4 py-3 hover:bg-[var(--hover)] transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${typeColors[item.type] || "bg-gray-50 text-gray-600"}`}>
                    {item.type}
                  </span>
                  <span className="text-[11px] text-[var(--secondary)] font-mono">{item.time}</span>
                </div>
                <p className="text-[13px] text-[var(--fg)]">{item.action}</p>
              </div>
            ))}
          </div>
          {/* Desktop: table */}
          <table className="w-full hidden sm:table">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--surface)]">
                <th className="text-left px-4 py-2 text-[11px] font-semibold text-[var(--secondary)] uppercase tracking-wider w-24">Time</th>
                <th className="text-left px-4 py-2 text-[11px] font-semibold text-[var(--secondary)] uppercase tracking-wider">Action</th>
                <th className="text-left px-4 py-2 text-[11px] font-semibold text-[var(--secondary)] uppercase tracking-wider w-20">Type</th>
              </tr>
            </thead>
            <tbody>
              {recentActivity.map((item, i) => (
                <tr
                  key={i}
                  className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--hover)] transition-colors"
                >
                  <td className="px-4 py-2.5 text-[12px] text-[var(--secondary)] font-mono whitespace-nowrap">
                    {item.time}
                  </td>
                  <td className="px-4 py-2.5 text-[13px] text-[var(--fg)]">
                    {item.action}
                  </td>
                  <td className="px-4 py-2.5">
                    <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${typeColors[item.type] || "bg-gray-50 text-gray-600"}`}>
                      {item.type}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* System Status */}
      <div className="mb-10">
        <h2 className="section-heading mb-3">System Status</h2>
        <div className="notion-card p-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <p className="text-[11px] text-[var(--secondary)] uppercase tracking-wide mb-1">Model</p>
              <p className="text-[13px] text-[var(--fg)] font-medium">Kimi K2.5</p>
            </div>
            <div>
              <p className="text-[11px] text-[var(--secondary)] uppercase tracking-wide mb-1">Uptime</p>
              <p className="text-[13px] text-[var(--success)] font-medium">99.9%</p>
            </div>
            <div>
              <p className="text-[11px] text-[var(--secondary)] uppercase tracking-wide mb-1">Memory</p>
              <p className="text-[13px] text-[var(--fg)] font-medium">287 MB</p>
            </div>
            <div>
              <p className="text-[11px] text-[var(--secondary)] uppercase tracking-wide mb-1">Version</p>
              <p className="text-[13px] text-[var(--fg)] font-medium">2026.2.13</p>
            </div>
          </div>
        </div>
      </div>

      {/* Command Palette Hint */}
      <div className="text-center py-4">
        <p className="text-[12px] text-[var(--tertiary)]">
          Press <kbd className="text-[11px] bg-[var(--surface)] border border-[var(--border)] rounded px-1.5 py-0.5 font-mono mx-0.5">⌘K</kbd> to search or run commands
        </p>
      </div>
    </div>
  );
}
