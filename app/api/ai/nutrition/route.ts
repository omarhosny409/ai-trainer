import { NextResponse } from "next/server";
import { openai, coachSystemPrompt } from "@/lib/openai";
import { prisma } from "@/lib/prisma";
import { getDbUser } from "@/lib/current-user";
import { bmr, tdee, macros } from "@/lib/fitness";
export async function POST() {
  const user = await getDbUser(); if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const profile = await prisma.profile.findUnique({ where: { userId: user.id } }); if (!profile) return NextResponse.json({ error: "Complete onboarding first" }, { status: 400 });
  const base = bmr({ gender: profile.gender === "female" ? "female" : "male", weight: profile.weight, height: profile.height, age: profile.age });
  const target = profile.goal === "FAT_LOSS" ? tdee(base) - 400 : tdee(base) + 250; const m = macros(target, profile.weight, profile.goal);
  const prompt = `أنشئ خطة تغذية JSON فقط بهذه الماكروز ${JSON.stringify(m)} وبيانات ${JSON.stringify(profile)}. الحقول: title, meals, substitutions, waterIntake, supplements, adjustmentRules.`;
  const completion = await openai.chat.completions.create({ model: "gpt-4o-mini", response_format: { type: "json_object" }, messages: [{ role: "system", content: coachSystemPrompt }, { role: "user", content: prompt }] });
  const json = JSON.parse(completion.choices[0]?.message?.content || "{}");
  const plan = await prisma.nutritionPlan.create({ data: { userId: user.id, title: json.title || "خطة تغذية AI", calories: m.calories, protein: m.protein, carbs: m.carbs, fats: m.fats, content: json } });
  return NextResponse.json(plan);
}
