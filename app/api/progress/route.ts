import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getDbUser } from "@/lib/current-user";
const schema = z.object({ weight: z.coerce.number().optional(), calories: z.coerce.number().optional(), chest: z.coerce.number().optional(), waist: z.coerce.number().optional(), arms: z.coerce.number().optional(), legs: z.coerce.number().optional(), photoUrl: z.string().url().optional(), note: z.string().optional() });
export async function POST(req: Request){ const user=await getDbUser(); if(!user) return NextResponse.json({error:"Unauthorized"},{status:401}); const data=schema.parse(await req.json()); const row=await prisma.progressEntry.create({data:{...data,userId:user.id}}); return NextResponse.json(row); }
