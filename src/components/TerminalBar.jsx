export default function TerminalBar({ filename }) {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3 border-b border-black/5">
      <span className="w-2.5 h-2.5 rounded-full bg-black/10" aria-hidden="true" />
      <span className="w-2.5 h-2.5 rounded-full bg-black/10" aria-hidden="true" />
      <span className="w-2.5 h-2.5 rounded-full bg-black/10" aria-hidden="true" />
      {filename && (
        <span className="font-silom text-sm text-muted-foreground ml-2">{filename}</span>
      )}
    </div>
  )
}
