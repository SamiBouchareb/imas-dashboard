import Link from "next/link";
import { 
  TrendingUp, 
  CheckCircle2, 
  FileText, 
  Zap,
  Palette,
  Database,
  Activity,
  ArrowUpRight,
  Clock
} from "lucide-react";

const stats = [
  { label: "Active Tasks", value: "3", change: "+2 today", icon: Zap, color: "from-violet-500 to-purple-500" },
  { label: "Completed", value: "47", change: "This week", icon: CheckCircle2, color: "from-emerald-500 to-teal-500" },
  { label: "Files", value: "128", change: "12.4 MB", icon: FileText, color: "from-blue-500 to-cyan-500" },
  { label: "API Calls", value: "1.2k", change: "Last 24h", icon: TrendingUp, color: "from-amber-500 to-orange-500" },
];

const quickActions = [
  { name: "Canvas", href: "/canvas", icon: Palette, description: "Visual workspace", color: "violet" },
  { name: "To-Dos", href: "/todos", icon: CheckCircle2, description: "Task management", color: "emerald" },
  { name: "Database", href: "/database", icon: Database, description: "Data explorer", color: "blue" },
  { name: "Activity", href: "/activity", icon: Activity, description: "Live feed", color: "amber" },
];

const recentActivity = [
  { time: "11:38", action: "2-Wochen Report erstellt", type: "task" },
  { time: "11:16", action: "Schlafenszeit-Cron gefixt", type: "system" },
  { time: "05:00", action: "Reminder für morgen gesetzt", type: "cron" },
  { time: "04:55", action: "Gute Nacht gesagt", type: "message" },
];

const typeColors: Record<string, string> = {
  task: "bg-violet-500/20 text-violet-400 border-violet-500/30",
  system: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  cron: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  message: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
};

export default function Dashboard() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-zinc-500 text-sm mb-2">
          <Clock className="w-4 h-4" />
          <span>Sunday, February 15th, 2026</span>
        </div>
        <h1 className="text-4xl font-bold mb-2">
          Good morning, <span className="gradient-text">Sami</span>
        </h1>
        <p className="text-zinc-400 text-lg">Here&apos;s what&apos;s happening today</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="glass border border-zinc-800/50 rounded-2xl p-6 card-hover border-glow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <ArrowUpRight className="w-5 h-5 text-zinc-500" />
              </div>
              <p className="text-3xl font-bold mb-1">{stat.value}</p>
              <div className="flex items-center justify-between">
                <p className="text-zinc-400 text-sm">{stat.label}</p>
                <p className="text-zinc-500 text-xs">{stat.change}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Quick Actions</h2>
          <Link href="/activity" className="text-sm text-zinc-400 hover:text-white transition-colors flex items-center gap-1">
            View all <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.name}
                href={action.href}
                className="glass border border-zinc-800/50 rounded-2xl p-6 card-hover border-glow group"
              >
                <div className={`w-14 h-14 rounded-2xl bg-${action.color}-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-7 h-7 text-${action.color}-400`} />
                </div>
                <h3 className="font-semibold text-lg mb-1 group-hover:text-white transition-colors">
                  {action.name}
                </h3>
                <p className="text-sm text-zinc-500">{action.description}</p>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recent Activity</h2>
          <Link href="/activity" className="text-sm text-zinc-400 hover:text-white transition-colors flex items-center gap-1">
            View all <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="glass border border-zinc-800/50 rounded-2xl overflow-hidden">
          {recentActivity.map((item, i) => (
            <div 
              key={i} 
              className={`flex items-center gap-4 p-4 hover:bg-zinc-800/30 transition-colors ${
                i !== recentActivity.length - 1 ? "border-b border-zinc-800/50" : ""
              }`}
            >
              <div className="w-2 h-2 rounded-full bg-violet-500" />
              <span className="text-zinc-500 text-sm font-mono w-14">
                {item.time}
              </span>
              <span className="flex-1 font-medium">{item.action}</span>
              <span className={`text-xs px-3 py-1.5 rounded-full border ${typeColors[item.type]}`}>
                {item.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
