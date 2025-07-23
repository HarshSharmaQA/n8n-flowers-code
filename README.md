# N8N Workflow Documentation Clone

A comprehensive workflow browser application that fetches and displays N8N workflows from GitHub with advanced search, filtering, and JSON viewing capabilities.

## Features

- 🚀 **Real GitHub Integration**: Fetches workflows from [HarshSharmaQA/n8n](https://github.com/HarshSharmaQA/n8n) repository
- 🔍 **Advanced Search**: Instant search across workflow names, descriptions, and integrations
- 🎛️ **Multi-level Filtering**: Filter by trigger type, complexity, category, and status
- 📊 **Dynamic Statistics**: Real-time stats calculated from GitHub data
- 📱 **Responsive Design**: Optimized for all screen sizes
- ⚡ **Performance Optimized**: Pagination and lazy loading for fast performance
- 💾 **Download Functionality**: One-click download of workflow JSON files
- 👁️ **JSON Viewer**: Professional code viewer with syntax highlighting and search
- 🎨 **Modern UI/UX**: Clean, professional design with hover effects and animations

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **API**: GitHub REST API
- **HTTP Client**: Axios

## Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd n8n-workflow-documentation
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── components/          # React components
│   ├── EnhancedWorkflowCard.tsx
│   ├── EnhancedWorkflowModal.tsx
│   ├── ErrorMessage.tsx
│   ├── Header.tsx
│   ├── JsonViewer.tsx
│   ├── LoadingSpinner.tsx
│   ├── LoadMoreButton.tsx
│   ├── QuickStats.tsx
│   ├── SearchAndFilters.tsx
│   ├── WorkflowCard.tsx
│   ├── WorkflowGrid.tsx
│   ├── WorkflowModal.tsx
│   └── WorkflowStats.tsx
├── data/               # Mock data and constants
│   └── mockData.ts
├── hooks/              # Custom React hooks
│   ├── useGitHubWorkflows.ts
│   └── useWorkflowFilters.ts
├── services/           # API services
│   └── githubService.ts
├── types/              # TypeScript type definitions
│   └── workflow.ts
├── App.tsx             # Main application component
├── index.css           # Global styles
└── main.tsx            # Application entry point
```

## Key Components

### GitHubService
- Fetches workflow files from GitHub API
- Parses JSON content and extracts metadata
- Implements caching and pagination
- Handles error recovery and timeouts

### Workflow Components
- **EnhancedWorkflowCard**: Interactive workflow cards with quick actions
- **EnhancedWorkflowModal**: Detailed workflow information modal
- **JsonViewer**: Professional JSON viewer with search and copy functionality

### Performance Features
- Pagination (12 items per page)
- Lazy loading with "Load More" button
- Request batching and caching
- Concurrent request limiting

## Configuration

The application is configured to fetch from:
- **Repository**: HarshSharmaQA/n8n
- **Path**: / (root directory)
- **Items per page**: 12
- **Max concurrent requests**: 3

## API Usage

The application uses the GitHub REST API without authentication, which provides:
- 60 requests per hour per IP address
- Access to public repository contents
- File metadata and download URLs

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Adding New Features

1. **New Components**: Add to `src/components/`
2. **New Hooks**: Add to `src/hooks/`
3. **New Services**: Add to `src/services/`
4. **New Types**: Add to `src/types/`

## Deployment

The application can be deployed to any static hosting service:

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your hosting service

### Recommended Hosting Services
- Vercel
- Netlify
- GitHub Pages
- Railway
- Surge

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
1. Check the GitHub Issues
2. Create a new issue with detailed description
3. Include browser console errors if applicable

---

Built with ❤️ using React, TypeScript, and Tailwind CSS