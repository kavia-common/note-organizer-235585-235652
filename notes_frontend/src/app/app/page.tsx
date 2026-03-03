import React, { Suspense } from "react";
import NotesIndexClient from "./NotesIndexClient";

export default function NotesIndexPage() {
  return (
    <Suspense
      fallback={
        <section className="card p-6 text-sm text-[rgba(100,116,139,0.95)]">
          Loading notes…
        </section>
      }
    >
      <NotesIndexClient />
    </Suspense>
  );
}
