import { defineConfig } from 'vite'

export default defineConfig({
  base: "dist",
  build: {
    rollupOptions: {
      input: {
        popup: 'index.html',
        'service-worker': 'src/service_worker/background.ts'
      },
      output: {
        entryFileNames: (chunkInfo) => {
          return chunkInfo.name === 'service-worker' ? 'service_worker/background.js' : '[name].js'
        }
      }
    }
  }
})
