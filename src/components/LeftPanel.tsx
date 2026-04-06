"use client";

import React from 'react';
import { useAppStore } from '@/store';
import { Button, Textarea } from './ui';
import { Loader2 } from 'lucide-react';

export function LeftPanel() {
  const { rawInput, setRawInput, analyzeNotes, appStatus } = useAppStore();

  const isAnalyzing = appStatus === 'analyzing';

  return (
    <div className="h-full flex flex-col p-6 bg-[var(--color-app-bg)] border-r border-[var(--color-border-subtle)]">
      <div className="mb-6">
        <h2 className="text-lg font-bold tracking-tight text-[var(--color-text-primary)]">
          Raw Engagement Input
        </h2>
        <p className="text-sm text-[var(--color-text-muted)] mt-1">
          Paste client notes, interview summaries, or project briefings
        </p>
      </div>

      <div className="flex-1 flex flex-col min-h-0 mb-6 relative">
        <Textarea 
          value={rawInput}
          onChange={(e) => setRawInput(e.target.value)}
          className="flex-1 h-full w-full bg-[var(--color-surface)] border-[var(--color-border-default)] p-4 font-mono text-sm leading-relaxed"
          disabled={isAnalyzing}
          spellCheck={false}
        />
        
        {isAnalyzing && (
          <div className="absolute inset-0 bg-[var(--color-surface)]/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-md border border-[var(--color-border-default)]">
            <Loader2 className="w-8 h-8 text-[var(--color-accent-primary)] animate-spin mb-4" />
            <div className="space-y-2 text-center">
              <p className="text-sm font-medium text-[var(--color-text-primary)] animate-pulse">Extracting objectives...</p>
              <p className="text-xs text-[var(--color-text-muted)] animate-pulse" style={{ animationDelay: '0.5s' }}>Identifying hypotheses...</p>
              <p className="text-xs text-[var(--color-text-muted)] animate-pulse" style={{ animationDelay: '1s' }}>Building engagement graph...</p>
            </div>
          </div>
        )}
      </div>

      <Button 
        onClick={analyzeNotes} 
        disabled={isAnalyzing || rawInput.trim() === ''}
        className="w-full shadow-md"
      >
        {isAnalyzing ? 'Analyzing...' : 'Analyze Notes'}
      </Button>
    </div>
  );
}
