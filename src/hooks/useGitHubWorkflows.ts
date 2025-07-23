import { useState, useEffect } from 'react';
import { githubService, WorkflowFile } from '../services/githubService';

export const useGitHubWorkflows = () => {
  const [workflows, setWorkflows] = useState<WorkflowFile[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    totalNodes: 0,
    integrations: 0
  });

  const loadWorkflows = async (page: number = 1, append: boolean = false) => {
    try {
      if (page === 1) {
        setLoading(true);
        setWorkflows([]);
      } else {
        setLoadingMore(true);
      }
      setError(null);
      
      const { workflows: newWorkflows, totalCount, hasMore: moreAvailable } = 
        await githubService.parseWorkflowFiles(page);
      
      if (append && page > 1) {
        setWorkflows(prev => [...prev, ...newWorkflows]);
      } else {
        setWorkflows(newWorkflows);
      }
      
      setTotalCount(totalCount);
      setHasMore(moreAvailable);
      setCurrentPage(page);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load workflows');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const loadStats = async () => {
    try {
      const statsData = await githubService.getWorkflowStats();
      setStats({
        total: statsData.total,
        active: statsData.active,
        totalNodes: statsData.totalNodes,
        integrations: statsData.integrations
      });
    } catch (err) {
      console.error('Failed to load stats:', err);
    }
  };

  const loadMore = () => {
    if (!loadingMore && hasMore) {
      loadWorkflows(currentPage + 1, true);
    }
  };

  useEffect(() => {
    loadWorkflows();
    loadStats();
  }, []);

  const retry = () => {
    setCurrentPage(1);
    loadWorkflows(1, false);
  };

  const downloadWorkflow = (workflow: WorkflowFile) => {
    githubService.downloadWorkflow(workflow);
  };

  return {
    workflows,
    currentPage,
    totalCount,
    hasMore,
    loading,
    loadingMore,
    error,
    retry,
    loadMore,
    downloadWorkflow,
    stats
  };
};