import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";
export async function POST(req: Request) {
  const body = await req.text(); const sig = (await headers()).get("stripe-signature");
  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) return NextResponse.json({ error: "Missing webhook secret" }, { status: 400 });
  let event: Stripe.Event;
  try { event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET); } catch { return NextResponse.json({ error: "Invalid signature" }, { status: 400 }); }
  await prisma.subscriptionEvent.upsert({ where: { stripeEventId: event.id }, update: {}, create: { stripeEventId: event.id, type: event.type, payload: event as any } });
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.userId; const plan = session.metadata?.plan as "PRO"|"PREMIUM"|undefined;
    if (userId && plan) await prisma.user.update({ where: { id: userId }, data: { plan } });
  }
  if (event.type === "customer.subscription.deleted") {
    const sub = event.data.object as Stripe.Subscription;
    const user = await prisma.user.findFirst({ where: { stripeCustomerId: String(sub.customer) } });
    if (user) await prisma.user.update({ where: { id: user.id }, data: { plan: "FREE" } });
  }
  return NextResponse.json({ received: true });
}
