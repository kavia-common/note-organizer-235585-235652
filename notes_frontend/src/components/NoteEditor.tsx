"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Note, NoteInput } from "@/lib/types";
import { TagPill } from "@/components/TagPill";

function parseTags(value: string): string[] {
  return value
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
    .map((t) => t.replace(/^#/, ""))
    .filter((t, idx, arr) => arr.indexOf(t) === idx);
}

export function NoteEditor({
  initial,
  onSave,
  onDelete,
  saving,
  deleting,
}: {
  initial?: Partial<Note>;
  onSave: (input: NoteInput) => Promise<void>;
  onDelete?: () => Promise<void>;
  saving?: boolean;
  deleting?: boolean;
}) {
  const [title, setTitle] = React.useState(initial?.title || "");
  const [content, setContent] = React.useState(initial?.content || "");
  const [tagsText, setTagsText] = React.useState((initial?.tags || []).join(", "));
  const [tab, setTab] = React.useState<"edit" | "preview">("edit");
  const [error, setError] = React.useState<string | null>(null);

  const tags = React.useMemo(() => parseTags(tagsText), [tagsText]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await onSave({
        title: title.trim() || "Untitled",
        content,
        tags,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save.");
    }
  };

  return (
    <section className="card p-4 md:p-6">
      <div className="flex items-start justify-between gap-3 flex-col md:flex-row">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">
            {initial?.id ? "Edit note" : "New note"}
          </h1>
          <p className="text-sm text-[rgba(100,116,139,0.95)] mt-1">
            Markdown supported (GFM). Add tags as comma-separated values.
          </p>
        </div>
        <div className="flex gap-2">
          {onDelete ? (
            <button
              type="button"
              className="button button-danger"
              disabled={!!deleting}
              onClick={async () => {
                if (!confirm("Delete this note? This cannot be undone.")) return;
                await onDelete();
              }}
            >
              {deleting ? "Deleting…" : "Delete"}
            </button>
          ) : null}
          <button
            type="button"
            className={tab === "edit" ? "button button-primary" : "button"}
            onClick={() => setTab("edit")}
          >
            Edit
          </button>
          <button
            type="button"
            className={tab === "preview" ? "button button-accent" : "button"}
            onClick={() => setTab("preview")}
          >
            Preview
          </button>
        </div>
      </div>

      <form className="mt-6 space-y-4" onSubmit={submit}>
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium">
            Title
          </label>
          <input
            id="title"
            className="input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="E.g. Synthwave ideas"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="tags" className="text-sm font-medium">
            Tags
          </label>
          <input
            id="tags"
            className="input"
            value={tagsText}
            onChange={(e) => setTagsText(e.target.value)}
            placeholder="retro, work, ideas"
          />
          {tags.length ? (
            <div className="flex flex-wrap gap-2">
              {tags.map((t) => (
                <TagPill key={t} label={t} />
              ))}
            </div>
          ) : null}
        </div>

        {tab === "edit" ? (
          <div className="space-y-2">
            <label htmlFor="content" className="text-sm font-medium">
              Content (Markdown)
            </label>
            <textarea
              id="content"
              className="input min-h-[320px] font-mono text-sm"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={"# Heading\n\nWrite something…"}
            />
          </div>
        ) : (
          <div className="space-y-2">
            <div className="text-sm font-medium">Preview</div>
            <div className="retro-border bg-white/70 p-4 md:p-5">
              <div className="md">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {content || "_Nothing to preview yet._"}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        )}

        {error ? (
          <div className="retro-border p-3 bg-[rgba(239,68,68,0.08)] border-[rgba(239,68,68,0.25)] text-sm">
            {error}
          </div>
        ) : null}

        <button className="button button-primary w-full" disabled={!!saving} type="submit">
          {saving ? "Saving…" : "Save note"}
        </button>
      </form>
    </section>
  );
}
