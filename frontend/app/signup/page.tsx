"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { FileText, Mail, Lock, User } from "lucide-react";
import AuthGuard from "@/components/AuthGuard";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function SignupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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
    setIsLoading(true);
    // Validation
    if (!formData.name.trim()) {
      setError("Name is required");
      setIsLoading(false);
      return;
    }
    if (!formData.email.includes("@")) {
      setError("Please enter a valid email");
      setIsLoading(false);
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      setIsLoading(false);
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        `${API_URL}/users/register`,
        {
          fullName: formData.name,
          email: formData.email,
          password: formData.password,
        },
        { withCredentials: true },
      );

      if (res.status === 201 || res.status === 200) {
        window.location.href = "/dashboard";
      } else {
        setError(res.data?.error || "Signup failed");
      }
    } catch (err: any) {
      setError(err?.response?.data?.error || err?.message || "Signup failed");
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
            <p className="text-sm text-muted-foreground">Create your account</p>
          </div>

          {/* Form Card */}
          <Card className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name
                </label>
                <Input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="bg-background border-border"
                />
              </div>

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
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Password
                </label>
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

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Confirm Password
                </label>
                <Input
                  type="password"
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
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
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>

              {/* Login Link */}
              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="text-primary hover:underline">
                  Login here
                </Link>
              </p>
            </form>
          </Card>

          {/* Footer */}
          <p className="text-center text-xs text-muted-foreground">
            By signing up, you agree to our{" "}
            <a href="#" className="text-primary hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-primary hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </AuthGuard>
  );
}
