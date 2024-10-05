import type { HomeLayoutProps } from "fumadocs-ui/home-layout"

/**
 * Shared layout configurations
 *
 * you can configure layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: HomeLayoutProps = {
  nav: {
    title: "PDF Make Previewer",
  },
  githubUrl: "https://github.com/AbianS/pdf-make-previewer",
}
