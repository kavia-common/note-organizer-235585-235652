import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen retro-bg">
      <div className="container">
        <section className="card p-8">
          <div className="flex items-start justify-between gap-6 flex-col md:flex-row">
            <div>
              <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
                Retro Notes
              </h1>
              <p className="mt-2 text-[rgba(100,116,139,0.95)] max-w-xl">
                A lightweight notes app with markdown editing, tags, and search—wrapped
                in a crisp retro UI.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link className="button button-primary" href="/app">
                  Open app
                </Link>
                <Link className="button" href="/login">
                  Login
                </Link>
                <Link className="button button-accent" href="/register">
                  Create account
                </Link>
              </div>

              <div className="mt-6 text-sm text-[rgba(17,24,39,0.85)]">
                Tips: Use markdown in notes. Organize with <span className="kbd">#tags</span>.
              </div>
            </div>

            <div className="w-full md:w-[420px] card p-4">
              <div className="text-sm font-semibold">Preview</div>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div className="retro-border p-3 bg-white/70">
                  <div className="text-xs text-[rgba(100,116,139,0.95)]">
                    Sidebar
                  </div>
                  <div className="mt-2 h-2 w-14 bg-[rgba(59,130,246,0.25)] rounded" />
                  <div className="mt-2 h-2 w-24 bg-[rgba(6,182,212,0.20)] rounded" />
                  <div className="mt-2 h-2 w-16 bg-[rgba(17,24,39,0.10)] rounded" />
                </div>
                <div className="retro-border p-3 bg-white/70">
                  <div className="text-xs text-[rgba(100,116,139,0.95)]">
                    Editor
                  </div>
                  <div className="mt-2 h-2 w-28 bg-[rgba(17,24,39,0.10)] rounded" />
                  <div className="mt-2 h-2 w-20 bg-[rgba(17,24,39,0.10)] rounded" />
                  <div className="mt-2 h-2 w-24 bg-[rgba(59,130,246,0.22)] rounded" />
                </div>
              </div>
              <div className="mt-3 text-xs text-[rgba(100,116,139,0.95)]">
                Static export friendly. Works with backend when endpoints are available,
                otherwise uses local mock storage.
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
