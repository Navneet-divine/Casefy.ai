"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { FileText, Mail, Lock } from "lucide-react";
import AuthGuard from "@/components/AuthGuard";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!formData.email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }
    if (!formData.password) {
      setError("Password is required");
      return;
    }

    try {
      setIsLoading(true);
      const res = await axios.post(
        `${API_URL}/users/login`,
        { email: formData.email, password: formData.password },
        { withCredentials: true },
      );

      if (res.status === 200) {
        window.location.href = "/dashboard";

      } else {
        setError(res.data?.error || "Login failed");
      }
    } catch (err: any) {
      setError(err?.response?.data?.error || err?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    try {
      setIsLoading(true);
      const API_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await axios.post(
        `${API_URL}/api/users/login`,
        { email: "demo@example.com", password: "demo123" },
        { withCredentials: true },
      );
      if (res.status === 200) router.push("/dashboard");
      else setError(res.data?.error || "Demo login failed");
    } catch (err: any) {
      setError(
        err?.response?.data?.error || err?.message || "Demo login failed",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthGuard protectedRoute={false}>
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Casefy.ai</h1>
            <p className="text-sm text-muted-foreground">Welcome back</p>
          </div>

          {/* Form Card */}
          <Card className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </label>
                <Input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="bg-background border-border"
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Password
                  </label>
                  <a href="#" className="text-xs text-primary hover:underline">
                    Forgot?
                  </a>
                </div>
                <Input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="bg-background border-border"
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary/90"
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>

              {/* Demo Button */}
              <Button
                type="button"
                variant="outline"
                disabled={isLoading}
                onClick={handleDemoLogin}
                className="w-full"
              >
                Try Demo Account
              </Button>

              {/* Signup Link */}
              <p className="text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="text-primary hover:underline">
                  Sign up here
                </Link>
              </p>
            </form>
          </Card>

          {/* Info Box */}
          <div className="p-4 rounded-lg bg-card border border-border">
            <p className="text-xs text-muted-foreground text-center">
              <span className="font-semibold">Demo credentials:</span> Use any
              email and password, or click &quot;Try Demo Account&quot; to
              auto-fill
            </p>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
