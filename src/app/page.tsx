import Link from "next/link";

const stats = [
  { label: "Active Tasks", value: "3", change: "+2 today" },
  { label: "Completed", value: "47", change: "This week" },
  { label: "Files", value: "128", change: "12.4 MB" },
  { label: "API Calls", value: "1.2k", change: "Last 24h" },
];

const quickActions = [
  { name: "Canvas", href: "/canvas", icon: "🎨", description: "Visual workspace" },
  { name: "To-Dos", href: "/todos", icon: "✓", description: "Task management" },
  { name: "Database", href: "/database", icon: "💾", description: "Data explorer" },
  { name: "Activity", href: "/activity", icon: "📊", description: "Live feed" },
];

const recentActivity = [
  { time: "11:38", action: "2-Wochen Report erstellt", type: "task" },
  { time: "11:16", action: "Schlafenszeit-Cron gefixt", type: "system" },
  { time: "05:00", action: "Reminder für morgen gesetzt", type: "cron" },
  { time: "04:55", action: "Gute Nacht gesagt", type: "message" },
];

export default function Dashboard() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-zinc-400">Welcome back, Sami</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-6"
          >
            <p className="text-zinc-400 text-sm mb-1">{stat.label}</p>
            <p className="text-3xl font-bold mb-1">{stat.value}</p>
            <p className="text-zinc-500 text-xs">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.name}
              href={action.href}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 hover:bg-zinc-800/50 transition-all group"
            >
              <span className="text-3xl mb-3 block">{action.icon}</span>
              <h3 className="font-semibold mb-1 group-hover:text-white transition-colors">
                {action.name}
              </h3>
              <p className="text-sm text-zinc-500">{action.description}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl divide-y divide-zinc-800">
          {recentActivity.map((item, i) => (
            <div key={i} className="flex items-center gap-4 p-4">
              <span className="text-zinc-500 text-sm font-mono w-12">
                {item.time}
              </span>
              <span className="flex-1">{item.action}</span>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  item.type === "task"
                    ? "bg-violet-500/20 text-violet-400"
                    : item.type === "system"
                    ? "bg-amber-500/20 text-amber-400"
                    : item.type === "cron"
                    ? "bg-blue-500/20 text-blue-400"
                    : "bg-zinc-700 text-zinc-400"
                }`}
              >
                {item.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
