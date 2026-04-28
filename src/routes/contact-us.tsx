import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { businessDetails } from "@/config/business";

export const Route = createFileRoute("/contact-us")({
  component: ContactUsPage,
});

function ContactUsPage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-4xl px-6 py-20">
        <h1 className="text-4xl font-bold">Contact Us</h1>
        <p className="mt-4 text-muted-foreground">
          We are here to help with payment, billing, and product support queries.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-lg font-semibold">Trade Name</h2>
            <p className="mt-2 text-sm text-muted-foreground">{businessDetails.tradeName}</p>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-lg font-semibold">Legal Business Name</h2>
            <p className="mt-2 text-sm text-muted-foreground">{businessDetails.legalName}</p>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-lg font-semibold">Email</h2>
            <p className="mt-2 text-sm text-muted-foreground">{businessDetails.supportEmail}</p>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-lg font-semibold">Phone</h2>
            <p className="mt-2 text-sm text-muted-foreground">{businessDetails.supportPhone}</p>
          </div>
          <div className="glass-card rounded-2xl p-6 md:col-span-2">
            <h2 className="text-lg font-semibold">Registered Address</h2>
            <p className="mt-2 text-sm text-muted-foreground">{businessDetails.supportAddress}</p>
            <p className="mt-2 text-sm text-muted-foreground">{businessDetails.supportHours}</p>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
