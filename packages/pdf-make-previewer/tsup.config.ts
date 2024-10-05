import { copy } from "esbuild-plugin-copy"
import type { Options } from "tsup"

export const tsup: Options = {
  splitting: true,
  clean: true,
  format: "cjs",
  bundle: true,
  minify: true,
  target: "es2020",
  entry: ["src/index.ts"],
  esbuildPlugins: [
    copy({
      assets: [
        {
          from: "../pdf-render/build/index.html",
          to: "./",
        },
        {
          from: "../pdf-render/build/assets/index.js",
          to: "./assets/index.js",
        },
        {
          from: "../pdf-render/node_modules/pdfjs-dist/build/pdf.worker.min.mjs",
          to: "./assets/pdf.worker.min.mjs",
        },
        {
          from: "../pdf-render/build/assets/index.css",
          to: "./assets/index.css",
        },
      ],
    }),
  ],
}
