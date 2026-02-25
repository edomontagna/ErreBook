// Stripe client stub - ready for production integration
// In production, replace with actual Stripe initialization

export const STRIPE_PUBLIC_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || "pk_test_placeholder";

export interface StripePaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: "requires_payment_method" | "requires_confirmation" | "succeeded" | "canceled";
  clientSecret: string;
}

// Stub functions that will be replaced with real Stripe calls
export async function createPaymentIntent(
  amount: number,
  currency: string = "eur"
): Promise<StripePaymentIntent> {
  // Stub - returns mock data
  return {
    id: `pi_${Date.now()}`,
    amount,
    currency,
    status: "requires_payment_method",
    clientSecret: `pi_${Date.now()}_secret_mock`,
  };
}

export async function confirmPayment(paymentIntentId: string): Promise<StripePaymentIntent> {
  return {
    id: paymentIntentId,
    amount: 0,
    currency: "eur",
    status: "succeeded",
    clientSecret: "",
  };
}
