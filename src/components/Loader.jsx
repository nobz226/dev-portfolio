export default function Loader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-snow">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-cyber-cyan border-t-transparent rounded-full animate-spin" />
        <span className="font-mono text-sm text-muted-foreground uppercase tracking-widest">Loading</span>
      </div>
    </div>
  )
}
