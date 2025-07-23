# Contributing to N8N Workflow Documentation

Thank you for your interest in contributing! This document provides guidelines and information for contributors.

## Getting Started

### Prerequisites
- Node.js 16 or higher
- npm or yarn
- Git
- Basic knowledge of React, TypeScript, and Tailwind CSS

### Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/your-username/n8n-workflow-documentation.git
   cd n8n-workflow-documentation
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Open Browser**
   Navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/          # Reusable UI components
├── hooks/              # Custom React hooks
├── services/           # API and external services
├── types/              # TypeScript type definitions
├── data/               # Static data and constants
└── utils/              # Utility functions
```

## Development Guidelines

### Code Style

We use ESLint and Prettier for code formatting:

```bash
# Check linting
npm run lint

# Auto-fix linting issues
npm run lint -- --fix
```

### TypeScript

- Use strict TypeScript configuration
- Define interfaces for all data structures
- Avoid `any` type - use proper typing
- Export types from dedicated files

### React Best Practices

- Use functional components with hooks
- Implement proper error boundaries
- Use React.memo for performance optimization
- Follow the single responsibility principle

### Component Guidelines

```typescript
// Good component structure
interface ComponentProps {
  title: string;
  onAction: (id: string) => void;
  optional?: boolean;
}

export const Component: React.FC<ComponentProps> = ({
  title,
  onAction,
  optional = false
}) => {
  // Component logic here
  return (
    <div className="component-container">
      {/* JSX here */}
    </div>
  );
};
```

### Styling Guidelines

- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Use consistent spacing (4, 8, 12, 16px increments)
- Implement hover states and transitions
- Use semantic color names

```tsx
// Good styling example
<button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
  Click me
</button>
```

## Contributing Process

### 1. Issue First
- Check existing issues before creating new ones
- Use issue templates when available
- Provide detailed descriptions and reproduction steps

### 2. Branch Naming
```bash
# Feature branches
feature/add-search-functionality
feature/improve-performance

# Bug fixes
fix/modal-close-button
fix/api-error-handling

# Documentation
docs/update-readme
docs/add-deployment-guide
```

### 3. Commit Messages
Follow conventional commit format:

```bash
feat: add workflow search functionality
fix: resolve modal close button issue
docs: update installation instructions
style: improve button hover effects
refactor: optimize GitHub API service
test: add unit tests for workflow parser
```

### 4. Pull Request Process

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**
   - Write clean, documented code
   - Add tests if applicable
   - Update documentation

3. **Test Your Changes**
   ```bash
   npm run build
   npm run lint
   ```

4. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **Push and Create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **PR Requirements**
   - Clear title and description
   - Link related issues
   - Include screenshots for UI changes
   - Ensure all checks pass

## Types of Contributions

### 🐛 Bug Fixes
- Fix broken functionality
- Improve error handling
- Resolve performance issues

### ✨ New Features
- Add new workflow filters
- Implement new UI components
- Enhance search functionality

### 📚 Documentation
- Improve README
- Add code comments
- Create tutorials

### 🎨 UI/UX Improvements
- Enhance visual design
- Improve accessibility
- Add animations and transitions

### ⚡ Performance
- Optimize loading times
- Reduce bundle size
- Improve API efficiency

## Testing

### Manual Testing
- Test on different browsers
- Verify responsive design
- Check accessibility features
- Test error scenarios

### Automated Testing
```bash
# Run tests (when available)
npm test

# Run tests in watch mode
npm run test:watch
```

## Code Review Process

### For Contributors
- Respond to feedback promptly
- Make requested changes
- Keep PRs focused and small
- Write descriptive commit messages

### For Reviewers
- Be constructive and helpful
- Focus on code quality and maintainability
- Check for security issues
- Verify functionality works as expected

## Release Process

1. **Version Bumping**
   - Follow semantic versioning
   - Update CHANGELOG.md
   - Tag releases appropriately

2. **Deployment**
   - Test in staging environment
   - Deploy to production
   - Monitor for issues

## Getting Help

### Resources
- [React Documentation](https://reactjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [GitHub API Documentation](https://docs.github.com/en/rest)

### Communication
- GitHub Issues for bug reports and feature requests
- GitHub Discussions for questions and ideas
- Pull Request comments for code-specific discussions

## Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- GitHub contributors page

## Code of Conduct

### Our Standards
- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow
- Maintain professional communication

### Unacceptable Behavior
- Harassment or discrimination
- Trolling or insulting comments
- Publishing private information
- Spam or off-topic content

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT License).

---

Thank you for contributing to N8N Workflow Documentation! 🚀