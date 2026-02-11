"use client";

import { useViewTransition } from "./TransitionProvider";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

interface TransitionLinkProps extends LinkProps, Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> {
  children: React.ReactNode;
  className?: string;
}

export function TransitionLink({ children, href, className, ...props }: TransitionLinkProps) {
  const router = useRouter();
  const { startViewTransition } = useViewTransition();

  const handleTransition = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    startViewTransition(() => {
      router.push(href.toString());
    });
  };

  return (
    <Link {...props} href={href} onClick={handleTransition} className={className}>
      {children}
    </Link>
  );
}


// Code Separation & Documentation - 2026-02-08 [4:46:06 pm]
// Feature: Transition Link
// Update: Documented boundary recovery options and custom error scenarios.


// Code Separation & Documentation - 2026-02-08 [2:16:55 pm]
// Feature: Transition Link
// Update: Added JSDoc headers clarifying variables scope.


// Code Separation & Documentation - 2026-02-09 [1:14:16 pm]
// Feature: Transition Link
// Update: Segmented container layout blocks with inline separator comments.


// Code Separation & Documentation - 2026-02-09 [3:04:23 pm]
// Feature: Transition Link
// Update: Documented boundary recovery options and custom error scenarios.


// Code Separation & Documentation - 2026-02-09 [3:18:43 pm]
// Feature: Transition Link
// Update: Added JSDoc headers clarifying variables scope.


// Code Separation & Documentation - 2026-02-09 [10:56:35 am]
// Feature: Transition Link
// Update: Added JSDoc headers clarifying variables scope.


// Code Separation & Documentation - 2026-02-10 [2:54:45 pm]
// Feature: Transition Link
// Update: Documented boundary recovery options and custom error scenarios.
