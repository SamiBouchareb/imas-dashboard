"use client";

import { useState } from "react";

const activityLog = [
  { time: "16:05", relative: "Just now", action: "Dashboard redesigned to Notion-style", type: "system", details: "8 files, 295 insertions" },
  { time: "15:41", relative: "24 min ago", action: "Claude Code CLI eingerichtet", type: "system", details: "Max subscription connected" },
  { time: "11:38", relative: "5h ago", action: "2-Wochen Report erstellt und per Email gesendet", type: "task", details: "PDF: 44KB, Email an boucharebsami0404@gmail.com" },
  { time: "11:25", relative: "5h ago", action: "Schlafenszeit-Cron auf 22:00 umgestellt", type: "system", details: "Job ID: dd73cfb2" },
  { time: "11:18", relative: "5h ago", action: "PDF generiert: 2-wochen-report.pdf", type: "file", details: "WeasyPrint, 44KB" },
  { time: "11:06", relative: "5h ago", action: "Email gesendet: Es schneit in Hamburg", type: "email", details: "SMTP via boucharebsamipaypal@gmail.com" },
  { time: "05:00", relative: "11h ago", action: "Reminder für morgen 19:00 erstellt", type: "cron", details: "Cron ID: 054f659c" },
  { time: "04:55", relative: "11h ago", action: "Sprachnachricht transkribiert", type: "audio", details: "Whisper API, 3.2s" },
  { time: "04:47", relative: "11h ago", action: "Heartbeat OK", type: "heartbeat", details: "No action needed" },
  { time: "04:17", relative: "12h ago", action: "Heartbeat OK", type: "heartbeat", details: "No action needed" },
];

const typeColors: Record<string, string> = {
  task: "bg-blue-50 text-blue-600",
  system: "bg-orange-50 text-orange-600",
  file: "bg-indigo-50 text-indigo-600",
  email: "bg-green-50 text-green-600",
  cron: "bg-purple-50 text-purple-600",
  audio: "bg-pink-50 text-pink-600",
  heartbeat: "bg-gray-50 text-gray-500",
};

const allTypes = ["all", "task", "system", "file", "email", "cron", "audio", "heartbeat"];

export default function Activity() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(8);

  const filtered = activityLog
    .filter((e) => typeFilter === "all" || e.type === typeFilter)
    .filter((e) => !searchQuery || e.action.toLowerCase().includes(searchQuery.toLowerCase()));

  const visible = filtered.slice(0, visibleCount);

  return (
    <div className="max-w-[900px] mx-auto px-10 py-10 lg:px-16">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[24px] font-bold text-[var(--fg)]">⚡ Activity</h1>
          <p className="text-[13px] text-[var(--secondary)] mt-0.5">
            {activityLog.length} events today
          </p>
        </div>
        <button className="notion-btn text-[12px]">Export</button>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="notion-input text-[13px]"
        />
      </div>

      {/* Type filter tabs */}
      <div className="flex gap-0 border-b border-[var(--border)] mb-6 overflow-x-auto">
        {allTypes.map((t) => {
          const count = t === "all" ? activityLog.length : activityLog.filter((e) => e.type === t).length;
          if (count === 0 && t !== "all") return null;
          return (
            <button
              key={t}
              onClick={() => { setTypeFilter(t); setVisibleCount(8); }}
              className={`relative px-3 py-2 text-[12px] whitespace-nowrap transition-colors ${
                typeFilter === t
                  ? "text-[var(--fg)] font-medium"
                  : "text-[var(--secondary)] hover:text-[var(--fg)]"
              }`}
            >
              {t === "all" ? "All" : t}
              <span className="ml-1 text-[10px] text-[var(--tertiary)]">{count}</span>
              {typeFilter === t && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--fg)] rounded-t" />
              )}
            </button>
          );
        })}
      </div>

      {/* Activity timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[5px] top-2 bottom-2 w-px bg-[var(--border)]" />

        {visible.map((event, i) => (
          <div key={i} className="relative flex gap-4 mb-1 group">
            {/* Dot */}
            <div className="relative z-10 mt-2.5 flex-shrink-0">
              <span className={`block w-[10px] h-[10px] rounded-full border-2 border-[var(--bg)] ${
                i === 0 ? "bg-[var(--accent)]" : "bg-[var(--tertiary)]"
              }`} />
            </div>

            {/* Content */}
            <div className="flex-1 py-2 px-3 -mx-1 rounded-[var(--radius)] hover:bg-[var(--hover)] transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] text-[var(--fg)]">{event.action}</p>
                  <p className="text-[11px] text-[var(--secondary)] mt-0.5">{event.details}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${typeColors[event.type]}`}>
                    {event.type}
                  </span>
                  <span className="text-[11px] text-[var(--tertiary)] font-mono whitespace-nowrap">
                    {event.relative}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[13px] text-[var(--secondary)]">No events match your filter</p>
          </div>
        )}
      </div>

      {/* Load more */}
      {visibleCount < filtered.length && (
        <div className="mt-4 text-center">
          <button
            onClick={() => setVisibleCount(visibleCount + 8)}
            className="notion-btn text-[12px]"
          >
            Load more ({filtered.length - visibleCount} remaining)
          </button>
        </div>
      )}
    </div>
  );
}
