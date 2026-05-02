import { Loader2 } from "lucide-react";
export default function Loading() {
  return (
    <div className="min-h-screen flex justify-center pt-20">
      <Loader2 className="animate-spin text-primary" size={32} />
    </div>
  );
}
