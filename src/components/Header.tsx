import React from 'react';
import { Zap } from 'lucide-react';
import { WorkflowStats } from '../types/workflow';

interface HeaderProps {
  stats: WorkflowStats;
}

export const Header: React.FC<HeaderProps> = ({ stats }) => {
  return (
    <div className="bg-white py-12 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Zap className="w-8 h-8 text-orange-500" />
          <h1 className="text-4xl font-bold text-blue-600">N8N Workflow Documentation</h1>
        </div>
        <p className="text-gray-600 text-lg mb-12">Lightning-fast workflow browser with instant search</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-500 mb-2">
              {stats.total.toLocaleString()}
            </div>
            <div className="text-gray-500 text-sm uppercase tracking-wider">TOTAL</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-500 mb-2">
              {stats.active}
            </div>
            <div className="text-gray-500 text-sm uppercase tracking-wider">ACTIVE</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-500 mb-2">
              {stats.totalNodes.toLocaleString()}
            </div>
            <div className="text-gray-500 text-sm uppercase tracking-wider">TOTAL NODES</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-500 mb-2">
              {stats.integrations}
            </div>
            <div className="text-gray-500 text-sm uppercase tracking-wider">INTEGRATIONS</div>
          </div>
        </div>
      </div>
    </div>
  );
};