export function PlanCard({ name, price, features, highlight }: { name: string; price: string; features: string[]; highlight?: boolean }) {
  return <div className={`card p-6 ${highlight ? "ring-1 ring-gold-400" : ""}`}>
    <h3 className="text-2xl font-black">{name}</h3><p className="mt-3 text-4xl font-black text-gold-400">{price}</p>
    <ul className="mt-6 space-y-3 text-white/70">{features.map(f => <li key={f}>• {f}</li>)}</ul>
    <button className="btn-primary mt-8 w-full">ابدأ الآن</button>
  </div>;
}
