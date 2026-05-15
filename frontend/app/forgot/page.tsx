"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { FileText, Mail } from "lucide-react";
import AuthGuard from "@/components/AuthGuard";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function ForgotPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError("");
    setMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }

    try {
      setIsLoading(true);
      const res = await axios.post(
        `${API_URL}/users/forgot`,
        { email },
        { withCredentials: true },
      );

      if (res.status === 200) {
        setMessage(res.data?.message || "If that email exists, we'll send instructions.");
      } else {
        setError(res.data?.error || "Request failed");
      }
    } catch (err: any) {
      setError(err?.response?.data?.error || err?.message || "Request failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthGuard protectedRoute={false}>
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Casefy.ai</h1>
            <p className="text-sm text-muted-foreground">Reset your password</p>
          </div>

          <Card className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </label>
                <Input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="bg-background border-border"
                />
              </div>

              {error && (
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              {message && (
                <div className="p-3 bg-secondary/10 border border-secondary/20 rounded-lg">
                  <p className="text-sm text-foreground">{message}</p>
                </div>
              )}

              <Button type="submit" disabled={isLoading} className="w-full bg-primary hover:bg-primary/90">
                {isLoading ? "Sending..." : "Send reset link"}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Remembered your password? <Link href="/login" className="text-primary hover:underline">Login</Link>
              </p>
            </form>
          </Card>
        </div>
      </div>
    </AuthGuard>
  );
}
