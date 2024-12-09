import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sass from 'sass'
import viteTsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  // depending on your application, base can also be "/"
  base: '/',
  css: {
    preprocessorOptions: {
      scss: {
        implementation: sass,
        api: 'modern'
      },
    },
  },
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
    viteTsconfigPaths()
  ],
  server: {
    // this ensures that the browser opens upon server start
    open: true,
    // this sets a default port to 3000  
    port: 3000,
  },
})