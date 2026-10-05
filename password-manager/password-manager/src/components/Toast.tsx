import { useEffect } from "react";
import { CheckCircle2 } from "lucide-react";

interface ToastProps {
  message: string;
  onClose: () => void;
}

export default function Toast({ message, onClose }: ToastProps) {
  useEffect(() => {
    const t = setTimeout(onClose, 1600);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className="fixed left-1/2 -translate-x-1/2 bottom-24 z-50 animate-[fadeIn_0.15s_ease-out]">
      <div className="flex items-center gap-2 bg-ink/90 text-cream px-4 py-2.5 rounded-full shadow-card text-sm">
        <CheckCircle2 size={16} className="shrink-0" />
        <span>{message}</span>
      </div>
    </div>
  );
}
