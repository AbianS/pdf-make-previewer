import path from "node:path"
import { bundleRequire } from "bundle-require"
import JoyCon from "joycon"
import type { PdfPreviewerConfig } from "src/core/types"

export async function getConfig(
  cwd: string,
  configFile?: string,
): Promise<PdfPreviewerConfig | undefined> {
  const configJoyCon = new JoyCon()
  const configPath = await configJoyCon.resolve({
    files: configFile
      ? [configFile]
      : [
          "pdf-previewer.config.ts",
          "pdf-previewer.config.js",
          "pdf-previewer.config.mjs",
          "pdf-previewer.config.cjs",
        ],
    cwd,
    stopDir: path.parse(cwd).root,
    packageKey: "pdf-make-previewer",
  })

  if (configPath) {
    const config = await bundleRequire({
      filepath: configPath,
    })

    return config.mod.default
  }
}