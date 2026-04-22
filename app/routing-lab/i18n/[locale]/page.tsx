import Link from "next/link";
import { getDictionary, Locale } from "@/lib/get-dictionary";
import { Globe, ArrowLeft, Languages, Server, Zap, ShieldCheck, Map } from "lucide-react";

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }, { locale: 'fr' }];
}

export default async function I18nSpecimenPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  const locales = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
  ];

  return (
    <div className="flex min-h-screen flex-col items-center bg-zinc-50 font-sans dark:bg-black selection:bg-indigo-500/30">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(79,70,229,0.05)_0%,transparent_50%)] pointer-events-none"></div>
      
      <main className="relative flex w-full max-w-4xl flex-col items-start justify-start py-20 px-6 sm:px-12 gap-12">
        
        {/* Navigation */}
        <Link 
          href="/routing-lab"
          className="group flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          {dict.specimen.back_to_lab}
        </Link>

        {/* Header */}
        <header className="flex flex-col gap-6 w-full">
          <div className="inline-flex items-center gap-2 px-3 py-1 self-start rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
            <Globe className="w-3.5 h-3.5" />
            i18n specimen
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            {dict.specimen.title}
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            {dict.specimen.description}
          </p>
        </header>

        {/* Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mt-4">
          
          {/* Language Switcher Card */}
          <section className="flex flex-col gap-6 p-8 bg-white dark:bg-zinc-900/50 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 opacity-5">
                <Languages className="w-32 h-32" />
             </div>
             
             <div className="flex flex-col gap-2">
                <h2 className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest flex items-center gap-2">
                   <Languages className="w-4 h-4" />
                   {dict.specimen.switch_language}
                </h2>
                <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                  {dict.specimen.current_locale}: <span className="text-indigo-500">{locales.find(l => l.code === locale)?.name}</span>
                </p>
             </div>

             <div className="flex flex-wrap gap-3 mt-2">
                {locales.map((l) => (
                  <Link
                    key={l.code}
                    href={`/routing-lab/i18n/${l.code}`}
                    className={`
                      px-5 py-2.5 rounded-xl border transition-all duration-200 font-medium flex items-center gap-2
                      ${locale === l.code 
                        ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-500/20" 
                        : "bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-indigo-500/50 hover:text-indigo-500"
                      }
                    `}
                  >
                    <span>{l.flag}</span>
                    {l.name}
                  </Link>
                ))}
             </div>
          </section>

          {/* Technical Explainer */}
          <section className="grid grid-cols-1 gap-4">
            <div className="p-5 rounded-2xl bg-zinc-100 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800 flex gap-4 items-start">
              <div className="p-2 rounded-lg bg-white dark:bg-zinc-800 text-indigo-500 border border-zinc-200 dark:border-zinc-700">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-snug">
                {dict.specimen.features.middleware}
              </p>
            </div>
            
            <div className="p-5 rounded-2xl bg-zinc-100 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800 flex gap-4 items-start">
              <div className="p-2 rounded-lg bg-white dark:bg-zinc-800 text-teal-500 border border-zinc-200 dark:border-zinc-700">
                <Map className="w-5 h-5" />
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-snug">
                {dict.specimen.features.dynamic_routes}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-100 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800 flex gap-4 items-start">
              <div className="p-2 rounded-lg bg-white dark:bg-zinc-800 text-amber-500 border border-zinc-200 dark:border-zinc-700">
                <Server className="w-5 h-5" />
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-snug">
                {dict.specimen.features.server_components}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-100 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800 flex gap-4 items-start">
              <div className="p-2 rounded-lg bg-white dark:bg-zinc-800 text-rose-500 border border-zinc-200 dark:border-zinc-700">
                <Zap className="w-5 h-5" />
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-snug">
                {dict.specimen.features.zero_js}
              </p>
            </div>
          </section>

        </div>

      </main>
    </div>
  );
}
