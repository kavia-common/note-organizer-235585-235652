"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { NoteEditor } from "@/components/NoteEditor";
import { api } from "@/lib/apiClient";
import { useAuth } from "@/lib/authContext";

export default function NewNotePage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [saving, setSaving] = React.useState(false);

  if (!loading && !user) {
    return (
      <section className="card p-6">
        <div className="font-semibold">Please login</div>
        <div className="mt-1 text-sm text-[rgba(100,116,139,0.95)]">
          You must be authenticated to create notes.
        </div>
      </section>
    );
  }

  return (
    <NoteEditor
      saving={saving}
      onSave={async (input) => {
        setSaving(true);
        try {
          const note = await api.createNote(input);
          router.push(`/app/note?id=${encodeURIComponent(note.id)}`);
        } finally {
          setSaving(false);
        }
      }}
    />
  );
}
