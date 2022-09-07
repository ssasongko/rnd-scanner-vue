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
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    },
    extensions: ['.js', '.jsx', '.json', '.vue']
  },
  server: {
    host: "pegadaian.mydigilearn.test",
    port: 8080,
    https: false,
  },
  build: {
    sourcemap: false,
    minify: false
  }
})
