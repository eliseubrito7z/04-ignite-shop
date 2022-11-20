import Stripe from "stripe";
import { env } from "process";

env.key = String(process.env.STRIPE_SECRET_KEY);

export const stripe = new Stripe(env.key, {
  apiVersion: '2022-11-15',
  appInfo: {
    name: 'Ignite Shop',

  }
});
