export function MetricCard({ title, value, hint }: { title: string; value: string; hint?: string }) {
  return <div className="card p-5"><p className="text-sm text-white/50">{title}</p><p className="mt-2 text-3xl font-black">{value}</p>{hint && <p className="mt-2 text-xs text-white/45">{hint}</p>}</div>;
}
