# shadcn/ui monorepo template

A TanStack Start + shadcn/ui monorepo. `apps/web` is prerendered to fully static HTML (`apps/web/dist/client`) and needs no server at runtime.

```bash
bun run dev    # dev server on http://localhost:3000
bun run build  # static output in apps/web/dist/client
```

Articles live in `apps/web/content/articles/*.md` and are compiled at build time by `apps/web/vite/articles.ts`.

## Adding components

To add components to your app, run the following command at the root of your `web` app:

```bash
bunx shadcn@latest add button -c apps/web
```

This will place the ui components in the `packages/ui/src/components` directory.

## Using components

To use the components in your app, import them from the `ui` package.

```tsx
import { Button } from "@workspace/ui/components/button";
```
