"use client";

import { Sidebar } from "./Sidebar";
import { ReactNode } from "react";

interface LayoutWrapperProps {
  children: ReactNode;
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 md:ml-64 overflow-auto w-full md:w-auto pt-16 md:pt-0">
        <div className="h-full">{children}</div>
      </main>
    </div>
  );
}
