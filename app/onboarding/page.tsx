"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Nav } from "@/components/Nav";

const fields = [
  ["age", "العمر", "number"], ["gender", "الجنس", "text"], ["height", "الطول سم", "number"], ["weight", "الوزن كجم", "number"], ["bodyFat", "نسبة الدهون %", "number"],
  ["goal", "الهدف: MUSCLE_GAIN / BULKING / FAT_LOSS / RECOMP / STRENGTH", "text"], ["level", "المستوى: BEGINNER / INTERMEDIATE / ADVANCED", "text"], ["workoutDays", "أيام التمرين أسبوعيًا", "number"],
  ["equipment", "المعدات المتاحة، مفصولة بفواصل", "text"], ["dietPreference", "النظام الغذائي", "text"], ["injuries", "الإصابات", "text"], ["medicalLimitations", "قيود طبية", "text"]
];
export default function OnboardingPage() {
  const router = useRouter(); const [loading, setLoading] = useState(false); const [form, setForm] = useState<Record<string,string>>({ goal: "MUSCLE_GAIN", level: "BEGINNER", gender: "male" });
  async function submit(e: React.FormEvent) { e.preventDefault(); setLoading(true); const res = await fetch("/api/onboarding", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) }); setLoading(false); if (res.ok) router.push("/dashboard"); }
  return <main><Nav /><section className="mx-auto max-w-3xl px-4 py-12"><h1 className="text-4xl font-black">إعداد ملفك الرياضي</h1><form onSubmit={submit} className="card mt-8 grid gap-4 p-6">{fields.map(([name,label,type]) => <label key={name} className="grid gap-2 text-sm text-white/70">{label}<input className="input" type={type} value={form[name] || ""} onChange={e=>setForm({...form,[name]:e.target.value})}/></label>)}<button className="btn-primary" disabled={loading}>{loading ? "جاري الحفظ..." : "احفظ وابدأ"}</button></form></section></main>;
}
