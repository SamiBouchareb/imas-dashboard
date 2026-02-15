"use client";

import { useState } from "react";
import { Plus, Move, Trash2, Edit3, Maximize2 } from "lucide-react";

interface Note {
  id: string;
  content: string;
  color: string;
  x: number;
  y: number;
}

const colorOptions = [
  { name: "violet", bg: "bg-violet-500/20", border: "border-violet-500/30", text: "text-violet-300" },
  { name: "blue", bg: "bg-blue-500/20", border: "border-blue-500/30", text: "text-blue-300" },
  { name: "emerald", bg: "bg-emerald-500/20", border: "border-emerald-500/30", text: "text-emerald-300" },
  { name: "amber", bg: "bg-amber-500/20", border: "border-amber-500/30", text: "text-amber-300" },
  { name: "rose", bg: "bg-rose-500/20", border: "border-rose-500/30", text: "text-rose-300" },
];

const initialNotes: Note[] = [
  { id: "1", content: "🚀 Polymarket Strategy testen", color: "violet", x: 80, y: 80 },
  { id: "2", content: "📊 MT5 Live-Trading starten", color: "blue", x: 340, y: 120 },
  { id: "3", content: "📝 Great Reset Kapitel 4", color: "emerald", x: 600, y: 80 },
  { id: "4", content: "💰 USDC auf Wallet laden", color: "amber", x: 180, y: 280 },
  { id: "5", content: "🎯 Dashboard Features erweitern", color: "rose", x: 480, y: 300 },
];

export default function Canvas() {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [selectedNote, setSelectedNote] = useState<string | null>(null);

  const getColorConfig = (colorName: string) => {
    return colorOptions.find(c => c.name === colorName) || colorOptions[0];
  };

  return (
    <div className="p-8 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Canvas</h1>
          <p className="text-zinc-400">Visual workspace for ideas and planning</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-800/50 hover:bg-zinc-800 text-zinc-300 font-medium transition-all border border-zinc-700/50">
            <Maximize2 className="w-4 h-4" />
            Fullscreen
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-medium transition-all glow">
            <Plus className="w-4 h-4" />
            Add Note
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-2 mb-4">
        <div className="glass rounded-xl px-4 py-2 flex items-center gap-4 border border-zinc-800/50">
          <span className="text-xs text-zinc-500 font-medium uppercase tracking-wider">Colors</span>
          <div className="flex gap-2">
            {colorOptions.map((color) => (
              <button
                key={color.name}
                className={`w-6 h-6 rounded-full ${color.bg} border-2 ${color.border} hover:scale-110 transition-transform`}
              />
            ))}
          </div>
        </div>
        <div className="glass rounded-xl px-4 py-2 flex items-center gap-3 border border-zinc-800/50">
          <button className="p-1.5 rounded-lg hover:bg-zinc-700/50 transition-colors text-zinc-400 hover:text-white">
            <Move className="w-4 h-4" />
          </button>
          <button className="p-1.5 rounded-lg hover:bg-zinc-700/50 transition-colors text-zinc-400 hover:text-white">
            <Edit3 className="w-4 h-4" />
          </button>
          <button className="p-1.5 rounded-lg hover:bg-zinc-700/50 transition-colors text-zinc-400 hover:text-rose-400">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
        <div className="ml-auto text-xs text-zinc-500">
          {notes.length} notes
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 glass border border-zinc-800/50 rounded-2xl relative overflow-hidden">
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #fff 1px, transparent 1px),
              linear-gradient(to bottom, #fff 1px, transparent 1px)
            `,
            backgroundSize: "32px 32px"
          }}
        />

        {/* Gradient Orbs */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-violet-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />

        {/* Notes */}
        {notes.map((note) => {
          const colorConfig = getColorConfig(note.color);
          const isSelected = selectedNote === note.id;
          return (
            <div
              key={note.id}
              onClick={() => setSelectedNote(isSelected ? null : note.id)}
              className={`absolute p-4 rounded-xl border cursor-move select-none min-w-[220px] transition-all duration-200 ${colorConfig.bg} ${colorConfig.border} ${colorConfig.text} ${
                isSelected ? "ring-2 ring-white/20 scale-105 z-10" : "hover:scale-[1.02]"
              }`}
              style={{ left: note.x, top: note.y }}
            >
              <p className="text-sm font-medium">{note.content}</p>
              <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/10">
                <span className="text-[10px] uppercase tracking-wider opacity-50">Note</span>
                <div className="flex gap-1">
                  <button className="p-1 rounded hover:bg-white/10 transition-colors">
                    <Edit3 className="w-3 h-3" />
                  </button>
                  <button className="p-1 rounded hover:bg-white/10 transition-colors">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {/* Empty State */}
        {notes.length === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-2xl bg-zinc-800/50 flex items-center justify-center mb-4">
              <Plus className="w-8 h-8 text-zinc-500" />
            </div>
            <p className="text-zinc-400 font-medium">No notes yet</p>
            <p className="text-zinc-500 text-sm">Click &quot;Add Note&quot; to get started</p>
          </div>
        )}
      </div>
    </div>
  );
}
