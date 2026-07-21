"use client";

import { useViewTransition } from "./TransitionProvider";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

// ==========================================
// Types & Interfaces
// ==========================================

/**
 * Props accepted by the TransitionLink component.
 * Extends the default Next.js LinkProps and native HTML anchor parameters.
 */
interface TransitionLinkProps extends LinkProps, Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> {
  children: React.ReactNode; // Element(s) to render within the link
  className?: string;        // Optional styling string applied to the anchor element
}

// ==========================================
// Component Implementation
// ==========================================

/**
 * Custom Next.js Link wrapper that intercepts standard click navigation 
 * to trigger view transitions gracefully using the custom TransitionProvider hook.
 */
export function TransitionLink({ children, href, className, ...props }: TransitionLinkProps) {
  // ------------------------------------------
  // Hooks & Context
  // ------------------------------------------
  const router = useRouter();
  const { startViewTransition } = useViewTransition();

  // ------------------------------------------
  // Event Handlers
  // ------------------------------------------

  /**
   * Prevents standard router pushing to run route updates inside
   * the view transition callback.
   */
  const handleTransition = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    startViewTransition(() => {
      router.push(href.toString());
    });
  };

  // ------------------------------------------
  // Render Layout
  // ------------------------------------------
  return (
    <Link {...props} href={href} onClick={handleTransition} className={className}>
      {children}
    </Link>
  );
}
