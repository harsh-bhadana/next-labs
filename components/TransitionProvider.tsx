"use client";

import React, { createContext, useContext, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export type TransitionMode = "crossfade" | "slide" | "morph";

interface TransitionContextType {
  mode: TransitionMode;
  setMode: (mode: TransitionMode) => void;
  startViewTransition: (navigate: () => void) => void;
  isPending: boolean;
}

const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<TransitionMode>("morph");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const startViewTransition = (navigate: () => void) => {
    if (!document.startViewTransition) {
      navigate();
      return;
    }

    // Apply mode-specific class to root element
    document.documentElement.classList.remove("vt-crossfade", "vt-slide", "vt-morph");
    document.documentElement.classList.add(`vt-${mode}`);

    const transition = document.startViewTransition(() => {
      return new Promise<void>((resolve) => {
        startTransition(() => {
          navigate();
          // We need a slight delay to let Next.js update the DOM
          // so the View Transition API captures the new state.
          setTimeout(resolve, 100);
        });
      });
    });

    transition.finished.finally(() => {
      // Clean up after transition
      // We don't remove it immediately to allow the transition to finish
    });
  };

  return (
    <TransitionContext.Provider value={{ mode, setMode, startViewTransition, isPending }}>
      <style dangerouslySetInnerHTML={{__html: `
        /* Default timing for all transitions */
        ::view-transition-group(*) {
          animation-duration: 0.6s;
          animation-timing-function: cubic-bezier(0.85, 0, 0.15, 1);
        }

        /* --- CROSSFADE MODE --- */
        .vt-crossfade::view-transition-old(root) {
          animation: vt-fade-out 0.4s ease-in-out forwards;
        }
        .vt-crossfade::view-transition-new(root) {
          animation: vt-fade-in 0.4s ease-in-out forwards;
        }

        /* --- SLIDE MODE --- */
        .vt-slide::view-transition-old(root) {
          animation: vt-slide-out-left 0.6s cubic-bezier(0.85, 0, 0.15, 1) forwards;
        }
        .vt-slide::view-transition-new(root) {
          animation: vt-slide-in-right 0.6s cubic-bezier(0.85, 0, 0.15, 1) forwards;
        }

        /* --- MORPH MODE --- */
        .vt-morph::view-transition-old(root),
        .vt-morph::view-transition-new(root) {
          animation: none;
          mix-blend-mode: normal;
        }

        @keyframes vt-fade-out {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        @keyframes vt-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes vt-slide-out-left {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(-100px); opacity: 0; }
        }
        @keyframes vt-slide-in-right {
          from { transform: translateX(100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}} />
      {children}
    </TransitionContext.Provider>
  );
}

export function useViewTransition() {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error("useViewTransition must be used within a TransitionProvider");
  }
  return context;
}
