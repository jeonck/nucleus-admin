import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react({
    // Explicitly enable JSX in all js files
    include: '**/*.{jsx,js,ts,tsx}',
  })],
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
        '.ts': 'tsx'
      }
    }
  },
  // Ensure proper handling of Korean text in JSX
  server: {
    fs: {
      strict: true
    }
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
