import React, { Suspense } from "react";
import NoteDetailByQueryClient from "./NoteDetailByQueryClient";

export default function NoteDetailByQueryPage() {
  return (
    <Suspense
      fallback={
        <section className="card p-6 text-sm text-[rgba(100,116,139,0.95)]">
          Loading note…
        </section>
      }
    >
      <NoteDetailByQueryClient />
    </Suspense>
  );
}
