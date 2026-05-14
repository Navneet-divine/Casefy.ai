"use client";

import { LayoutWrapper } from "@/components/LayoutWrapper";
import AuthGuard from "@/components/AuthGuard";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard protectedRoute={true}>
      <LayoutWrapper>{children}</LayoutWrapper>
    </AuthGuard>
  );
}
