import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { businessDetails } from "@/config/business";

export const Route = createFileRoute("/shipping-delivery")({
  component: ShippingDeliveryPage,
});

function ShippingDeliveryPage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-4xl px-6 py-20">
        <h1 className="text-4xl font-bold">Shipping and Delivery</h1>
        <p className="mt-3 text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="mt-10 space-y-8 text-sm leading-7 text-muted-foreground">
          <p>
            {businessDetails.tradeName} provides digital services. No physical product shipping is involved unless stated
            otherwise.
          </p>

          <div>
            <h2 className="text-xl font-semibold text-foreground">1. Delivery Mode</h2>
            <p>All subscriptions, credits, and digital outputs are delivered online to your account/dashboard.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-foreground">2. Delivery Timeline</h2>
            <p>Standard timeline: {businessDetails.shippingTimeline} after successful payment confirmation.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-foreground">3. Service Delays</h2>
            <p>
              Temporary delays can happen due to payment verification, maintenance, or upstream provider incidents. We notify
              users through available support channels whenever possible.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-foreground">4. Support</h2>
            <p>
              If delivery is delayed, contact {businessDetails.supportEmail} with payment and account details for fast
              resolution.
            </p>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
