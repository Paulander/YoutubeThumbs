import { cn } from "@/lib/utils";

export function Button({
  className,
  variant = "primary",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
}) {
  return (
    <button
      className={cn(
        "inline-flex min-h-10 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-50",
        variant === "primary" && "bg-ink text-white hover:bg-black",
        variant === "secondary" && "border border-black/12 bg-white text-ink hover:bg-black/5",
        variant === "ghost" && "bg-transparent text-ink hover:bg-black/5",
        className
      )}
      {...props}
    />
  );
}

export function Field({
  label,
  hint,
  children
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2 text-sm font-bold text-ink">
      <span>{label}</span>
      {children}
      {hint ? <span className="text-xs font-medium text-ink/55">{hint}</span> : null}
    </label>
  );
}

export const inputClass =
  "min-h-11 w-full rounded-md border border-black/12 bg-white px-3 py-2 text-sm text-ink shadow-sm transition placeholder:text-ink/35 focus:border-cobalt";

export function SectionTitle({
  eyebrow,
  title,
  body
}: {
  eyebrow?: string;
  title: string;
  body?: string;
}) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? <p className="mb-2 text-sm font-black uppercase tracking-[0.16em] text-coral">{eyebrow}</p> : null}
      <h2 className="text-3xl font-black tracking-tight text-ink sm:text-4xl">{title}</h2>
      {body ? <p className="mt-3 text-base leading-7 text-ink/68">{body}</p> : null}
    </div>
  );
}
