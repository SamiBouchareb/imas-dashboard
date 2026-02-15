"use client";

import { useState } from "react";

interface Note {
  id: string;
  content: string;
  x: number;
  y: number;
  createdAt: string;
}

const initialNotes: Note[] = [
  { id: "1", content: "Polymarket Strategy testen", x: 60, y: 60, createdAt: "Feb 15" },
  { id: "2", content: "MT5 Live-Trading starten", x: 320, y: 100, createdAt: "Feb 15" },
  { id: "3", content: "Great Reset Kapitel 4 schreiben", x: 580, y: 60, createdAt: "Feb 14" },
  { id: "4", content: "USDC auf Wallet laden", x: 140, y: 260, createdAt: "Feb 14" },
  { id: "5", content: "Dashboard Features erweitern", x: 440, y: 280, createdAt: "Feb 13" },
  { id: "6", content: "ICT Strategy Backtest durchführen", x: 700, y: 240, createdAt: "Feb 12" },
];

export default function Canvas() {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [selectedNote, setSelectedNote] = useState<string | null>(null);
  const [showGrid, setShowGrid] = useState(true);

  const addNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      content: "New note...",
      x: 100 + Math.random() * 300,
      y: 100 + Math.random() * 200,
      createdAt: "Just now",
    };
    setNotes([...notes, newNote]);
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter((n) => n.id !== id));
    setSelectedNote(null);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--border)] bg-[var(--bg)] gap-2 flex-wrap">
        <div className="flex items-center gap-1">
          <h1 className="text-[14px] font-semibold text-[var(--fg)] mr-4">🎨 Canvas</h1>
          <button onClick={addNote} className="notion-btn text-[12px]">
            + Add Note
          </button>
          <button
            onClick={() => setShowGrid(!showGrid)}
            className={`notion-btn text-[12px] ${showGrid ? "bg-[var(--active)]" : ""}`}
          >
            Grid {showGrid ? "On" : "Off"}
          </button>
          {selectedNote && (
            <button
              onClick={() => deleteNote(selectedNote)}
              className="notion-btn text-[12px] text-[var(--danger)] border-red-200 hover:bg-red-50"
            >
              Delete
            </button>
          )}
        </div>
        <div className="flex items-center gap-3 text-[12px] text-[var(--secondary)]">
          <span>{notes.length} notes</span>
          <span>·</span>
          <span>100%</span>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 relative overflow-hidden bg-[var(--surface)]">
        {/* Click to deselect — behind notes */}
        <div
          className="absolute inset-0 z-0"
          onClick={() => setSelectedNote(null)}
        />

        {/* Dot grid */}
        {showGrid && (
          <div
            className="absolute inset-0 opacity-40 pointer-events-none z-[1]"
            style={{
              backgroundImage: "radial-gradient(circle, var(--tertiary) 0.8px, transparent 0.8px)",
              backgroundSize: "24px 24px",
            }}
          />
        )}

        {/* Notes */}
        {notes.map((note) => {
          const isSelected = selectedNote === note.id;
          return (
            <div
              key={note.id}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedNote(isSelected ? null : note.id);
              }}
              className={`absolute z-[2] bg-[var(--bg)] rounded-[var(--radius-lg)] border cursor-move select-none min-w-[180px] sm:min-w-[200px] max-w-[280px] transition-all duration-150 ${
                isSelected
                  ? "border-[var(--accent)] shadow-md ring-2 ring-[var(--accent-light)] z-10"
                  : "border-[var(--border)] hover:shadow-sm hover:border-[#dddcda]"
              }`}
              style={{ left: note.x, top: note.y }}
            >
              {/* Drag handle */}
              <div className={`px-3 py-1 border-b border-[var(--border)] flex items-center justify-between transition-opacity ${
                isSelected ? "opacity-100" : "opacity-0 hover:opacity-100"
              }`}>
                <span className="text-[var(--tertiary)] text-[10px] tracking-widest">⋮⋮</span>
                <span className="text-[10px] text-[var(--tertiary)]">{note.createdAt}</span>
              </div>
              {/* Content */}
              <div className="px-3 py-2.5">
                <p className="text-[13px] text-[var(--fg)] leading-relaxed">{note.content}</p>
              </div>
            </div>
          );
        })}

        {/* Empty state */}
        {notes.length === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
            <p className="text-[40px] mb-3">🎨</p>
            <p className="text-[14px] text-[var(--fg)] font-medium mb-1">No notes yet</p>
            <p className="text-[12px] text-[var(--secondary)] mb-4">Add your first note to get started</p>
            <button onClick={addNote} className="notion-btn-primary text-[12px]">
              + Add Note
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
