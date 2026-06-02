import Link from "next/link";
import { ArrowLeft, User, Shield, HelpCircle, FileText, CheckCircle2 } from "lucide-react";
import { cookies } from "next/headers";

// Define the steps
const STEPS = [
  { number: 1, label: "Account Info", icon: User },
  { number: 2, label: "Preferences", icon: Shield },
  { number: 3, label: "Review & Submit", icon: FileText },
];

export default async function ProgressiveWizardPage({
  searchParams,
}: {
  searchParams: Promise<{ step?: string; jsMode?: string }>;
}) {
  const params = await searchParams;
  const step = params.step ? parseInt(params.step) : 1;
  const isCompleted = params.step === "completed";
  const simulateNoJS = params.jsMode === "off";

  // Read session data from cookies (mock reads for Commit 1)
  const cookieStore = await cookies();
  const draftData = {
    email: cookieStore.get("wizard_email")?.value || "",
    username: cookieStore.get("wizard_username")?.value || "",
    theme: cookieStore.get("wizard_theme")?.value || "dark",
    newsletter: cookieStore.get("wizard_newsletter")?.value === "true",
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-50 font-sans p-6 sm:p-12 md:p-20 relative overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-rose-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto flex flex-col gap-8 relative z-10">
        
        {/* Navigation & Header */}
        <header className="flex flex-col gap-4">
          <Link
            href="/interactive-ui-lab"
            className="group flex w-fit items-center gap-2 text-sm font-medium text-zinc-500 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Interactive & UI Lab
          </Link>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 w-fit">
                Next.js Progressive Specimen
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Progressive Multi-Step Wizard
              </h1>
              <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl text-sm sm:text-base">
                A multi-step registration flow that showcases progressive enhancement. Compare dynamic client animations against native browser forms persisting via session cookies.
              </p>
            </div>
          </div>
        </header>

        {/* Action Panel for simulated JS state */}
        <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-rose-500" />
            <span className="text-sm font-semibold">JavaScript Simulation Mode</span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/interactive-ui-lab/form-wizard?step=${step}&jsMode=on`}
              className={`px-4 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                !simulateNoJS
                  ? "bg-rose-500/10 border-rose-500 text-rose-600 dark:text-rose-400 font-bold"
                  : "bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-500"
              }`}
            >
              JS Enabled (Animations & AJAX)
            </Link>
            <Link
              href={`/interactive-ui-lab/form-wizard?step=${step}&jsMode=off`}
              className={`px-4 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                simulateNoJS
                  ? "bg-rose-500/10 border-rose-500 text-rose-600 dark:text-rose-400 font-bold"
                  : "bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-500"
              }`}
            >
              JS Disabled (Pure HTML POSTs)
            </Link>
          </div>
        </div>

        {/* Wizard Form Workspace */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Sidebar Step Indicators */}
          <div className="md:col-span-4 flex md:flex-col gap-3 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0">
            {STEPS.map((s) => {
              const StepIcon = s.icon;
              const isActive = step === s.number && !isCompleted;
              const isDone = (step > s.number && !isCompleted) || isCompleted;

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
          <div className="md:col-span-8 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900 p-8 rounded-3xl shadow-sm relative min-h-[380px]">
            
            {isCompleted ? (
              <div className="flex flex-col items-center justify-center py-8 text-center gap-4">
                <CheckCircle2 className="w-16 h-16 text-emerald-500 animate-bounce" />
                <h2 className="text-2xl font-bold">Registration Complete!</h2>
                <p className="text-zinc-500 text-sm max-w-sm">
                  Your details have been validated on the server and stored in mock database rows. All session cookies have been cleared.
                </p>
                <Link
                  href="/interactive-ui-lab/form-wizard"
                  className="mt-4 px-6 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-50 dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900 font-semibold rounded-xl text-sm transition-colors"
                >
                  Restart Onboarding
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                
                {/* Step Forms (Mock static shells for Commit 1) */}
                {step === 1 && (
                  <div className="flex flex-col gap-4">
                    <div>
                      <h2 className="text-xl font-bold">Account Credentials</h2>
                      <p className="text-xs text-zinc-500">Provide registration identifiers to sync configurations.</p>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-zinc-500">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        defaultValue={draftData.email}
                        placeholder="john.doe@example.com"
                        className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-rose-500/50 text-sm font-medium"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-zinc-500">Password</label>
                      <input
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-rose-500/50 text-sm font-medium"
                      />
                    </div>
                  </div>
                )}

                {step === 2 && (
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
                        defaultValue={draftData.username}
                        placeholder="johndoe"
                        className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-rose-500/50 text-sm font-medium"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-zinc-500">Workspace Theme</label>
                      <select
                        name="theme"
                        defaultValue={draftData.theme}
                        className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-rose-500/50 text-sm font-medium"
                      >
                        <option value="light">Light Theme</option>
                        <option value="dark">Dark Theme</option>
                        <option value="system">System Default</option>
                      </select>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="flex flex-col gap-4">
                    <div>
                      <h2 className="text-xl font-bold">Review Configuration</h2>
                      <p className="text-xs text-zinc-500">Confirm parameters before starting dashboard nodes.</p>
                    </div>

                    <div className="border border-zinc-100 dark:border-zinc-900 rounded-2xl p-4 bg-zinc-50/50 dark:bg-zinc-950 flex flex-col gap-3 font-mono text-xs">
                      <div className="flex justify-between border-b border-zinc-100 dark:border-zinc-900 pb-2">
                        <span className="text-zinc-500">Email Address:</span>
                        <span className="font-semibold">{draftData.email || "—"}</span>
                      </div>
                      <div className="flex justify-between border-b border-zinc-100 dark:border-zinc-900 pb-2">
                        <span className="text-zinc-500">Username:</span>
                        <span className="font-semibold">{draftData.username || "—"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Workspace Theme:</span>
                        <span className="font-semibold capitalize">{draftData.theme}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step Actions Footer */}
                <div className="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-900 pt-6 mt-4">
                  {step > 1 ? (
                    <Link
                      href={`/interactive-ui-lab/form-wizard?step=${step - 1}&jsMode=${simulateNoJS ? "off" : "on"}`}
                      className="px-5 py-2 rounded-xl text-sm font-semibold border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                    >
                      Back
                    </Link>
                  ) : (
                    <div></div>
                  )}

                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-xl text-sm transition-colors shadow-lg shadow-rose-500/25"
                  >
                    {step === 3 ? "Submit Setup" : "Continue"}
                  </button>
                </div>

              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
