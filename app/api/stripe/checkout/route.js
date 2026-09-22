import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import connectDb from "@/db/connectDb";
import User from "@/Models/User";
import Payment from "@/Models/Payment";

export async function POST(req) {
  const { to_user, name, message, amount } = await req.json();

  await connectDb();
  const creator = await User.findOne({ username: to_user });

  if (!creator || !creator.stripeOnboarded) {
    return NextResponse.json({ error: "Creator not set up for payments" }, { status: 400 });
  }

  const amountInCents = Math.round(Number(amount) * 100);

  const checkoutSession = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: { name: `Chai for ${to_user}` },
          unit_amount: amountInCents,
        },
        quantity: 1,
      },
    ],
    payment_intent_data: {
      application_fee_amount: Math.round(amountInCents * 0.05), // your 5% cut, optional
      transfer_data: {
        destination: creator.stripeAccountId,
      },
    },
    success_url: `${process.env.NEXTAUTH_URL}/${to_user}?success=true`,
    cancel_url: `${process.env.NEXTAUTH_URL}/${to_user}?canceled=true`,
  });

  // Pre-create a pending Payment record so we can match it up in the webhook
  await Payment.create({
    name,
    to_user,
    oid: checkoutSession.id,
    message,
    amount,
    done: false,
  });

  return NextResponse.json({ url: checkoutSession.url });
}