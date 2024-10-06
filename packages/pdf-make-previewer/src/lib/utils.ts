import path from "node:path"
import madge from "madge"
import { CONFIG_FILES } from "./constants"
import fs from "node:fs"

export async function getFilesToWatch(configPath: string) {
  const isTs = configPath.endsWith(".ts")

  const result = await madge(configPath, {
    baseDir: process.cwd(),
    tsConfig: isTs ? path.resolve(process.cwd(), "tsconfig.json") : undefined,
    excludeRegExp: [/node_modules/],
  })

  return flattenDependencies(result.obj())
}

function flattenDependencies(tree: Record<string, string[]>): string[] {
  const allFiles = new Set<string>()

  function collectFiles(file: string) {
    if (!allFiles.has(file)) {
      allFiles.add(file)
      const deps = tree[file] || []
      deps.forEach((dep) => collectFiles(dep))
    }
  }

  Object.keys(tree).forEach(collectFiles)

  return Array.from(allFiles)
}

export function findCondfigFile(route: string): string | undefined {
  for (const file of CONFIG_FILES) {
    const filePath = path.resolve(route, file)
    if (fs.existsSync(filePath)) {
      return filePath
    }
  }
  return undefined
}
