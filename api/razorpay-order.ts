import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    return res.status(500).json({ error: "Razorpay server credentials are missing" });
  }

  const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  const amount = Number(body?.amount ?? 1900);
  const currency = body?.currency ?? "INR";
  const receipt = body?.receipt ?? `snapcut-${Date.now()}`;
  const notes = body?.notes ?? {};

  try {
    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`,
      },
      body: JSON.stringify({
        amount,
        currency,
        receipt,
        notes,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: "Failed to create Razorpay order",
        details: data,
      });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Razorpay order creation error:", error);
    return res.status(500).json({ error: "Unexpected server error while creating order" });
  }
}
