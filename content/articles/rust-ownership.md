---
title: 'Rustの所有権システム'
slug: rust-ownership
description: 'Rustの核心概念である所有権、借用、ライフタイムをわかりやすく解説します。'
date: '2026-01-20'
category: 'systems'
tags:
  - rust
  - systems-programming
published: true
---

## 所有権とは

Rustの所有権システムは、ガベージコレクタなしにメモリ安全性を保証します。

## 基本ルール

1. 各値には**所有者**が一人だけ存在する
2. 所有者がスコープを外れると値は破棄される
3. 同時に存在できる参照は一つの可変参照か複数の不変参照のどちらか

## 例

```rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1; // s1はムーブされる
    // println!("{}", s1); // エラー！
    println!("{}", s2);
}
```

### 借用

```rust
fn calculate_length(s: &String) -> usize {
    s.len()
}

fn main() {
    let s1 = String::from("hello");
    let len = calculate_length(&s1); // 借用
    println!("'{}'の長さは{}です", s1, len);
}
```

## ライフタイム

ライフタイムはコンパイラが参照の有効期間を追跡する仕組みです。

```rust
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() { x } else { y }
}
```

## まとめ

所有権システムはRustの最大の特徴であり、実行時オーバーヘッドなしにメモリ安全性を実現します。
