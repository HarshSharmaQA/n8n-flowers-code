import React from 'react';
import { WorkflowCard } from './WorkflowCard';
import { Workflow } from '../types/workflow';

interface WorkflowGridProps {
  workflows: Workflow[];
  onWorkflowClick: (workflow: Workflow) => void;
}

export const WorkflowGrid: React.FC<WorkflowGridProps> = ({ workflows, onWorkflowClick }) => {
  return (
    <div className="bg-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <p className="text-gray-600">{workflows.length.toLocaleString()} workflows</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workflows.map((workflow) => (
            <WorkflowCard
              key={workflow.id}
              workflow={workflow}
              onCardClick={onWorkflowClick}
            />
          ))}
        </div>

        {workflows.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No workflows found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};