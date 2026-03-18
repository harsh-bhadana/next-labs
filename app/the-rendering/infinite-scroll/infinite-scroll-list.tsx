"use client";

import { useActionState, useEffect, useRef } from "react";
import { fetchMoreItems, State } from "./actions";
import { Loader2 } from "lucide-react";
import { Card, CardBody } from "@heroui/react";
import { motion } from "framer-motion";

export function InfiniteScrollList({ initialState }: { initialState: State }) {
  const [state, action, isPending] = useActionState(fetchMoreItems, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && state.hasMore && !isPending) {
          formRef.current?.requestSubmit();
        }
      },
      { threshold: 0.1, rootMargin: "200px" }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [state.hasMore, isPending]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4">
        {state.items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min((index % 10) * 0.05, 0.5) }}
          >
            <Card className={`shadow-sm border-none ${item.color}`}>
              <CardBody className="p-6">
                <h3 className="font-semibold text-lg text-neutral-900 dark:text-neutral-100 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm mt-2 leading-relaxed">
                  {item.description}
                </p>
              </CardBody>
            </Card>
          </motion.div>
        ))}
      </div>

      <form ref={formRef} action={action} className="opacity-0 w-0 h-0 overflow-hidden">
        <button type="submit" disabled={isPending} tabIndex={-1}>
          Load More
        </button>
      </form>

      {state.hasMore && (
        <div ref={observerTarget} className="flex justify-center items-center py-12">
          {isPending && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-3 px-4 py-2 bg-neutral-100 dark:bg-neutral-900 rounded-full shadow-sm"
            >
              <Loader2 className="w-5 h-5 animate-spin text-neutral-600 dark:text-neutral-400" />
              <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Loading more...</span>
            </motion.div>
          )}
        </div>
      )}

      {!state.hasMore && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 text-neutral-500 font-medium"
        >
          You've reached the end!
        </motion.div>
      )}
    </div>
  );
}
