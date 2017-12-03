# syg-jp-social-share

日本向けのソーシャルシェアボタンのリンクを作成。

## Description

日本の主要なソーシャルサービスのシェアボタンを作成。画像など装飾は一切ないので、自分のオリジナルボタンを作りたい方向け。

※主要かどうかは作者の主観です。

### 対応サービス

- Twitter
- Facebook
- LINE
- Feedly
- Pocket
- はてなブックマーク
- Google+

自分でサービスを追加することも可能です。

## Usage

[DEMO](demo/)

### Install
```sh
npm install syg-jp-social-share
```

### html
```html
<ul>
    <li><a href="#" class="js-social-share"
            data-share-service="twitter"
            data-share-account="sygnas"
            data-share-follow="anime_shingeki"
            data-share-url="http://google.com/"
            data-share-msg="Hello world."
            >Twitter</a></li>

    <!-- data-share-url、data-share-msg が設定されていない場合はそのページのURL、タイトルが使われる -->
    <li><a href="#" class="js-social-share"
            data-share-service="facebook">Facebook</a></li>
</ul>
```

### Script
```JavaScript
import social_share from 'syg-jp-social-share';

social_share('.js-social-share');
```

## Data attributes

| data属性 | 初期値 | 説明 |
| --- | --- | --- |
| data-share-service |  | ソーシャルサービス名<br>（twitter / facebook / line / feedly / pocket / hatebu / google） |
| data-share-url | location.href | シェアしたいURL |
| data-share-msg | document.title | メッセージ |
| data-share-account |  | Twitter専用 / Replyに入れるアカウント |
| data-share-follow |  | Twitter専用 / ツイート後にフォローを促すアカウント |


## Options

```javascript
const options = {
    window: {
        width: 500,
        height: 450
    },
    facebook: 'http://www.facebook.com/share.php?u={{URL}}'
}
social_share('.js-social-share', options);
```

| 項目 | 説明 |
| ---- | ---- |
| window | window.open() で使用するパラメータのオブジェクト |
| twitter | Twitter シェア用テンプレート |
| facebook | Facebook シェア用テンプレート |
| line | LINE シェア用テンプレート |
| feedly | Feedly シェア用テンプレート |
| pocket | pocket シェア用テンプレート |
| hatebu | はてなブックマークシェア用テンプレート |
| google | Google+ シェア用テンプレート |

### Default
```javascript
const defaults = {
    // window.open() のオプション
    window: {
        width: 550,
        height: 450,
        personalbar: 0,
        toolbar: 0,
        scrollbars: 1,
        resizable: 1
    },
    // シェア用URLのテンプレート
    twitter: 'http://twitter.com/share?url={{URL}}&text={{MESSAGE}}&via={{ACCOUNT}}&related={{FOLLOW}}',
    facebook: 'http://www.facebook.com/share.php?u={{URL}}',
    line: 'line://msg/text/{{MESSAGE}} {{URL}}',
    feedly: 'http://feedly.com/i/subscription/feed/{{URL}}',
    pocket: 'http://getpocket.com/edit?url={{URL}}',
    hatebu: '//b.hatena.ne.jp/add?mode=confirm&url={{URL}}&title={{MESSAGE}}',
    google: 'https://plus.google.com/share?url={{URL}}'
};
```
### Customize

登録されていないサービスを追加することも可能です。

```javascript
const options = {
    // 追加したいサービス
    // {サービス名} : '{テンプレート文字列}'
    foobar: 'http://foo.bar/share.php?url={{URL}}&msg={{MESSAGE}}'
}
social_share('.js-social-share', options);
```

#### Parameter

| 項目 | 説明 |
| --- | --- |
| {{URL}} | data-share-url 属性を反映 |
| {{MESSAGE}} | data-share-message 属性を反映 |
| {{ACCOUNT}} | data-share-account 属性を反映 |
| {{FOLLOW}} | data-share-follow 属性を反映 |

## License
MIT