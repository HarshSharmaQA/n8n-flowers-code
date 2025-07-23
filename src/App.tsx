import React, { useState } from 'react';
import { Zap } from 'lucide-react';
import { SearchAndFilters } from './components/SearchAndFilters';
import { EnhancedWorkflowCard } from './components/EnhancedWorkflowCard';
import { EnhancedWorkflowModal } from './components/EnhancedWorkflowModal';
import { JsonViewer } from './components/JsonViewer';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { WorkflowStats } from './components/WorkflowStats';
import { LoadMoreButton } from './components/LoadMoreButton';
import { QuickStats } from './components/QuickStats';
import { useWorkflowFilters } from './hooks/useWorkflowFilters';
import { useGitHubWorkflows } from './hooks/useGitHubWorkflows';
import { WorkflowFile } from './services/githubService';
import { 
  categories, 
  triggerTypes, 
  complexityLevels 
} from './data/mockData';

function App() {
  const [selectedWorkflow, setSelectedWorkflow] = useState<WorkflowFile | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jsonViewerOpen, setJsonViewerOpen] = useState(false);
  const [jsonViewerWorkflow, setJsonViewerWorkflow] = useState<WorkflowFile | null>(null);

  const { 
    workflows, 
    totalCount,
    hasMore,
    loading, 
    loadingMore,
    error, 
    retry, 
    loadMore,
    downloadWorkflow, 
    stats 
  } = useGitHubWorkflows();

  const {
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
  } = useWorkflowFilters(workflows);

  const handleWorkflowClick = (workflow: WorkflowFile) => {
    setSelectedWorkflow(workflow);
    setIsModalOpen(true);
  };

  const handleDownload = (workflow: WorkflowFile) => {
    downloadWorkflow(workflow);
  };

  const handleViewJson = (workflow: WorkflowFile) => {
    setJsonViewerWorkflow(workflow);
    setJsonViewerOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedWorkflow(null);
  };

  const handleCloseJsonViewer = () => {
    setJsonViewerOpen(false);
    setJsonViewerWorkflow(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Zap className="w-8 h-8 text-orange-500" />
            <h1 className="text-4xl font-bold text-blue-600">N8N Workflow Browser</h1>
          </div>
          <p className="text-gray-600 text-lg mb-12">Browse and download N8N workflows from GitHub repository</p>
          
          <WorkflowStats 
            total={stats.total}
            active={stats.active}
            totalNodes={stats.totalNodes}
            integrations={stats.integrations}
            loading={loading}
          />
        </div>
      </div>
      
      <SearchAndFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedTrigger={selectedTrigger}
        setSelectedTrigger={setSelectedTrigger}
        selectedComplexity={selectedComplexity}
        setSelectedComplexity={setSelectedComplexity}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        activeOnly={activeOnly}
        setActiveOnly={setActiveOnly}
        triggerTypes={triggerTypes}
        complexityLevels={complexityLevels}
        categories={categories}
      />

      {/* Main Content */}
      <div className="bg-white py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <QuickStats total={totalCount} loading={loading} />
          
          {loading && <LoadingSpinner />}
          
          {error && (
            <ErrorMessage 
              message={error} 
              onRetry={retry}
            />
          )}
          
          {!loading && !error && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredWorkflows.map((workflow) => (
                  <EnhancedWorkflowCard
                    key={workflow.id}
                    workflow={workflow}
                    onCardClick={handleWorkflowClick}
                    onDownload={handleDownload}
                    onViewJson={handleViewJson}
                  />
                ))}
              </div>

              {filteredWorkflows.length === 0 && workflows.length > 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No workflows found matching your criteria.</p>
                </div>
              )}
              
              {/* Load More Button - only show if no filters are applied */}
              {searchTerm === '' && 
               selectedTrigger === 'All Types' && 
               selectedComplexity === 'All Levels' && 
               selectedCategory === 'All Categories' && 
               !activeOnly && (
                <LoadMoreButton
                  onLoadMore={loadMore}
                  loading={loadingMore}
                  hasMore={hasMore}
                  currentCount={workflows.length}
                  totalCount={totalCount}
                />
              )}
            </>
          )}
        </div>
      </div>
      
      <EnhancedWorkflowModal
        workflow={selectedWorkflow}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onDownload={handleDownload}
        onViewJson={handleViewJson}
      />

      <JsonViewer
        jsonData={jsonViewerWorkflow?.jsonContent}
        title={jsonViewerWorkflow?.title || ''}
        isOpen={jsonViewerOpen}
        onClose={handleCloseJsonViewer}
        onDownload={() => jsonViewerWorkflow && handleDownload(jsonViewerWorkflow)}
      />
    </div>
  );
}

export default App;