export default function Navbar() {
  return (
    <nav className="w-full border-b border-slate-800 bg-slate-950">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <h1 className="text-2xl font-bold text-cyan-400">
          🌐 Web-Mind AI
        </h1>

        <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-sm text-cyan-300">
          Local AI
        </span>
      </div>
    </nav>
  );
}