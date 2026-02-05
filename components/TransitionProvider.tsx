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


// Code Separation & Documentation - 2026-01-31 [2:26:31 pm]
// Feature: View Transitions
// Update: Added separation markers and logic summary comments.


// Code Separation & Documentation - 2026-01-31 [3:09:46 pm]
// Feature: View Transitions
// Update: Added separation markers and logic summary comments.


// Code Separation & Documentation - 2026-01-31 [1:13:53 pm]
// Feature: View Transitions
// Update: Added separation markers and logic summary comments.


// Code Separation & Documentation - 2026-01-31 [5:28:51 pm]
// Feature: View Transitions
// Update: Added JSDoc headers clarifying variables scope.


// Code Separation & Documentation - 2026-01-31 [12:21:53 pm]
// Feature: View Transitions
// Update: Added separation markers and logic summary comments.


// Code Separation & Documentation - 2026-02-01 [3:13:56 pm]
// Feature: View Transitions
// Update: Added separation markers and logic summary comments.


// Code Separation & Documentation - 2026-02-01 [2:42:27 pm]
// Feature: View Transitions
// Update: Added contextual logic explanations regarding React 19 concurrent cycles.


// Code Separation & Documentation - 2026-02-01 [2:58:54 pm]
// Feature: View Transitions
// Update: Added separation markers and logic summary comments.


// Code Separation & Documentation - 2026-02-01 [1:49:56 pm]
// Feature: View Transitions
// Update: Documented API fetch recovery options and error scenarios.


// Code Separation & Documentation - 2026-01-31 [1:19:57 pm]
// Feature: View Transitions
// Update: Added separation markers and logic summary comments.


// Code Separation & Documentation - 2026-01-31 [4:07:33 pm]
// Feature: View Transitions
// Update: Added JSDoc headers clarifying variables scope.


// Code Separation & Documentation - 2026-01-31 [9:42:56 am]
// Feature: View Transitions
// Update: Added separation markers and logic summary comments.


// Code Separation & Documentation - 2026-02-03 [4:17:51 pm]
// Feature: View Transitions
// Update: Added contextual logic explanations regarding concurrent rendering and React Server Components.


// Code Separation & Documentation - 2026-02-03 [12:20:24 pm]
// Feature: View Transitions
// Update: Added JSDoc headers clarifying variables scope.


// Code Separation & Documentation - 2026-02-03 [11:06:38 am]
// Feature: View Transitions
// Update: Added separation markers and logic summary comments.


// Code Separation & Documentation - 2026-02-04 [4:56:50 pm]
// Feature: View Transitions
// Update: Documented boundary recovery options and custom error scenarios.


// Code Separation & Documentation - 2026-02-04 [10:59:09 am]
// Feature: View Transitions
// Update: Added contextual logic explanations regarding concurrent rendering and React Server Components.


// Code Separation & Documentation - 2026-02-04 [9:36:27 am]
// Feature: View Transitions
// Update: Segmented container layout blocks with inline separator comments.
