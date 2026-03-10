'use client'
// app/experiments/zero-js-table/page.tsx
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Chip,
    Input,
    Button,
    Card,
    CardHeader,
    CardBody
} from "@heroui/react";
import { Search, FlaskConical, Cpu, Zap, ShieldCheck, Microscope } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Mock Data
const specimens = [
    { id: 1, name: "Bio-Logic Processor", status: "Stable", tech: "Organic" },
    { id: 2, name: "Neural Link v4", status: "Testing", tech: "Cybernetic" },
    { id: 3, name: "Quantum Cooler", status: "Critical", tech: "Cryo" },
    { id: 4, name: "Ion Thruster Core", status: "Stable", tech: "Plasma" },
    { id: 5, name: "Synaptic Relay", status: "Testing", tech: "Bio-Link" },
];

const statusConfig: Record<string, { color: "success" | "warning" | "danger" | "default", icon: any }> = {
    Stable: { color: "success", icon: ShieldCheck },
    Testing: { color: "warning", icon: Zap },
    Critical: { color: "danger", icon: FlaskConical },
};

export default async function ZeroJSTable({ searchParams }: { searchParams: any }) {
    // Accessing searchParams is now an async operation in Next.js 16
    const { q } = await searchParams;
    const query = q?.toLowerCase() || "";

    const filtered = specimens.filter(s =>
        s.name.toLowerCase().includes(query) ||
        s.tech.toLowerCase().includes(query)
    );

    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-cyan-500/30">
            {/* Background Aesthetic */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
            </div>

            <main className="relative z-10 p-6 md:p-12 lg:p-20 max-w-6xl mx-auto space-y-12">
                <motion.header
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                >
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-cyan-500/10 rounded-2xl border border-cyan-500/20 glass-morphism">
                            <Microscope className="w-8 h-8 text-cyan-400" />
                        </div>
                        <div>
                            <h1 className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-500 bg-clip-text text-transparent">
                                Specimen Lab
                            </h1>
                            <p className="text-slate-500 font-medium flex items-center gap-2">
                                <Cpu className="w-4 h-4" />
                                Feature: Server-Side filtering with <span className="text-cyan-400 font-mono">0kb</span> Client JS logic.
                            </p>
                        </div>
                    </div>
                </motion.header>

                <motion.section
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="glass-morphism rounded-3xl p-1 border border-slate-800 bg-slate-900/40"
                >
                    <form method="GET" className="flex flex-col md:flex-row gap-3 p-2 bg-slate-950/30 rounded-[1.4rem]">
                        <Input
                            name="q"
                            placeholder="Filter by name or technology..."
                            defaultValue={query}
                            startContent={<Search className="text-slate-400" size={18} />}
                            classNames={{
                                inputWrapper: "bg-slate-900/50 border-slate-700/50 group-data-[focus=true]:border-cyan-500/50",
                                input: "text-slate-200 placeholder:text-slate-500"
                            }}
                            className="flex-1"
                            variant="bordered"
                        />
                        <Button
                            type="submit"
                            className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-8 shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all active:scale-95"
                        >
                            Sync Records
                        </Button>
                    </form>
                </motion.section>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <Table
                        aria-label="Specimen Data Table"
                        isHeaderSticky
                        classNames={{
                            base: "max-h-[500px] overflow-scroll border border-slate-800 rounded-3xl glass-morphism",
                            table: "bg-[#020617]/50",
                            thead: "[&>tr]:first:rounded-t-3xl",
                            th: "bg-slate-900/80 text-slate-400 font-bold border-b border-slate-800 uppercase tracking-widest text-[10px]",
                            td: "py-4 text-slate-300 font-medium border-b border-slate-800/50",
                            tr: "hover:bg-cyan-500/5 transition-colors group"
                        }}
                    >
                        <TableHeader>
                            <TableColumn>NAME</TableColumn>
                            <TableColumn>TECH</TableColumn>
                            <TableColumn>STATUS</TableColumn>
                        </TableHeader>
                        <TableBody emptyContent="No specimens found matching the current sync query.">
                            {filtered.map((item) => {
                                const status = statusConfig[item.status] || { color: "default", icon: Zap };
                                const StatusIcon = status.icon;

                                return (
                                    <TableRow key={item.id}>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="text-white font-bold tracking-wide group-hover:text-cyan-400 transition-colors">
                                                    {item.name}
                                                </span>
                                                <span className="text-[10px] text-slate-500 font-mono">ID: REF-{item.id}0X</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <div className="p-1 rounded bg-slate-800 border border-slate-700">
                                                    <Cpu size={12} className="text-slate-400" />
                                                </div>
                                                {item.tech}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                startContent={<StatusIcon size={14} />}
                                                variant="flat"
                                                color={status.color}
                                                className="capitalize font-bold border border-current transition-transform group-hover:scale-105"
                                                size="sm"
                                            >
                                                {item.status}
                                            </Chip>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </motion.div>
            </main>

            <style jsx global>{`
        .glass-morphism {
          background: rgba(15, 23, 42, 0.4);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
      `}</style>
        </div>
    );
}
