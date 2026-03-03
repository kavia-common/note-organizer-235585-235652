"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { api } from "@/lib/apiClient";
import type { Note } from "@/lib/types";
import { NoteEditor } from "@/components/NoteEditor";
import { useAuth } from "@/lib/authContext";

export default function NoteDetailByQueryClient() {
  const searchParams = useSearchParams();
  const noteId = searchParams.get("id") || "";
  const router = useRouter();
  const { user, loading } = useAuth();

  const [note, setNote] = React.useState<Note | null>(null);
  const [busy, setBusy] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      setBusy(true);
      setError(null);
      try {
        if (!noteId) {
          throw new Error("Missing note id.");
        }
        const n = await api.getNote(noteId);
        if (mounted) setNote(n);
      } catch (err) {
        if (mounted) setError(err instanceof Error ? err.message : "Failed to load note.");
      } finally {
        if (mounted) setBusy(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [noteId]);

  if (!loading && !user) {
    return (
      <section className="card p-6">
        <div className="font-semibold">Please login</div>
        <div className="mt-1 text-sm text-[rgba(100,116,139,0.95)]">
          You must be authenticated to view notes.
        </div>
      </section>
    );
  }

  if (busy) {
    return (
      <section className="card p-6 text-sm text-[rgba(100,116,139,0.95)]">
        Loading note…
      </section>
    );
  }

  if (error || !note) {
    return (
      <section className="card p-6">
        <div className="font-semibold">Couldn’t load note</div>
        <div className="mt-1 text-sm text-[rgba(100,116,139,0.95)]">
          {error || "Not found."}
        </div>
        <div className="mt-4">
          <button className="button" type="button" onClick={() => router.push("/app")}>
            Back to list
          </button>
        </div>
      </section>
    );
  }

  return (
    <NoteEditor
      initial={note}
      saving={saving}
      deleting={deleting}
      onSave={async (input) => {
        setSaving(true);
        try {
          const updated = await api.updateNote(noteId, input);
          setNote(updated);
        } finally {
          setSaving(false);
        }
      }}
      onDelete={async () => {
        setDeleting(true);
        try {
          await api.deleteNote(noteId);
          router.push("/app");
        } finally {
          setDeleting(false);
        }
      }}
    />
  );
}
