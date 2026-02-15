"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Palette, 
  CheckSquare, 
  Database, 
  Activity,
  Sparkles,
  Settings
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Canvas", href: "/canvas", icon: Palette },
  { name: "To-Dos", href: "/todos", icon: CheckSquare },
  { name: "Database", href: "/database", icon: Database },
  { name: "Activity", href: "/activity", icon: Activity },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 bg-zinc-950/50 border-r border-zinc-800/50 flex flex-col">
      {/* Logo */}
      <div className="p-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 flex items-center justify-center animate-gradient">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-zinc-950" />
          </div>
          <div>
            <h1 className="font-bold text-xl tracking-tight">Imas</h1>
            <p className="text-xs text-zinc-500 font-medium">Control Center</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1">
        <p className="px-4 py-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
          Main Menu
        </p>
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                isActive
                  ? "bg-gradient-to-r from-violet-500/20 to-purple-500/10 text-white border border-violet-500/20 glow-sm"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
              }`}
            >
              <Icon 
                className={`w-5 h-5 transition-transform duration-300 ${
                  isActive ? "text-violet-400" : "group-hover:scale-110"
                }`} 
              />
              <span className="font-medium">{item.name}</span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-400" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Status Card */}
      <div className="p-4">
        <div className="glass rounded-2xl p-4 border border-zinc-800/50">
          <div className="flex items-center gap-3 mb-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center">
                <Activity className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse-soft" />
            </div>
            <div>
              <p className="text-sm font-semibold">System Online</p>
              <p className="text-xs text-zinc-500">All services running</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-zinc-500">Model</span>
              <span className="text-zinc-300">Kimi K2.5</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-zinc-500">Uptime</span>
              <span className="text-emerald-400">99.9%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="p-4 pt-0">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-all duration-300">
          <Settings className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </button>
      </div>
    </aside>
  );
}
