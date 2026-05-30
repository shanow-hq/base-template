import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { stripe } from "@/lib/stripe"
import { prisma } from "@/lib/prisma"

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get("stripe-signature")

  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error"
    return NextResponse.json({ error: `Webhook error: ${message}` }, { status: 400 })
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session

      if (session.mode !== "subscription") break

      const subscriptionId =
        typeof session.subscription === "string"
          ? session.subscription
          : session.subscription?.id

      const customerId =
        typeof session.customer === "string"
          ? session.customer
          : session.customer?.id

      const userId = session.metadata?.userId

      if (!subscriptionId || !customerId || !userId) break

      const sub = await stripe.subscriptions.retrieve(subscriptionId)

      await prisma.subscription.upsert({
        where: { userId },
        create: {
          userId,
          stripeCustomerId: customerId,
          stripeSubscriptionId: subscriptionId,
          stripePriceId: sub.items.data[0]?.price.id ?? "",
          status: sub.status,
          currentPeriodEnd: new Date(sub.current_period_end * 1000),
        },
        update: {
          stripeCustomerId: customerId,
          stripeSubscriptionId: subscriptionId,
          stripePriceId: sub.items.data[0]?.price.id ?? "",
          status: sub.status,
          currentPeriodEnd: new Date(sub.current_period_end * 1000),
        },
      })

      break
    }

    case "customer.subscription.updated": {
      const sub = event.data.object as Stripe.Subscription
      await prisma.subscription.updateMany({
        where: { stripeSubscriptionId: sub.id },
        data: {
          status: sub.status,
          stripePriceId: sub.items.data[0]?.price.id ?? "",
          currentPeriodEnd: new Date(sub.current_period_end * 1000),
        },
      })
      break
    }

    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription
      await prisma.subscription.deleteMany({
        where: { stripeSubscriptionId: sub.id },
      })
      break
    }
  }

  return NextResponse.json({ received: true })
}
