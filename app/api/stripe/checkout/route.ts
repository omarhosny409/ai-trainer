import { NextResponse } from "next/server";
import { z } from "zod";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { getDbUser } from "@/lib/current-user";
const schema = z.object({ plan: z.enum(["PRO", "PREMIUM"]) });
export async function POST(req: Request) {
  const user = await getDbUser(); if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { plan } = schema.parse(await req.json());
  const price = plan === "PRO" ? process.env.STRIPE_PRO_PRICE_ID : process.env.STRIPE_PREMIUM_PRICE_ID;
  if (!price) return NextResponse.json({ error: "Missing Stripe price id" }, { status: 500 });
  let customer = user.stripeCustomerId;
  if (!customer) {
    const created = await stripe.customers.create({ email: user.email || undefined, name: user.name || undefined, metadata: { userId: user.id } });
    customer = created.id; await prisma.user.update({ where: { id: user.id }, data: { stripeCustomerId: customer } });
  }
  const session = await stripe.checkout.sessions.create({
    mode: "subscription", customer, line_items: [{ price, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?checkout=success`, cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?checkout=cancelled`,
    metadata: { userId: user.id, plan }
  });
  return NextResponse.json({ url: session.url });
}
