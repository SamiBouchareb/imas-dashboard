"use client";

import { useState } from "react";
import { 
  CheckCircle2, 
  Settings, 
  Clock, 
  Mail, 
  Mic, 
  Heart,
  Filter,
  Download,
  Search,
  RefreshCw
} from "lucide-react";

const activityLog = [
  { time: "11:38:42", action: "2-Wochen Report erstellt und per Email gesendet", type: "task", details: "PDF: 44KB, Email an boucharebsami0404@gmail.com" },
  { time: "11:25:18", action: "Schlafenszeit-Cron auf 22:00 umgestellt", type: "system", details: "Job ID: dd73cfb2-..." },
  { time: "11:18:33", action: "PDF generiert: 2-wochen-report.pdf", type: "file", details: "WeasyPrint, 44KB" },
  { time: "11:06:23", action: "Email gesendet: Es schneit in Hamburg", type: "email", details: "SMTP via boucharebsamipaypal@gmail.com" },
  { time: "05:00:12", action: "Reminder für morgen 19:00 erstellt", type: "cron", details: "Cron ID: 054f659c-..." },
  { time: "04:55:44", action: "Sprachnachricht transkribiert", type: "audio", details: "Whisper API, 3.2s" },
  { time: "04:47:00", action: "Heartbeat OK", type: "heartbeat", details: "No action needed" },
  { time: "04:17:00", action: "Heartbeat OK", type: "heartbeat", details: "No action needed" },
];

const typeConfig: Record<string, { bg: string; text: string; border: string; icon: React.ElementType }> = {
  task: { bg: "bg-violet-500/20", text: "text-violet-400", border: "border-violet-500/30", icon: CheckCircle2 },
  system: { bg: "bg-amber-500/20", text: "text-amber-400", border: "border-amber-500/30", icon: Settings },
  file: { bg: "bg-blue-500/20", text: "text-blue-400", border: "border-blue-500/30", icon: CheckCircle2 },
  email: { bg: "bg-emerald-500/20", text: "text-emerald-400", border: "border-emerald-500/30", icon: Mail },
  cron: { bg: "bg-cyan-500/20", text: "text-cyan-400", border: "border-cyan-500/30", icon: Clock },
  audio: { bg: "bg-pink-500/20", text: "text-pink-400", border: "border-pink-500/30", icon: Mic },
  heartbeat: { bg: "bg-zinc-500/20", text: "text-zinc-400", border: "border-zinc-500/30", icon: Heart },
};

const stats = [
  { label: "Total Events", value: "156", color: "from-violet-500 to-purple-500" },
  { label: "Tasks", value: "23", color: "from-violet-500 to-purple-500" },
  { label: "API Calls", value: "47", color: "from-emerald-500 to-teal-500" },
  { label: "Files", value: "86", color: "from-blue-500 to-cyan-500" },
];

export default function Activity() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Activity</h1>
          <p className="text-zinc-400">Live feed of all actions and events</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-800/50 hover:bg-zinc-800 text-zinc-300 font-medium transition-all border border-zinc-700/50">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-800/50 hover:bg-zinc-800 text-zinc-300 font-medium transition-all border border-zinc-700/50">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="glass border border-zinc-800/50 rounded-xl p-5">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
              <span className="text-white font-bold">{stat.value.charAt(0)}</span>
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm text-zinc-400">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search activity..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-sm focus:outline-none focus:border-violet-500/50"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-800/50 hover:bg-zinc-800 text-zinc-300 font-medium transition-all border border-zinc-700/50">
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Line */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/50 via-zinc-800 to-transparent" />

        {/* Events */}
        <div className="space-y-4">
          {activityLog.map((event, i) => {
            const config = typeConfig[event.type] || typeConfig.task;
            const Icon = config.icon;
            return (
              <div key={i} className="flex gap-4 relative group">
                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl ${config.bg} border ${config.border} flex items-center justify-center shrink-0 relative z-10 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className={`w-5 h-5 ${config.text}`} />
                </div>

                {/* Content */}
                <div className="flex-1 glass border border-zinc-800/50 rounded-xl p-4 card-hover border-glow">
                  <div className="flex items-start justify-between mb-2">
                    <p className="font-medium">{event.action}</p>
                    <span className="text-xs text-zinc-500 font-mono bg-zinc-800/50 px-2 py-1 rounded-lg">
                      {event.time}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-400 mb-3">{event.details}</p>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-lg border ${config.bg} ${config.border} ${config.text}`}
                    >
                      {event.type}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More */}
        <div className="mt-8 text-center relative z-10">
          <button className="px-8 py-3 rounded-xl bg-zinc-800/50 hover:bg-zinc-800 text-zinc-300 font-medium transition-all border border-zinc-700/50">
            Load More Events
          </button>
        </div>
      </div>
    </div>
  );
}
