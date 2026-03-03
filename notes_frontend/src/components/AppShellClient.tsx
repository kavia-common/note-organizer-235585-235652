"use client";

import Link from "next/link";
import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { api } from "@/lib/apiClient";
import { useAuth } from "@/lib/authContext";
import { TagPill } from "@/components/TagPill";

function NavLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`block rounded-xl px-3 py-2 text-sm border ${
        active
          ? "bg-[rgba(59,130,246,0.12)] border-[rgba(59,130,246,0.45)]"
          : "bg-white/70 border-[rgba(17,24,39,0.14)] hover:shadow-sm"
      }`}
    >
      {label}
    </Link>
  );
}

export default function AppShellClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [tags, setTags] = React.useState<string[]>([]);
  const [tagLoading, setTagLoading] = React.useState(true);

  const q = searchParams.get("q") || "";
  const activeTag = searchParams.get("tag") || "";

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      setTagLoading(true);
      try {
        const t = await api.listTags();
        if (mounted) setTags(t);
      } catch {
        if (mounted) setTags([]);
      } finally {
        if (mounted) setTagLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [pathname]);

  const onSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next = new URLSearchParams(searchParams.toString());
    if (q) next.set("q", q);
    if (!q) next.delete("q");
    router.push(`/app?${next.toString()}`);
  };

  const setTag = (tag: string) => {
    const next = new URLSearchParams(searchParams.toString());
    if (tag) next.set("tag", tag);
    if (!tag) next.delete("tag");
    router.push(`/app?${next.toString()}`);
  };

  return (
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

          <div className="flex items-center gap-2">
            <span className="kbd hidden sm:inline-flex">Ctrl</span>
            <span className="kbd hidden sm:inline-flex">K</span>
            <div className="w-px h-8 bg-[rgba(17,24,39,0.12)] mx-2 hidden sm:block" />
            {loading ? (
              <span className="text-sm text-[rgba(100,116,139,0.95)]">
                Loading…
              </span>
            ) : user ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-[rgba(17,24,39,0.85)] hidden sm:inline">
                  {user.email}
                </span>
                <button
                  type="button"
                  className="button"
                  onClick={async () => {
                    await logout();
                    router.push("/login");
                  }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link className="button button-primary" href="/login">
                Login
              </Link>
            )}
          </div>
        </div>
      </header>

      <div className="container grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-4">
        <aside className="card p-4 h-fit lg:sticky lg:top-[96px]">
          <div className="text-sm font-semibold mb-3">Navigation</div>
          <div className="space-y-2">
            <NavLink href="/app" label="All notes" active={pathname === "/app"} />
            <NavLink
              href="/app/new"
              label="New note"
              active={pathname === "/app/new"}
            />
          </div>

          <div className="mt-5">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-semibold">Tags</div>
              <button
                type="button"
                className="text-xs text-[rgba(59,130,246,0.95)] hover:underline"
                onClick={() => setTag("")}
              >
                Clear
              </button>
            </div>

            {tagLoading ? (
              <div className="text-sm text-[rgba(100,116,139,0.95)]">
                Loading tags…
              </div>
            ) : tags.length === 0 ? (
              <div className="text-sm text-[rgba(100,116,139,0.95)]">
                No tags yet.
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {tags.map((t) => (
                  <TagPill
                    key={t}
                    label={t}
                    active={t === activeTag}
                    onClick={() => setTag(t === activeTag ? "" : t)}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="mt-5">
            <div className="text-sm font-semibold mb-2">Search</div>
            <form onSubmit={onSearchSubmit} className="space-y-2">
              <input
                className="input"
                value={q}
                onChange={(e) => {
                  const next = new URLSearchParams(searchParams.toString());
                  const value = e.target.value;
                  if (value) next.set("q", value);
                  else next.delete("q");
                  router.replace(`/app?${next.toString()}`);
                }}
                placeholder="Search title, content, tags…"
                aria-label="Search notes"
              />
            </form>
          </div>

          <div className="mt-5 text-xs text-[rgba(100,116,139,0.95)]">
            Backend:{" "}
            <span className="font-mono">
              {process.env.NEXT_PUBLIC_API_BASE_URL || "(mock)"}
            </span>
          </div>
        </aside>

        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
}
