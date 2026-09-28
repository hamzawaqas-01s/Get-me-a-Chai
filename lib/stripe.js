import Stripe from "stripe";

// No apiVersion pin: the SDK's default version supports the v2 endpoints
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);