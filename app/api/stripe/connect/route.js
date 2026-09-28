import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import connectDb from "@/db/connectDb";
import User from "@/Models/User";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    await connectDb();
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "save your profile first" }, { status: 404 });
    }

    // Create the connected account once (v2)
    if (!user.stripeAccountId) {
      const account = await stripe.v2.core.accounts.create({
        contact_email: user.email,
        display_name: user.name || user.username,
        dashboard: "express",
        identity: {
          country: "us", // use "us" for sandbox testing
          entity_type: "individual",
        },
        defaults: {
          responsibilities: {
            fees_collector: "application",
            losses_collector: "application",
          },
        },
        configuration: {
          merchant: {
            capabilities: { card_payments: { requested: true } },
          },
          recipient: {
            capabilities: {
              stripe_balance: { stripe_transfers: { requested: true } },
            },
          },
        },
      });
      user.stripeAccountId = account.id;
      await user.save();
    }

    // Fresh single-use onboarding link every click (v2)
    const accountLink = await stripe.v2.core.accountLinks.create({
      account: user.stripeAccountId,
      use_case: {
        type: "account_onboarding",
        account_onboarding: {
          configurations: ["recipient", "merchant"],
          refresh_url: `${process.env.NEXTAUTH_URL}/dashboard`,
          return_url: `${process.env.NEXTAUTH_URL}/api/stripe/connect/return`,
        },
      },
    });

    return NextResponse.json({ url: accountLink.url });
  } catch (err) {
    console.error("STRIPE CONNECT ERROR:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}