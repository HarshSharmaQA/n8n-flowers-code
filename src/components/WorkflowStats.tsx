import React from 'react';
import { Activity, Database, Zap, GitBranch } from 'lucide-react';

interface WorkflowStatsProps {
  total: number;
  active: number;
  totalNodes: number;
  integrations: number;
  loading?: boolean;
}

export const WorkflowStats: React.FC<WorkflowStatsProps> = ({
  total,
  active,
  totalNodes,
  integrations,
  loading = false
}) => {
  const stats = [
    {
      icon: Database,
      value: total,
      label: 'TOTAL WORKFLOWS',
      color: 'text-blue-600'
    },
    {
      icon: Activity,
      value: active,
      label: 'ACTIVE',
      color: 'text-green-600'
    },
    {
      icon: Zap,
      value: totalNodes,
      label: 'TOTAL NODES',
      color: 'text-purple-600'
    },
    {
      icon: GitBranch,
      value: integrations,
      label: 'INTEGRATIONS',
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
      {stats.map((stat, index) => (
        <div key={index} className="text-center">
          <div className="flex items-center justify-center mb-3">
            <stat.icon className={`w-8 h-8 ${stat.color}`} />
          </div>
          <div className={`text-3xl font-bold mb-2 ${stat.color} ${loading ? 'animate-pulse' : ''}`}>
            {loading ? '...' : stat.value.toLocaleString()}
          </div>
          <div className="text-gray-500 text-xs uppercase tracking-wider font-medium">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
};