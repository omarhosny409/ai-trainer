import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getDbUser } from "@/lib/current-user";

const schema = z.object({
  age: z.coerce.number().min(13).max(90), gender: z.string().min(1), height: z.coerce.number().min(100).max(240), weight: z.coerce.number().min(35).max(300), bodyFat: z.coerce.number().optional().nullable(),
  goal: z.enum(["MUSCLE_GAIN","BULKING","FAT_LOSS","RECOMP","STRENGTH"]), level: z.enum(["BEGINNER","INTERMEDIATE","ADVANCED"]), workoutDays: z.coerce.number().min(1).max(7),
  equipment: z.string().optional(), dietPreference: z.string().optional(), injuries: z.string().optional(), medicalLimitations: z.string().optional()
});
export async function POST(req: Request) {
  const user = await getDbUser(); if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const data = schema.parse(await req.json());
  const profile = await prisma.profile.upsert({ where: { userId: user.id }, update: { ...data, equipment: data.equipment?.split(",").map(x=>x.trim()).filter(Boolean) ?? [] }, create: { ...data, equipment: data.equipment?.split(",").map(x=>x.trim()).filter(Boolean) ?? [], userId: user.id } });
  return NextResponse.json(profile);
}
