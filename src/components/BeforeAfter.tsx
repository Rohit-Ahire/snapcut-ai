import { useState, useRef, type PointerEvent } from "react";
import before from "@/assets/demo-before.jpg";
import after from "@/assets/demo-after.png";

export function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, x)));
  };

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      className="relative aspect-square w-full max-w-xl overflow-hidden rounded-2xl border border-border/60 glow-primary select-none cursor-ew-resize bg-[conic-gradient(from_0deg,#1f1240,#0b0820,#1f1240)]"
    >
      <img src={after} alt="After" className="absolute inset-0 h-full w-full object-contain" width={768} height={768} />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <img
          src={before}
          alt="Before"
          className="h-full w-full object-cover"
          style={{ width: `${(100 / pos) * 100}%`, maxWidth: "none" }}
          width={768}
          height={768}
        />
      </div>
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-gradient-brand"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-gradient-brand glow-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
          ⇆
        </div>
      </div>
      <div className="absolute top-3 left-3 px-2 py-1 text-xs rounded-md glass-card">Before</div>
      <div className="absolute top-3 right-3 px-2 py-1 text-xs rounded-md glass-card">After</div>
    </div>
  );
}