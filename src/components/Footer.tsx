import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background/60 mt-24">
      <div className="mx-auto max-w-7xl px-6 py-12 grid gap-10 md:grid-cols-4">
        <div className="space-y-3">
          <Logo />
          <p className="text-sm text-muted-foreground max-w-xs">
            AI-powered background removal. Studio quality cutouts in under 5 seconds.
          </p>
        </div>
        <FooterCol title="Product" links={[["Features","/features"],["Pricing","/pricing"],["API","/api-docs"],["Workspace","/app"]]} />
        <FooterCol title="Company" links={[["About","/about"],["Contact","/contact"],["Blog","/blog"]]} />
        <FooterCol title="Legal" links={[["Privacy","/privacy"],["Terms","/terms"]]} />
      </div>
      <div className="border-t border-border/50 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} SnapCut AI. All rights reserved.
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: ReadonlyArray<readonly [string, string]> }) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-foreground mb-3">{title}</h4>
      <ul className="space-y-2">
        {links.map(([label, href]) => (
          <li key={href}>
            <Link to={href} className="text-sm text-muted-foreground hover:text-foreground transition">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}