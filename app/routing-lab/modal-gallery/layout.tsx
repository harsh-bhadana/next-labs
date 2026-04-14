import React from "react";

export default function RoutingLabLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans selection:bg-indigo-500/30">
      {/* Main Content (Gallery) */}
      {children}
      
      {/* Modal Slot (Parallel Route) */}
      {modal}
    </div>
  );
}
