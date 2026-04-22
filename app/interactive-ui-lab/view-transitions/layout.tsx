import { TransitionProvider } from "@/components/TransitionProvider";

export default function ViewTransitionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TransitionProvider>
      {children}
    </TransitionProvider>
  );
}
