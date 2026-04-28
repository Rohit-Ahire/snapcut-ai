import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { businessDetails } from "@/config/business";

export const Route = createFileRoute("/privacy-policy")({
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-4xl px-6 py-20">
        <h1 className="text-4xl font-bold">Privacy Policy</h1>
        <p className="mt-3 text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="mt-10 space-y-8 text-sm leading-7 text-muted-foreground">
          <p>
            {businessDetails.legalName} (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) operates {businessDetails.tradeName}. This policy
            explains how we collect, use, and protect your information when you use our website and services.
          </p>

          <div>
            <h2 className="text-xl font-semibold text-foreground">1. Information We Collect</h2>
            <p>We may collect account details, contact information, uploaded image files, and payment metadata.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-foreground">2. How We Use Information</h2>
            <p>We use your data to provide services, process transactions, improve performance, and offer support.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-foreground">3. Payments</h2>
            <p>
              Payments are processed securely through Razorpay. We do not store your full card details on our servers.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-foreground">4. Data Retention and Security</h2>
            <p>
              We retain data only as long as required for service delivery, legal compliance, and fraud prevention. We use
              industry-standard safeguards to protect your information.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-foreground">5. Contact</h2>
            <p>
              For privacy-related concerns, contact us at {businessDetails.supportEmail} or {businessDetails.supportPhone}.
            </p>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
