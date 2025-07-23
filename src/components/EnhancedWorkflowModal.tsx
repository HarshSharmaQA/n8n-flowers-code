import React from 'react';
import { X, Download, Eye, BarChart3, ExternalLink, FileText, Calendar, HardDrive, Zap } from 'lucide-react';
import { WorkflowFile } from '../services/githubService';

interface EnhancedWorkflowModalProps {
  workflow: WorkflowFile | null;
  isOpen: boolean;
  onClose: () => void;
  onDownload: (workflow: WorkflowFile) => void;
  onViewJson: (workflow: WorkflowFile) => void;
}

export const EnhancedWorkflowModal: React.FC<EnhancedWorkflowModalProps> = ({
  workflow,
  isOpen,
  onClose,
  onDownload,
  onViewJson
}) => {
  if (!isOpen || !workflow) return null;

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const getStatusBadge = (status: string) => {
    const isActive = status === 'active';
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}>
        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
          isActive ? 'bg-green-400' : 'bg-red-400'
        }`}></span>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{workflow.title}</h2>
            <div className="flex items-center gap-3">
              {getStatusBadge(workflow.status)}
              <span className="text-sm text-gray-600 flex items-center gap-1">
                <FileText className="w-4 h-4" />
                {workflow.name}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors p-2 hover:bg-white rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Description */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              DESCRIPTION
            </h3>
            <p className="text-gray-900 leading-relaxed">{workflow.description}</p>
          </div>

          {/* Statistics Grid */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              STATISTICS
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">{workflow.nodes}</div>
                <div className="text-xs text-blue-800 uppercase tracking-wide">Nodes</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">{workflow.integrations.length}</div>
                <div className="text-xs text-green-800 uppercase tracking-wide">Integrations</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-purple-600 mb-1">{formatFileSize(workflow.fileSize)}</div>
                <div className="text-xs text-purple-800 uppercase tracking-wide">File Size</div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-orange-600 mb-1">{workflow.trigger}</div>
                <div className="text-xs text-orange-800 uppercase tracking-wide">Trigger</div>
              </div>
            </div>
          </div>

          {/* Workflow Details */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                WORKFLOW DETAILS
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Complexity:</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    workflow.complexity === 'Complex' ? 'bg-purple-100 text-purple-800' :
                    workflow.complexity === 'Scheduled' ? 'bg-green-100 text-green-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {workflow.complexity}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Category:</span>
                  <span className="text-gray-900">{workflow.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Active:</span>
                  <span className={`font-medium ${workflow.isActive ? 'text-green-600' : 'text-red-600'}`}>
                    {workflow.isActive ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                FILE INFORMATION
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">File Name:</span>
                  <span className="text-gray-900 font-mono text-sm">{workflow.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Size:</span>
                  <span className="text-gray-900">{formatFileSize(workflow.fileSize)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Source:</span>
                  <a 
                    href={`https://github.com/HarshSharmaQA/n8n/blob/main/${workflow.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm"
                  >
                    GitHub <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Integrations */}
          {workflow.integrations.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                INTEGRATIONS ({workflow.integrations.length})
              </h3>
              <div className="flex flex-wrap gap-2">
                {workflow.integrations.map((integration, index) => (
                  <span
                    key={index}
                    className="px-3 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-lg text-sm font-medium border border-blue-200 hover:from-blue-100 hover:to-indigo-100 transition-colors"
                  >
                    {integration}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
              ACTIONS
            </h3>
            <div className="flex flex-wrap gap-3">
              <button 
                onClick={() => onDownload(workflow)}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors shadow-sm"
              >
                <Download className="w-4 h-4" />
                Download JSON
              </button>
              <button 
                onClick={() => onViewJson(workflow)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors shadow-sm"
              >
                <Eye className="w-4 h-4" />
                View JSON
              </button>
              <a
                href={`https://github.com/HarshSharmaQA/n8n/blob/main/${workflow.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors shadow-sm"
              >
                <ExternalLink className="w-4 h-4" />
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};