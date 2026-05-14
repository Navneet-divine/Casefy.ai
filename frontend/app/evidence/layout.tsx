"use client";

import { LayoutWrapper } from "@/components/LayoutWrapper";
import AuthGuard from "@/components/AuthGuard";

export default function EvidenceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard protectedRoute>
      <LayoutWrapper>{children}</LayoutWrapper>
    </AuthGuard>
  );
}
