import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";
import connectDb from "@/db/connectDb";
import User from "@/Models/User";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/login`);
    }

    await connectDb();
    const user = await User.findOne({ email: session.user.email });

    if (user?.stripeAccountId) {
      const account = await stripe.v2.core.accounts.retrieve(user.stripeAccountId, {
        include: ["configuration.recipient", "configuration.merchant", "requirements"],
      });

      const transfersStatus =
        account.configuration?.recipient?.capabilities?.stripe_balance?.stripe_transfers?.status;
      console.log("TRANSFERS STATUS:", transfersStatus);

      if (transfersStatus === "active") {
        user.stripeOnboarded = true;
        await user.save();
      }
    }
  } catch (err) {
    console.error("RETURN ERROR:", err);
  }

  return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/dashboard`);
}