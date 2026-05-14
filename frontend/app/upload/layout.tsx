"use client";

import AuthGuard from "@/components/AuthGuard";
import { LayoutWrapper } from "@/components/LayoutWrapper";

export default function UploadLayout({
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
