"use client";

import { useState } from "react";

const tables = [
  { name: "activity", rows: 156, size: "24 KB" },
  { name: "reports", rows: 47, size: "2.1 MB" },
  { name: "todos", rows: 23, size: "4 KB" },
  { name: "agents", rows: 8, size: "1 KB" },
  { name: "files", rows: 128, size: "12.4 MB" },
];

const sampleData = [
  { id: 1, message: "2-Wochen Report erstellt", type: "task", created_at: "2026-02-15 11:38" },
  { id: 2, message: "Schlafenszeit-Cron gefixt", type: "system", created_at: "2026-02-15 11:16" },
  { id: 3, message: "Reminder gesetzt", type: "cron", created_at: "2026-02-15 05:00" },
  { id: 4, message: "Email gesendet (Schnee)", type: "email", created_at: "2026-02-15 11:06" },
  { id: 5, message: "Marokko-Buch fertiggestellt", type: "task", created_at: "2026-02-14 14:29" },
];

export default function Database() {
  const [selectedTable, setSelectedTable] = useState("activity");

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Database</h1>
        <p className="text-zinc-400">Explore and manage your data</p>
      </div>

      <div className="flex gap-6">
        {/* Tables Sidebar */}
        <div className="w-64 shrink-0">
          <h2 className="text-sm font-medium text-zinc-400 mb-3 uppercase tracking-wider">
            Tables
          </h2>
          <div className="space-y-1">
            {tables.map((table) => (
              <button
                key={table.name}
                onClick={() => setSelectedTable(table.name)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  selectedTable === table.name
                    ? "bg-zinc-800 text-white"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{table.name}</span>
                  <span className="text-xs text-zinc-500">{table.rows}</span>
                </div>
                <span className="text-xs text-zinc-500">{table.size}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Data View */}
        <div className="flex-1">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
            {/* Table Header */}
            <div className="flex items-center justify-between p-4 border-b border-zinc-800">
              <h3 className="font-semibold">{selectedTable}</h3>
              <div className="flex gap-2">
                <button className="text-sm px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors">
                  Query
                </button>
                <button className="text-sm px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 transition-colors">
                  + Insert
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-zinc-400 border-b border-zinc-800">
                    <th className="px-4 py-3 font-medium">id</th>
                    <th className="px-4 py-3 font-medium">message</th>
                    <th className="px-4 py-3 font-medium">type</th>
                    <th className="px-4 py-3 font-medium">created_at</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleData.map((row) => (
                    <tr key={row.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30">
                      <td className="px-4 py-3 text-zinc-500">{row.id}</td>
                      <td className="px-4 py-3">{row.message}</td>
                      <td className="px-4 py-3">
                        <span className="text-xs px-2 py-1 rounded bg-zinc-800">
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
            <div className="flex items-center justify-between p-4 border-t border-zinc-800">
              <span className="text-sm text-zinc-400">
                Showing 1-5 of {tables.find((t) => t.name === selectedTable)?.rows} rows
              </span>
              <div className="flex gap-2">
                <button className="px-3 py-1 rounded bg-zinc-800 text-sm disabled:opacity-50" disabled>
                  Previous
                </button>
                <button className="px-3 py-1 rounded bg-zinc-800 text-sm">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
