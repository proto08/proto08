---
title: 'Hello, Next.js!'
slug: hello-nextjs
description: 'Next.jsとApp Routerの基本を学ぶ入門ガイドです。'
date: '2026-02-15'
category: 'web'
tags:
  - nextjs
  - react
published: true
---

## はじめに

Next.jsはReactベースのフルスタックフレームワークです。App Routerを使うと、サーバーコンポーネントとクライアントコンポーネントを使い分けられます。

## App Router

App Routerでは、`app/` ディレクトリにファイルを置くだけでルーティングが完成します。

```tsx
// app/page.tsx
export default function Home() {
  return <h1>Hello, World!</h1>
}
```

### サーバーコンポーネント

デフォルトで全てのコンポーネントはサーバーコンポーネントです。

```tsx
async function getData() {
  const res = await fetch('https://api.example.com/data')
  return res.json()
}

export default async function Page() {
  const data = await getData()
  return <div>{data.message}</div>
}
```

### クライアントコンポーネント

ブラウザのAPIや状態管理が必要なときは `'use client'` を使います。

```tsx
'use client'

import { useState } from 'react'

export function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
```

## まとめ

Next.jsのApp RouterはSSRを簡単に実現できる強力なフレームワークです。
