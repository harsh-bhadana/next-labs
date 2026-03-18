"use client";

import { useState, useOptimistic, useTransition } from "react";
import Link from "next/link";
import { ArrowLeft, ThumbsUp, Database } from "lucide-react";
import { likePostAction } from "./actions";

export default function OptimisticLikePage() {
  // The actual source of truth (e.g. state fetched from DB)
  const [likes, setLikes] = useState(42);
  const [isPending, startTransition] = useTransition();

  // useOptimistic hook returns [optimisticState, addOptimisticAction]
  // It updates the optimisticState immediately and reverts if the transition fails
  const [optimisticLikes, addOptimisticLike] = useOptimistic(
    likes,
    (state, amount: number) => state + amount
  );

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-50 font-sans p-8 sm:p-20">
      <div className="max-w-2xl mx-auto flex flex-col gap-10">
        
        <header className="flex flex-col gap-6">
          <Link
            href="/performance-lab"
            className="group flex w-fit items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Performance Lab
          </Link>

          <div className="flex flex-col gap-2">
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              Optimistic "Like" Button
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Demonstrating the new React 19 <code className="bg-zinc-200 dark:bg-zinc-800 px-1 py-0.5 rounded text-sm">useOptimistic</code> hook.
              Click the like button below—it updates instantly on the client while simulating a 1.5s Server Action to confirm the database change.
            </p>
          </div>
        </header>

        <section className="flex flex-col gap-8">
          
          <div className="flex flex-col gap-4 p-8 items-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm">
            <h2 className="text-2xl font-bold tracking-tight">Aesthetic Post</h2>
            <p className="text-zinc-500 text-center max-w-sm">
              This post showcases how much faster UI feels when you skip waiting for the network round-trip.
            </p>
            
            <div className="mt-4 flex items-center gap-4">
              <button
                className={`flex items-center gap-2 px-5 py-3 rounded-full font-bold transition-all active:scale-95 shadow-sm
                  ${isPending ? 'bg-pink-100 text-pink-500 border-pink-200 dark:bg-pink-500/10 dark:text-pink-400 dark:border-pink-500/20 border' 
                   : 'bg-pink-500 text-white hover:bg-pink-600 shadow-pink-500/30'}
                `}
                onClick={() => {
                  startTransition(async () => {
                    // Update the UI *instantly* with the optimistic value
                    addOptimisticLike(1);
                    
                    // Call the server action to actually mutate the DB (takes 1.5s)
                    const updatedLikes = await likePostAction(likes);
                    
                    // Once returning, sync the source of truth back up
                    setLikes(updatedLikes);
                  });
                }}
              >
                <ThumbsUp className={`w-5 h-5 ${isPending ? 'animate-pulse' : ''}`} />
                {optimisticLikes} Likes
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4 p-6 bg-zinc-100 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 font-mono text-sm">
            <div className="flex items-center gap-2 text-zinc-500 mb-2 font-sans font-medium uppercase tracking-wider text-xs">
              <Database className="w-4 h-4" /> State Inspector
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Optimistic UI Counter:</span>
              <span className={`font-semibold ${isPending ? 'text-pink-500' : 'text-zinc-900 dark:text-zinc-100'}`}>
                {optimisticLikes}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Database Source of Truth:</span>
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                {likes}
              </span>
            </div>
            <div className="flex justify-between mt-2 pt-2 border-t border-zinc-200 dark:border-zinc-800">
              <span className="text-zinc-500">Mutation Status:</span>
              <span className={`font-semibold ${isPending ? 'text-amber-500 animate-pulse' : 'text-emerald-500'}`}>
                {isPending ? 'Synchronizing...' : 'Settled'}
              </span>
            </div>
          </div>

        </section>
      </div>
    </div>
  );
}
