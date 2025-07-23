import axios from 'axios';

const GITHUB_API_BASE = 'https://api.github.com';
const REPO_OWNER = 'HarshSharmaQA';
const REPO_NAME = 'n8n';
const WORKFLOWS_PATH = '';
const ITEMS_PER_PAGE = 12;
const MAX_CONCURRENT_REQUESTS = 3;

export interface GitHubFile {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: string;
}

export interface WorkflowFile {
  id: string;
  name: string;
  title: string;
  description: string;
  nodes: number;
  status: 'active' | 'inactive';
  trigger: string;
  complexity: string;
  category: string;
  integrations: string[];
  isActive: boolean;
  downloadUrl: string;
  jsonContent?: unknown;
  fileSize: number;
  lastModified?: string;
}

class GitHubService {
  private cache = new Map<string, unknown>();
  private fileListCache: GitHubFile[] = [];
  private loadingPromises = new Map<string, Promise<unknown>>();

  async getWorkflowFiles(): Promise<GitHubFile[]> {
    if (this.fileListCache.length > 0) {
      return this.fileListCache;
    }

    try {
      const url = WORKFLOWS_PATH 
        ? `${GITHUB_API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${WORKFLOWS_PATH}`
        : `${GITHUB_API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/contents`;
      
      console.log(`Fetching workflow files from: ${url}`);
      const response = await axios.get(
        url
      );
      
      this.fileListCache = response.data.filter((file: GitHubFile) => 
        file.type === 'file' && file.name.endsWith('.json')
      );
      
      console.log(`Found ${this.fileListCache.length} JSON files`);
      return this.fileListCache;
    } catch (error) {
      console.error('Error fetching workflow files:', error);
      return [];
    }
  }

  async getWorkflowContent(downloadUrl: string): Promise<unknown> {
    if (this.cache.has(downloadUrl)) {
      return this.cache.get(downloadUrl);
    }

    // Prevent duplicate requests
    if (this.loadingPromises.has(downloadUrl)) {
      return this.loadingPromises.get(downloadUrl);
    }

    const promise = this.fetchWorkflowContent(downloadUrl);
    this.loadingPromises.set(downloadUrl, promise);
    
    try {
      const result = await promise;
      this.loadingPromises.delete(downloadUrl);
      return result;
    } catch (error) {
      this.loadingPromises.delete(downloadUrl);
      throw error;
    }
  }

  private async fetchWorkflowContent(downloadUrl: string): Promise<unknown> {
    try {
      console.log(`Fetching workflow content from: ${downloadUrl}`);
      const response = await axios.get(downloadUrl, {
        timeout: 10000 // 10 second timeout
      });
      const content = response.data;
      this.cache.set(downloadUrl, content);
      console.log(`Successfully cached workflow content`);
      return content;
    } catch (error) {
      console.error('Error fetching workflow content from GitHub:', error);
      return null;
    }
  }

  async parseWorkflowFiles(page: number = 1, pageSize: number = ITEMS_PER_PAGE): Promise<{
    workflows: WorkflowFile[];
    totalCount: number;
    hasMore: boolean;
  }> {
    const files = await this.getWorkflowFiles();
    const totalCount = files.length;
    
    // Calculate pagination
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedFiles = files.slice(startIndex, endIndex);
    
    const workflows: WorkflowFile[] = [];

    // Process files in batches to avoid overwhelming the API
    const batches = this.createBatches(paginatedFiles, MAX_CONCURRENT_REQUESTS);
    
    for (const batch of batches) {
      const batchPromises = batch.map(async (file) => {
        try {
          const content = await this.getWorkflowContent(file.download_url);
          if (content) {
            return this.parseWorkflowFromContent(file, content as Record<string, unknown>);
          } else {
            return this.createFallbackWorkflow(file);
          }
        } catch (error) {
          console.error(`Error parsing workflow ${file.name}:`, error);
          return this.createFallbackWorkflow(file);
        }
      });
      
      const batchResults = await Promise.all(batchPromises);
      workflows.push(...batchResults);
    }

    return {
      workflows,
      totalCount,
      hasMore: endIndex < totalCount
    };
  }

  private createBatches<T>(array: T[], batchSize: number): T[][] {
    const batches: T[][] = [];
    for (let i = 0; i < array.length; i += batchSize) {
      batches.push(array.slice(i, i + batchSize));
    }
    return batches;
  }

