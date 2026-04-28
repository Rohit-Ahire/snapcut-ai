export const businessDetails = {
  tradeName: import.meta.env.VITE_BUSINESS_TRADE_NAME ?? "SnapCut AI",
  legalName: import.meta.env.VITE_BUSINESS_LEGAL_NAME ?? "SnapCut AI",
  supportEmail: import.meta.env.VITE_BUSINESS_EMAIL ?? "support@snapcutai.com",
  supportPhone: import.meta.env.VITE_BUSINESS_PHONE ?? "8830331182",
  supportAddress:
    import.meta.env.VITE_BUSINESS_ADDRESS ??
    "123 Business Street, Pune, Maharashtra 411001, India",
  supportHours:
    import.meta.env.VITE_BUSINESS_SUPPORT_HOURS ?? "Monday to Saturday, 10:00 AM to 6:00 PM IST",
  shippingTimeline: import.meta.env.VITE_BUSINESS_SHIPPING_TIMELINE ?? "Instant digital delivery",
  refundTimeline: import.meta.env.VITE_BUSINESS_REFUND_TIMELINE ?? "5-7 business days",
} as const;
