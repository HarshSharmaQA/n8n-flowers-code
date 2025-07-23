import { useState, useMemo } from 'react';
import { WorkflowFile } from '../services/githubService';

export const useWorkflowFilters = (workflows: WorkflowFile[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTrigger, setSelectedTrigger] = useState('All Types');
  const [selectedComplexity, setSelectedComplexity] = useState('All Levels');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [activeOnly, setActiveOnly] = useState(false);

  const filteredWorkflows = useMemo(() => {
    return workflows.filter(workflow => {
      // Search filter
      const searchMatch = searchTerm === '' || 
        workflow.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        workflow.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        workflow.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        workflow.integrations.some(integration => 
          integration.toLowerCase().includes(searchTerm.toLowerCase())
        );

      // Trigger filter
      const triggerMatch = selectedTrigger === 'All Types' || 
        workflow.trigger === selectedTrigger;

      // Complexity filter
      const complexityMatch = selectedComplexity === 'All Levels' || 
        workflow.complexity === selectedComplexity;

      // Category filter
      const categoryMatch = selectedCategory === 'All Categories' || 
        workflow.category === selectedCategory;

      // Active filter
      const activeMatch = !activeOnly || workflow.isActive;

      return searchMatch && triggerMatch && complexityMatch && categoryMatch && activeMatch;
    });
  }, [workflows, searchTerm, selectedTrigger, selectedComplexity, selectedCategory, activeOnly]);

  return {
    searchTerm,
    setSearchTerm,
    selectedTrigger,
    setSelectedTrigger,
    selectedComplexity,
    setSelectedComplexity,
    selectedCategory,
    setSelectedCategory,
    activeOnly,
    setActiveOnly,
    filteredWorkflows
  };
};