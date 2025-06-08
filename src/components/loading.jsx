import React, { useMemo } from "react";
import { Loader2 } from "lucide-react";

const quotes = [
  "Every expert was once a beginner.",
  "Stay hungry, stay foolish.",
  "Consistency beats intensity.",
  "Keep pushing your limits!",
  "Believe you can and you're halfway there.",
  "Great things take time.",
  "Failure is the first step to success.",
];

export default function Loading() {
  const quote = useMemo(() => {
    const index = Math.floor(Math.random() * quotes.length);
    return quotes[index];
  }, []);

  return (
    <div className="flex items-center justify-center h-screen mt-0">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-md p-6 w-[360px] text-center space-y-4">
        <Loader2 className="animate-spin w-6 h-6 text-primary mx-auto" />
        <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
          Loading ...
        </h2>
        <div className="text-sm text-zinc-600 dark:text-zinc-400 italic mb-2">
          {quote}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
          Backend is hosted on{" "}
          <span className="font-semibold text-indigo-600 dark:text-indigo-400">
            Render
          </span>{" "}
          free version, so it may work slow now.
        </div>
      </div>
    </div>
  );
}
