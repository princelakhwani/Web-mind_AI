export default function SourceCard({ source }) {
  return (
    <a
      href={source}
      target="_blank"
      rel="noreferrer"
      className="block rounded-xl border border-slate-700 bg-slate-800 p-4 transition hover:border-cyan-500 hover:bg-slate-700"
    >
      <div className="font-semibold">
        📄 Source
      </div>

      <div className="mt-2 break-all text-sm text-slate-300">
        {source}
      </div>
    </a>
  );
}