"use client";

import { LeftPanel } from "@/components/LeftPanel";
import { CenterGraph } from "@/components/CenterGraph";
import { RightPanel } from "@/components/RightPanel";

export default function Home() {
  return (
    <main className="h-screen w-full overflow-hidden bg-[var(--color-app-bg)] text-[var(--color-text-primary)] font-sans">
      <div className="flex h-full w-full">
        {/* Left Panel - 28% */}
        <div className="w-[28%] min-w-[300px] h-full shrink-0">
          <LeftPanel />
        </div>

        {/* Center Panel - 42% */}
        <div className="flex-1 w-[42%] min-w-[400px] h-full relative z-0">
          <CenterGraph />
        </div>

        {/* Right Panel - 30% */}
        <div className="w-[30%] min-w-[320px] max-w-[400px] h-full shrink-0 relative z-10">
          <RightPanel />
        </div>
      </div>
    </main>
  );
}
