# Deployment Guide

This guide covers different deployment options for the N8N Workflow Documentation application.

## Prerequisites

Before deploying, make sure you have:
1. Built the application: `npm run build`
2. Tested the build locally: `npm run preview`

## Deployment Options

### 1. Vercel (Recommended)

**Quick Deploy:**
1. Push your code to GitHub
2. Connect your GitHub repo to Vercel
3. Deploy automatically

**Manual Deploy:**
```bash
npm install -g vercel
vercel --prod
```

**Configuration:**
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

### 2. Netlify

**Drag & Drop:**
1. Run `npm run build`
2. Drag the `dist` folder to Netlify

**Git Integration:**
1. Connect your GitHub repository
2. Set build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

### 3. GitHub Pages

**Setup:**
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json scripts:
   ```json
   "deploy": "gh-pages -d dist"
   ```
3. Deploy: `npm run build && npm run deploy`

**Configuration:**
Update `vite.config.ts` for GitHub Pages:
```typescript
export default defineConfig({
  plugins: [react()],
  base: '/your-repo-name/',
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
```

### 4. Railway

**Deploy:**
1. Connect your GitHub repository to Railway
2. Railway will auto-detect and deploy

**Configuration:**
Create `railway.json`:
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm run preview",
    "healthcheckPath": "/"
  }
}
```

### 5. Docker Deployment

**Dockerfile:**
```dockerfile
FROM node:18-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**nginx.conf:**
```nginx
events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;

        location / {
            try_files $uri $uri/ /index.html;
        }
    }
}
```

**Build and Run:**
```bash
docker build -t n8n-workflows .
docker run -p 80:80 n8n-workflows
```

## Environment Variables

For production deployments, you may want to set:

```bash
VITE_APP_TITLE=N8N Workflow Documentation
VITE_REPO_OWNER=Zie619
VITE_REPO_NAME=n8n-workflows
VITE_WORKFLOWS_PATH=workflows
```

## Performance Optimization

### Build Optimization
```bash
# Analyze bundle size
npm run build -- --analyze

# Build with source maps for debugging
npm run build -- --sourcemap
```

### CDN Configuration
For better performance, configure your CDN to:
- Cache static assets (JS, CSS, images) for 1 year
- Cache HTML files for 1 hour
- Enable gzip compression
- Enable HTTP/2

### Monitoring
Consider adding:
- Google Analytics
- Error tracking (Sentry)
- Performance monitoring
- Uptime monitoring

## Troubleshooting

**Common Issues:**

1. **Build Fails:**
   - Check Node.js version (requires 16+)
   - Clear node_modules and reinstall
   - Check for TypeScript errors

2. **Blank Page After Deploy:**
   - Check browser console for errors
   - Verify base URL configuration
   - Check if assets are loading correctly

3. **API Rate Limiting:**
   - Consider adding GitHub token for higher limits
   - Implement request caching
   - Add retry logic with exponential backoff

4. **Slow Loading:**
   - Enable gzip compression
   - Use CDN for static assets
   - Implement service worker for caching

## Security Considerations

1. **API Keys:** Never commit API keys to version control
2. **CORS:** Configure CORS headers if needed
3. **CSP:** Implement Content Security Policy headers
4. **HTTPS:** Always use HTTPS in production

## Maintenance

**Regular Tasks:**
1. Update dependencies monthly
2. Monitor GitHub API usage
3. Check for broken links
4. Update workflow data cache
5. Monitor performance metrics

**Automated Tasks:**
- Set up dependabot for dependency updates
- Configure automated testing
- Set up deployment previews for PRs