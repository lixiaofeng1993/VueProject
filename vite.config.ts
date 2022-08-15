import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { serve } from 'esbuild'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server:{
    port: 3009,
    open: true,
    proxy:{
      "/calendar": {
        target: "http://121.41.54.234",
        changeOrigin: true,
      },
      "/users": {
        target: "http://121.41.54.234",
        changeOrigin: true,
      }
    }
  }
})
