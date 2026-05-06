"use client";

import { LayoutWrapper } from "@/components/LayoutWrapper";

export default function EvidenceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutWrapper>{children}</LayoutWrapper>;
}
