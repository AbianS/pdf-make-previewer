import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: "inject-pdf-worker",
      transformIndexHtml: (html) => {
        return html.replace(
          "</body>",
          `  <script type="module" crossorigin src="/assets/pdf.worker.min.mjs"></script>\n</body>`,
        )
      },
    },
  ],
  build: {
    outDir: "build",
    rollupOptions: {
      output: {
        entryFileNames: "assets/[name].js",
        chunkFileNames: "assets/[name].js",
        assetFileNames: "assets/[name].[ext]",
      },
      moduleContext: (id) => {
        const normalizedPath = id.replace(/\\/g, "/")
        if (
          normalizedPath.includes("node_modules/pdfmake/build/vfs_fonts.js")
        ) {
          return "window"
        }
        return undefined
      },
    },
  },
})
