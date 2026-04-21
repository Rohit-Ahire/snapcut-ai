import logo from "@/assets/snapcut-logo.png";
import { Link } from "@tanstack/react-router";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`}>
      <img src={logo} alt="SnapCut AI" className="h-9 w-auto" width={36} height={36} />
    </Link>
  );
}