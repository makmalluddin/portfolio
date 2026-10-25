import { useState } from "react";
import { Copy } from "lucide-react";

function CopyButton({ textToCopy = "emailkamu@example.com" }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1000);
    } catch (err) {
      console.error("Gagal menyalin teks:", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="relative flex items-center justify-center min-w-17 h-7 px-2 border border-border-muted text-xs font-medium transition-colors duration-200 hover:bg-bg-surface/50 hover:cursor-pointer active:scale-95 overflow-hidden"
    >
      <span
        className={`flex items-center gap-1.5 transition-all duration-300 ${copied ? "opacity-0 scale-90 pointer-events-none" : "opacity-100 scale-100"
          }`}
      >
        <Copy className="size-3 text-text-secondary" />
        <span>SALIN</span>
      </span>

      <span
        className={`absolute flex items-center justify-center text-text-muted transition-all duration-300 ${copied ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"
          }`}
      >
        SUKSES
      </span>
    </button>
  );
}

export default CopyButton;
