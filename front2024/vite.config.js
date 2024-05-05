import { defineConfig } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import htmlPurge from 'vite-plugin-html-purgecss'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths"
import path from 'path'

export default defineConfig({
    root: 'src',
    build: {
      outDir: path.resolve(__dirname, '../dist'),
      emptyOutDir: true,
      sourcemap: true,
    },
    resolve: {
      alias: {
        '@src': path.resolve(__dirname, './src'),
      },
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    mode: process.env.NODE_ENV,
    define: {
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    },  
    plugins: [
        // htmlPurge(),
        react(),
    //     tsconfigPaths(),
    //     createHtmlPlugin({
    //       entry: "entry-client.tsx",
    //       template: "index.html",
    //       inject: {
    //         data: {
    //           title: "Simple SPA",
    //           injectScript: `<script type='module' src="./inject.jsx"></script>`,
    //         },
    //       },
    //     }
    // ),
    ],
    ssr: {
      // Названия пакетов, которые нужно добавить в сборку при SSR вместо импорта из node_modules
      noExternal: [
        'redux', 'redux-thunk', 'simplex-noise'
      ]
    },
    server: {
      host: true,
      port: 8010,
      proxy: {
        "/api/v1": {
          target: "http://example.front.ylab.io",
          secure: false,
          changeOrigin: true,
        },
      },
    },
})
