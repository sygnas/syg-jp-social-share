/**
 * 日本向けソーシャルシェアボタン
 *
 * @author   Hiroshi Fukuda <info.sygnas@gmail.com>
 * @license  MIT
 */

import { TService, TOption, TOptionWindow, TOptionWindowParam } from "./types";

class JpSocialShare {
  // サービス名識別子
  static SERVICES: { [key: string]: TService } = {
    TWITTER: 'twitter',
    FACEBOOK: 'facebook',
    LINE: 'line',
    FEEDLY: 'feedly',
    POCKET: 'pocket',
    HATEBU: 'hatebu',
  };

  static opt: TOption;

  private static defaults: TOption = {
    // window.open() のオプション
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

  ////////////////////////
  ////////////////////////

  /**
   * シェアボタンのリンクを設定する
   * @param {String} target 対象ボタンのセレクタ
   * @param {Object} option 新規ウィンドウのパラメータ（defaults参照）
   */
  static setShareButton(target: string, option: TOption = {}): void {
    // 設定のマージ
    this.opt = Object.assign(this.defaults, option);

    // クリックイベントを設定
    this.getNodeArray(document.querySelectorAll<HTMLElement>(target)).forEach(
      (elm) => {
        elm.addEventListener('click', (ev: Event) => {
          const elm = ev.currentTarget as HTMLElement;
          this.openShareWindowWithElement(elm);
          ev.preventDefault();
        });
      }
    );
  }

  /**
   * エレメントから情報を取得してシェア用ウィンドウを開く
   */
  static openShareWindowWithElement(elm: HTMLElement){
    // エレメントからパラメータを取得
    const service: TService = elm.getAttribute('data-share-service') as TService;
    const url: string = elm.getAttribute('data-share-url') || '';
    const message: string = elm.getAttribute('data-share-message') || document.title;
    const account: string = elm.getAttribute('data-share-account') || '';
    const follow: string = elm.getAttribute('data-share-follow') || '';

    // シェア用ウィンドウを開く
    this.openShareWindow(service, url, message, account, follow);
  }

  /**
   * シェア用ウィンドウを開く
   * @param service {String} ソーシャルサービス識別子
   * @param url {String} シェアURL
   * @param message {String} メッセージ本文
   * @param account {String} ツイートに付けるRepleyアカウント
   * @param follow {String} ツイート後に表示するフォロー候補アカウント
   */
  static openShareWindow(
    service: TService,
    url: string = '',
    message: string = '',
    account: string = '',
    follow: string = ''
  ): void {
    // 存在しないサービスだったらエラー
    if (
      this.opt.services &&
      Object.keys(this.opt.services).indexOf(service) === -1
    ) {
      console.log(`${service} is not supported.`);
      return;
    }

    // テンプレートからコンバート
    const openUrl: string = this.convertOpenUrl(
      service,
      url,
      message,
      account,
      follow
    );

    // LINEはアプリに飛ばす。それ以外はウィンドウを開く
    if (service === this.SERVICES.LINE) {
      window.location.href = openUrl;
    } else if (this.opt.window) {
      const windowOption = this.getWindowOption(this.opt.window);
      window.open(openUrl, `share_${service}`, windowOption);
    } else {
      console.log('Window option is not defined.');
      return;
    }
  }

  ////////////////////////
  ////////////////////////

  /**
   * サービス毎のURLを取得
   * パラメータによっては加工がされる
   * @param service {String} ソーシャルサービス識別子
   * @param url {String} シェアURL
   * @param message {String} メッセージ本文
   * @param account {String} ツイートに付けるRepleyアカウント
   * @param follow {String} ツイート後に表示するフォロー候補アカウント
   * @return {String} シェア窓オープンURL
   */
  private static convertOpenUrl(
    service: TService,
    url: string = '',
    message: string = '',
    account: string = '',
    follow: string = ''
  ): string {
    const eu = encodeURIComponent;

    const shareUrl = url || location.href;
    let openUrl = this.opt.services ? this.opt.services[service] : "";

    if (!openUrl) {
      console.log(`${service} is not supported.`);
      return "";
    }

    // Twitterだけパラメータの内容によってURLが変わる
    if (service === this.SERVICES.TWITTER) {
      if (!account) openUrl = openUrl.replace("&via={{ACCOUNT}}", "");
      if (!follow) openUrl = openUrl.replace("&related={{FOLLOW}}", "");
    }


    openUrl = openUrl.replace("{{ACCOUNT}}", eu(account));
    openUrl = openUrl.replace("{{FOLLOW}}", eu(follow));
    openUrl = openUrl.replace("{{MESSAGE}}", eu(message));
    openUrl = openUrl.replace("{{URL}}", eu(shareUrl));

    return openUrl;
  }

  /**
   * NodeListをArrayとして取り出す（IE対策）
   */
  private static getNodeArray(nodeList: NodeList) {
    return Array.prototype.slice.call(nodeList, 0);
  }

  /**
   * Windowパラメータ作成
   * @param opt {Object} ウィンドウパラメータ
   * @return {String} 新規ウィンドウのパラメータ文字列
   */
  private static getWindowOption(opt: TOptionWindow): string {
    const items: string[] = [];

    Object.keys(opt).forEach((key) => {
      items.push(`${key}=${opt[key as TOptionWindowParam]}`);
    });
    return items.join(",");
  }
}

export default JpSocialShare;
