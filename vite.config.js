import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Use the root path during local development and the repository path on GitHub Pages.
const base = process.env.GITHUB_ACTIONS === 'true' ? '/meu-portfolio/' : '/';

export default defineConfig({
  base,
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
});
