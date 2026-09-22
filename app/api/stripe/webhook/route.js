import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import connectDb from "@/db/connectDb";
import Payment from "@/Models/Payment";

export async function POST(req) {
  const body = await req.text(); // must be raw text, not parsed JSON
  const sig = req.headers.get("stripe-signature");

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return NextResponse.json({ error: `Webhook signature failed: ${err.message}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    await connectDb();
    await Payment.findOneAndUpdate({ oid: session.id }, { done: true });
  }

  return NextResponse.json({ received: true });
}