import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import connectDb from "@/db/connectDb";
import User from "@/Models/User";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  await connectDb();
  let user = await User.findOne({ email: session.user.email });

  if (!user) {
    return NextResponse.json({ error: "user not found, save your profile first" }, { status: 404 });
  }

  if (!user.stripeAccountId) {
    const account = await stripe.accounts.create({ type: "express" });
    user.stripeAccountId = account.id;
    await user.save();
  }

  const accountLink = await stripe.accountLinks.create({
    account: user.stripeAccountId,
    refresh_url: `${process.env.NEXTAUTH_URL}/dashboard`,
    return_url: `${process.env.NEXTAUTH_URL}/api/stripe/connect/return`,
    type: "account_onboarding",
  });

  return NextResponse.json({ url: accountLink.url });
}