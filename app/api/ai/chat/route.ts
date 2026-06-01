import { NextResponse } from "next/server";
import { z } from "zod";
import { openai, coachSystemPrompt } from "@/lib/openai";
import { prisma } from "@/lib/prisma";
import { getDbUser } from "@/lib/current-user";
const schema = z.object({ message: z.string().min(1).max(4000) });
export async function POST(req: Request) {
  const user = await getDbUser(); if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { message } = schema.parse(await req.json());
  const profile = await prisma.profile.findUnique({ where: { userId: user.id } });
  const recent = await prisma.chatMessage.findMany({ where: { userId: user.id }, orderBy: { createdAt: "desc" }, take: 8 });
  await prisma.chatMessage.create({ data: { userId: user.id, role: "user", content: message } });
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: coachSystemPrompt },
      { role: "system", content: `بيانات المستخدم: ${JSON.stringify(profile)}` },
      ...recent.reverse().map(m => ({ role: m.role as "user"|"assistant", content: m.content })),
      { role: "user", content: message }
    ],
    temperature: 0.6
  });
  const answer = completion.choices[0]?.message?.content ?? "تعذر إنشاء رد.";
  await prisma.chatMessage.create({ data: { userId: user.id, role: "assistant", content: answer } });
  return NextResponse.json({ answer });
}
