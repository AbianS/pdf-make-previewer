import { readFileSync } from "node:fs"
import path from "node:path"

const { version } = JSON.parse(
  readFileSync(path.join(__dirname, "../package.json")).toString(),
)

export const VERSION = version as string

export const TEMPLATES = {
  files: {
    ts: `import type { PdfPreviewerConfig } from "pdf-make-previewer"

const config: PdfPreviewerConfig = {
  // 🚀 Import your report here
  renderPdfPreview: () => ({
    content: ["TEMP"],
  }),
}

export default config
`,
    js: `/** @type {import('pdf-make-previewer').PdfPreviewerConfig} */
const config = {
  // 🚀 Import your report here
  renderPdfPreview: () => ({
    content: ["TEMP"],
  }),
}

export default config
`,
  },
} as const
