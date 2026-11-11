import type { Root } from "hast"
import { toJsxRuntime } from "hast-util-to-jsx-runtime"
import { Fragment, jsx, jsxs } from "react/jsx-runtime"
import { PreWithCopy } from "./pre-with-copy"

interface ArticleProseProps {
  hast: Root
}

export function ArticleProse({ hast }: ArticleProseProps) {
  return (
    <div className="article-prose">
      {toJsxRuntime(hast, {
        Fragment,
        jsx,
        jsxs,
        components: { pre: PreWithCopy },
      })}
    </div>
  )
}
