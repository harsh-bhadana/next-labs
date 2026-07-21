"use client";

import React, { createContext, useContext, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

// ==========================================
// Types & Interfaces
// ==========================================

/**
 * Supported transition modes for page routing animations.
 */
export type TransitionMode = "crossfade" | "slide" | "morph";

/**
 * Context interface managing active view transition mode and hook status.
 */
interface TransitionContextType {
  mode: TransitionMode;                           // The current transition animation mode
  setMode: (mode: TransitionMode) => void;        // Setter to switch transition animation modes
  startViewTransition: (navigate: () => void) => void; // Trigger function wrapping router actions
  isPending: boolean;                             // React 19 transition pending status indicator
}

// Create transition context with undefined default
const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

// ==========================================
// Component Implementation
// ==========================================

/**
 * Provider wrapping the application to supply View Transition API orchestration.
 */
export function TransitionProvider({ children }: { children: React.ReactNode }) {
  // ------------------------------------------
  // State & Hooks
  // ------------------------------------------
  const [mode, setMode] = useState<TransitionMode>("morph"); // Controls the active keyframe animation stylesheet
  const [isPending, startTransition] = useTransition();      // Wraps Next.js route updates in concurrent transitions
  const router = useRouter();

  // ------------------------------------------
  // Orchestration Methods
  // ------------------------------------------

  /**
   * Executes a page navigation callback inside the browser's startViewTransition API.
   * Falls back to a standard layout update if the API is unsupported.
   */
  const startViewTransition = (navigate: () => void) => {
    // Check browser compatibility for modern View Transitions API
    if (!document.startViewTransition) {
      navigate();
      return;
    }

    // Apply mode-specific class to root document to select correct CSS keyframes
    document.documentElement.classList.remove("vt-crossfade", "vt-slide", "vt-morph");
    document.documentElement.classList.add(`vt-${mode}`);

    // Trigger the view transition callback updating DOM elements
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
      // Clean up after transition completes (optional hook)
    });
  };

  // ------------------------------------------
  // Render Layout
  // ------------------------------------------
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

// ==========================================
// Consumer Hooks
// ==========================================

/**
 * Hook to consume active View Transition API parameters.
 */
export function useViewTransition() {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error("useViewTransition must be used within a TransitionProvider");
  }
  return context;
}
