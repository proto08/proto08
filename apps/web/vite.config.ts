import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import viteReact from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { articles, listPublishedSlugs } from "./vite/articles.ts"

export default defineConfig(async () => ({
  server: { port: 3000 },
  resolve: { tsconfigPaths: true },
  plugins: [
    articles(),
    tanstackStart({
      // Fully static output: every page is prerendered to dist/client and
      // can be served from any static host with no server runtime.
      prerender: {
        enabled: true,
        crawlLinks: true,
        failOnError: true,
        // Hash/query links map to the same HTML file as their base path.
        filter: ({ path }) => !/[?#]/.test(path),
      },
      pages: [
        // Static hosts serve /404.html for unknown paths.
        { path: "/404", prerender: { outputPath: "/404.html" } },
        ...(await listPublishedSlugs()).map((slug) => ({
          path: `/articles/${slug}`,
        })),
      ],
    }),
    viteReact(),
  ],
}))
