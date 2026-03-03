"use client";

import React from "react";
import { AuthProvider } from "@/lib/authContext";
import { AppShell } from "@/components/AppShell";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AppShell>{children}</AppShell>
    </AuthProvider>
  );
}
