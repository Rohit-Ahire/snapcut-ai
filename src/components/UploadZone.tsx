import { useState, useCallback, type ChangeEvent } from "react";
import { Upload, ImageIcon, Loader2, Download, RotateCcw, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";

const MAX_SIZE = 10 * 1024 * 1024;
const ACCEPTED = ["image/jpeg", "image/png", "image/webp"];

type Status = "idle" | "ready" | "processing" | "done" | "error";

export function UploadZone() {
  const [status, setStatus] = useState<Status>("idle");
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = useCallback((file: File) => {
    setError(null);
    if (!ACCEPTED.includes(file.type)) {
      setError("Unsupported format. Use JPG, PNG or WEBP.");
      setStatus("error");
      return;
    }
    if (file.size > MAX_SIZE) {
      setError("File too large. Max 10 MB.");
      setStatus("error");
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    setStatus("processing");
    // Simulated processing — wire to n8n webhook in production
    setTimeout(() => setStatus("done"), 2200);
  }, []);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) handleFile(f);
  };

  const reset = () => {
    setStatus("idle");
    setPreview(null);
    setError(null);
  };

  if (status === "idle" || status === "error") {
    return (
      <div className="w-full">
        <label
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            const f = e.dataTransfer.files[0];
            if (f) handleFile(f);
          }}
          className={`relative flex flex-col items-center justify-center w-full min-h-[420px] rounded-2xl border-2 border-dashed transition-all cursor-pointer
            ${dragOver ? "border-primary bg-primary/5 glow-primary" : "border-border hover:border-primary/60 hover:bg-card/40"}
            glass-card`}
        >
          <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={onChange} />
          <div className="h-20 w-20 rounded-2xl bg-gradient-brand flex items-center justify-center glow-primary mb-6">
            <Upload className="h-9 w-9 text-primary-foreground" />
          </div>
          <h3 className="text-2xl font-semibold mb-2">Drop your image here</h3>
          <p className="text-muted-foreground mb-6">or click to browse — JPG, PNG, WEBP up to 10 MB</p>
          <Button className="bg-gradient-brand text-primary-foreground hover:opacity-90">
            <ImageIcon className="mr-2 h-4 w-4" /> Select image
          </Button>
          {error && (
            <div className="mt-6 flex items-center gap-2 text-sm text-destructive">
              <AlertCircle className="h-4 w-4" /> {error}
            </div>
          )}
        </label>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="relative w-full min-h-[420px] rounded-2xl glass-card overflow-hidden flex items-center justify-center bg-[conic-gradient(from_0deg,#1f1240,#0b0820,#1f1240)]">
        {preview && (
          <img src={preview} alt="Preview" className="max-h-[600px] max-w-full object-contain" />
        )}
        {status === "processing" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/70 backdrop-blur-sm">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="text-lg font-medium">Removing background…</p>
            <p className="text-sm text-muted-foreground mt-1">Usually under 5 seconds</p>
          </div>
        )}
      </div>
      <div className="mt-4 flex flex-wrap gap-3 justify-center">
        <Button onClick={reset} variant="outline">
          <RotateCcw className="mr-2 h-4 w-4" /> New image
        </Button>
        {status === "done" && (
          <Button asChild className="bg-gradient-brand text-primary-foreground hover:opacity-90 glow-primary">
            <a href={preview ?? "#"} download="snapcut-result.png">
              <Download className="mr-2 h-4 w-4" /> Download PNG
            </a>
          </Button>
        )}
      </div>
    </div>
  );
}