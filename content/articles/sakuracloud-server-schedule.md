---
title: 'SakuraCloudサーバーの起動・停止をスケジュールする'
slug: sakuracloud-server-schedule
description: 'GitLab CIのパイプラインスケジュールを使って、SakuraCloudサーバーの起動と停止を自動化する方法'
date: '2026-04-17'
category: 'tech'
tags: ['sakura', 'cicd', 'gitlab']
published: true
---

## 概要

**GitLab CI** のパイプラインスケジュールを使って、SakuraCloud サーバーの起動と停止を自動化します。
業務時間外に停止する設定を入れておくと、利用料金の節約につながります。

GitHub Actions で同様の構成を実装したい場合は、次の記事が参考になります。
(設定する際などこちらの記事を参考にしました。ご一読ください。)
https://qiita.com/shztki/items/bfbd9c217ab224c35a18


## 実装

### Gitlab CI
```yaml:.gitlab-ci.yml
stages:
    - schedule

.usacloud: &usacloud
  before_script:
    - apt-get update -qq && apt-get install -y -qq curl sudo
    - curl -fsSL https://releases.usacloud.jp/usacloud/repos/install.sh | bash
    - usacloud config set access-token "$SAKURACLOUD_ACCESS_TOKEN"
    - usacloud config set access-token-secret "$SAKURACLOUD_ACCESS_TOKEN_SECRET"
    - usacloud config set zone "$SAKURACLOUD_ZONE"

server-start:
  stage: schedule
  image: ubuntu:22.04
  <<: *usacloud
  script:
    - usacloud server boot -y "$SERVER_ID"
  rules:
    - if: '$CI_PIPELINE_SOURCE == "schedule" && $SCHEDULE_TYPE == "start"'
  tags:
    - CHANGE_ME

server-stop:
  stage: schedule
  image: ubuntu:22.04
  <<: *usacloud
  script:
    - usacloud server shutdown -y "$SERVER_ID"
  rules:
    - if: '$CI_PIPELINE_SOURCE == "schedule" && $SCHEDULE_TYPE == "stop"'
  tags:
    - CHANGE_ME

```

SakuraCloudのサーバーの操作は[UsaCloud](https://docs.usacloud.jp/usacloud/installation/start_guide/)を使用します。UsaCloudの操作に必要なAPIキーなどは、SakuraCloudのコントールパネルから操作してください。詳しくは[公式ドキュメント](https://manual.sakura.ad.jp/cloud/api/apikey.html)

パイプラインスケジュールに`SCHEDULE_TYPE`を追加し、起動・停止にそれぞれ`start` / `stop`を付与します。

この変数で、起動か停止を判断しています。

### パイプラインスケジュール

Gitlabにログインしプロジェクト選択、`ビルド` -> `パイプラインスケジュール`から設定できます。

#### 変数
スケジュールの変数は、以下のように設定してください。
| 動作   | key              | value    |
|--------|------------------|----------|
| 起動   | `SCHEDULE_TYPE`  | `start`    |
| 停止   | `SCHEDULE_TYPE`  | `stop`     |

#### Cronの設定

Cronのタイムゾーンはお好みで構いません。私は`[UTC+9] Tokyo`にしました。
タイムゾーンの設定によって後述するcrontabの設定が変わります。

#### 定期実行

**日本時間の**平日 10:00 ~ 19:00にサーバーを起動したい場合、以下のようになります。
タイムゾーンにあわせて設定してください。


| 名前   | 間隔              |
|--------|------------------|
| 起動   | `0 10 * * 1-5`  |
| 停止   | `0 19 * * 1-5`  |

`間隔` には Cron 形式の時刻指定を入力します。書式は次の順番です。

`分 時 日 月 曜日`

- 分: `0-59`
- 時: `0-23`
- 日: `1-31`
- 月: `1-12`
- 曜日: `0-7`(`0` と `7` は日曜日、`1-5` は月曜日から金曜日)


よく使う記号も覚えておくと便利です。

- `*`: すべて(毎日、毎月など)
- `-`: 範囲(例: `1-5`)
- `,`: 複数指定(例: `1,3,5`)
- `/`: 間隔指定(例: `*/10` は 10 分ごと)


## おわり

少しでも停止しておくだけで、節約になります！
節約した利用料で良きAIライフを！
