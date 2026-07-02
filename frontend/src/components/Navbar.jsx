export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        <div className="flex items-center gap-3">

          <div className="text-3xl">
            🌐
          </div>

          <div>

            <h1 className="text-xl font-bold text-cyan-400">
              Web-Mind AI
            </h1>

            <p className="text-xs text-slate-400">
              AI Website Research Assistant
            </p>

          </div>

        </div>

        <div className="rounded-full bg-green-500/10 px-4 py-2 text-sm text-green-400">
          ● Local AI
        </div>

      </div>
    </nav>
  );
}