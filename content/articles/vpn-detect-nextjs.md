---
title: 'VPNを検知する | Next.js'
slug: vpn-detect-nextjs
description: 'ノーコストでVPN/Proxyを検知するNext.js APIの実装'
date: '2026-03-20'
category: 'tech'
published: true
---

# はじめに

Web サイトの自動化や匿名化されたユーザーに対して不快感を抱くことはありませんか？
VPN や Tor は個人のプライバシーを守りますが、同時に身元を隠す手段として悪用されやすいという課題があります。

VPN や Proxy の IP を検知する API サービスは多数ありますが、多くが有料または制限があります。

ノーコストで検知が可能な API を作成したので、共有します。

完成品 ↓
https://vpn-detect-api.vercel.app/api

> 住宅 IP が割り当てられた Proxy の判定はできません。

# ロジック

GitHub に公開されているホスティングサービスの ASN（Autonomous System Number）リストを利用します。

1. **クライアント IP の取得**
   - クライアントから送信された IP アドレスを取得します。

2. **ASN の取得**
   - 取得した IP を`ipinfo.io`に送信し、対応する ASN を取得します。

3. **判定**
   - 取得した ASN が準備した ASN リストに含まれていれば`True`（VPN/Proxy と判定）とします。

検証回数が多い場合、手順 2 で API リミットがかけられることがあります。
他の取得方法をご存知の方はそちらを使用してください。

# 実装

Next.js のプロジェクトに導入したものを流用したため、Next.js で作成しています。

## ASN リストを取得

GitHub に公開されている ASN リストを少し改変して使用します。
https://github.com/proto08/vpn-detect-api/blob/main/lib/asn.json

元のデータはこちらです。
https://github.com/NullifiedCode/ASN-Lists

## クライアント IP から ASN を取得

```ts
export async function getASN(ip: string): Promise<number | null> {
  try {
    const response = await fetch(`https://ipinfo.io/${ip}/json`);
    if (!response.ok) {
      console.error("Failed to fetch ASN");
      return null;
    }
    const data = await response.json();
    const match = data.org?.match(/AS(\d+)/);
    if (match && match[1]) {
      return parseInt(match[1], 10);
    }
    console.error("No ASN found");
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}
```

`ipinfo.io`に IP アドレスを送信して`fetch`し、結果を取得します。
IP アドレスを`1.1.1.1`とした場合の`response.json()`のサンプルは以下の通りです。

```json
{
  "ip": "1.1.1.1",
  "hostname": "one.one.one.one",
  "city": "Brisbane",
  "region": "Queensland",
  "country": "AU",
  "loc": "-27.4816,153.0175",
  "org": "AS13335 Cloudflare, Inc.",
  "postal": "4101",
  "timezone": "Australia/Brisbane",
  "readme": "https://ipinfo.io/missingauth",
  "anycast": true
}
```

このレスポンスから ASN を取得して返します。

## VPN かどうかを判断する

```ts
import asnList from "@/lib/asn.json";

export async function isVpn(ip: string): Promise<boolean> {
  const asn = await getASN(ip);
  if (!asn) return false;
  return asnList.includes(asn);
}
```

先ほど作成した関数`getASN`を使用して ASN を取得し、`asn.json`に含まれるかを検証します。

## IP アドレスの検証

```ts
export function isValidIPv4(ip: string): boolean {
  const IPV4_REGEX =
    /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  if (!IPV4_REGEX.test(ip)) return false;

  const octets = ip.split(".");
  return octets.every((octet) => {
    return octet === "0" || !octet.startsWith("0");
  });
}
```

送信された IP アドレスが正常かどうかを判断します。
IPv4 アドレスに対応しています。

## API の作成

```ts
import { NextResponse } from "next/server";
import { isVpn } from "@/lib/isVpn";
import { isValidIPv4 } from "@/lib/ipValidate";

export async function GET(request: Request, { params }: { params: Promise<{ ip: string }> }) {
  const { ip } = await params;
  if (!isValidIPv4(ip)) {
    return NextResponse.json({ error: "invalid ip address" }, { status: 400 });
  }
  const vpnCheck = await isVpn(ip);
  if (!vpnCheck) {
    return NextResponse.json({
      ip,
      isVpn: false,
    });
  }

  return NextResponse.json({
    ip,
    isVpn: true,
  });
}
```

これまで作成した関数を使用して API ルートを作成します。

## 動作確認

完成した API を試しに使用してみましょう。
VPN で使用されているイスラエルの IP アドレスでテストします。

```json
{"ip":"169.150.227.226","isVpn":true}
```

無事判定されました。

# 最後に

以上で実装は完了です。
自動化対策には必須レベルの VPN/Proxy 検知に便利だと思います。
Discord サーバーの Web 認証などに設置してみると良いでしょう。
