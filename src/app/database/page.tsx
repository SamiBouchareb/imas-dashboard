"use client";

import { useState } from "react";
import { Database, Table, Search, Plus, RefreshCw, Download, ChevronLeft, ChevronRight, HardDrive } from "lucide-react";

const tables = [
  { name: "activity", rows: 156, size: "24 KB", icon: "📊" },
  { name: "reports", rows: 47, size: "2.1 MB", icon: "📄" },
  { name: "todos", rows: 23, size: "4 KB", icon: "✓" },
  { name: "agents", rows: 8, size: "1 KB", icon: "🤖" },
  { name: "files", rows: 128, size: "12.4 MB", icon: "📁" },
];

const sampleData = [
  { id: 1, message: "2-Wochen Report erstellt", type: "task", created_at: "2026-02-15 11:38:42" },
  { id: 2, message: "Schlafenszeit-Cron gefixt", type: "system", created_at: "2026-02-15 11:25:18" },
  { id: 3, message: "Reminder gesetzt", type: "cron", created_at: "2026-02-15 05:00:12" },
  { id: 4, message: "Email gesendet (Schnee)", type: "email", created_at: "2026-02-15 11:06:23" },
  { id: 5, message: "Marokko-Buch fertiggestellt", type: "task", created_at: "2026-02-14 14:29:00" },
];

const typeColors: Record<string, string> = {
  task: "bg-violet-500/20 text-violet-400",
  system: "bg-amber-500/20 text-amber-400",
  cron: "bg-blue-500/20 text-blue-400",
  email: "bg-emerald-500/20 text-emerald-400",
};

export default function DatabasePage() {
  const [selectedTable, setSelectedTable] = useState("activity");
  const [searchQuery, setSearchQuery] = useState("");

  const totalSize = tables.reduce((acc, t) => {
    const num = parseFloat(t.size);
    const unit = t.size.includes("MB") ? 1000 : 1;
    return acc + num * unit;
  }, 0);

  return (
    <div className="p-8 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Database</h1>
          <p className="text-zinc-400">Explore and manage your data</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-800/50 hover:bg-zinc-800 text-zinc-300 font-medium transition-all border border-zinc-700/50">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-medium transition-all glow">
            <Plus className="w-4 h-4" />
            Insert Row
          </button>
        </div>
      </div>

      <div className="flex gap-6 flex-1 min-h-0">
        {/* Tables Sidebar */}
        <div className="w-72 shrink-0 flex flex-col">
          {/* Storage Info */}
          <div className="glass rounded-xl p-4 border border-zinc-800/50 mb-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
                <HardDrive className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold">Storage</p>
                <p className="text-xs text-zinc-500">{(totalSize / 1000).toFixed(1)} MB used</p>
              </div>
            </div>
            <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full w-1/4 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full" />
            </div>
          </div>

          {/* Tables List */}
          <div className="flex-1 overflow-auto">
            <p className="px-3 py-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
              Tables
            </p>
            <div className="space-y-1">
              {tables.map((table) => (
                <button
                  key={table.name}
                  onClick={() => setSelectedTable(table.name)}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                    selectedTable === table.name
                      ? "bg-gradient-to-r from-violet-500/20 to-purple-500/10 border border-violet-500/20 text-white"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{table.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{table.name}</span>
                        <span className="text-xs text-zinc-500">{table.rows}</span>
                      </div>
                      <span className="text-xs text-zinc-500">{table.size}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Data View */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="glass border border-zinc-800/50 rounded-2xl overflow-hidden flex flex-col flex-1">
            {/* Table Header */}
            <div className="flex items-center justify-between p-4 border-b border-zinc-800/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center">
                  <Table className="w-5 h-5 text-zinc-400" />
                </div>
                <div>
                  <h3 className="font-semibold">{selectedTable}</h3>
                  <p className="text-xs text-zinc-500">
                    {tables.find((t) => t.name === selectedTable)?.rows} rows
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-zinc-800/50 border border-zinc-700/50 rounded-lg text-sm focus:outline-none focus:border-violet-500/50 w-64"
                  />
                </div>
                <button className="p-2 rounded-lg hover:bg-zinc-700/50 transition-colors text-zinc-400 hover:text-white">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-auto flex-1">
              <table className="w-full">
                <thead className="sticky top-0 bg-zinc-900/90 backdrop-blur-sm">
                  <tr className="text-left text-sm text-zinc-400 border-b border-zinc-800/50">
                    <th className="px-4 py-3 font-medium w-16">id</th>
                    <th className="px-4 py-3 font-medium">message</th>
                    <th className="px-4 py-3 font-medium w-28">type</th>
                    <th className="px-4 py-3 font-medium w-44">created_at</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleData.map((row) => (
                    <tr 
                      key={row.id} 
                      className="border-b border-zinc-800/30 hover:bg-zinc-800/30 transition-colors cursor-pointer"
                    >
                      <td className="px-4 py-3 text-zinc-500 font-mono text-sm">{row.id}</td>
                      <td className="px-4 py-3 font-medium">{row.message}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2.5 py-1 rounded-lg ${typeColors[row.type] || "bg-zinc-800"}`}>
                          {row.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-zinc-400 font-mono text-sm">
                        {row.created_at}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between p-4 border-t border-zinc-800/50">
              <span className="text-sm text-zinc-400">
                Showing <span className="text-white">1-5</span> of <span className="text-white">{tables.find((t) => t.name === selectedTable)?.rows}</span> rows
              </span>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-lg bg-zinc-800/50 hover:bg-zinc-700/50 transition-colors disabled:opacity-50" disabled>
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="px-3 py-1 rounded-lg bg-violet-500/20 text-violet-400 text-sm font-medium">1</span>
                <button className="px-3 py-1 rounded-lg hover:bg-zinc-700/50 transition-colors text-sm">2</button>
                <button className="px-3 py-1 rounded-lg hover:bg-zinc-700/50 transition-colors text-sm">3</button>
                <button className="p-2 rounded-lg bg-zinc-800/50 hover:bg-zinc-700/50 transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
