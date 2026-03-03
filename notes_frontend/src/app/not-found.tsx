import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <main className="min-h-screen retro-bg">
      <div className="container">
        <section className="card p-8" role="alert" aria-live="assertive">
          <h1 className="text-2xl font-semibold tracking-tight">
            404 – Page Not Found
          </h1>
          <p className="mt-2 text-sm text-[rgba(100,116,139,0.95)]">
            The page you’re looking for doesn’t exist.
          </p>
          <div className="mt-6 flex gap-2">
            <Link className="button button-primary" href="/">
              Home
            </Link>
            <Link className="button" href="/app">
              Open app
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
