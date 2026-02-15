"use client";

import { useState } from "react";

interface Note {
  id: string;
  content: string;
  color: string;
  x: number;
  y: number;
}

const colors = [
  "bg-violet-500/20 border-violet-500/30",
  "bg-blue-500/20 border-blue-500/30",
  "bg-emerald-500/20 border-emerald-500/30",
  "bg-amber-500/20 border-amber-500/30",
  "bg-rose-500/20 border-rose-500/30",
];

const initialNotes: Note[] = [
  { id: "1", content: "🚀 Polymarket Strategy testen", color: colors[0], x: 100, y: 100 },
  { id: "2", content: "📊 MT5 Live-Trading starten", color: colors[1], x: 350, y: 150 },
  { id: "3", content: "📝 Great Reset Kapitel 4", color: colors[2], x: 600, y: 100 },
  { id: "4", content: "💰 USDC auf Wallet laden", color: colors[3], x: 200, y: 300 },
];

export default function Canvas() {
  const [notes, setNotes] = useState<Note[]>(initialNotes);

  return (
    <div className="p-8 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Canvas</h1>
          <p className="text-zinc-400">Visual workspace for ideas and planning</p>
        </div>
        <button className="bg-violet-600 hover:bg-violet-500 px-4 py-2 rounded-lg font-medium transition-colors">
          + Add Note
        </button>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl relative overflow-hidden">
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(to right, #fff 1px, transparent 1px),
              linear-gradient(to bottom, #fff 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px"
          }}
        />

        {/* Notes */}
        {notes.map((note) => (
          <div
            key={note.id}
            className={`absolute p-4 rounded-lg border cursor-move select-none min-w-[200px] ${note.color}`}
            style={{ left: note.x, top: note.y }}
          >
            <p className="text-sm">{note.content}</p>
          </div>
        ))}

        {/* Empty State Message */}
        {notes.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-zinc-500">Click "Add Note" to get started</p>
          </div>
        )}
      </div>
    </div>
  );
}
