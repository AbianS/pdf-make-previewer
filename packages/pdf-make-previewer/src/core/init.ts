import prompts from "prompts"
import { exec } from "node:child_process"
import ora from "ora"
import path from "node:path"
import fs from "node:fs"
import { TEMPLATES, VERSION } from "src/lib/constants"
import colors from "picocolors"

export async function initProject() {
  console.log(
    `\n  ${colors.green(`${colors.bold("PDF MAKE PREVIEWER")} v${VERSION}`)}\n`,
  )

  let pckManager: string

  const { install } = await prompts({
    type: "confirm",
    name: "install",
    message: `install ${colors.cyan(colors.bold("pdf-make-previewer"))} as a dev dependency`,
    initial: true,
  })

  if (install) {
    const { packageManager } = await prompts({
      type: "select",
      name: "packageManager",
      message: "Which package manager would you like to use?",
      choices: [
        { title: "npm", value: "npm" },
        { title: "yarn", value: "yarn" },
        { title: "pnpm", value: "pnpm" },
      ],
    })
    pckManager = packageManager

    const spinner = ora(
      `Installing ${colors.cyan(colors.bold("pdf-make-previewer"))}...`,
    ).start()
    try {
      const installCommand = `${packageManager} ${packageManager === "npm" ? "install" : "add"} pdf-make-previewer --save-dev`
      await runCommand(installCommand)
      spinner.succeed(
        `${colors.cyan(colors.bold("pdf-make-previewer"))} installed successfully`,
      )
    } catch (error) {
      spinner.fail(`${colors.red("Failed to install pdf-make-previewer")}`)
      process.exit(1)
    }
  } else {
    console.log(colors.yellow("Installation of pdf-make-previewer canceled."))
    process.exit(1)
  }

  const { language } = await prompts({
    type: "select",
    name: "language",
    message: "Which language are you using",
    choices: [
      { title: "TypeScript", value: "ts" },
      { title: "JavaScript", value: "js" },
    ],
  })

  if (language) {
    const configPath = path.resolve(
      process.cwd(),
      language === "ts"
        ? "pdf-previewer.config.ts"
        : "pdf-previewer.config.mjs",
    )

    if (fs.existsSync(configPath)) {
      console.log(colors.yellow("Configuration file already exists."))
    } else {
      const spinner = ora("Generating configuration file...").start()
      try {
        fs.writeFileSync(configPath, TEMPLATES.files[language as "ts" | "js"])
        spinner.succeed(
          `${colors.cyan(colors.bold(`pdf-previewer.config.${language === "ts" ? "ts" : "mjs"}`))} generated successfully`,
        )
      } catch (error) {
        spinner.fail(`${colors.red("Failed to generate configuration file")}`)
        process.exit(1)
      }
    }
  }

  const { script } = await prompts({
    type: "confirm",
    name: "script",
    message: "Would you like to create a preview script in package.json?",
  })

  if (script) {
    const packageJsonPath = path.resolve(process.cwd(), "package.json")
    if (fs.existsSync(packageJsonPath)) {
      const spinner = ora(
        `Adding ${colors.cyan(colors.bold("preview"))} script to package.json...`,
      ).start()
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"))
      if (!packageJson.scripts) {
        packageJson.scripts = {}
      }
      packageJson.scripts.preview = "pdf-make-previewer"
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
      spinner.succeed(
        `${colors.cyan(colors.bold("preview"))} script added successfully to package.json!`,
      )
    } else {
      console.log(
        colors.red("No package.json found. Please create one manually."),
      )
    }
  }

  console.log("\n🎉 Setup complete!")
  console.log(
    `You can now run the preview command with: ${colors.cyan(colors.bold(`${pckManager} run preview`))}`,
  )
}

function runCommand(command: string) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error)
      } else {
        resolve(stdout || stderr)
      }
    })
  })
}
