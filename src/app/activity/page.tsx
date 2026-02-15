"use client";

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

const typeConfig: Record<string, { bg: string; text: string; icon: string }> = {
  task: { bg: "bg-violet-500/20", text: "text-violet-400", icon: "✓" },
  system: { bg: "bg-amber-500/20", text: "text-amber-400", icon: "⚙" },
  file: { bg: "bg-blue-500/20", text: "text-blue-400", icon: "📄" },
  email: { bg: "bg-emerald-500/20", text: "text-emerald-400", icon: "✉" },
  cron: { bg: "bg-cyan-500/20", text: "text-cyan-400", icon: "⏰" },
  audio: { bg: "bg-pink-500/20", text: "text-pink-400", icon: "🎤" },
  heartbeat: { bg: "bg-zinc-500/20", text: "text-zinc-400", icon: "💓" },
};

export default function Activity() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Activity</h1>
          <p className="text-zinc-400">Live feed of all actions</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-lg bg-zinc-800 text-sm font-medium hover:bg-zinc-700 transition-colors">
            Filter
          </button>
          <button className="px-4 py-2 rounded-lg bg-zinc-800 text-sm font-medium hover:bg-zinc-700 transition-colors">
            Export
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
          <p className="text-2xl font-bold">156</p>
          <p className="text-sm text-zinc-400">Total Events</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
          <p className="text-2xl font-bold text-violet-400">23</p>
          <p className="text-sm text-zinc-400">Tasks</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
          <p className="text-2xl font-bold text-emerald-400">47</p>
          <p className="text-sm text-zinc-400">API Calls</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
          <p className="text-2xl font-bold text-blue-400">86</p>
          <p className="text-sm text-zinc-400">Files</p>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Line */}
        <div className="absolute left-[23px] top-0 bottom-0 w-px bg-zinc-800" />

        {/* Events */}
        <div className="space-y-4">
          {activityLog.map((event, i) => {
            const config = typeConfig[event.type] || typeConfig.task;
            return (
              <div key={i} className="flex gap-4 relative">
                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-full ${config.bg} flex items-center justify-center text-xl shrink-0 relative z-10`}
                >
                  {config.icon}
                </div>

                {/* Content */}
                <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                  <div className="flex items-start justify-between mb-1">
                    <p className="font-medium">{event.action}</p>
                    <span className="text-xs text-zinc-500 font-mono">{event.time}</span>
                  </div>
                  <p className="text-sm text-zinc-400">{event.details}</p>
                  <span
                    className={`inline-block mt-2 text-xs px-2 py-1 rounded ${config.bg} ${config.text}`}
                  >
                    {event.type}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Load More */}
      <div className="mt-8 text-center">
        <button className="px-6 py-2 rounded-lg bg-zinc-800 text-sm font-medium hover:bg-zinc-700 transition-colors">
          Load More
        </button>
      </div>
    </div>
  );
}
