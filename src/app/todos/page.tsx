"use client";

import { useState } from "react";

interface Todo {
  id: string;
  title: string;
  completed: boolean;
  priority: "high" | "medium" | "low";
  category: string;
}

const initialTodos: Todo[] = [
  { id: "1", title: "MT5 ICT Strategy testen", completed: false, priority: "high", category: "Trading" },
  { id: "2", title: "Polymarket Top-5 Trades ausführen", completed: false, priority: "high", category: "Trading" },
  { id: "3", title: "Great Reset Kapitel 4 fertigstellen", completed: false, priority: "medium", category: "Writing" },
  { id: "4", title: "USDC auf Wallet laden", completed: false, priority: "medium", category: "Crypto" },
  { id: "5", title: "Moltbook Post schreiben", completed: true, priority: "low", category: "Social" },
  { id: "6", title: "2-Wochen Report erstellen", completed: true, priority: "high", category: "Admin" },
];

const priorityColors = {
  high: "bg-rose-500/20 text-rose-400 border-rose-500/30",
  medium: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  low: "bg-zinc-500/20 text-zinc-400 border-zinc-500/30",
};

export default function Todos() {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const toggleTodo = (id: string) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">To-Dos</h1>
          <p className="text-zinc-400">
            {todos.filter((t) => !t.completed).length} tasks remaining
          </p>
        </div>
        <button className="bg-violet-600 hover:bg-violet-500 px-4 py-2 rounded-lg font-medium transition-colors">
          + Add Task
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {(["all", "active", "completed"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === f
                ? "bg-zinc-800 text-white"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Todo List */}
      <div className="space-y-2">
        {filteredTodos.map((todo) => (
          <div
            key={todo.id}
            className={`bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex items-center gap-4 transition-all ${
              todo.completed ? "opacity-50" : ""
            }`}
          >
            <button
              onClick={() => toggleTodo(todo.id)}
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                todo.completed
                  ? "bg-emerald-500 border-emerald-500"
                  : "border-zinc-600 hover:border-zinc-400"
              }`}
            >
              {todo.completed && <span className="text-xs">✓</span>}
            </button>
            
            <span className={`flex-1 ${todo.completed ? "line-through" : ""}`}>
              {todo.title}
            </span>
            
            <span className="text-xs text-zinc-500 px-2 py-1 bg-zinc-800 rounded">
              {todo.category}
            </span>
            
            <span className={`text-xs px-2 py-1 rounded border ${priorityColors[todo.priority]}`}>
              {todo.priority}
            </span>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-3 gap-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold">{todos.length}</p>
          <p className="text-sm text-zinc-400">Total</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-emerald-400">
            {todos.filter((t) => t.completed).length}
          </p>
          <p className="text-sm text-zinc-400">Completed</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-amber-400">
            {todos.filter((t) => !t.completed).length}
          </p>
          <p className="text-sm text-zinc-400">Remaining</p>
        </div>
      </div>
    </div>
  );
}
