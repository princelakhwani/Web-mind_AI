import { Globe2 } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">

        {/* Logo */}

        <div className="flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg">

            <Globe2 size={28} />

          </div>

          <div>

            <h1 className="text-2xl font-bold text-slate-900">
              Web-Mind AI
            </h1>

            <p className="text-sm text-slate-500">
              AI Website Research Assistant
            </p>

          </div>

        </div>

        {/* Status */}

        <div className="flex items-center gap-6">

          <div className="rounded-full border border-green-200 bg-green-50 px-5 py-2">

            <span className="font-medium text-green-600">
              🟢 Local AI
            </span>

          </div>

        </div>

      </div>
    </header>
  );
}