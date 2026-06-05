import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Star, X, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function PoinFloatingWidget() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    const id = setTimeout(() => setVisible(true), 2500);
    return () => clearTimeout(id);
  }, [dismissed]);

  function dismiss() {
    setVisible(false);
    setDismissed(true);
  }

  if (dismissed) return null;

  return (
    <div
      className={cn(
        "fixed bottom-6 left-4 z-50 transition-all duration-500",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
      )}
      role="complementary"
      aria-label="Widget poin loyalitas"
    >
      <div className="relative bg-white dark:bg-[#1a1625] border border-gray-200 dark:border-purple-900/40 rounded-2xl shadow-lg dark:shadow-purple-900/20 overflow-hidden max-w-[200px]">
        {/* Top strip */}
        <div className="h-1.5 w-full bg-gradient-to-r from-yellow-400 to-yellow-500 dark:from-purple-500 dark:to-green-500" aria-hidden="true" />

        <button
          type="button"
          onClick={dismiss}
          className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-purple-900/30 transition-colors"
          aria-label="Tutup widget poin"
        >
          <X className="h-3 w-3 text-gray-400 dark:text-gray-500" />
        </button>

        <div className="p-4 space-y-3">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-yellow-50 flex items-center justify-center">
              <Star className="h-5 w-5 text-yellow-500" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-gray-400">Program Poin</p>
              <p className="font-heading font-extrabold text-sm text-gray-900 leading-tight">BESTI Loyalty</p>
            </div>
          </div>
          <p className="text-[11px] text-gray-500 leading-tight">
            Belanja & kumpulkan poin, tukar dengan hadiah menarik!
          </p>
          <Link
            to="/points"
            className="flex items-center justify-between w-full bg-green-500 dark:bg-purple-600 hover:bg-green-600 dark:hover:bg-purple-700 text-white text-xs font-bold px-3 py-2 rounded-xl transition-all"
          >
            <span>Tukar Poin</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
