import { create } from 'zustand';
import { Node, Edge } from '@xyflow/react';

export type AppStatus = 'idle' | 'analyzing' | 'ready' | 'generating-slide' | 'slide-ready';

export type NodeType = 'goal' | 'problem' | 'hypothesis' | 'insight' | 'recommendation';

export interface ConsultingNodeData extends Record<string, unknown> {
  label: string;
  type: NodeType;
  summary: string;
  evidence: string[];
  sources: string[];
}

export type ConsultingNode = Node<ConsultingNodeData>;

interface AppState {
  appStatus: AppStatus;
  rawInput: string;
  setRawInput: (input: string) => void;
  analyzeNotes: () => Promise<void>;
  generateSlide: () => Promise<void>;

  nodes: ConsultingNode[];
  edges: Edge[];
  selectedNodeId: string | null;
  setSelectedNodeId: (id: string | null) => void;
}

const mockNotes = `Client wants expansion into 2 new European markets
Revenue in EU down 18 percent YoY
Teams think pricing may be too inconsistent across regions
Customer churn highest in mid-market accounts
Leadership wants board-ready strategy recommendations in 2 weeks
Internal data fragmented across finance, sales, and ops
Need clear hypotheses, workstreams, and recommendation path`;

export const initialNodes: ConsultingNode[] = [
  {
    id: 'goal-1',
    position: { x: 250, y: 50 },
    data: {
      label: 'Expand into new EU markets',
      type: 'goal',
      summary: 'The executive mandate to enter two net-new European territories by end of year.',
      evidence: ['Leadership brief: "2 new European markets"'],
      sources: ['Project briefing notes']
    },
    type: 'consultingNode'
  },
  {
    id: 'problem-1',
    position: { x: 50, y: 150 },
    data: {
      label: 'Revenue decline in EU',
      type: 'problem',
      summary: 'Current EU operations are seeing significant contraction, complicating new market entry.',
      evidence: ['Revenue in EU down 18 percent YoY'],
      sources: ['Financial summary']
    },
    type: 'consultingNode'
  },
  {
    id: 'problem-2',
    position: { x: 450, y: 150 },
    data: {
      label: 'Mid-market churn concentration',
      type: 'problem',
      summary: 'Mid-sized accounts are actively churning at a higher rate than enterprise.',
      evidence: ['Customer churn highest in mid-market accounts'],
      sources: ['Sales operations data']
    },
    type: 'consultingNode'
  },
  {
    id: 'hypothesis-1',
    position: { x: 250, y: 250 },
    data: {
      label: 'Pricing inconsistency hurting conversion',
      type: 'hypothesis',
      summary: 'Variance in regional pricing models creates friction in mid-market segments.',
      evidence: ['Teams think pricing may be too inconsistent across regions'],
      sources: ['Team interview summaries']
    },
    type: 'consultingNode'
  },
  {
    id: 'insight-1',
    position: { x: 250, y: 350 },
    data: {
      label: 'Margin leakage across regions',
      type: 'insight',
      summary: 'Lack of unified pricing allows discounting that erodes regional margins.',
      evidence: ['Internal data fragmented across finance, sales, and ops'],
      sources: ['Ops audit']
    },
    type: 'consultingNode'
  },
  {
    id: 'rec-1',
    position: { x: 250, y: 450 },
    data: {
      label: 'Standardize pricing architecture',
      type: 'recommendation',
      summary: 'Must harmonize pricing before EU expansion to ensure scalable economics.',
      evidence: ['Need clear hypotheses, workstreams, and recommendation path'],
      sources: ['Engagement mandate']
    },
    type: 'consultingNode'
  }
];

export const initialEdges: Edge[] = [
  { id: 'e-g1-p1', source: 'goal-1', target: 'problem-1', animated: true, style: { stroke: '#232938' } },
  { id: 'e-g1-p2', source: 'goal-1', target: 'problem-2', animated: true, style: { stroke: '#232938' } },
  { id: 'e-p1-h1', source: 'problem-1', target: 'hypothesis-1', style: { stroke: '#232938' } },
  { id: 'e-p2-h1', source: 'problem-2', target: 'hypothesis-1', style: { stroke: '#232938' } },
  { id: 'e-h1-i1', source: 'hypothesis-1', target: 'insight-1', style: { stroke: '#232938' } },
  { id: 'e-i1-r1', source: 'insight-1', target: 'rec-1', style: { stroke: '#232938', strokeWidth: 2 } },
];


export const useAppStore = create<AppState>((set, get) => ({
  appStatus: 'idle',
  rawInput: mockNotes,
  setRawInput: (input) => set({ rawInput: input }),
  
  nodes: [],
  edges: [],
  selectedNodeId: null,
  setSelectedNodeId: (id) => set({ selectedNodeId: id }),

  analyzeNotes: async () => {
    set({ appStatus: 'analyzing', selectedNodeId: null, nodes: [], edges: [] });
    // Fake delay
    await new Promise((resolve) => setTimeout(resolve, 2500));
    set({
      appStatus: 'ready',
      nodes: initialNodes,
      edges: initialEdges,
      selectedNodeId: 'hypothesis-1' // Automatically select one to show UI
    });
  },

  generateSlide: async () => {
    set({ appStatus: 'generating-slide' });
    await new Promise((resolve) => setTimeout(resolve, 1500));
    set({ appStatus: 'slide-ready' });
  }
}));
