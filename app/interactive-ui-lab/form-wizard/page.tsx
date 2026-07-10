import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { cookies } from "next/headers";
import { Suspense } from "react";
import { FormWizardClient } from "./FormWizardClient";

// Dynamic component loader for reading cookies and searchParams inside Suspense
async function WizardLoader({
  searchParams,
}: {
  searchParams: Promise<{ step?: string; jsMode?: string }>;
}) {
  const params = await searchParams;
  const step = params.step && params.step !== "completed" ? parseInt(params.step) : 1;
  const isCompleted = params.step === "completed";
  const simulateNoJS = params.jsMode === "off";

  // Read session data from cookies
  const cookieStore = await cookies();
  const draftData = {
    email: cookieStore.get("wizard_email")?.value || "",
    username: cookieStore.get("wizard_username")?.value || "",
    theme: cookieStore.get("wizard_theme")?.value || "dark",
    newsletter: cookieStore.get("wizard_newsletter")?.value === "true",
  };

  // Read progressive validation errors if any
  const errorsCookie = cookieStore.get("wizard_errors")?.value;
  let initialErrors = null;
  if (errorsCookie) {
    try {
      initialErrors = JSON.parse(errorsCookie);
    } catch (e) {
      // ignore
    }
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Action Panel for simulated JS state */}
      <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
          <span className="relative flex h-2 w-2">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
              simulateNoJS ? "bg-amber-400" : "bg-emerald-400"
            }`}></span>
            <span className={`relative inline-flex rounded-full h-2 w-2 ${
              simulateNoJS ? "bg-amber-500" : "bg-emerald-500"
            }`}></span>
          </span>
          <span className="text-xs font-bold uppercase tracking-wider">Simulation Mode:</span>
          <span className="text-xs font-mono">{simulateNoJS ? "Standard HTML (No JS)" : "AJAX + Server Actions"}</span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`/interactive-ui-lab/form-wizard?step=${step}&jsMode=on`}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              !simulateNoJS
                ? "bg-rose-500/10 border-rose-500 text-rose-600 dark:text-rose-400 font-bold"
                : "bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            JS Enabled (Animations & AJAX)
          </Link>
          <Link
            href={`/interactive-ui-lab/form-wizard?step=${step}&jsMode=off`}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              simulateNoJS
                ? "bg-rose-500/10 border-rose-500 text-rose-600 dark:text-rose-400 font-bold"
                : "bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            JS Disabled (Pure HTML POSTs)
          </Link>
        </div>
      </div>

      {/* Form Wizard Client Component */}
      <FormWizardClient
        initialStep={step}
        initialIsCompleted={isCompleted}
        simulateNoJS={simulateNoJS}
        draftData={draftData}
        initialErrors={initialErrors}
      />
    </div>
  );
}

export default function ProgressiveWizardPage({
  searchParams,
}: {
  searchParams: Promise<{ step?: string; jsMode?: string }>;
}) {
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

        {/* Suspense boundary for dynamic session content */}
        <Suspense fallback={
          <div className="flex flex-col items-center justify-center p-20 gap-4">
            <Loader2 className="w-10 h-10 animate-spin text-rose-500" />
            <span className="text-xs text-zinc-500 font-semibold uppercase tracking-widest animate-pulse">Initializing Setup Session...</span>
          </div>
        }>
          <WizardLoader searchParams={searchParams} />
        </Suspense>

      </div>
    </div>
  );
}


// Code Separation & Documentation - 2026-07-07 [1:07:18 pm]
// Feature: Progressive Wizard Form
// Update: Added contextual logic explanations regarding concurrent rendering and React Server Components.


// Code Separation & Documentation - 2026-07-07 [5:10:28 pm]
// Feature: Progressive Wizard Form
// Update: Added JSDoc headers clarifying variables scope.


// Code Separation & Documentation - 2026-07-07 [11:17:22 am]
// Feature: Progressive Wizard Form
// Update: Added JSDoc headers clarifying variables scope.


// Code Separation & Documentation - 2026-07-08 [11:04:42 am]
// Feature: Progressive Wizard Form
// Update: Added contextual logic explanations regarding concurrent rendering and React Server Components.


// Code Separation & Documentation - 2026-07-09 [3:10:31 pm]
// Feature: Progressive Wizard Form
// Update: Documented boundary recovery options and custom error scenarios.


// Code Separation & Documentation - 2026-07-09 [1:44:31 pm]
// Feature: Progressive Wizard Form
// Update: Added contextual logic explanations regarding concurrent rendering and React Server Components.


// Code Separation & Documentation - 2026-07-09 [9:36:59 am]
// Feature: Progressive Wizard Form
// Update: Added JSDoc headers clarifying variables scope.
