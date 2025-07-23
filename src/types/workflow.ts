export interface Workflow {
  id: string;
  title: string;
  description: string;
  nodes: number;
  status: 'active' | 'inactive';
  trigger: 'Manual' | 'Webhook' | 'Schedule' | 'Database';
  complexity: 'Manual' | 'Complex' | 'Scheduled';
  category: string;
  integrations: string[];
  isActive: boolean;
}

export interface WorkflowStats {
  total: number;
  active: number;
  totalNodes: number;
  integrations: number;
}