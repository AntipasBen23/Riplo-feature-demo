"use client";

import React from 'react';
import { useAppStore, ConsultingNodeData } from '@/store';
import { Button, Badge, Card } from './ui';
import { Loader2, FileText, ChevronRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function RightPanel() {
  const { nodes, selectedNodeId, appStatus, generateSlide } = useAppStore();

  const isGenerating = appStatus === 'generating-slide';
  const slideReady = appStatus === 'slide-ready';
  
  const selectedNode = nodes.find(n => n.id === selectedNodeId);
  const data = selectedNode?.data;

  // Empty state if not ready or nothing selected
  if (!data || appStatus === 'idle' || appStatus === 'analyzing') {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 bg-[var(--color-app-bg)] border-l border-[var(--color-border-subtle)]">
        <p className="text-sm text-[var(--color-text-muted)] text-center max-w-xs">
          Select or generate an engagement structure to inspect outputs
        </p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-[var(--color-app-bg)] border-l border-[var(--color-border-subtle)] overflow-y-auto">
      {/* Section A — Selected Node Details */}
      <div className="p-6 border-b border-[var(--color-border-subtle)] shrink-0">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-4">
          Node Detail
        </h2>
        
        <AnimatePresence mode="wait">
          <motion.div 
            key={selectedNodeId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div>
              <Badge variant={data.type as any} className="mb-2">
                {data.type}
              </Badge>
              <h3 className="text-xl font-bold text-[var(--color-text-primary)] leading-tight">
                {data.label}
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)] mt-2 leading-relaxed">
                {data.summary}
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-[var(--color-text-muted)] uppercase">Supporting Evidence</h4>
              <ul className="space-y-2">
                {data.evidence.map((ev, i) => (
                  <li key={i} className="flex gap-2 text-sm text-[var(--color-text-primary)]">
                    <span className="text-[var(--color-accent-primary)] mt-0.5">•</span>
                    <span className="leading-snug">{ev}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-[var(--color-text-muted)] uppercase">Derived From</h4>
              <div className="flex flex-wrap gap-2">
                {data.sources.map((src, i) => (
                  <div key={i} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--color-surface)] border border-[var(--color-border-default)] text-xs text-[var(--color-text-secondary)]">
                    <FileText className="w-3 h-3 text-[var(--color-text-muted)]" />
                    {src}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Section B — Slide Draft Generator */}
      <div className="p-6 flex-1 flex flex-col bg-[#0f1117]">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-4">
          Board-Ready Output
        </h2>

        {!slideReady && !isGenerating && (
          <div className="flex-1 flex items-center justify-center">
            <Button 
              onClick={generateSlide} 
              className="w-full max-w-[200px]"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Generate Slide
            </Button>
          </div>
        )}

        {isGenerating && (
          <div className="flex-1 flex flex-col items-center justify-center space-y-4">
            <Loader2 className="w-6 h-6 text-[var(--color-accent-primary)] animate-spin" />
            <p className="text-sm text-[var(--color-text-muted)] animate-pulse">Drafting strategy layout...</p>
          </div>
        )}

        {slideReady && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col"
          >
            <Card className="flex-1 p-6 bg-white flex flex-col relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-[#1e293b]" />
              
              <h1 className="text-[#0f172a] text-xl font-bold leading-tight mb-6 mt-2 tracking-tight">
                EU Revenue Decline Is Most Likely Driven by Pricing Fragmentation
              </h1>

              <div className="space-y-3 mb-8">
                <div className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] mt-2 shrink-0" />
                  <p className="text-sm text-[#334155] leading-relaxed font-medium">Pricing varies too widely across target regions, creating operational friction.</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] mt-2 shrink-0" />
                  <p className="text-sm text-[#334155] leading-relaxed font-medium">Mid-market conversion is weakest where packaging is inconsistent.</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] mt-2 shrink-0" />
                  <p className="text-sm text-[#334155] leading-relaxed font-medium">Current structure limits expansion scalability in target markets.</p>
                </div>
              </div>

              <div className="mt-auto bg-[#f8fafc] rounded-lg p-4 border border-[#e2e8f0]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#64748b] mb-2">Recommendation</h4>
                <p className="text-sm text-[#0f172a] font-medium leading-relaxed">
                  Standardize pricing architecture before rolling out expansion into 2 priority EU markets.
                </p>
              </div>
            </Card>
            
            <div className="mt-4 flex justify-between items-center px-1">
              <span className="text-xs text-[var(--color-text-muted)]">Draft 1 generated via logic chain</span>
              <Button variant="secondary" className="h-8 px-3 text-xs">
                Export to Deck
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
