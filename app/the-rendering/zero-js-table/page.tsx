import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Specimen Lab | Zero-JS Data Table",
    description: "Advanced server-side filtering experiment with 0kb client-side JavaScript logic.",
};

// Mock Data
const specimens = [
    { id: 1, name: "Bio-Logic Processor", status: "Stable", tech: "Organic" },
    { id: 2, name: "Neural Link v4", status: "Testing", tech: "Cybernetic" },
    { id: 3, name: "Quantum Cooler", status: "Critical", tech: "Cryo" },
    { id: 4, name: "Ion Thruster Core", status: "Stable", tech: "Plasma" },
    { id: 5, name: "Synaptic Relay", status: "Testing", tech: "Bio-Link" },
];

const statusStyles: Record<string, string> = {
    Stable: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    Testing: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    Critical: "bg-rose-500/10 text-rose-400 border-rose-500/20",
};

// --- Dynamic Table Component ---
async function TableContent({ searchParams }: { searchParams: Promise<any> }) {
    const awaitedParams = await searchParams;
    const query = awaitedParams.q?.toLowerCase() || "";

    const filtered = specimens.filter(s =>
        s.name.toLowerCase().includes(query) ||
        s.tech.toLowerCase().includes(query)
    );

    return (
        <div className="space-y-12">
            {/* Standard HTML Form - Works without hydration */}
            <form method="GET" className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto w-full">
                <input
                    name="q"
                    placeholder="Search experiments..."
                    defaultValue={query}
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-5 py-3 outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium text-white placeholder:text-slate-500"
                />
                <button
                    type="submit"
                    className="bg-white text-black font-bold px-8 py-3 rounded-xl hover:bg-slate-200 active:scale-95 transition-all"
                >
                    Filter
                </button>
            </form>

            <div className="overflow-hidden border border-slate-800 rounded-2xl shadow-2xl shadow-black/50 bg-slate-900/50">
                <table className="w-full text-sm text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-800/80 text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                            <th className="px-6 py-4">Specimen Name</th>
                            <th className="px-6 py-4 text-center">Technology</th>
                            <th className="px-6 py-4 text-right">Current Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                        {filtered.length > 0 ? (
                            filtered.map((item) => (
                                <tr key={item.id} className="hover:bg-slate-800/50 transition-colors">
                                    <td className="px-6 py-6 font-bold text-white">
                                        {item.name}
                                    </td>
                                    <td className="px-6 py-6 text-center font-mono opacity-70">
                                        {item.tech}
                                    </td>
                                    <td className="px-6 py-6 text-right">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${statusStyles[item.status] || "bg-slate-500/10 text-slate-400"}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3} className="px-6 py-24 text-center text-slate-500 font-medium italic">
                                    No matching specimens discovered in local storage.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// --- Main Page ---
export default function ZeroJSTable({ searchParams }: { searchParams: Promise<any> }) {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-slate-100 p-8 md:p-16 lg:p-24 flex flex-col items-center font-sans">
            <div className="w-full max-w-4xl space-y-12">
                <header className="text-center space-y-4 flex flex-col items-center">
                    <Link
                        href="/"
                        className="group flex w-fit items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors mb-2"
                    >
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        Back to Lab
                    </Link>
                    <h1 className="text-5xl font-black tracking-tight text-white">
                        Specimen Lab
                    </h1>
                    <p className="text-slate-400 text-lg text-pretty">
                        Built with <span className="text-blue-400 font-bold">Zero-JS</span> client-side filtering logic.
                    </p>
                </header>

                <Suspense fallback={
                    <div className="flex flex-col items-center justify-center p-24 rounded-2xl border border-slate-800 bg-slate-900/30">
                        <Loader2 className="w-10 h-10 animate-spin text-slate-700 mb-4" />
                        <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">Scanning Databases...</p>
                    </div>
                }>
                    <TableContent searchParams={searchParams} />
                </Suspense>
            </div>
        </div>
    );
}
