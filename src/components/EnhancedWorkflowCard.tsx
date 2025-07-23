import React from 'react';
import { Download, Eye, FileText, Calendar, HardDrive } from 'lucide-react';
import { WorkflowFile } from '../services/githubService';

interface EnhancedWorkflowCardProps {
  workflow: WorkflowFile;
  onCardClick: (workflow: WorkflowFile) => void;
  onDownload: (workflow: WorkflowFile) => void;
  onViewJson: (workflow: WorkflowFile) => void;
}

export const EnhancedWorkflowCard: React.FC<EnhancedWorkflowCardProps> = ({
  workflow,
  onCardClick,
  onDownload,
  onViewJson
}) => {
  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Manual': return 'bg-blue-500';
      case 'Complex': return 'bg-purple-600';
      case 'Scheduled': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-500' : 'bg-red-500';
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDownload(workflow);
  };

  const handleViewJson = (e: React.MouseEvent) => {
    e.stopPropagation();
    onViewJson(workflow);
  };

  return (
    <div 
      className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 cursor-pointer group hover:border-blue-300"
      onClick={() => onCardClick(workflow)}
    >
      {/* Header with status indicators and actions */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${getStatusColor(workflow.status)}`}></div>
          <div className={`w-3 h-3 rounded-full ${workflow.isActive ? 'bg-green-500' : 'bg-gray-300'}`}></div>
          <span className="text-gray-600 text-sm font-medium">{workflow.nodes} nodes</span>
        </div>
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleViewJson}
            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
            title="View JSON"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={handleDownload}
            className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded transition-colors"
            title="Download JSON"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
        {workflow.title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
        {workflow.description}
      </p>

      {/* Metadata */}
      <div className="flex items-center gap-4 mb-4 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <FileText className="w-3 h-3" />
          <span>{workflow.name}</span>
        </div>
        <div className="flex items-center gap-1">
          <HardDrive className="w-3 h-3" />
          <span>{formatFileSize(workflow.fileSize)}</span>
        </div>
      </div>

      {/* Tags */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
            {workflow.category}
          </span>
          <span className={`text-xs px-2 py-1 text-white rounded ${getComplexityColor(workflow.complexity)}`}>
            {workflow.complexity}
          </span>
          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
            {workflow.trigger}
          </span>
        </div>
      </div>

      {/* Integrations */}
      {workflow.integrations.length > 0 && (
        <div>
          <div className="text-xs text-gray-500 mb-2 font-medium">
            Integrations ({workflow.integrations.length})
          </div>
          <div className="flex flex-wrap gap-2">
            {workflow.integrations.slice(0, 4).map((integration, index) => (
              <span
                key={index}
                className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded border border-blue-200"
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