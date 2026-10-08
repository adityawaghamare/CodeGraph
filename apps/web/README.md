# CodeGraph Viewer (Web)

A React-based web application to visually explore CodeGraph architecture outputs.

## Features
- **Contract-level & Function-level Views**: Switch between high-level macro architectures and micro details.
- **Search & Filtering**: Real-time search highlighting for contracts, functions, and storage keys.
- **Health Checks & Coverage**: Summarized diagnostics provided by the CodeGraph CLI.
- **Zero-Backend**: All graphs are processed and rendered entirely locally in your browser.

## Deployment to Vercel

1. Push your CodeGraph repository to GitHub.
2. Sign in to [Vercel](https://vercel.com/) and create a new project.
3. Import the `CodeGraph` repository.
4. Set the **Framework Preset** to `Vite`.
5. Set the **Root Directory** to `apps/web`.
6. Click **Deploy**. Vercel will automatically use the `vercel.json` configuration provided to build and deploy the app.

## Running Locally

```bash
pnpm install
pnpm dev
```
