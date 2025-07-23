import { Workflow, WorkflowStats } from '../types/workflow';

export const workflowStats: WorkflowStats = {
  total: 2055,
  active: 215,
  totalNodes: 29518,
  integrations: 365
};

export const mockWorkflows: Workflow[] = [
  {
    id: '1',
    title: 'A workflow with the Twilio node',
    description: 'Manual workflow that integrates with Twilio for data processing. Uses 2 nodes.',
    nodes: 2,
    status: 'inactive',
    trigger: 'Manual',
    complexity: 'Manual',
    category: 'Communication & Messaging',
    integrations: ['Twilio'],
    isActive: false
  },
  {
    id: '2',
    title: 'Wait Limit Import Webhook',
    description: 'Manual workflow that orchestrates Splitbatches, Httprequest, and Splitout for data processing. Uses 17 nodes.',
    nodes: 17,
    status: 'inactive',
    trigger: 'Manual',
    complexity: 'Manual',
    category: 'Uncategorized',
    integrations: ['Splitbatches', 'Httprequest', 'Splitout'],
    isActive: false
  },
  {
    id: '3',
    title: 'Colombian Invoices Processing',
    description: 'Complex multi-step automation that orchestrates Outputparserstructured, Agent, and Google Drive for data processing. Uses 23 nodes and integrates with 11 services.',
    nodes: 23,
    status: 'active',
    trigger: 'Manual',
    complexity: 'Complex',
    category: 'Uncategorized',
    integrations: ['Outputparserstructured', 'Agent', 'Google Drive', 'Extractfromfile', 'OpenAI', '+6'],
    isActive: true
  },
  {
    id: '4',
    title: 'BambooHR AI-Powered Company Policies and Benefits Chatbot',
    description: 'Complex multi-step automation that orchestrates Outputparserstructured, Textclassifier, and Memorybufferwindow for data processing.',
    nodes: 50,
    status: 'active',
    trigger: 'Webhook',
    complexity: 'Complex',
    category: 'Uncategorized',
    integrations: ['BambooHR', 'OpenAI', 'Pinecone', 'Textclassifier'],
    isActive: true
  },
  {
    id: '5',
    title: 'Splitout Code Automation Webhook',
    description: 'Complex multi-step automation that orchestrates Splitbatches, Documentdefaultdataloader, and Httprequest.',
    nodes: 42,
    status: 'active',
    trigger: 'Webhook',
    complexity: 'Complex',
    category: 'Uncategorized',
    integrations: ['Splitout', 'Webhook', 'Httprequest'],
    isActive: true
  },
  {
    id: '6',
    title: 'HTTP Timescaledb Automation Scheduled',
    description: 'Scheduled automation that connects Httprequest and Cal.com for data processing. Uses 4 nodes.',
    nodes: 4,
    status: 'active',
    trigger: 'Schedule',
    complexity: 'Scheduled',
    category: 'Web Scraping & Data Extraction',
    integrations: ['HTTP', 'TimescaleDB', 'Cal.com'],
    isActive: true
  },
  {
    id: '7',
    title: 'Slack Notification System',
    description: 'Simple workflow that sends notifications to Slack channels based on webhook triggers.',
    nodes: 5,
    status: 'active',
    trigger: 'Webhook',
    complexity: 'Manual',
    category: 'Communication & Messaging',
    integrations: ['Slack', 'Webhook'],
    isActive: true
  },
  {
    id: '8',
    title: 'Database Backup Automation',
    description: 'Scheduled workflow that creates database backups and stores them in cloud storage.',
    nodes: 12,
    status: 'active',
    trigger: 'Schedule',
    complexity: 'Complex',
    category: 'Database Operations',
    integrations: ['PostgreSQL', 'AWS S3', 'Scheduler'],
    isActive: true
  },
  {
    id: '9',
    title: 'Email Marketing Campaign',
    description: 'Complex workflow that manages email campaigns with personalization and analytics tracking.',
    nodes: 28,
    status: 'inactive',
    trigger: 'Manual',
    complexity: 'Complex',
    category: 'Marketing',
    integrations: ['Mailchimp', 'Google Analytics', 'CRM'],
    isActive: false
  },
  {
    id: '10',
    title: 'Social Media Content Scheduler',
    description: 'Automated content scheduling across multiple social media platforms.',
    nodes: 15,
    status: 'active',
    trigger: 'Schedule',
    complexity: 'Scheduled',
    category: 'Social Media',
    integrations: ['Twitter', 'Facebook', 'LinkedIn', 'Buffer'],
    isActive: true
  }
];

export const categories = [
  'All Categories',
  'Communication & Messaging',
  'Uncategorized',
  'Web Scraping & Data Extraction',
  'Database Operations',
  'Marketing',
  'Social Media'
];

export const triggerTypes = [
  'All Types',
  'Manual',
  'Webhook',
  'Schedule',
  'Database'
];

export const complexityLevels = [
  'All Levels',
  'Manual',
  'Complex',
  'Scheduled'
];