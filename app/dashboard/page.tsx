import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Nav } from "@/components/Nav";
import { MetricCard } from "@/components/MetricCard";
import DashboardChart from "./progress-chart";

export default async function DashboardPage() {
  const { userId } = await auth(); if (!userId) redirect("/");
  const user = await prisma.user.findUnique({ where: { clerkId: userId }, include: { onboarding: true, progress: { orderBy: { createdAt: "asc" }, take: 12 }, workouts: { take: 3, orderBy: { createdAt: "desc" } }, nutrition: { take: 1, orderBy: { createdAt: "desc" } } } });
  if (!user?.onboarding) redirect("/onboarding");
  const weight = user.progress.at(-1)?.weight ?? user.onboarding.weight;
  return <main><Nav /><section className="mx-auto max-w-7xl px-4 py-10"><h1 className="text-4xl font-black">لوحة التحكم</h1>
    <div className="mt-8 grid gap-4 md:grid-cols-4"><MetricCard title="الخطة" value={user.plan}/><MetricCard title="الوزن الحالي" value={`${weight} كجم`}/><MetricCard title="أيام التمرين" value={`${user.onboarding.workoutDays}`}/><MetricCard title="الهدف" value={user.onboarding.goal}/></div>
    <div className="mt-8 grid gap-6 lg:grid-cols-3"><div className="card p-6 lg:col-span-2"><h2 className="mb-5 text-2xl font-bold">تطور الوزن</h2><DashboardChart data={user.progress.map(p=>({ date: p.createdAt.toISOString().slice(0,10), weight: p.weight }))}/></div><div className="card p-6"><h2 className="text-2xl font-bold">آخر الخطط</h2><div className="mt-5 space-y-3 text-white/70">{user.workouts.map(w=><p key={w.id}>• {w.title}</p>)}{!user.workouts.length && <p>لم تُنشأ خطة بعد.</p>}</div></div></div>
  </section></main>;
}
