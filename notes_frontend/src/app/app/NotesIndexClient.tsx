"use client";

import Link from "next/link";
import React from "react";
import { useSearchParams } from "next/navigation";
import { api } from "@/lib/apiClient";
import type { Note } from "@/lib/types";
import { TagPill } from "@/components/TagPill";
import { useAuth } from "@/lib/authContext";

function NoteRow({ note }: { note: Note }) {
  return (
    <Link
      href={`/app/note?id=${encodeURIComponent(note.id)}`}
      className="block retro-border bg-white/70 p-4 hover:shadow-sm"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="font-semibold truncate">{note.title || "Untitled"}</div>
          <div className="mt-1 text-sm text-[rgba(100,116,139,0.95)] line-clamp-2">
            {note.content?.slice(0, 140) || "—"}
          </div>
        </div>
        <div className="text-xs text-[rgba(100,116,139,0.95)] whitespace-nowrap">
          {(note.updated_at || note.created_at || "").slice(0, 10)}
        </div>
      </div>
      {note.tags?.length ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {note.tags.slice(0, 6).map((t) => (
            <TagPill key={t} label={t} />
          ))}
        </div>
      ) : null}
    </Link>
  );
}

export default function NotesIndexClient() {
  const { user, loading } = useAuth();
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const tag = searchParams.get("tag") || "";

  const [notes, setNotes] = React.useState<Note[]>([]);
  const [busy, setBusy] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      setBusy(true);
      setError(null);
      try {
        const items = await api.listNotes({
          q: q || undefined,
          tag: tag || undefined,
        });
        if (mounted) setNotes(items);
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : "Failed to load notes.");
        }
      } finally {
        if (mounted) setBusy(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [q, tag]);

  return (
    <section className="card p-4 md:p-6">
      <div className="flex items-start justify-between gap-3 flex-col md:flex-row">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Notes</h1>
          <p className="text-sm text-[rgba(100,116,139,0.95)] mt-1">
            {tag ? (
              <>
                Filtering by tag <span className="kbd">#{tag}</span>
              </>
            ) : q ? (
              <>
                Searching for <span className="kbd">{q}</span>
              </>
            ) : (
              "Your latest notes."
            )}
          </p>
        </div>
        <Link className="button button-primary" href="/app/new">
          + New note
        </Link>
      </div>

      {!loading && !user ? (
        <div className="mt-6 retro-border p-4 bg-[rgba(59,130,246,0.08)] border-[rgba(59,130,246,0.25)]">
          <div className="font-semibold">Sign in required</div>
          <div className="text-sm text-[rgba(100,116,139,0.95)] mt-1">
            Please login to access your private notes.
          </div>
          <div className="mt-3 flex gap-2">
            <Link className="button button-primary" href="/login">
              Login
            </Link>
            <Link className="button" href="/register">
              Create account
            </Link>
          </div>
        </div>
      ) : busy ? (
        <div className="mt-6 text-sm text-[rgba(100,116,139,0.95)]">
          Loading notes…
        </div>
      ) : error ? (
        <div className="mt-6 retro-border p-4 bg-[rgba(239,68,68,0.08)] border-[rgba(239,68,68,0.25)] text-sm">
          {error}
        </div>
      ) : notes.length === 0 ? (
        <div className="mt-6 retro-border p-4 bg-white/70">
          <div className="font-semibold">No notes yet</div>
          <div className="text-sm text-[rgba(100,116,139,0.95)] mt-1">
            Create your first note and add some tags for organization.
          </div>
          <div className="mt-3">
            <Link className="button button-accent" href="/app/new">
              Create note
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-6 grid gap-3">
          {notes.map((n) => (
            <NoteRow key={n.id} note={n} />
          ))}
        </div>
      )}
    </section>
  );
}
