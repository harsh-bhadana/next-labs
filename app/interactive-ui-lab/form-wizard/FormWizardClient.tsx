"use client";

import { useActionState, useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { User, Shield, FileText, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { submitStep, ActionState } from "./actions";

interface FormWizardClientProps {
  initialStep: number;
  initialIsCompleted: boolean;
  simulateNoJS: boolean;
  draftData: {
    email: string;
    username: string;
    theme: string;
    newsletter: boolean;
  };
}

const STEPS = [
  { number: 1, label: "Account Info", icon: User },
  { number: 2, label: "Preferences", icon: Shield },
  { number: 3, label: "Review & Submit", icon: FileText },
];

export function FormWizardClient({
  initialStep,
  initialIsCompleted,
  simulateNoJS,
  draftData,
}: FormWizardClientProps) {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(initialStep);
  const [isClientCompleted, setIsClientCompleted] = useState(initialIsCompleted);
  
  // Track local input values to keep preview synced in real-time
  const [emailVal, setEmailVal] = useState(draftData.email);
  const [usernameVal, setUsernameVal] = useState(draftData.username);
  const [themeVal, setThemeVal] = useState(draftData.theme);

  // Sync state if initial server step changes (important for JS-off navigation reloads)
  useEffect(() => {
    setActiveStep(initialStep);
    setIsClientCompleted(initialIsCompleted);
  }, [initialStep, initialIsCompleted]);

  // React 19: useActionState (manages progressive validation errors and actions status)
  const [state, formAction, isPending] = useActionState(submitStep, null);

  // Intercept action resolution in JS Mode to handle slide animations & history transitions
  useEffect(() => {
    if (simulateNoJS) return; // Ignore if JS is simulating turned off

    if (state?.success) {
      if (state.nextStep === "completed") {
        setIsClientCompleted(true);
        window.history.pushState(null, "", "/interactive-ui-lab/form-wizard?step=completed");
      } else if (typeof state.nextStep === "number") {
        setActiveStep(state.nextStep);
        window.history.pushState(null, "", `/interactive-ui-lab/form-wizard?step=${state.nextStep}`);
      }
    }
  }, [state, simulateNoJS]);

  // Handle Client Back button click
  const handleBack = () => {
    const prev = activeStep - 1;
    if (prev >= 1) {
      if (simulateNoJS) {
        // Native page navigation
        router.push(`/interactive-ui-lab/form-wizard?step=${prev}&jsMode=off`);
      } else {
        // Client-only state change with history update
        setActiveStep(prev);
        window.history.pushState(null, "", `/interactive-ui-lab/form-wizard?step=${prev}`);
      }
    }
  };

  // Sync text value state on changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "email") setEmailVal(value);
    if (name === "username") setUsernameVal(value);
    if (name === "theme") setThemeVal(value);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
      
      {/* Sidebar Step Indicators */}
      <div className="md:col-span-4 flex md:flex-col gap-3 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0">
        {STEPS.map((s) => {
          const StepIcon = s.icon;
          const isActive = activeStep === s.number && !isClientCompleted;
          const isDone = (activeStep > s.number && !isClientCompleted) || isClientCompleted;

          return (
            <div
              key={s.number}
              className={`flex items-center gap-3 p-4 rounded-2xl border transition-all flex-shrink-0 md:flex-shrink-1 ${
                isActive
                  ? "bg-white dark:bg-zinc-900 border-rose-500 text-rose-600 dark:text-rose-400 shadow-sm"
                  : isDone
                  ? "bg-zinc-100/60 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-900 text-zinc-400"
                  : "bg-white/40 dark:bg-zinc-950/20 border-zinc-200/50 dark:border-zinc-900/50 text-zinc-400"
              }`}
            >
              <div className={`p-2 rounded-xl ${
                isActive ? "bg-rose-500/15" : isDone ? "bg-zinc-200 dark:bg-zinc-800 text-emerald-500" : "bg-zinc-100 dark:bg-zinc-900"
              }`}>
                <StepIcon className="w-4 h-4" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] uppercase font-bold tracking-wider opacity-60">Step 0{s.number}</span>
                <span className="text-sm font-semibold">{s.label}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Form Content Card */}
      <div className="md:col-span-8 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900 p-8 rounded-3xl shadow-sm relative min-h-[420px] overflow-hidden">
        
        {isClientCompleted ? (
          <div className="flex flex-col items-center justify-center py-8 text-center gap-4">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 animate-bounce" />
            <h2 className="text-2xl font-bold">Setup Completed!</h2>
            <p className="text-zinc-500 text-sm max-w-sm">
              Your details have been successfully validated on the server and persisted. All onboarding session cookies have been cleared.
            </p>
            <Link
              href="/interactive-ui-lab/form-wizard"
              onClick={() => {
                setIsClientCompleted(false);
                setActiveStep(1);
                setEmailVal("");
                setUsernameVal("");
                setThemeVal("dark");
              }}
              className="mt-4 px-6 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-50 dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900 font-semibold rounded-xl text-sm transition-colors"
            >
              Restart Onboarding
            </Link>
          </div>
        ) : (
          /* Wrap in standard native form. Action points to the client formAction or the server action itself */
          <form action={simulateNoJS ? undefined : formAction} method={simulateNoJS ? "POST" : undefined} className="flex flex-col gap-6">
            
            {/* Native fallback form attributes for progressive support if JS disabled */}
            {simulateNoJS && (
              <>
                <input type="hidden" name="currentStep" value={activeStep} />
                <input type="hidden" name="jsMode" value="off" />
              </>
            )}

            {/* Client-side form attributes */}
            {!simulateNoJS && (
              <>
                <input type="hidden" name="currentStep" value={activeStep} />
                <input type="hidden" name="jsMode" value="on" />
              </>
            )}

            {/* AnimatePresence slides inputs left/right when JS is active */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={simulateNoJS ? false : { x: 40, opacity: 0 }}
                animate={simulateNoJS ? false : { x: 0, opacity: 1 }}
                exit={simulateNoJS ? false : { x: -40, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="flex flex-col gap-6"
              >
                {activeStep === 1 && (
                  <div className="flex flex-col gap-4">
                    <div>
                      <h2 className="text-xl font-bold flex items-center gap-2">
                        Account Credentials
                        {!simulateNoJS && <Sparkles className="w-4 h-4 text-rose-500" />}
                      </h2>
                      <p className="text-xs text-zinc-500">Provide registration identifiers to sync configurations.</p>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-zinc-500">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={emailVal}
                        onChange={handleInputChange}
                        placeholder="john.doe@example.com"
                        className={`w-full bg-zinc-50 dark:bg-zinc-900 border rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-rose-500/50 text-sm font-medium ${
                          state?.errors?.email ? "border-rose-500" : "border-zinc-200 dark:border-zinc-800"
                        }`}
                      />
                      {state?.errors?.email && (
                        <span className="text-xs text-rose-500 font-semibold">{state.errors.email}</span>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-zinc-500">Password</label>
                      <input
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        className={`w-full bg-zinc-50 dark:bg-zinc-900 border rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-rose-500/50 text-sm font-medium ${
                          state?.errors?.password ? "border-rose-500" : "border-zinc-200 dark:border-zinc-800"
                        }`}
                      />
                      {state?.errors?.password && (
                        <span className="text-xs text-rose-500 font-semibold">{state.errors.password}</span>
                      )}
                    </div>
                  </div>
                )}

                {activeStep === 2 && (
                  <div className="flex flex-col gap-4">
                    <div>
                      <h2 className="text-xl font-bold">User Customizations</h2>
                      <p className="text-xs text-zinc-500">Tailor account templates and dashboard notifications.</p>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-zinc-500">Profile Username</label>
                      <input
                        type="text"
                        name="username"
                        value={usernameVal}
                        onChange={handleInputChange}
                        placeholder="johndoe"
                        className={`w-full bg-zinc-50 dark:bg-zinc-900 border rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-rose-500/50 text-sm font-medium ${
                          state?.errors?.username ? "border-rose-500" : "border-zinc-200 dark:border-zinc-800"
                        }`}
                      />
                      {state?.errors?.username && (
                        <span className="text-xs text-rose-500 font-semibold">{state.errors.username}</span>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-zinc-500">Workspace Theme</label>
                      <select
                        name="theme"
                        value={themeVal}
                        onChange={handleInputChange}
                        className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-rose-500/50 text-sm font-medium"
                      >
                        <option value="light">Light Theme</option>
                        <option value="dark">Dark Theme</option>
                        <option value="system">System Default</option>
                      </select>
                    </div>
                  </div>
                )}

                {activeStep === 3 && (
                  <div className="flex flex-col gap-4">
                    <div>
                      <h2 className="text-xl font-bold">Review Configuration</h2>
                      <p className="text-xs text-zinc-500">Confirm parameters before starting dashboard nodes.</p>
                    </div>

                    {state?.error && (
                      <div className="bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 p-4 rounded-xl text-xs font-semibold flex items-center gap-2">
                        {state.error}
                      </div>
                    )}

                    <div className="border border-zinc-100 dark:border-zinc-900 rounded-2xl p-4 bg-zinc-50/50 dark:bg-zinc-950 flex flex-col gap-3 font-mono text-xs">
                      <div className="flex justify-between border-b border-zinc-100 dark:border-zinc-900 pb-2">
                        <span className="text-zinc-500">Email Address:</span>
                        <span className="font-semibold">{emailVal || "—"}</span>
                      </div>
                      <div className="flex justify-between border-b border-zinc-100 dark:border-zinc-900 pb-2">
                        <span className="text-zinc-500">Username:</span>
                        <span className="font-semibold">{usernameVal || "—"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Workspace Theme:</span>
                        <span className="font-semibold capitalize">{themeVal}</span>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Step Actions Footer */}
            <div className="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-900 pt-6 mt-4 relative z-10">
              {activeStep > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                >
                  Back
                </button>
              ) : (
                <div></div>
              )}

              {/* Native form action redirect triggers native browser load if JS is off */}
              {simulateNoJS ? (
                <button
                  type="submit"
                  formAction={submitStep}
                  className="px-6 py-2.5 bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-xl text-sm transition-colors shadow-lg shadow-rose-500/25"
                >
                  {activeStep === 3 ? "Submit Setup" : "Continue"}
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-6 py-2.5 bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-xl text-sm transition-colors shadow-lg shadow-rose-500/25 flex items-center gap-2 disabled:opacity-50"
                >
                  {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                  {activeStep === 3 ? "Submit Setup" : "Continue"}
                </button>
              )}
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
