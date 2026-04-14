"use client";

import { useFormStatus } from "react-dom";
import { useState, useRef } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Package,
  CreditCard,
  Mail,
  Loader2,
  CheckCircle2,
  XCircle,
  ChevronRight,
  Database,
  Truck,
  ShieldCheck,
  PartyPopper,
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

// ─── Step card (each wraps its own <form>) ───────────────────────────────────
type StepConfig = {
  number: number;
  title: string;
  icon: React.ReactNode;
  accentColor: string;
  action: (formData: FormData) => Promise<StepResult>;
  fields: React.ReactNode;
  submitLabel: string;
};

function StepCard({
  config,
  result,
  onResult,
}: {
  config: StepConfig;
  result: StepResult | null;
  onResult: (result: StepResult) => void;
}) {
  const formRef = useRef<HTMLFormElement>(null);

  const handleAction = async (formData: FormData) => {
    const res = await config.action(formData);
    onResult(res);
    if (res.success && formRef.current) {
      // Don't reset — keep values visible after success
    }
  };

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
              : `${config.accentColor}`
            }
          `}
        >
          {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : config.icon}
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
            Step {config.number}
          </span>
          <h3 className="text-base font-semibold tracking-tight text-zinc-100">
            {config.title}
          </h3>
        </div>
        {isCompleted && (
          <span className="ml-auto text-[10px] font-bold uppercase tracking-wider text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full">
            Complete
          </span>
        )}
      </div>

      {/* The actual <form> — useFormStatus reads from this boundary */}
      <form ref={formRef} action={handleAction} className="p-6 flex flex-col gap-5">
        {/* GlobalProgressBar is inside the form so it can read THIS form's status */}
        <GlobalProgressBar />

        {config.fields}

        {result && <StepResultBanner result={result} />}

        <SubmitButton
          label={config.submitLabel}
          icon={<ChevronRight className="w-4 h-4" />}
        />
      </form>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════════════════════
export default function FormStatusPage() {
  const [results, setResults] = useState<Record<number, StepResult>>({});

  const completedCount = Object.values(results).filter((r) => r.success).length;
  const totalSteps = 3;

  const steps: StepConfig[] = [
    {
      number: 1,
      title: "Shipping Address",
      icon: <Truck className="w-5 h-5" />,
      accentColor: "bg-blue-500/10 border-blue-500/30 text-blue-400",
      action: processShipping,
      submitLabel: "Validate & Calculate Rate",
      fields: (
        <>
          <FormInput label="Full Name" name="fullName" placeholder="John Doe" />
          <FormInput label="Street Address" name="address" placeholder="123 Next.js Blvd" />
          <div className="grid grid-cols-2 gap-4">
            <FormInput label="City" name="city" placeholder="San Francisco" />
            <FormInput label="ZIP Code" name="zip" placeholder="94107" />
          </div>
        </>
      ),
    },
    {
      number: 2,
      title: "Payment Details",
      icon: <CreditCard className="w-5 h-5" />,
      accentColor: "bg-purple-500/10 border-purple-500/30 text-purple-400",
      action: processPayment,
      submitLabel: "Pre-Authorize Payment",
      fields: (
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
      ),
    },
    {
      number: 3,
      title: "Confirm & Place Order",
      icon: <Mail className="w-5 h-5" />,
      accentColor: "bg-amber-500/10 border-amber-500/30 text-amber-400",
      action: processConfirmation,
      submitLabel: "Place Order",
      fields: (
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
      ),
    },
  ];

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
              with a Server Action. Submit buttons, inputs, and the global progress bar
              all react to pending state via{" "}
              <code className="text-zinc-300 bg-zinc-800 px-1 py-0.5 rounded text-sm">
                useFormStatus
              </code>{" "}
              — without a single line of state management.
            </p>
          </div>
        </header>

        {/* Progress overview */}
        <div className="flex items-center gap-4 p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800">
          <div
            className={`flex items-center justify-center w-12 h-12 rounded-xl border ${
              completedCount === totalSteps
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                : "bg-blue-500/10 border-blue-500/30 text-blue-400"
            }`}
          >
            {completedCount === totalSteps ? (
              <PartyPopper className="w-6 h-6" />
            ) : (
              <Package className="w-6 h-6" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold">
                {completedCount === totalSteps
                  ? "All steps complete!"
                  : `Checkout Progress`}
              </span>
              <span className="text-xs font-mono text-zinc-500">
                {completedCount}/{totalSteps}
              </span>
            </div>
            <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${(completedCount / totalSteps) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Step forms */}
        <div className="flex flex-col gap-6">
          {steps.map((step) => (
            <StepCard
              key={step.number}
              config={step}
              result={results[step.number] ?? null}
              onResult={(res) =>
                setResults((prev) => ({ ...prev, [step.number]: res }))
              }
            />
          ))}
        </div>

        {/* State Inspector */}
        <div className="flex flex-col gap-4 p-6 bg-black/40 backdrop-blur-sm rounded-2xl border border-zinc-800 font-mono text-sm">
          <div className="flex items-center gap-2 text-zinc-500 mb-1 font-sans font-medium uppercase tracking-wider text-xs">
            <Database className="w-4 h-4" /> State Inspector
          </div>
          <p className="text-zinc-500 text-xs font-sans leading-relaxed">
            Every component below uses{" "}
            <code className="text-zinc-400">useFormStatus()</code> to read
            pending state from its nearest{" "}
            <code className="text-zinc-400">&lt;form&gt;</code> ancestor.
            Zero props drilled. Zero context providers. Zero{" "}
            <code className="text-zinc-400">useState</code>.
          </p>
          <div className="h-px bg-zinc-800" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {steps.map((step) => {
              const r = results[step.number];
              return (
                <div
                  key={step.number}
                  className={`flex flex-col gap-1 p-3 rounded-xl border ${
                    r?.success
                      ? "border-emerald-500/20 bg-emerald-500/5"
                      : r && !r.success
                      ? "border-red-500/20 bg-red-500/5"
                      : "border-zinc-800 bg-zinc-900/30"
                  }`}
                >
                  <span className="text-[10px] text-zinc-500 uppercase">
                    Step {step.number}
                  </span>
                  <span
                    className={`text-xs font-semibold ${
                      r?.success
                        ? "text-emerald-400"
                        : r && !r.success
                        ? "text-red-400"
                        : "text-zinc-600"
                    }`}
                  >
                    {r?.success ? "✓ Settled" : r ? "✗ Failed" : "Pending"}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Key concept callout */}
          <div className="mt-2 p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/10 text-indigo-300/80">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5 text-indigo-400" />
              <div className="text-xs leading-relaxed font-sans">
                <span className="font-bold text-indigo-300">Key Insight:</span>{" "}
                <code className="text-indigo-400">useFormStatus</code> reads the
                pending state of the nearest parent{" "}
                <code className="text-indigo-400">&lt;form&gt;</code>. This means
                the <code className="text-indigo-400">SubmitButton</code>,{" "}
                <code className="text-indigo-400">FormInput</code>, and{" "}
                <code className="text-indigo-400">GlobalProgressBar</code> all
                self-manage their disabled/loading state — zero prop drilling required.
              </div>
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