  async getWorkflowStats(): Promise<{
    total: number;
    active: number;
    totalNodes: number;
    integrations: number;
  }> {
    const files = await this.getWorkflowFiles();
    let active = 0;
    let totalNodes = 0;
    const integrationSet = new Set<string>();

    // Process all files to get exact stats
    for (const file of files) {
      try {
        const content = await this.getWorkflowContent(file.download_url);
        if (content) {
          const nodes = (content as Record<string, unknown>).nodes as unknown[] || [];
          totalNodes += nodes.length;

          // Count active workflows
          // Assuming 'active' status is stored in content.status or content.isActive
          if ((content as Record<string, unknown>).status === 'active' || (content as Record<string, unknown>).isActive === true) {
            active++;
          }

          // Extract integrations
          const integrations = this.extractIntegrations(nodes);
          integrations.forEach(i => integrationSet.add(i));
        }
      } catch {
        // Ignore errors for individual files
      }
    }

    return {
      total: files.length,
      active,
      totalNodes,
      integrations: integrationSet.size
    };
  }

  async searchWorkflows(query: string): Promise<WorkflowFile[]> {
    const files = await this.getWorkflowFiles();
    
    // Filter files by name first for quick results
    const matchingFiles = files.filter(file => 
      file.name.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 20); // Limit search results

    const workflows: WorkflowFile[] = [];

    for (const file of matchingFiles) {
      try {
        const content = await this.getWorkflowContent(file.download_url);
        if (content) {
          const workflow = this.parseWorkflowFromContent(file, content as Record<string, unknown>);
          workflows.push(workflow);
        }
      } catch (error) {
        console.error(`Error parsing workflow ${file.name}:`, error);
        workflows.push(this.createFallbackWorkflow(file));
      }
    }

    return workflows;
  }

  private parseWorkflowFromContent(file: GitHubFile, content: Record<string, unknown>): WorkflowFile {
    const nodes = content.nodes as unknown[] || [];
    const nodeCount = nodes.length;
    
    // Extract integrations from node types
    const integrations = this.extractIntegrations(nodes);
    
    // Determine trigger type
    const trigger = this.determineTrigger(nodes);
    
    // Determine complexity based on node count and connections
    const complexity = this.determineComplexity(nodeCount, content.connections);
    
    // Extract title from filename or sticky notes
    const title = this.extractTitle(file.name, nodes);
    
    // Generate description
    const description = this.generateDescription(nodeCount, integrations);
    
    // Determine category based on integrations
    const category = this.determineCategory(integrations);

    return {
      id: file.sha,
      name: file.name,
      title,
      description,
      nodes: nodeCount,
      status: Math.random() > 0.3 ? 'active' : 'inactive', // Random for demo
      trigger,
      complexity,
      category,
      integrations: integrations.slice(0, 6), // Limit to 6 for display
      isActive: Math.random() > 0.4, // Random for demo
      downloadUrl: file.download_url,
      jsonContent: content,
      fileSize: file.size,
      lastModified: new Date().toISOString() // GitHub API doesn't provide this in contents endpoint
    };
  }

  private createFallbackWorkflow(file: GitHubFile): WorkflowFile {
    const title = file.name.replace('.json', '').replace(/_/g, ' ');
    
    return {
      id: file.sha,
      name: file.name,
      title,
      description: `Workflow file: ${file.name}`,
      nodes: 0,
      status: 'inactive',
      trigger: 'Unknown',
      complexity: 'Manual',
      category: 'Uncategorized',
      integrations: [],
      isActive: false,
      downloadUrl: file.download_url,
      fileSize: file.size
    };
  }

  private extractIntegrations(nodes: unknown[]): string[] {
    const integrations = new Set<string>();
    
    (nodes as Record<string, unknown>[]).forEach(node => {
      if ((node as Record<string, unknown>).type) {
        // Extract service name from node type
        const parts = ((node as Record<string, unknown>).type as string).split('.');
        if (parts.length > 1) {
          const serviceName = parts[parts.length - 1];
          // Clean up common prefixes/suffixes
          const cleanName = serviceName
            .replace(/^n8n-nodes-/, '')
            .replace(/Trigger$/, '')
            .replace(/Node$/, '');
          
          if (cleanName && cleanName !== 'base') {
            integrations.add(this.formatServiceName(cleanName));
          }
        }
      }
    });

    return Array.from(integrations);
  }

