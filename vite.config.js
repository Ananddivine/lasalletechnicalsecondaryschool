import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from "path";


export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["jwt-decode", 'jspdf',]
  },
  assetsInclude: ['**/*.cur', '**/*.docx'],
   resolve: {
    extensions: ['.js', '.jsx', '.json'],
     alias: {
      "@": path.resolve(__dirname, "src"),
    },
  }
})