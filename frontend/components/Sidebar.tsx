"use client";

import { useApp } from "@/context/AppContext";
import {
  FileText,
  LayoutDashboard,
  Upload,
  Files,
  MessageSquare,
  Clock,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function Sidebar() {
  const pathname = usePathname();
  const { logout } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, matchSubpaths: true },
    { name: "Upload Case", href: "/upload", icon: Upload, matchSubpaths: true },
    { name: "All Evidence", href: "/evidence", icon: Files, matchSubpaths: true },
    { name: "Ask LLM", href: "/chat", icon: MessageSquare, matchSubpaths: false },
    { name: "History", href: "/chat/history", icon: Clock, matchSubpaths: false },
  ];

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const handleNavClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 md:hidden rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col shadow-lg z-40 transition-transform duration-300 ease-in-out md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Logo */}
        <div className="p-6 border-b border-sidebar-border bg-gradient-to-b from-sidebar-accent to-sidebar">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center shadow-md">
              <FileText className="w-5 h-5 text-sidebar-primary-foreground" />
            </div>
            <div>
              <span className="text-lg font-bold text-sidebar-foreground block">
                Casefy.ai
              </span>
              <span className="text-xs text-sidebar-accent-foreground/60">
                Legal AI Platform
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-1">
            {navItems.map((item) => {
              const matchSub = item.matchSubpaths !== false;
              const isActive =
                pathname === item.href || (matchSub && pathname.startsWith(item.href + "/"));
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleNavClick}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50",
                  )}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border space-y-3">
          <div className="text-xs text-sidebar-accent-foreground/60 text-center space-y-1">
            <div className="font-semibold">Casefy.ai v1.0</div>
            <div>AI-Powered Legal Analysis</div>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            size="sm"
            className="w-full gap-2 text-sidebar-foreground border-sidebar-border hover:bg-sidebar-accent"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </aside>
    </>
  );
}
