"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";

interface AuthGuardProps {
  children: React.ReactNode;

  // true = protected page
  // false = public page
  protectedRoute?: boolean;

  redirectTo?: string;
}

export default function AuthGuard({
  children,
  protectedRoute = false,
  redirectTo = "/",
}: AuthGuardProps) {
  const { loading, isAuthenticated } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    // Protected route -> unauthenticated users go to redirectTo
    if (protectedRoute && !isAuthenticated) {
      router.replace(redirectTo);
      return;
    }

    // Public route -> authenticated users go to dashboard
    if (!protectedRoute && isAuthenticated) {
      router.replace("/dashboard");
      return;
    }
  }, [loading, isAuthenticated, protectedRoute, redirectTo, router]);

  if (loading) {
    return (
      <div className="flex w-full h-screen items-center justify-center">
        <Spinner className="text-primary size-8" />
      </div>
    );
  }

  // Prevent flashing
  if (protectedRoute && !isAuthenticated) {
    return null;
  }

  if (!protectedRoute && isAuthenticated) {
    return null;
  }

  return children;
}
