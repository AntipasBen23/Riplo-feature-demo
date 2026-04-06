"use client";

import React, { useMemo } from 'react';
import { ReactFlow, Background, Controls, NodeTypes } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useAppStore } from '@/store';
import { CustomNode } from './CustomNode';
import { Network } from 'lucide-react';
import { motion } from 'framer-motion';

export function CenterGraph() {
  const { nodes, edges, appStatus } = useAppStore();

  const nodeTypes: NodeTypes = useMemo(() => ({ consultingNode: CustomNode }), []);

  const isReady = appStatus === 'ready' || appStatus === 'generating-slide' || appStatus === 'slide-ready';
  const isAnalyzing = appStatus === 'analyzing';

  return (
    <div className="h-full flex flex-col pt-6 px-2 pb-2 bg-[var(--color-app-bg)] relative">
      <div className="px-4 mb-4 flex-shrink-0">
        <h2 className="text-lg font-bold tracking-tight text-[var(--color-text-primary)]">
          Live Engagement Graph
        </h2>
        <p className="text-sm text-[var(--color-text-muted)] mt-1">
          Structured from raw input into reusable consulting logic
        </p>
      </div>

      <div className="flex-1 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-app-bg)] overflow-hidden relative">
        {(!isReady && !isAnalyzing) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-[var(--color-text-muted)] opacity-50">
            <Network className="w-16 h-16 mb-4 opacity-50" />
            <p className="text-sm font-medium">Awaiting analysis...</p>
          </div>
        )}

        {isAnalyzing && (
          <div className="absolute inset-0 flex items-center justify-center">
             <motion.div 
               animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
               transition={{ repeat: Infinity, duration: 2 }}
               className="w-48 h-48 rounded-full bg-[var(--color-accent-soft)] blur-3xl absolute"
             />
          </div>
        )}

        {isReady && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="w-full h-full"
            transition={{ duration: 0.5 }}
          >
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              fitView
              proOptions={{ hideAttribution: true }}
              minZoom={0.5}
              maxZoom={1.5}
              defaultEdgeOptions={{ type: 'smoothstep' }}
            >
              <Background color="var(--color-border-default)" gap={24} size={1} />
              <Controls className="!bg-[var(--color-surface)] !border-[var(--color-border-default)] !shadow-sm !rounded-md overflow-hidden [&>button]:!bg-transparent [&>button]:!border-b [&>button]:!border-[var(--color-border-default)] [&>button:last-child]:!border-b-0 [&>button>svg]:!fill-[var(--color-text-secondary)] hover:[&>button]:!bg-[var(--color-card)]" />
            </ReactFlow>
          </motion.div>
        )}
      </div>
    </div>
  );
}
