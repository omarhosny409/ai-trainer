import Link from "next/link";
import { Dumbbell, Bot, Utensils, BarChart3, ScanLine, Trophy } from "lucide-react";
import { Nav } from "@/components/Nav";
import { PlanCard } from "@/components/PlanCard";

const features = [
  [Bot, "AI Chat Coach", "مدرب ذكي يتذكر بياناتك ويرد بالعربية."],
  [Dumbbell, "Workout Generator", "برامج Push Pull Legs وUpper Lower وFull Body."],
  [Utensils, "Nutrition Planner", "سعرات، ماكروز، وجبات، وبدائل طعام."],
  [BarChart3, "Progress Tracking", "متابعة الوزن والقياسات والالتزام."],
  [ScanLine, "Smart Scanners", "ماسح وجبات وباركود قابل للتوسع."],
  [Trophy, "Gamification", "إنجازات، نقاط، وتحديات."],
];

export default function Home() {
  return <main><Nav />
    <section className="mx-auto grid min-h-[82vh] max-w-7xl items-center gap-10 px-4 py-16 md:grid-cols-2">
      <div><p className="mb-4 inline-flex rounded-full border border-gold-400/30 bg-gold-400/10 px-4 py-2 text-sm text-gold-200">منصة عربية أولًا للياقة وكمال الأجسام</p>
        <h1 className="text-5xl font-black leading-tight md:text-7xl">مدربك الشخصي بالذكاء الاصطناعي</h1>
        <p className="mt-6 text-xl leading-9 text-white/70">خطط تمرين، تغذية، متابعة نتائج، ومدرب متاح 24/7.</p>
        <div className="mt-8 flex flex-wrap gap-4"><Link className="btn-primary" href="/onboarding">ابدأ الآن</Link><Link className="btn-secondary" href="/chat">جرّب مجاناً</Link></div>
      </div>
      <div className="card p-6"><div className="rounded-3xl bg-gradient-to-br from-white/10 to-gold-400/10 p-6"><p className="text-white/50">خطة اليوم</p><h2 className="mt-2 text-3xl font-black">Push Day — تضخيم</h2><div className="mt-6 space-y-3 text-white/75"><p>بنش برس: 4 × 6-8</p><p>كتف أمامي: 3 × 10</p><p>ترايسبس كيبل: 3 × 12</p><p>راحة: 90 ثانية</p></div></div></div>
    </section>
    <section id="features" className="mx-auto max-w-7xl px-4 py-20"><h2 className="text-4xl font-black">مميزات المنصة</h2><div className="mt-10 grid gap-5 md:grid-cols-3">{features.map(([Icon, title, text]: any) => <div className="card p-6" key={title}><Icon className="text-gold-400" /><h3 className="mt-5 text-xl font-bold">{title}</h3><p className="mt-3 text-white/60">{text}</p></div>)}</div></section>
    <section className="mx-auto max-w-7xl px-4 py-20"><h2 className="text-4xl font-black">الأسعار</h2><div className="mt-10 grid gap-6 md:grid-cols-3"><PlanCard name="Free" price="0$" features={["حاسبات أساسية", "5 طلبات AI", "تتبع محدود"]}/><PlanCard highlight name="Pro Monthly" price="19$" features={["خطط تمرين غير محدودة", "تغذية AI", "دردشة مدرب", "رسوم بيانية"]}/><PlanCard name="Premium Annual" price="149$" features={["كل مزايا Pro", "تحليلات شهرية", "أولوية AI", "مزايا Premium"]}/></div></section>
    <section className="mx-auto max-w-7xl px-4 py-20"><div className="card p-8"><h2 className="text-3xl font-black">أسئلة شائعة</h2><div className="mt-6 space-y-4 text-white/70"><p><b>هل يغني عن الطبيب؟</b> لا. المنصة للتدريب والتغذية العامة وليست تشخيصًا طبيًا.</p><p><b>هل تدعم العربية؟</b> نعم، الواجهة RTL والعربية هي اللغة الأساسية.</p></div></div></section>
    <footer className="border-t border-white/10 px-4 py-10 text-center text-white/50">AI Fit Pro © 2026</footer>
  </main>;
}
