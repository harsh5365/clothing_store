# GitHub Pages Deployment Guide

This guide will help you deploy your Next.js clothing store to GitHub Pages using GitHub Actions.

## Prerequisites

1. A GitHub repository
2. Your code pushed to the `main` or `master` branch

## Setup Steps

### 1. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **GitHub Actions**

### 2. Repository Settings

Make sure your repository has the following settings:
- **Repository visibility**: Public (required for free GitHub Pages)
- **Branch protection**: Not required, but recommended for production

### 3. Deploy

The deployment will happen automatically when you:

1. **Push to main/master branch**: The workflow will build and deploy your site
2. **Create a pull request**: The workflow will build but not deploy (for testing)

## Workflow Details

The GitHub Actions workflow (`.github/workflows/deploy.yml`) does the following:

1. **Checkout code** from your repository
2. **Setup Node.js** environment
3. **Install dependencies** using `npm ci`
4. **Build the project** using `npm run build`
5. **Export static files** using `npm run export`
6. **Deploy to GitHub Pages** using the `peaceiris/actions-gh-pages` action

## Configuration Files

### `next.config.mjs`
- `output: 'export'` - Enables static export
- `trailingSlash: true` - Adds trailing slashes for GitHub Pages compatibility
- `images.unoptimized: true` - Disables Next.js image optimization for static export

### `package.json`
- Added `export` script for building and exporting static files

## Accessing Your Site

After successful deployment, your site will be available at:
```
https://[your-username].github.io/[repository-name]
```

## Troubleshooting

### Common Issues

1. **Build fails**: Check the Actions tab for error logs
2. **Images not loading**: Ensure Unsplash URLs are accessible
3. **404 errors**: Make sure `trailingSlash: true` is set in next.config.mjs

### Manual Deployment

If you need to deploy manually:

```bash
npm run build
npm run export
# Then upload the 'out' folder contents to your hosting provider
```

## Custom Domain (Optional)

To use a custom domain:

1. Add a `CNAME` file to the `public` folder with your domain
2. Configure DNS settings to point to GitHub Pages
3. Enable custom domain in repository settings

## Environment Variables

If you need environment variables for production:

1. Go to repository **Settings** → **Secrets and variables** → **Actions**
2. Add your environment variables as repository secrets
3. Update the workflow to use these secrets

## Performance Tips

- The site is optimized for static hosting
- Images are served from Unsplash CDN
- Bootstrap CSS is loaded from CDN
- All assets are optimized during build

## Support

If you encounter issues:
1. Check the GitHub Actions logs
2. Verify your Next.js configuration
3. Ensure all dependencies are properly installed
