import React from 'react';
import { X, Download, Eye, BarChart3 } from 'lucide-react';
import { Workflow } from '../types/workflow';

interface WorkflowModalProps {
  workflow: Workflow | null;
  isOpen: boolean;
  onClose: () => void;
}

export const WorkflowModal: React.FC<WorkflowModalProps> = ({ workflow, isOpen, onClose }) => {
  if (!isOpen || !workflow) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">{workflow.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Description */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
              DESCRIPTION
            </h3>
            <p className="text-gray-900">{workflow.description}</p>
          </div>

          {/* Statistics */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
              STATISTICS
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="font-medium">Status:</span>
                <span className="ml-2 capitalize">{workflow.status}</span>
              </div>
              <div>
                <span className="font-medium">Trigger:</span>
                <span className="ml-2">{workflow.trigger}</span>
              </div>
              <div>
                <span className="font-medium">Complexity:</span>
                <span className="ml-2">{workflow.complexity.toLowerCase()}</span>
              </div>
              <div>
                <span className="font-medium">Nodes:</span>
                <span className="ml-2">{workflow.nodes}</span>
              </div>
            </div>
          </div>

          {/* Category */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
              CATEGORY
            </h3>
            <p className="text-gray-900">{workflow.category}</p>
          </div>

          {/* Integrations */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
              INTEGRATIONS
            </h3>
            <div className="flex flex-wrap gap-2">
              {workflow.integrations.map((integration, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm"
                >
                  {integration}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
              ACTIONS
            </h3>
            <div className="flex flex-wrap gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                <Download className="w-4 h-4" />
                Download JSON
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                <Eye className="w-4 h-4" />
                View JSON
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                <BarChart3 className="w-4 h-4" />
                View Diagram
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};