import path from "node:path"
import madge from "madge"

export async function getFilesToWatch(configPath: string) {
  const result = await madge(configPath, {
    baseDir: process.cwd(),
    tsConfig: path.resolve(process.cwd(), "tsconfig.json"),
    excludeRegExp: [/node_modules/],
  })

  const res = result.obj()
  return flattenDependencies(res)
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
