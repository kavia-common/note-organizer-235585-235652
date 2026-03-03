import React, { Suspense } from "react";
import AppShellClient from "./AppShellClient";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen">
          <header className="sticky top-0 z-10 border-b border-[rgba(17,24,39,0.12)] bg-white/70 backdrop-blur">
            <div className="container flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl border border-[rgba(17,24,39,0.14)] bg-white flex items-center justify-center shadow-sm">
                  <span className="font-semibold text-[rgba(59,130,246,0.95)]">RN</span>
                </div>
                <div>
                  <div className="font-semibold tracking-tight">Retro Notes</div>
                  <div className="text-xs text-[rgba(100,116,139,0.95)]">
                    tags • search • markdown
                  </div>
                </div>
              </div>
              <div className="text-sm text-[rgba(100,116,139,0.95)]">Loading…</div>
            </div>
          </header>
          <div className="container grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-4">
            <aside className="card p-4 h-fit lg:sticky lg:top-[96px]">
              <div className="text-sm font-semibold mb-3">Navigation</div>
              <div className="space-y-2">
                <div className="h-9 rounded-xl border border-[rgba(17,24,39,0.14)] bg-white/70" />
                <div className="h-9 rounded-xl border border-[rgba(17,24,39,0.14)] bg-white/70" />
              </div>
              <div className="mt-5 h-16 rounded-xl border border-[rgba(17,24,39,0.14)] bg-white/70" />
              <div className="mt-5 h-16 rounded-xl border border-[rgba(17,24,39,0.14)] bg-white/70" />
            </aside>
            <main className="min-w-0">{children}</main>
          </div>
        </div>
      }
    >
      <AppShellClient>{children}</AppShellClient>
    </Suspense>
  );
}