  private formatServiceName(name: string): string {
    // Convert camelCase to Title Case
    return name
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  }

  private determineTrigger(nodes: unknown[]): string {
    const triggerNode = (nodes as Record<string, unknown>[]).find(node => 
      ((node as Record<string, unknown>).type as string)?.includes('trigger') || 
      ((node as Record<string, unknown>).type as string)?.includes('Trigger') ||
      ((node as Record<string, unknown>).name as string)?.toLowerCase().includes('trigger')
    );

    if (triggerNode) {
      if (((triggerNode as Record<string, unknown>).type as string)?.includes('webhook')) return 'Webhook';
      if (((triggerNode as Record<string, unknown>).type as string)?.includes('schedule')) return 'Schedule';
      if (((triggerNode as Record<string, unknown>).type as string)?.includes('manual')) return 'Manual';
      if (((triggerNode as Record<string, unknown>).type as string)?.includes('database')) return 'Database';
    }

    return 'Manual';
  }

  private determineComplexity(nodeCount: number, connections: unknown): string {
    if (nodeCount >= 20) return 'Complex';
    if (nodeCount >= 10) return 'Complex';
    if (connections && typeof connections === 'object' && Object.keys(connections as object).length > 5) return 'Complex';
    
    // Check for scheduled workflows
    if (nodeCount > 0) {
      return 'Manual';
    }
    
    return 'Manual';
  }

  private extractTitle(filename: string, nodes: unknown[]): string {
    // First try to find title from sticky notes
    const stickyNote = (nodes as Record<string, unknown>[]).find(node => 
      (node as Record<string, unknown>).type === 'n8n-nodes-base.stickyNote' && 
      (node as Record<string, unknown>).parameters &&
      (node as Record<string, unknown>).parameters &&
      ((node as Record<string, unknown>).parameters as Record<string, unknown>).content
    );

    if (stickyNote) {
      const content = ((stickyNote as Record<string, unknown>).parameters as Record<string, unknown>).content as string;
      // Extract title from markdown heading
      const titleMatch = content.match(/^#\s*(.+)$/m);
      if (titleMatch) {
        return titleMatch[1].trim();
      }
    }

    // Fallback to filename
    return filename
      .replace('.json', '')
      .replace(/_/g, ' ')
      .replace(/^\d+_/, '') // Remove number prefix
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  private generateDescription(nodeCount: number, integrations: string[]): string {
    const complexityDesc = nodeCount > 15 ? 'Complex multi-step automation' : 
                          nodeCount > 5 ? 'Multi-step workflow' : 'Simple workflow';
    const integrationDesc = integrations.length > 0 ? 
      `that integrates with ${integrations.slice(0, 3).join(', ')}` : 
      'for data processing';
    const nodeDesc = `Uses ${nodeCount} node${nodeCount !== 1 ? 's' : ''}`;
    return `${complexityDesc} ${integrationDesc}. ${nodeDesc}.`;
  }

  private determineCategory(integrations: string[]): string {
    const categories = {
      'Communication & Messaging': ['slack', 'discord', 'telegram', 'whatsapp', 'email', 'sms', 'twilio'],
      'Database Operations': ['mysql', 'postgres', 'mongodb', 'redis', 'sqlite', 'database'],
      'Web Scraping & Data Extraction': ['http', 'scraper', 'crawler', 'extract', 'parse'],
      'Marketing': ['mailchimp', 'hubspot', 'salesforce', 'marketing', 'campaign'],
      'Social Media': ['twitter', 'facebook', 'linkedin', 'instagram', 'social'],
      'Cloud Storage': ['google drive', 'dropbox', 'onedrive', 'aws s3', 'storage'],
      'AI & Machine Learning': ['openai', 'gpt', 'ai', 'machine learning', 'nlp']
    };

    const lowerIntegrations = integrations.map(i => i.toLowerCase());
    
    for (const [category, keywords] of Object.entries(categories)) {
      if (keywords.some(keyword => 
        lowerIntegrations.some(integration => integration.includes(keyword))
      )) {
        return category;
      }
    }

    return 'Uncategorized';
  }

  downloadWorkflow(workflow: WorkflowFile): void {
    const blob = new Blob([JSON.stringify(workflow.jsonContent, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = workflow.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}

export const githubService = new GitHubService();