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
