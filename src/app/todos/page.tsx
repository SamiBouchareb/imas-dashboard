"use client";

import { useState } from "react";

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
  { id: "5", title: "Dashboard responsive machen", completed: false, priority: "low", category: "Dev" },
  { id: "6", title: "Moltbook Post schreiben", completed: true, priority: "low", category: "Social" },
  { id: "7", title: "2-Wochen Report erstellen", completed: true, priority: "high", category: "Admin" },
  { id: "8", title: "Marokko-Buch Kapitel 28 geschrieben", completed: true, priority: "medium", category: "Writing" },
];

const priorityDot: Record<string, string> = {
  high: "bg-[var(--danger)]",
  medium: "bg-[var(--warning)]",
  low: "",
};

export default function Todos() {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [newTask, setNewTask] = useState("");

  const filteredTodos = todos.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  const toggleTodo = (id: string) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const addTodo = () => {
    if (!newTask.trim()) return;
    setTodos([
      ...todos,
      { id: Date.now().toString(), title: newTask.trim(), completed: false, priority: "low", category: "Misc" },
    ]);
    setNewTask("");
  };

  const active = todos.filter((t) => !t.completed);
  const completed = todos.filter((t) => t.completed);

  const filters = [
    { key: "all" as const, label: "All", count: todos.length },
    { key: "active" as const, label: "Active", count: active.length },
    { key: "completed" as const, label: "Done", count: completed.length },
  ];

  return (
    <div className="max-w-[900px] mx-auto px-10 py-10 lg:px-16">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[24px] font-bold text-[var(--fg)]">☑️ To-Dos</h1>
          <p className="text-[13px] text-[var(--secondary)] mt-0.5">
            {active.length} tasks remaining · {completed.length} completed
          </p>
        </div>
      </div>

      {/* Tab Filters */}
      <div className="flex gap-0 border-b border-[var(--border)] mb-6">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`relative px-4 py-2 text-[13px] transition-colors ${
              filter === f.key
                ? "text-[var(--fg)] font-medium"
                : "text-[var(--secondary)] hover:text-[var(--fg)]"
            }`}
          >
            {f.label}
            <span className="ml-1.5 text-[11px] text-[var(--tertiary)]">{f.count}</span>
            {filter === f.key && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--fg)] rounded-t" />
            )}
          </button>
        ))}
      </div>

      {/* Todo List */}
      <div className="mb-6">
        {filteredTodos.map((todo) => (
          <div
            key={todo.id}
            className={`group flex items-center gap-3 py-2 px-2 -mx-2 rounded-[var(--radius)] hover:bg-[var(--hover)] transition-colors ${
              todo.completed ? "opacity-50" : ""
            }`}
          >
            {/* Drag handle (visible on hover) */}
            <span className="text-[var(--tertiary)] opacity-0 group-hover:opacity-100 transition-opacity text-[10px] cursor-grab w-3">
              ⋮⋮
            </span>

            {/* Checkbox */}
            <button
              onClick={() => toggleTodo(todo.id)}
              className={`w-[18px] h-[18px] rounded flex-shrink-0 flex items-center justify-center border transition-colors ${
                todo.completed
                  ? "bg-[var(--accent)] border-[var(--accent)]"
                  : "border-[var(--tertiary)] hover:border-[var(--accent)]"
              }`}
            >
              {todo.completed && (
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>

            {/* Text */}
            <p className={`flex-1 text-[13px] min-w-0 ${todo.completed ? "line-through text-[var(--secondary)]" : "text-[var(--fg)]"}`}>
              {todo.title}
            </p>

            {/* Due date */}
            {todo.dueDate && !todo.completed && (
              <span className={`text-[11px] flex-shrink-0 ${todo.dueDate === "Today" ? "text-[var(--danger)]" : "text-[var(--secondary)]"}`}>
                {todo.dueDate}
              </span>
            )}

            {/* Category */}
            <span className="text-[11px] text-[var(--secondary)] bg-[var(--surface)] border border-[var(--border)] px-1.5 py-0.5 rounded flex-shrink-0">
              {todo.category}
            </span>

            {/* Priority dot */}
            {priorityDot[todo.priority] && !todo.completed && (
              <span className={`w-[6px] h-[6px] rounded-full flex-shrink-0 ${priorityDot[todo.priority]}`} />
            )}
          </div>
        ))}
      </div>

      {/* Add Task */}
      <div className="flex items-center gap-2 py-2 px-2 -mx-2 border-t border-[var(--border)]">
        <span className="text-[var(--tertiary)] text-[14px]">+</span>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
          placeholder="Add a task... (press Enter)"
          className="flex-1 text-[13px] bg-transparent focus:outline-none placeholder:text-[var(--tertiary)]"
        />
      </div>

      {/* Stats */}
      <div className="mt-8 pt-4 border-t border-[var(--border)] flex gap-6 text-[12px] text-[var(--secondary)]">
        <span>{todos.length} total</span>
        <span className="text-[var(--success)]">✓ {completed.length} done</span>
        <span>{active.length} remaining</span>
        <span className="text-[var(--danger)]">{active.filter((t) => t.priority === "high").length} high priority</span>
      </div>
    </div>
  );
}
