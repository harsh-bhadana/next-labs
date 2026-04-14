"use client";

import { useFormStatus } from "react-dom";
import { useActionState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CreditCard,
  Mail,
  Loader2,
  CheckCircle2,
  XCircle,
  ChevronRight,
  Truck,
  ShieldCheck,
} from "lucide-react";
import {
  processShipping,
  processPayment,
  processConfirmation,
  type StepResult,
} from "./actions";

// ─── The key component ────────────────────────────────────────────────────────
// This button reads form status from the NEAREST parent <form>.
// Zero props needed. Zero state management. Pure React 19.
function SubmitButton({ label, icon }: { label: string; icon: React.ReactNode }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`
        group relative flex items-center justify-center gap-2.5 w-full px-5 py-3.5
        rounded-xl font-semibold text-sm transition-all duration-300 
        active:scale-[0.98] overflow-hidden
        ${pending
          ? "bg-zinc-800 text-zinc-500 cursor-wait border border-zinc-700"
          : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 border border-blue-500/50"
        }
      `}
    >
      {pending ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        icon
      )}
      {pending ? "Processing…" : label}

      {/* Shine effect */}
      {!pending && (
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      )}
    </button>
  );
}

// ─── Global progress bar that also reads useFormStatus ─────────────────────────
function GlobalProgressBar() {
  const { pending } = useFormStatus();

  if (!pending) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1">
      <div className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 animate-progress-bar rounded-full" />
    </div>
  );
}

// ─── Input that disables itself during submission ──────────────────────────────
function FormInput({
  label,
  name,
  type = "text",
  placeholder,
  required = true,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  required?: boolean;
}) {
  const { pending } = useFormStatus();

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={name}
        className="text-xs font-medium text-zinc-400 uppercase tracking-wider"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        disabled={pending}
        className={`
          w-full px-4 py-3 rounded-xl text-sm font-medium
          bg-zinc-900/80 border border-zinc-800 
          outline-none transition-all duration-200
          placeholder:text-zinc-600
          ${pending
            ? "opacity-50 cursor-not-allowed text-zinc-600"
            : "text-zinc-100 focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 hover:border-zinc-700"
          }
        `}
      />
    </div>
  );
}

// ─── Textarea that disables itself during submission ─────────────────────────
function FormTextarea({
  label,
  name,
  placeholder,
}: {
  label: string;
  name: string;
  placeholder: string;
}) {
  const { pending } = useFormStatus();

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={name}
        className="text-xs font-medium text-zinc-400 uppercase tracking-wider"
      >
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        disabled={pending}
        rows={3}
        className={`
          w-full px-4 py-3 rounded-xl text-sm font-medium resize-none
          bg-zinc-900/80 border border-zinc-800
          outline-none transition-all duration-200
          placeholder:text-zinc-600
          ${pending
            ? "opacity-50 cursor-not-allowed text-zinc-600"
            : "text-zinc-100 focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 hover:border-zinc-700"
          }
        `}
      />
    </div>
  );
}

