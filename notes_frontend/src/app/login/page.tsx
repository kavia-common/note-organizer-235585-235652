"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { api } from "@/lib/apiClient";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await api.login(email.trim(), password);
      router.push("/app");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="min-h-screen retro-bg">
      <div className="container">
        <section className="card p-8 max-w-xl mx-auto">
          <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
          <p className="mt-1 text-sm text-[rgba(100,116,139,0.95)]">
            Sign in to access your notes.
          </p>

          <form className="mt-6 space-y-4" onSubmit={onSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                className="input"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@retro.com"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                className="input"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            {error ? (
              <div className="retro-border p-3 bg-[rgba(239,68,68,0.08)] border-[rgba(239,68,68,0.25)] text-sm">
                {error}
              </div>
            ) : null}

            <button className="button button-primary w-full" disabled={busy} type="submit">
              {busy ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <div className="mt-6 flex items-center justify-between text-sm">
            <Link className="text-[rgba(59,130,246,0.95)] hover:underline" href="/register">
              Create an account
            </Link>
            <Link className="text-[rgba(100,116,139,0.95)] hover:underline" href="/">
              Back home
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
