import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { businessDetails } from "@/config/business";

export const Route = createFileRoute("/terms-and-conditions")({
  component: TermsAndConditionsPage,
});

function TermsAndConditionsPage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-4xl px-6 py-20">
        <h1 className="text-4xl font-bold">Terms and Conditions</h1>
        <p className="mt-3 text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="mt-10 space-y-8 text-sm leading-7 text-muted-foreground">
          <p>
            These terms govern your access to and use of {businessDetails.tradeName} services provided by{" "}
            {businessDetails.legalName}.
          </p>

          <div>
            <h2 className="text-xl font-semibold text-foreground">1. Acceptance of Terms</h2>
            <p>By using the website, you agree to these terms and all applicable laws and regulations.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-foreground">2. Service Usage</h2>
            <p>
              Users must not misuse the platform, attempt unauthorized access, or upload unlawful content. Violation may lead
              to account suspension.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-foreground">3. Pricing and Payments</h2>
            <p>
              Prices are shown on the website in INR and may change over time. Payments are processed via Razorpay and are
              subject to successful authorization.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-foreground">4. Limitation of Liability</h2>
            <p>
              We strive for reliable service but do not guarantee uninterrupted operation. Liability is limited to the extent
              permitted by law.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-foreground">5. Contact</h2>
            <p>
              Questions about these terms can be sent to {businessDetails.supportEmail}. Support phone:{" "}
              {businessDetails.supportPhone}.
            </p>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
