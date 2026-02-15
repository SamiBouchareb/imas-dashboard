"use client";

import { useState } from "react";
import { Plus, Check, Circle, Flag, Clock, Filter, MoreHorizontal } from "lucide-react";

interface Todo {
  id: string;
  title: string;
  completed: boolean;
  priority: "high" | "medium" | "low";
  category: string;
  dueDate?: string;
}

const initialTodos: Todo[] = [
  { id: "1", title: "MT5 ICT Strategy testen", completed: false, priority: "high", category: "Trading", dueDate: "Today" },
  { id: "2", title: "Polymarket Top-5 Trades ausführen", completed: false, priority: "high", category: "Trading", dueDate: "Today" },
  { id: "3", title: "Great Reset Kapitel 4 fertigstellen", completed: false, priority: "medium", category: "Writing", dueDate: "Tomorrow" },
  { id: "4", title: "USDC auf Wallet laden", completed: false, priority: "medium", category: "Crypto" },
  { id: "5", title: "Moltbook Post schreiben", completed: true, priority: "low", category: "Social" },
  { id: "6", title: "2-Wochen Report erstellen", completed: true, priority: "high", category: "Admin" },
];

const priorityConfig = {
  high: { color: "text-rose-400", bg: "bg-rose-500/20", border: "border-rose-500/30", icon: "🔴" },
  medium: { color: "text-amber-400", bg: "bg-amber-500/20", border: "border-amber-500/30", icon: "🟡" },
  low: { color: "text-zinc-400", bg: "bg-zinc-500/20", border: "border-zinc-500/30", icon: "⚪" },
};

const categoryColors: Record<string, string> = {
  Trading: "bg-violet-500/20 text-violet-400",
  Writing: "bg-blue-500/20 text-blue-400",
  Crypto: "bg-amber-500/20 text-amber-400",
  Social: "bg-emerald-500/20 text-emerald-400",
  Admin: "bg-zinc-500/20 text-zinc-400",
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

  const activeTodos = todos.filter((t) => !t.completed);
  const completedTodos = todos.filter((t) => t.completed);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">To-Dos</h1>
          <p className="text-zinc-400">
            <span className="text-white font-semibold">{activeTodos.length}</span> tasks remaining
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-medium transition-all glow">
          <Plus className="w-4 h-4" />
          Add Task
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-6">
        <div className="glass rounded-xl p-1 flex gap-1 border border-zinc-800/50">
          {(["all", "active", "completed"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === f
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {f === "all" ? "All" : f === "active" ? "Active" : "Completed"}
              <span className="ml-2 text-xs opacity-50">
                {f === "all" ? todos.length : f === "active" ? activeTodos.length : completedTodos.length}
              </span>
            </button>
          ))}
        </div>
        <button className="ml-auto flex items-center gap-2 px-4 py-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-all">
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      {/* Todo List */}
      <div className="space-y-3">
        {filteredTodos.map((todo) => {
          const priority = priorityConfig[todo.priority];
          return (
            <div
              key={todo.id}
              className={`glass border border-zinc-800/50 rounded-xl p-4 flex items-center gap-4 transition-all card-hover border-glow ${
                todo.completed ? "opacity-60" : ""
              }`}
            >
              {/* Checkbox */}
              <button
                onClick={() => toggleTodo(todo.id)}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  todo.completed
                    ? "bg-emerald-500 border-emerald-500"
                    : "border-zinc-600 hover:border-violet-500"
                }`}
              >
                {todo.completed ? (
                  <Check className="w-3.5 h-3.5 text-white" />
                ) : (
                  <Circle className="w-3.5 h-3.5 text-transparent" />
                )}
              </button>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className={`font-medium ${todo.completed ? "line-through text-zinc-500" : ""}`}>
                  {todo.title}
                </p>
                {todo.dueDate && !todo.completed && (
                  <div className="flex items-center gap-1 mt-1 text-xs text-zinc-500">
                    <Clock className="w-3 h-3" />
                    {todo.dueDate}
                  </div>
                )}
              </div>
              
              {/* Category */}
              <span className={`text-xs px-2.5 py-1 rounded-lg ${categoryColors[todo.category] || categoryColors.Admin}`}>
                {todo.category}
              </span>
              
              {/* Priority */}
              <div className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg border ${priority.bg} ${priority.border} ${priority.color}`}>
                <Flag className="w-3 h-3" />
                {todo.priority}
              </div>

              {/* Actions */}
              <button className="p-1.5 rounded-lg hover:bg-zinc-700/50 transition-colors text-zinc-500 hover:text-white">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-3 gap-4">
        <div className="glass border border-zinc-800/50 rounded-xl p-5 text-center">
          <p className="text-3xl font-bold">{todos.length}</p>
          <p className="text-sm text-zinc-400 mt-1">Total Tasks</p>
        </div>
        <div className="glass border border-zinc-800/50 rounded-xl p-5 text-center">
          <p className="text-3xl font-bold text-emerald-400">{completedTodos.length}</p>
          <p className="text-sm text-zinc-400 mt-1">Completed</p>
        </div>
        <div className="glass border border-zinc-800/50 rounded-xl p-5 text-center">
          <p className="text-3xl font-bold text-amber-400">{activeTodos.length}</p>
          <p className="text-sm text-zinc-400 mt-1">Remaining</p>
        </div>
      </div>
    </div>
  );
}
