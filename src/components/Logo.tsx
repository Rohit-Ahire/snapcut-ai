import logo from "@/assets/snapcut-logo.png";
import { Link } from "@tanstack/react-router";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center hover:opacity-80 transition-opacity ${className}`}>
      <span className="text-xl font-bold tracking-tight text-white flex items-center">
        SnapCut <span className="ml-1.5 bg-gradient-to-r from-[#0EA5E9] to-[#8B5CF6] bg-clip-text text-transparent">AI</span>
      </span>
    </Link>
  );
}