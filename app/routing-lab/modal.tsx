"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const overlay = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);

  const onDismiss = React.useCallback(() => {
    router.back();
  }, [router]);

  const onClick = React.useCallback(
    (e: React.MouseEvent) => {
      if (e.target === overlay.current || e.target === wrapper.current) {
        if (onDismiss) onDismiss();
      }
    },
    [onDismiss, overlay, wrapper]
  );

  const onKeyDown = React.useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onDismiss();
    },
    [onDismiss]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    // Prevent scrolling when modal is open
    document.body.style.overflow = "hidden";
    
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [onKeyDown]);

  return (
    <div
      ref={overlay}
      className="fixed inset-0 z-50 flex items-center justify-center p-6 sm:p-12 md:p-24 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300"
      onClick={onClick}
    >
      <div
        ref={wrapper}
        className="relative w-full max-w-5xl max-h-full overflow-hidden rounded-[2.5rem] bg-white dark:bg-zinc-950 shadow-2xl animate-in zoom-in-95 duration-300"
      >
        {/* Close Button */}
        <button
          onClick={onDismiss}
          className="absolute top-6 right-6 z-10 p-3 bg-black/10 hover:bg-black/20 dark:bg-white/10 dark:hover:bg-white/20 rounded-full backdrop-blur-md transition-all active:scale-95"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        <div className="overflow-y-auto max-h-[85vh]">
          {children}
        </div>
      </div>
    </div>
  );
}
