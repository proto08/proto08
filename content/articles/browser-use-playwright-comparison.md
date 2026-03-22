---
title: 'Browser Use CLIとPlaywrightの比較'
slug: browser-use-playwright-comparison
description: 'Claude Code上でBrowser Use CLIとPlaywright MCPの速度・トークン消費量を実測比較'
date: '2026-03-22'
category: 'tech'
tags: ['browser', 'playwright', 'mcp', 'claudecode']
published: true
---

最近Xを見ていたらBrowser Use CLIとやらを見かけ、気になったのでClaude Code上でPlaywright MCPと速度やトークン消費量を実測比較してみました。

## Browser Use CLIとは

[Browser Use CLI](https://docs.browser-use.com/open-source/browser-use-cli)は、ブラウザ操作をコマンドラインから行えるツールです。`open`・`click`・`state`・`screenshot`などの直接操作コマンドに加え、`task`コマンドでは独自のAIエージェントが自然言語の指示を受け取りブラウザを自律的に操作します。

```bash
# URLを開く
browser-use open https://example.com

# ページの状態（テキスト・リンクなど）を取得
browser-use state

# スクリーンショットを保存
browser-use screenshot /tmp/page.png

# AIエージェントに自律実行させる
browser-use task "zenn.devのトレンドを開いて"
```

内部ではPlaywrightを使っており、初回起動時にバックグラウンドデーモンを立ち上げることで2回目以降のコマンドを高速に実行できます。Claude Codeから使う場合はBashツール経由でコマンドを呼び出します。

## 環境

- OS: Arch Linux（x86\_64）
- Chromium: 146.0.7680.153（システム標準パッケージ）
- uv: 0.10.12
- Node.js: v24.14.0
- Agent: Claude Code | Sonnet 4.6
- 計測タスク: `https://example.com`へのアクセス → ページ状態取得 → スクリーンショット保存

---

## インストール方法

### browser-use CLI

公式ドキュメントの`install.sh`はArch Linuxでは使えません。`uv`を使ってインストールします。

Ubuntu, Mac/Windowsをご利用の場合は[公式ドキュメント](https://docs.browser-use.com/open-source/browser-use-cli)でインストール方法を確認してください。

```bash
uv init my-project && cd my-project
uv add browser-use

# グローバルに使う場合
uv tool install browser-use
```

インストール後、`browser-use install`でChromiumを自動インストールしようとしますが、Arch LinuxではArch独自のパッケージ管理と競合してこのコマンドは失敗します。代わりにシステムの`chromium`パッケージを使います。

```bash
sudo pacman -S chromium
export BROWSER_USE_BROWSER_PATH=/usr/bin/chromium
```

### Playwright MCP

`npx`経由で使えます。Claude Codeの`~/.claude/settings.json`に追加するか、プロジェクト単位で設定します。

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}
```

設定後はClaude Codeを再起動すると`browser_navigate`などのMCPツールが使えるようになります。

---

## 速度比較（実測）

同一タスクを両手法で実行し、各ステップの処理時間を計測しました。

### browser-use CLI（Bash経由）

```
操作                          所要時間
─────────────────────────────────────
open（初回、デーモン起動含む）   3,198ms
state（デーモン起動後）          193ms
screenshot（ファイル保存）        208ms
─────────────────────────────────────
合計                          3,599ms
```

browser-use CLIは初回起動時にバックグラウンドデーモン（`~/.browser-use/`以下に状態を保存）を立ち上げ、Chromiumプロセスを起動します。2回目以降の操作はデーモン経由で実行されるため高速ですが、`open`コマンド（URLナビゲーション）はページロード待機を含むため毎回数秒かかります。

### Playwright（直接実行、MCPの参考値）

```
操作                          所要時間
─────────────────────────────────────
ブラウザ起動                    161ms
navigate                       636ms
ページ状態取得（JS評価）          50ms
screenshot（ファイル保存）        55ms
─────────────────────────────────────
合計                            902ms
```

Playwright MCPが内部で実行する処理とほぼ等価なスクリプトで計測しました。

### 速度まとめ

| ステップ | browser-use CLI | Playwright相当 |
|---|---|---|
| 初回起動+ナビゲーション | **3,198ms** | 797ms |
| ページ状態取得 | 193ms | **50ms** |
| スクリーンショット | 208ms | **55ms** |
| 合計 | **3,599ms** | **902ms** |

Playwrightは約**4倍速い**結果になりました。browser-use CLIが遅い主因は、内部でPlaywrightを使いつつもデーモン通信レイヤーが加わるためです。`state`や`screenshot`は193ms・208msと軽いですが、ナビゲーション自体が重くなっています。

---

## Claude Codeトークン消費量の比較

速度以上に重要なのがトークン消費量です。Claude Codeのコンテキストウィンドウと料金に直結します。

### browser-use CLIの場合（Bashツール経由）

各コマンドの出力はテキストのみです。

```
$ browser-use open https://example.com
mode: chromium
url: https://example.com
```

→ 約15トークン

```
$ browser-use state
viewport: 1920x1080
page: 1920x1080
scroll: (0, 0)
Example Domain
This domain is for use in documentation examples...
[42]<a />
	Learn more
```

→ 実測190バイト ≈ 約**50トークン**

```
$ browser-use screenshot /tmp/page.png
saved: /tmp/page.png
size: 19996
```

→ 約10トークン。**スクリーンショットはファイルパスのみ返す**ため、画像サイズに関係なくトークンコストは最小です。

**1タスクあたりのBashツール出力合計: 約75トークン**

### Playwright MCPの場合（MCPツール経由）

#### `browser_navigate` の出力

ナビゲーション後、MCPはページのタイトル・URL・アクセシビリティツリーの概要などを返します。

→ 約**200〜500トークン**

#### `browser_snapshot`（デフォルト動作）

Playwright MCPがページ状態を返すとき、デフォルトではアクセシビリティツリー（スナップショット）を返します。example.comのような単純なページでも以下のような構造になります。

```
- document
  - heading "Example Domain"
  - paragraph "This domain is for use in..."
  - link "Learn more" [url: https://iana.org/domains/example]
```

実際のページでは数百〜数千行のアクセシビリティツリーになることも多いです。

→ シンプルなページ: 約**500〜1,000トークン**
→ 複雑なSPAやダッシュボード: **5,000〜20,000トークン**も珍しくありません

#### `browser_take_screenshot`（画像付き）

visionモードが有効なとき、スクリーンショットはbase64エンコードされた画像データとして返されます。

```
data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAB4...（数万文字）
```

計測したスクリーンショット（15,416バイト）のbase64は約20,570文字 ≈ 約**5,000トークン**です。実際のWebページ（フルHD、1920×1080）では20〜50倍になりえます。

→ スクリーンショット1枚: 約**5,000〜50,000トークン**

### トークン消費量まとめ

| 操作 | browser-use CLI | Playwright MCP |
|---|---|---|
| ナビゲーション | ~15トークン | ~200〜500トークン |
| ページ状態取得 | **~50トークン** | ~500〜20,000トークン |
| スクリーンショット | **~10トークン** | ~5,000〜50,000トークン |
| **1タスク合計** | **~75トークン** | **~6,000〜70,000トークン** |

browser-use CLIのトークン消費量はPlaywright MCPの**1/100〜1/1000以下**になりえます。スクリーンショットを多用するタスクでは特に差が開きます。

---

## それぞれの強みと使い分け

### browser-use CLIが向いているケース

**トークン節約が最優先のとき**

繰り返しの多いスクレイピングや、長いタスクチェーンでは消費トークンの差が積み重なります。browser-use CLIならコンテキストを圧迫せず、長時間の自動化タスクも維持しやすいです。

**`task`コマンドで自律実行したいとき**

```bash
export BROWSER_USE_BROWSER_PATH=/usr/bin/chromium
browser-use task "zenn.devのトレンドを開いて"
```

`task`コマンドはbrowser-use独自のAIエージェントがブラウザを自律的に操作し、Claude Codeは結果のテキストだけを受け取ります。Claude Codeのトークンはほとんど使わず、browser-use側のLLMトークンだけが消費されます。

**スクリーンショットをファイルとして扱うとき**

画像をファイルに保存してあとでRead toolで読む、あるいはユーザーが確認するだけでよい場合はbrowser-use CLIが圧倒的に有利です。

### Playwright MCPが向いているケース

**速度が重要なとき**

単純なナビゲーション+確認タスクならPlaywright MCPは4倍速いです。頻繁にページを開くデバッグ作業では体感差が大きくなります。

**Claude Codeに視覚情報を直接渡したいとき**

スクリーンショットをbase64でClaude Codeのコンテキストに渡すと、Claude自身がページを「見て」判断できます。「このボタンをクリックして」「エラーメッセージを読んで」といった視覚的な判断が必要なタスクに向いています。ただしトークンコストは高くなります。

**既存のPlaywright知識を活かしたいとき**

`browser_click`、`browser_fill`、`browser_navigate`などのツール名はPlaywrightのAPIと対応しています。Playwrightに慣れている場合は直感的に使えます。

## まとめ

| 観点 | browser-use CLI | Playwright MCP |
|---|---|---|
| 速度 | 遅い（~3.6s/タスク） | **速い（~0.9s/タスク）** |
| トークン消費量 | **極小（~75tok）** | 大（数千〜数万tok） |
| 自律実行 | **可能（`task`コマンド）** | Claudeが逐次判断 |
| コンテキスト効率 | **高い** | 低い |

**基本方針**:
- コンテキストを長く保ちたい / トークン節約したい → **browser-use CLI**
- レスポンスが速いほど良い / 視覚的な判断が必要 → **Playwright MCP**
- 完全自律でブラウザタスクをこなしたい → **browser-use CLI の`task`コマンド**

両者は排他ではなく、用途に応じて使い分けるのが現実的です。長いスクレイピングタスクはbrowser-use CLIで低コストに回し、UIのデバッグや視覚確認が必要な場面ではPlaywright MCPを使うという使い分けが効果的だと感じました。
