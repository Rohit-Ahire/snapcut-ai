import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { businessDetails } from "@/config/business";

export const Route = createFileRoute("/refund-cancellation")({
  component: RefundCancellationPage,
});

function RefundCancellationPage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-4xl px-6 py-20">
        <h1 className="text-4xl font-bold">Refund and Cancellation Policy</h1>
        <p className="mt-3 text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="mt-10 space-y-8 text-sm leading-7 text-muted-foreground">
          <p>
            This policy applies to purchases made on {businessDetails.tradeName}. By purchasing our services, you agree to
            this policy.
          </p>

          <div>
            <h2 className="text-xl font-semibold text-foreground">1. Cancellations</h2>
            <p>
              For subscription plans, cancellation requests can be made anytime before the next billing cycle to avoid future
              charges.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-foreground">2. Refund Eligibility</h2>
            <p>
              Refunds are considered for duplicate transactions, failed service delivery, or technical billing errors after
              verification.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-foreground">3. Refund Processing Timeline</h2>
            <p>
              Approved refunds are processed within {businessDetails.refundTimeline}. The final credit timeline may vary
              depending on the payment method or bank.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-foreground">4. Contact for Refunds</h2>
            <p>
              Raise requests by writing to {businessDetails.supportEmail} from your registered email with transaction details.
            </p>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
