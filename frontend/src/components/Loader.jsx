export default function Loader() {
  return (
    <div className="mt-8 flex items-center gap-4 rounded-xl bg-white p-5 shadow">

      <div className="h-4 w-4 animate-bounce rounded-full bg-blue-600"></div>

      <div className="h-4 w-4 animate-bounce rounded-full bg-violet-600 [animation-delay:200ms]"></div>

      <div className="h-4 w-4 animate-bounce rounded-full bg-cyan-500 [animation-delay:400ms]"></div>

      <span className="font-medium text-slate-600">
        Web-Mind AI is thinking...
      </span>

    </div>
  );
}