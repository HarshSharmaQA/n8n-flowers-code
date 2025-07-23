import React from 'react';
import { Activity, Database, Zap, GitBranch } from 'lucide-react';

interface QuickStatsProps {
  total: number;
  loading?: boolean;
}

export const QuickStats: React.FC<QuickStatsProps> = ({ total, loading = false }) => {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Database className="w-5 h-5 text-blue-600" />
          <span className="font-medium text-blue-900">
            {loading ? 'Loading...' : `${total.toLocaleString()} workflows available`}
          </span>
        </div>
        <div className="text-sm text-blue-700">
          From HarshSharmaQA/n8n
        </div>
      </div>
    </div>
  );
};