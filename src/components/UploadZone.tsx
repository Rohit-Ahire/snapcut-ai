import { useState, useCallback, useEffect, type ChangeEvent } from "react";
import { Upload, ImageIcon, Loader2, Download, RotateCcw, AlertCircle, History } from "lucide-react";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import logo from "@/assets/snapcut-logo.png";

const MAX_SIZE = 10 * 1024 * 1024;
const ACCEPTED = ["image/jpeg", "image/png", "image/webp"];

type Status = "idle" | "ready" | "processing" | "done" | "error";

interface HistoryItem {
  id: string;
  originalName: string;
  resultUrl: string;
  timestamp: number;
}

const STORAGE_KEY = "snapcut_history";

export function UploadZone() {
  const [status, setStatus] = useState<Status>("idle");
  const [originalPreview, setOriginalPreview] = useState<string | null>(null);
  const [resultPreview, setResultPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Load history from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  const saveToHistory = (item: HistoryItem) => {
    const newHistory = [item, ...history].slice(0, 50); // Keep last 50
    setHistory(newHistory);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
  };

  const handleDownload = async (url: string, filename: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Download failed", err);
      // Fallback to opening in new tab if blob fetch fails
      window.open(url, "_blank");
    }
  };

  const handleFile = useCallback(async (file: File) => {
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
    setOriginalPreview(url);
    setResultPreview(null);
    setStatus("processing");

    try {
      // Send binary data to n8n webhook
      const response = await fetch("https://rohit007.app.n8n.cloud/webhook/remove-background", {
        method: "POST",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      if (data && data.url) {
        const cleanUrl = data.url.replace(/[`\s]/g, "");
        setResultPreview(cleanUrl);
        setStatus("done");
        
        // Save to history
        saveToHistory({
          id: crypto.randomUUID(),
          originalName: file.name,
          resultUrl: cleanUrl,
          timestamp: Date.now(),
        });
      } else {
        throw new Error("Invalid response format from server");
      }
    } catch (err) {
      console.error("Webhook error:", err);
      setError(err instanceof Error ? err.message : "Failed to process image");
      setStatus("error");
    }
  }, [history]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) handleFile(f);
  };

  const reset = () => {
    setStatus("idle");
    setOriginalPreview(null);
    setResultPreview(null);
    setError(null);
  };

  return (
    <div className="w-full">
      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full max-w-[400px] grid-cols-2 mb-8 mx-auto glass-card">
          <TabsTrigger value="upload" className="text-white/60 data-[state=active]:bg-gradient-brand data-[state=active]:text-primary-foreground transition-all">
            <Upload className="mr-2 h-4 w-4" /> Upload
          </TabsTrigger>
          <TabsTrigger value="history" className="text-white/60 data-[state=active]:bg-gradient-brand data-[state=active]:text-primary-foreground transition-all">
            <History className="mr-2 h-4 w-4" /> History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload">
          {status === "idle" || status === "error" ? (
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
                <div className="h-20 w-full max-w-[240px] rounded-3xl bg-primary/10 flex items-center justify-center mb-6 animate-float overflow-hidden border border-primary/20 px-4">
                  <span className="text-2xl font-bold tracking-tight text-white whitespace-nowrap">
                    SnapCut <span className="bg-gradient-to-r from-[#0EA5E9] to-[#8B5CF6] bg-clip-text text-transparent">AI</span>
                  </span>
                </div>
                <h3 className="text-3xl font-bold mb-3 tracking-tight text-white">Upload an image</h3>
                <p className="text-muted-foreground mb-10 max-w-sm mx-auto text-center px-4 leading-relaxed">
                  Join millions of users removing backgrounds instantly with AI. 
                  Drag & drop your file or click to browse.
                </p>
                <div className="bg-gradient-to-r from-[#0EA5E9] to-[#8B5CF6] text-white hover:opacity-90 shadow-xl shadow-primary/20 h-12 px-10 rounded-full transition-transform hover:scale-105 active:scale-95 flex items-center justify-center font-medium">
                  <Upload className="mr-2 h-5 w-5" /> Select Image
                </div>
                {error && (
                  <div className="mt-6 flex items-center gap-2 text-sm text-destructive">
                    <AlertCircle className="h-4 w-4" /> {error}
                  </div>
                )}
              </label>
            </div>
          ) : (
            <div className="w-full">
              <div className="relative w-full min-h-[420px] rounded-3xl glass-card overflow-hidden p-8 bg-[conic-gradient(from_0deg,#1f1240,#0b0820,#1f1240)] shadow-2xl">
                <div className="grid md:grid-cols-2 gap-8 h-full">
                  {/* Before */}
                  <div className="relative flex flex-col items-center justify-center space-y-4">
                    <div className="absolute top-0 left-0 px-3 py-1 bg-background/20 backdrop-blur-md rounded-lg text-xs font-medium text-white/60">
                      Before
                    </div>
                    <div className="w-full aspect-square rounded-2xl overflow-hidden flex items-center justify-center bg-black/20 border border-white/5">
                      {originalPreview && (
                        <img src={originalPreview} alt="Original" className="max-h-full max-w-full object-contain p-4" />
                      )}
                    </div>
                    <p className="text-sm font-medium text-white/40">Original Image</p>
                  </div>

                  {/* After */}
                  <div className="relative flex flex-col items-center justify-center space-y-4">
                    <div className="absolute top-0 left-0 px-3 py-1 bg-primary text-primary-foreground rounded-lg text-xs font-bold shadow-lg shadow-primary/20">
                      After
                    </div>
                    <div className="w-full aspect-square rounded-2xl overflow-hidden flex items-center justify-center bg-black/40 border border-white/10 relative">
                      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                      {status === "processing" ? (
                        <div className="flex flex-col items-center justify-center">
                          <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
                          <p className="text-sm font-medium text-white/60">Removing background…</p>
                        </div>
                      ) : (
                        resultPreview && (
                          <div className="relative h-full w-full flex items-center justify-center p-4">
                            <img src={resultPreview} alt="Processed" className="max-h-full max-w-full object-contain relative z-10" />
                            <div className="absolute bottom-4 right-4 z-20 opacity-60 hover:opacity-100 transition-opacity flex items-center bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-md border border-white/10">
                               <span className="text-[10px] font-bold tracking-tighter text-white">
                                 SnapCut <span className="text-primary">AI</span>
                               </span>
                             </div>
                          </div>
                        )
                      )}
                    </div>
                    <p className="text-sm font-medium text-white/60">Background Removed</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3 justify-center">
                <Button onClick={reset} variant="outline" className="h-11 px-6">
                  <RotateCcw className="mr-2 h-4 w-4" /> New image
                </Button>
                {status === "done" && (
                  <Button 
                    onClick={() => handleDownload(resultPreview ?? "", "snapcut-result.png")}
                    className="bg-gradient-to-r from-[#0EA5E9] to-[#8B5CF6] text-white hover:opacity-90 shadow-lg shadow-primary/20 h-11 px-8 rounded-full flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" /> 
                    <span>Download PNG</span>
                    <div className="w-px h-4 bg-white/20 mx-1" />
                    <span className="text-xs font-bold">AI</span>
                  </Button>
                )}
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="history">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {history.length === 0 ? (
              <div className="col-span-full py-20 text-center glass-card rounded-2xl">
                <History className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-20" />
                <p className="text-muted-foreground">No history yet. Your uploads will appear here.</p>
              </div>
            ) : (
              history.map((item) => (
                <div key={item.id} className="glass-card rounded-xl overflow-hidden flex flex-col group">
                  <div className="aspect-square relative bg-[conic-gradient(from_0deg,#1f1240,#0b0820,#1f1240)] flex items-center justify-center p-4">
                    <img src={item.resultUrl} alt={item.originalName} className="max-h-full max-w-full object-contain" />
                    <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                      <Button 
                        size="sm"
                        onClick={() => handleDownload(item.resultUrl, `snapcut-${item.originalName}.png`)}
                        className="bg-gradient-brand text-primary-foreground"
                      >
                        <Download className="mr-2 h-4 w-4" /> Download
                      </Button>
                    </div>
                  </div>
                  <div className="p-4 bg-card/40">
                    <p className="text-sm font-medium truncate">{item.originalName}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(item.timestamp).toLocaleDateString()} at {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}