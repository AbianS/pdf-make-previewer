#!/usr/bin/env node

import path from "node:path"
import { cac } from "cac"
import chokidar from "chokidar"
import type { Response } from "express"
import { createServer } from "./core/server"
import type { SharedData } from "./core/types"
import { getConfig } from "./lib/builder"
import { VERSION } from "./lib/constants"
import { findCondfigFile, getFilesToWatch } from "./lib/utils"
import { performance } from "node:perf_hooks"
import colors from "picocolors"
import { initProject } from "./core/init"

export { PdfPreviewerConfig } from "./core/types"

interface CliOptions {
  config?: string
  port: number
}

const clients: Response[] = []

const cli = cac("pdf-make-previewer")

cli
  .command("init", "Create a new pdf-make-previewer project")
  .action(async () => {
    await initProject()
  })

cli
  .command("[root]", "Start the server")
  .option("-c, --config <file>", "[string] Path to the config file", {
    default: undefined,
  })
  .option("-p, --port <number>", "[number] Port to listen on (default: 4000)", {
    default: 4000,
  })
  .action(async (root: string, options: CliOptions) => {
    const configPath = options.config
      ? path.resolve(process.cwd(), options.config)
      : findCondfigFile(process.cwd())

    if (!configPath) {
      console.log(
        `${colors.green(`${colors.bold("[PDF MAKE PREVIEWER]")}`)} ${colors.red("No config file found")}\n`,
      )
      process.exit(1)
    }

    const startTime = performance.now()

    const server = createServer(configPath, options.port, clients)

    server.listen(options.port, async () => {
      const endTime = performance.now()
      const startupTime = Math.round(endTime - startTime)

      console.log(
        `\n  ${colors.green(`${colors.bold("PDF MAKE PREVIEWER")} v${VERSION}`)}\n` +
          `  ${colors.bold("- Preview:")}\t http://localhost:${options.port}\n\n` +
          `  ${colors.dim(`ready in ${colors.reset(colors.bold(`${startupTime}`))} ms\n\n`)}`,
      )
    })

    getFilesToWatch(configPath).then((filesToWatch) => {
      const watcher = chokidar.watch(filesToWatch)

      watcher.on("change", async (filePath) => {
        const updatedFilesToWatch = await getFilesToWatch(configPath)
        watcher.add(updatedFilesToWatch)

        const config = await getConfig(process.cwd(), options.config)

        if (!config) {
          console.log(
            `  ${colors.green(`${colors.bold("[PDF MAKE PREVIEWER]")}`)} ${colors.red("No config file found or invalid config file")}\n`,
          )
          process.exit(1)
        }

        const functionString = config.renderPdfPreview()

        const sharedData: SharedData = {
          previewData: functionString,
          message: `Preview data updated. File changed: ${filePath}`,
        }

        console.log(
          `  ${colors.green(`${colors.bold("[PDF MAKE PREVIEWER]")}`)} ${colors.cyan("file reload")} ${colors.dim(filePath)}`,
        )

        clients.forEach((res) => {
          res.write(`data: ${JSON.stringify(sharedData)}\n\n`)
        })
      })
    })
  })

cli.help()
cli.version(VERSION)

cli.parse()
