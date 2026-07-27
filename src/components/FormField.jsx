import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export default function FormField({ label, name, type = 'text', value, onChange, error, placeholder, rows, required, autoComplete }) {
  const id = `field-${name}`
  const shared = 'font-mono text-base bg-snow border-black/10 text-charcoal placeholder:text-black/25 rounded-none focus-visible:ring-cyber-cyan focus-visible:border-cyber-cyan'

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id} className="font-sans text-sm uppercase tracking-widest text-muted-foreground">
        {label}
      </Label>
      {rows ? (
        <Textarea
          id={id}
          required={required}
          name={name}
          value={value}
          onChange={onChange}
          rows={rows}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`${shared} resize-none`}
        />
      ) : (
        <Input
          id={id}
          required={required}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={shared}
        />
      )}
      {error && (
        <span id={`${id}-error`} role="alert" className="font-mono text-xs text-red-500">{error}</span>
      )}
    </div>
  )
}
