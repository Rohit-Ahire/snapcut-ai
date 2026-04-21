import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";

export const Route = createFileRoute("/api-docs")({
  head: () => ({
    meta: [
      { title: "API Docs — SnapCut AI" },
      { name: "description", content: "REST API reference for SnapCut AI background removal. Authenticated endpoints, rate limits, examples." },
      { property: "og:title", content: "SnapCut AI API Docs" },
      { property: "og:description", content: "Drop AI background removal into any pipeline." },
    ],
  }),
  component: ApiDocsPage,
});

function ApiDocsPage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-4xl px-6 py-20">
        <h1 className="text-5xl font-bold">API <span className="text-gradient-brand">Reference</span></h1>
        <p className="mt-4 text-muted-foreground">Use the SnapCut AI REST API to remove backgrounds programmatically. Authenticated with API keys.</p>

        <h2 className="text-2xl font-semibold mt-12 mb-4">Authentication</h2>
        <p className="text-sm text-muted-foreground mb-3">Include your API key in the <code className="px-1.5 py-0.5 rounded bg-muted text-foreground text-xs">Authorization</code> header.</p>
        <pre className="glass-card rounded-xl p-4 text-sm overflow-x-auto"><code>{`Authorization: Bearer sk_live_xxxxxxxxxxxxxxxxxxxx`}</code></pre>

        <h2 className="text-2xl font-semibold mt-12 mb-4">Remove background</h2>
        <p className="text-sm text-muted-foreground mb-3"><code className="px-1.5 py-0.5 rounded bg-muted text-foreground text-xs">POST /v1/remove</code></p>
        <pre className="glass-card rounded-xl p-4 text-sm overflow-x-auto"><code>{`curl -X POST https://api.snapcut.ai/v1/remove \\
  -H "Authorization: Bearer sk_live_xxx" \\
  -F "image=@./photo.jpg"

# Response
{
  "id": "job_abc123",
  "status": "completed",
  "result_url": "https://cdn.snapcut.ai/results/abc123.png",
  "expires_at": "2026-04-22T10:00:00Z"
}`}</code></pre>

        <h2 className="text-2xl font-semibold mt-12 mb-4">Rate limits</h2>
        <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-5">
          <li>Free: 5 requests/day</li>
          <li>Pro: 60 requests/minute, unlimited daily</li>
          <li>Credit packs: 30 requests/minute</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-12 mb-4">Errors</h2>
        <pre className="glass-card rounded-xl p-4 text-sm overflow-x-auto"><code>{`{
  "error": {
    "code": "rate_limited",
    "message": "Daily quota exceeded. Upgrade to Pro for unlimited."
  }
}`}</code></pre>
      </section>
    </SiteShell>
  );
}