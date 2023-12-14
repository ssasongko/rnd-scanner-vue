import path from 'path'
import vue from '@vitejs/plugin-vue'
import { defineConfig, splitVendorChunkPlugin } from 'vite'
import eslintPlugin from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    splitVendorChunkPlugin(),
    eslintPlugin()
  ],
  server:{
    host: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    },
    extensions: ['.js', '.jsx', '.json', '.vue']
  },
  build: {
    sourcemap: false,
    minify: false
  }
})
