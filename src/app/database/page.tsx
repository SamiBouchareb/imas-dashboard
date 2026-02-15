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
  { id: 1, message: "2-Wochen Report erstellt", type: "task", created_at: "2026-02-15 11:38:42" },
  { id: 2, message: "Schlafenszeit-Cron gefixt", type: "system", created_at: "2026-02-15 11:25:18" },
  { id: 3, message: "Reminder gesetzt", type: "cron", created_at: "2026-02-15 05:00:12" },
  { id: 4, message: "Email gesendet (Schnee)", type: "email", created_at: "2026-02-15 11:06:23" },
  { id: 5, message: "Marokko-Buch fertiggestellt", type: "task", created_at: "2026-02-14 14:29:00" },
  { id: 6, message: "Portfolio deployed", type: "system", created_at: "2026-02-14 12:15:33" },
  { id: 7, message: "MT5 API verbunden", type: "system", created_at: "2026-02-13 09:44:11" },
  { id: 8, message: "Moltbook Kommentar", type: "task", created_at: "2026-02-13 08:22:05" },
];

const typeColors: Record<string, string> = {
  task: "bg-blue-50 text-blue-600",
  system: "bg-orange-50 text-orange-600",
  cron: "bg-purple-50 text-purple-600",
  email: "bg-green-50 text-green-600",
};

type SortKey = "id" | "message" | "type" | "created_at";
type SortDir = "asc" | "desc";

export default function DatabasePage() {
  const [selectedTable, setSelectedTable] = useState("activity");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("id");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [page, setPage] = useState(1);

  const table = tables.find((t) => t.name === selectedTable);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const SortIcon = ({ col }: { col: SortKey }) => (
    <span className={`ml-1 text-[10px] ${sortKey === col ? "text-[var(--fg)]" : "text-[var(--tertiary)] opacity-0 group-hover:opacity-100"} transition-opacity`}>
      {sortKey === col ? (sortDir === "asc" ? "↑" : "↓") : "↕"}
    </span>
  );

  const filteredData = sampleData.filter(
    (d) => !searchQuery || d.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full flex">
      {/* Tables sidebar */}
      <div className="w-[200px] border-r border-[var(--border)] flex flex-col bg-[var(--surface)]">
        <div className="px-3 py-3 border-b border-[var(--border)]">
          <h2 className="text-[12px] font-semibold text-[var(--secondary)] uppercase tracking-wide">
            📊 Database
          </h2>
        </div>
        <div className="flex-1 overflow-auto px-2 py-2">
          <p className="px-2 mb-1 text-[10px] font-semibold text-[var(--tertiary)] uppercase tracking-wider">
            Tables
          </p>
          {tables.map((t) => (
            <button
              key={t.name}
              onClick={() => { setSelectedTable(t.name); setPage(1); }}
              className={`w-full text-left px-2.5 py-1.5 rounded-[var(--radius)] text-[13px] transition-colors mb-0.5 ${
                selectedTable === t.name
                  ? "bg-[var(--active)] text-[var(--fg)] font-medium"
                  : "text-[var(--secondary)] hover:bg-[var(--hover)]"
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{t.name}</span>
                <span className="text-[10px] text-[var(--tertiary)]">{t.rows}</span>
              </div>
            </button>
          ))}
        </div>
        <div className="px-3 py-3 border-t border-[var(--border)]">
          <p className="text-[11px] text-[var(--tertiary)]">
            {tables.reduce((a, t) => a + t.rows, 0)} total rows
          </p>
        </div>
      </div>

      {/* Data area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--border)]">
          <div className="flex items-center gap-3">
            <div>
              <h3 className="text-[14px] font-semibold text-[var(--fg)]">{selectedTable}</h3>
              <p className="text-[11px] text-[var(--secondary)]">{table?.rows} rows · {table?.size}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Filter rows..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="notion-input w-[200px] text-[12px] py-1"
            />
            <button className="notion-btn-primary text-[12px]">+ New</button>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          <table className="w-full">
            <thead className="sticky top-0 bg-[var(--surface)] border-b border-[var(--border)]">
              <tr>
                {(["id", "message", "type", "created_at"] as SortKey[]).map((col) => (
                  <th
                    key={col}
                    onClick={() => handleSort(col)}
                    className={`group text-left px-4 py-2 text-[11px] font-semibold text-[var(--secondary)] uppercase tracking-wider cursor-pointer hover:text-[var(--fg)] transition-colors ${
                      col === "id" ? "w-12" : col === "type" ? "w-20" : col === "created_at" ? "w-44" : ""
                    }`}
                  >
                    {col}
                    <SortIcon col={col} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row) => (
                <tr key={row.id} className="border-b border-[var(--border)] hover:bg-[var(--hover)] transition-colors cursor-pointer">
                  <td className="px-4 py-2 text-[12px] text-[var(--secondary)] font-mono">{row.id}</td>
                  <td className="px-4 py-2 text-[13px] text-[var(--fg)]">{row.message}</td>
                  <td className="px-4 py-2">
                    <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${typeColors[row.type] || "bg-gray-50 text-gray-600"}`}>
                      {row.type}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-[12px] text-[var(--secondary)] font-mono">{row.created_at}</td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-12 text-[var(--secondary)] text-[13px]">
                    No results found for &quot;{searchQuery}&quot;
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-2.5 border-t border-[var(--border)] text-[12px] text-[var(--secondary)]">
          <span>
            Showing 1–{filteredData.length} of {table?.rows} rows
          </span>
          <div className="flex items-center gap-1">
            <button onClick={() => setPage(Math.max(1, page - 1))} className="notion-btn text-[11px] px-2 py-1">←</button>
            {[1, 2, 3].map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`px-2 py-1 rounded-[var(--radius)] text-[11px] transition-colors ${
                  page === p ? "bg-[var(--active)] text-[var(--fg)] font-medium" : "hover:bg-[var(--hover)]"
                }`}
              >
                {p}
              </button>
            ))}
            <button onClick={() => setPage(Math.min(3, page + 1))} className="notion-btn text-[11px] px-2 py-1">→</button>
          </div>
        </div>
      </div>
    </div>
  );
}
