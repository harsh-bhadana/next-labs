"use server";

// --- Types ---
export type StepResult = {
  success: boolean;
  message: string;
  data?: Record<string, string>;
};

// Simulate shipping calculation latency
export async function processShipping(_prev: StepResult | null, formData: FormData): Promise<StepResult> {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const fullName = formData.get("fullName") as string;
  const address = formData.get("address") as string;
  const city = formData.get("city") as string;
  const zip = formData.get("zip") as string;

  if (!fullName || !address || !city || !zip) {
    return { success: false, message: "All shipping fields are required." };
  }

  return {
    success: true,
    message: "Shipping address validated & rate calculated.",
    data: { fullName, address, city, zip, shippingRate: "$4.99" },
  };
}

// Simulate payment gateway latency
export async function processPayment(_prev: StepResult | null, formData: FormData): Promise<StepResult> {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const cardNumber = formData.get("cardNumber") as string;
  const expiry = formData.get("expiry") as string;
  const cvv = formData.get("cvv") as string;

  if (!cardNumber || !expiry || !cvv) {
    return { success: false, message: "All payment fields are required." };
  }

  if (cardNumber.replace(/\s/g, "").length < 16) {
    return { success: false, message: "Invalid card number. Must be 16 digits." };
  }

  return {
    success: true,
    message: "Payment pre-authorized successfully.",
    data: {
      cardLast4: cardNumber.replace(/\s/g, "").slice(-4),
      expiry,
      authCode: `AUTH-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
    },
  };
}

// Simulate order confirmation
export async function processConfirmation(_prev: StepResult | null, formData: FormData): Promise<StepResult> {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const email = formData.get("email") as string;
  const notes = formData.get("notes") as string;

  if (!email || !email.includes("@")) {
    return { success: false, message: "Please provide a valid email address." };
  }

  return {
    success: true,
    message: "Order confirmed! Confirmation email sent.",
    data: {
      email,
      notes: notes || "None",
      orderId: `ORD-${Date.now().toString(36).toUpperCase()}`,
      estimatedDelivery: "3-5 business days",
    },
  };
}
