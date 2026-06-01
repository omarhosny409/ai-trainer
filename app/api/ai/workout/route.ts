import { NextResponse } from "next/server";
import { openai, coachSystemPrompt } from "@/lib/openai";
import { prisma } from "@/lib/prisma";
import { getDbUser } from "@/lib/current-user";
export async function POST() {
  const user = await getDbUser(); if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const profile = await prisma.profile.findUnique({ where: { userId: user.id } }); if (!profile) return NextResponse.json({ error: "Complete onboarding first" }, { status: 400 });
  const prompt = `أنشئ برنامج تمرين JSON فقط بناء على البيانات: ${JSON.stringify(profile)}. الحقول: title, split, days[{name, exercises[{name,sets,reps,rest,description,alternatives,injuryNotes}]}], progressiveOverload.`;
  const completion = await openai.chat.completions.create({ model: "gpt-4o-mini", response_format: { type: "json_object" }, messages: [{ role: "system", content: coachSystemPrompt }, { role: "user", content: prompt }] });
  const json = JSON.parse(completion.choices[0]?.message?.content || "{}");
  const plan = await prisma.workoutPlan.create({ data: { userId: user.id, title: json.title || "خطة تمرين AI", split: json.split || "Hybrid", content: json } });
  return NextResponse.json(plan);
}
