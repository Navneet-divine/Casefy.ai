"use client";

import { LayoutWrapper } from "@/components/LayoutWrapper";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutWrapper>{children}</LayoutWrapper>;
}