// ─── Step result banner ──────────────────────────────────────────────────────
function StepResultBanner({ result }: { result: StepResult }) {
  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-xl border text-sm ${
        result.success
          ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-400"
          : "bg-red-500/5 border-red-500/20 text-red-400"
      }`}
    >
      {result.success ? (
        <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
      ) : (
        <XCircle className="w-5 h-5 shrink-0 mt-0.5" />
      )}
      <div className="flex flex-col gap-1">
        <span className="font-semibold">{result.message}</span>
        {result.data && (
          <div className="flex flex-wrap gap-2 mt-1">
            {Object.entries(result.data).map(([key, value]) => (
              <span
                key={key}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/30 text-[11px] font-mono"
              >
                <span className="text-zinc-500">{key}:</span> {value}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Self-contained Step Card ────────────────────────────────────────────────
// Each card owns its state via useActionState — zero parent state needed.
function StepCard({
  number,
  title,
  icon,
  accentColor,
  serverAction,
  fields,
  submitLabel,
}: {
  number: number;
  title: string;
  icon: React.ReactNode;
  accentColor: string;
  serverAction: (prev: StepResult | null, formData: FormData) => Promise<StepResult>;
  fields: React.ReactNode;
  submitLabel: string;
}) {
  // useActionState: the React 19 way to manage form results.
  // The server action receives (prevState, formData) automatically.
  // No useState, no setX, no onSubmit handler, no wrapper.
  const [result, formAction, isPending] = useActionState(serverAction, null);

  const isCompleted = result?.success;

  return (
    <div
      className={`
        relative rounded-2xl border transition-all duration-500
        ${isCompleted
          ? "bg-emerald-500/[0.03] border-emerald-500/20"
          : "bg-zinc-900/50 border-zinc-800 hover:border-zinc-700"
        }
      `}
    >
      {/* Step header */}
      <div className="flex items-center gap-4 px-6 py-5 border-b border-zinc-800/50">
        <div
          className={`
            flex items-center justify-center w-10 h-10 rounded-xl border text-sm font-bold
            ${isCompleted
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
              : accentColor
            }
          `}
        >
          {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : icon}
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
            Step {number}
          </span>
          <h3 className="text-base font-semibold tracking-tight text-zinc-100">
            {title}
          </h3>
        </div>
        {isCompleted && (
          <span className="ml-auto text-[10px] font-bold uppercase tracking-wider text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full">
            Complete
          </span>
        )}
      </div>

      {/* The <form> — useFormStatus children read from THIS form boundary */}
      <form action={formAction} className="p-6 flex flex-col gap-5">
        {/* GlobalProgressBar reads pending from this <form> */}
        <GlobalProgressBar />

        {fields}

        {result && <StepResultBanner result={result} />}

        <SubmitButton
          label={submitLabel}
          icon={<ChevronRight className="w-4 h-4" />}
        />
      </form>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN PAGE — Zero useState. Zero setX. Pure composition.
// ═══════════════════════════════════════════════════════════════════════════════
export default function FormStatusPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-blue-500/30">
      {/* Background */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,#1e1b4b15_0%,transparent_60%)] pointer-events-none" />
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-6 py-16 flex flex-col gap-12">
        {/* Header */}
        <header className="flex flex-col gap-6">
          <Link
            href="/performance-lab"
            className="group flex w-fit items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Performance Lab
          </Link>

          <div className="flex flex-col gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 w-fit rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-indigo-500" />
              </span>
              React 19 · Zero useState
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Streaming{" "}
              <code className="px-2 py-0.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[0.85em]">
                useFormStatus
              </code>{" "}
              Form
            </h1>
            <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl">
              A multi-step checkout where each section is its own{" "}
              <code className="text-zinc-300 bg-zinc-800 px-1 py-0.5 rounded text-sm">
                &lt;form&gt;
              </code>{" "}
              with a Server Action. Submit buttons, inputs, and the progress bar
              all react to pending state via{" "}
              <code className="text-zinc-300 bg-zinc-800 px-1 py-0.5 rounded text-sm">
                useFormStatus
              </code>{" "}
              — with zero <code className="text-zinc-300 bg-zinc-800 px-1 py-0.5 rounded text-sm">useState</code> in the entire page.
              Each step manages its own result via{" "}
              <code className="text-zinc-300 bg-zinc-800 px-1 py-0.5 rounded text-sm">
                useActionState
              </code>.
            </p>
          </div>
        </header>

        {/* Step forms — each is fully self-contained */}
        <div className="flex flex-col gap-6">
          <StepCard
            number={1}
            title="Shipping Address"
            icon={<Truck className="w-5 h-5" />}
            accentColor="bg-blue-500/10 border-blue-500/30 text-blue-400"
            serverAction={processShipping}
            submitLabel="Validate & Calculate Rate"
            fields={
              <>
                <FormInput label="Full Name" name="fullName" placeholder="John Doe" />
                <FormInput label="Street Address" name="address" placeholder="123 Next.js Blvd" />
                <div className="grid grid-cols-2 gap-4">
                  <FormInput label="City" name="city" placeholder="San Francisco" />
                  <FormInput label="ZIP Code" name="zip" placeholder="94107" />
                </div>
              </>
            }
          />

          <StepCard
            number={2}
            title="Payment Details"
            icon={<CreditCard className="w-5 h-5" />}
            accentColor="bg-purple-500/10 border-purple-500/30 text-purple-400"
            serverAction={processPayment}
            submitLabel="Pre-Authorize Payment"
            fields={
              <>
                <FormInput
                  label="Card Number"
                  name="cardNumber"
                  placeholder="4242 4242 4242 4242"
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormInput label="Expiry" name="expiry" placeholder="12/28" />
                  <FormInput label="CVV" name="cvv" type="password" placeholder="•••" />
                </div>
              </>
            }
          />

          <StepCard
            number={3}
            title="Confirm & Place Order"
            icon={<Mail className="w-5 h-5" />}
            accentColor="bg-amber-500/10 border-amber-500/30 text-amber-400"
            serverAction={processConfirmation}
            submitLabel="Place Order"
            fields={
              <>
                <FormInput
                  label="Confirmation Email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                />
                <FormTextarea
                  label="Order Notes (Optional)"
                  name="notes"
                  placeholder="Gift wrap, leave at door, etc."
                />
              </>
            }
          />
        </div>

        {/* Architecture explainer */}
        <div className="flex flex-col gap-4 p-6 bg-black/40 backdrop-blur-sm rounded-2xl border border-zinc-800">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5 text-indigo-400" />
            <div className="text-sm leading-relaxed text-zinc-400">
              <span className="font-bold text-indigo-300">Zero useState architecture:</span>{" "}
              Each <code className="text-indigo-400">StepCard</code> owns its result via{" "}
              <code className="text-indigo-400">useActionState</code> — the React 19 primitive
              that wires a Server Action directly to a form. The parent page component is a pure
              function with no hooks at all. Meanwhile{" "}
              <code className="text-indigo-400">SubmitButton</code>,{" "}
              <code className="text-indigo-400">FormInput</code>, and{" "}
              <code className="text-indigo-400">GlobalProgressBar</code> each call{" "}
              <code className="text-indigo-400">useFormStatus()</code> to self-manage
              their loading/disabled state from the nearest{" "}
              <code className="text-indigo-400">&lt;form&gt;</code> boundary — zero prop drilling,
              zero callbacks.
            </div>
          </div>
        </div>
      </div>

      {/* CSS for progress bar animation */}
      <style>{`
        @keyframes progress-bar {
          0% { width: 0%; margin-left: 0%; }
          50% { width: 40%; margin-left: 30%; }
          100% { width: 0%; margin-left: 100%; }
        }
        .animate-progress-bar {
          animation: progress-bar 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
