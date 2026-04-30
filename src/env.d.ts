/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_ANON_KEY?: string;
  readonly VITE_RAZORPAY_KEY_ID?: string;
  readonly VITE_RAZORPAY_PLAN_AMOUNT?: string;
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_BUSINESS_TRADE_NAME?: string;
  readonly VITE_BUSINESS_LEGAL_NAME?: string;
  readonly VITE_BUSINESS_EMAIL?: string;
  readonly VITE_BUSINESS_PHONE?: string;
  readonly VITE_BUSINESS_ADDRESS?: string;
  readonly VITE_BUSINESS_SUPPORT_HOURS?: string;
  readonly VITE_BUSINESS_SHIPPING_TIMELINE?: string;
  readonly VITE_BUSINESS_REFUND_TIMELINE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
