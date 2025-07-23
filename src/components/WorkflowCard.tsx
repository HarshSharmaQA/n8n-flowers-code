import React from 'react';
import { Workflow } from '../types/workflow';

interface WorkflowCardProps {
  workflow: Workflow;
  onCardClick: (workflow: Workflow) => void;
}

export const WorkflowCard: React.FC<WorkflowCardProps> = ({ workflow, onCardClick }) => {
  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Manual': return 'bg-blue-500';
      case 'Complex': return 'bg-blue-600';
      case 'Scheduled': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-500' : 'bg-red-500';
  };

  return (
    <div 
      className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => onCardClick(workflow)}
    >
      {/* Header with status indicators and node count */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${getStatusColor(workflow.status)}`}></div>
          <div className={`w-3 h-3 rounded-full ${workflow.isActive ? 'bg-green-500' : 'bg-gray-300'}`}></div>
          <span className="text-gray-600 text-sm">{workflow.nodes} nodes</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
            {workflow.category}
          </span>
          <span className={`text-xs px-2 py-1 text-white rounded ${getComplexityColor(workflow.complexity)}`}>
            {workflow.complexity}
          </span>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
        {workflow.title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
        {workflow.description}
      </p>

      {/* Integrations */}
      {workflow.integrations.length > 0 && (
        <div>
          <div className="text-xs text-gray-500 mb-2">
            Integrations ({workflow.integrations.length})
          </div>
          <div className="flex flex-wrap gap-2">
            {workflow.integrations.slice(0, 4).map((integration, index) => (
              <span
                key={index}
                className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded border"
              >
                {integration}
              </span>
            ))}
            {workflow.integrations.length > 4 && (
              <span className="text-xs px-2 py-1 bg-gray-50 text-gray-600 rounded border">
                +{workflow.integrations.length - 4} more
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};