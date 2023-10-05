# syg-jp-social-share

日本向けのソーシャルシェアボタンのリンクを作成。

## Description

日本の主要なソーシャルサービスのシェアボタンを作成。画像など装飾は一切ないので、自分のオリジナルボタンを作りたい方向け。

※主要かどうかは作者の主観です。

## Release

- 2023.08.16
  - 「X」対応（URLはTwitterのまま）
- 2021.11.27
  - ブラウザ版削除
- 2021.11.23
  - TypeScriptで作り直し
  - class形式にしたので呼び出し方法が変更になった
  - 任意のサービスの追加機能は無くした
  - Google+を除外
- 2019.10.17
  - API、`openShareWindow()`を追加


### 対応サービス

- Twitter（X）
- Facebook
- LINE
- Feedly
- Pocket
- はてなブックマーク


## Usage

[DEMO](demo/)

### Install
```sh
npm install --save @sygnas/jp-social-share
```

### html
```html
<a href="#" class="js-social-share"
    data-share-service="twitter"
    data-share-account="sygnas"
    data-share-follow="sygnas"
    data-share-url="http://google.com/"
    data-share-msg="Hello world."
>
  Twitter
</a>

<!-- data-share-url、data-share-msg が設定されていない場合
そのページのURL、タイトルが使われる -->
<a href="#" class="js-social-share"
    data-share-service="facebook">
  Facebook
</a>

<button class="js-test">スクリプトから開く</button>
```

### Script：静的なボタンから
```JavaScript
import socialShare from '@sygnas/jp-social-share';

// HTML上に設置しているリンクから開くパターン
socialShare.setShareButton('.js-social-share');
```

### Script：動的に開く1

Vueなどで動的に生成されるボタンから使いたいときは下記のようにする。

```JavaScript
<template>
...
<a href="#" @click.prevent="share"
            data-share-service="twitter"
            data-share-account="sygnas"
            data-share-follow="anime_shingeki"
            data-share-url="http://google.com/"
            data-share-msg="Hello world."
            >Twitter</a>
...
</template>

<script>
import socialShare from '@sygnas/jp-social-share';

export default {
  methods: {
    share(e) {
      socialShare.openShareWindowWithElement(e.target);
    }
  },
}
```


### Script：動的に開く2

ボタンなど用意せずに動的に開きたいパターン。

```html
<button class="js-test">シェアする</button>
```

```JavaScript
import socialShare from '@sygnas/jp-social-share';

const btn = document.querySelector('.js-test');

btn.addEventListener('click', (ev) => {
  socialShare.openShareWindow(socialShare.SERVICES.TWITTER, 'https://google.com', 'メッセージ');
});
```

## Data attributes

| data属性 | 初期値 | 説明 |
| --- | --- | --- |
| data-share-service |  | ソーシャルサービス名<br>（twitter / facebook / line / feedly / pocket / hatebu |
| data-share-url | location.href | シェアしたいURL |
| data-share-msg | document.title | メッセージ |
| data-share-account |  | Twitter専用 / Replyに入れるアカウント |
| data-share-follow |  | Twitter専用 / ツイート後にフォローを促すアカウント |


## Methods

### setShareButton

ボタンクリックでシェアウィンドウを開くよう設定。

```
static setShareButton(target: string, option: TOption = {}): void
```

| 引数 | 説明 |
| ---- | ---- |
| target | 対象ボタンのclassなど |
| option | ウィンドウサイズ、シェア実行URLの設定 |



```javascript
const options = {
    window: {
        width: 500,
        height: 450
    },
    service: {
      facebook: 'http://www.facebook.com/share.php?u={{URL}}',
    },
}
socialShare.setShareButton('.js-social-share', options);
```

#### Option

| 項目 | 説明 |
| ---- | ---- |
| window | window.open() で使用するパラメータのオブジェクト |
| services | 各サービスのシェア用テンプレート / twitter / facebook / line / feedly / pocket / hatebu |

#### Default
```javascript
const defaults = {
  window: {
    width: 550,
    height: 450,
    personalbar: 0,
    toolbar: 0,
    scrollbars: 1,
    resizable: 1,
  },
  // シェア用URLのテンプレート
  services: {
    twitter:
      'http://twitter.com/share?url={{URL}}&text={{MESSAGE}}&via={{ACCOUNT}}&related={{FOLLOW}}',
    facebook: 'http://www.facebook.com/share.php?u={{URL}}',
    line: 'line://msg/text/{{MESSAGE}} {{URL}}',
    feedly: 'http://feedly.com/i/subscription/feed/{{URL}}',
    pocket: 'http://getpocket.com/edit?url={{URL}}',
    hatebu: '//b.hatena.ne.jp/add?mode=confirm&url={{URL}}&title={{MESSAGE}}',
  },
};
```

### openShareWindowWithElement

エレメントから情報を取得してシェアウィンドウを開く。

```
static openShareWindowWithElement(elm: HTMLElement): void
```

### openShareWindow

パラメータを指定してシェアウィンドウを開く。

```
static openShareWindow(
  service: TService,
  url: string = '',
  message: string = '',
  account: string = '',
  follow: string = ''
): void
```

| 引数 | 説明 |
| ---- | ---- |
| service | ソーシャルサービス識別子 |
| url | シェアURL |
| message | メッセージ本文 |
| account | ツイートに付けるRepleyアカウント |
| follow | ツイート後に表示するフォロー候補アカウント |




## License
MIT