"use client";

import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { motion } from 'framer-motion';
import { Badge } from './ui';
import { ConsultingNode } from '@/store';
import { useAppStore } from '@/store';

export function CustomNode({ id, data, selected }: NodeProps<ConsultingNode>) {
  const { setSelectedNodeId } = useAppStore();

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`relative min-w-[220px] max-w-[280px] rounded-xl border p-4 bg-[var(--color-surface)] shadow-lg transition-all duration-200 cursor-pointer ${
        selected 
          ? 'border-[var(--color-accent-primary)] ring-1 ring-[var(--color-accent-primary)] shadow-[var(--color-accent-soft)]' 
          : 'border-[var(--color-border-default)] hover:border-[var(--color-border-subtle)] hover:shadow-xl'
      }`}
      onClick={() => setSelectedNodeId(id)}
    >
      <Handle type="target" position={Position.Top} className="w-2 h-2 !bg-[var(--color-border-default)] border-none" />
      
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-start gap-2">
          <Badge variant={data.type}>{data.type}</Badge>
        </div>
        
        <div>
          <h3 className="text-sm font-semibold text-[var(--color-text-primary)] leading-tight">
            {data.label}
          </h3>
          <p className="mt-1 text-xs text-[var(--color-text-muted)] line-clamp-2">
            {data.summary}
          </p>
        </div>
      </div>

      <Handle type="source" position={Position.Bottom} className="w-2 h-2 !bg-[var(--color-border-default)] border-none" />
    </motion.div>
  );
}
