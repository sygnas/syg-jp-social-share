import { defineProperty as _defineProperty, createClass as _createClass, classCallCheck as _classCallCheck } from './_virtual/_rollupPluginBabelHelpers.js';

/**
 * 日本向けソーシャルシェアボタン
 *
 * @author   Hiroshi Fukuda <info.sygnas@gmail.com>
 * @license  MIT
 */
var JpSocialShare = /*#__PURE__*/function () {
  function JpSocialShare() {
    _classCallCheck(this, JpSocialShare);
  }

  _createClass(JpSocialShare, null, [{
    key: "setShareButton",
    value: // サービス名識別子
    ////////////////////////
    ////////////////////////

    /**
     * シェアボタンのリンクを設定する
     * @param {String} target 対象ボタンのセレクタ
     * @param {Object} option 新規ウィンドウのパラメータ（defaults参照）
     */
    function setShareButton(target) {
      var _this = this;

      var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      // 設定のマージ
      this.opt = Object.assign(this.defaults, option); // クリックイベントを設定

      this.getNodeArray(document.querySelectorAll(target)).forEach(function (elm) {
        elm.addEventListener('click', function (ev) {
          var elm = ev.currentTarget;

          _this.openShareWindowWithElement(elm);

          ev.preventDefault();
        });
      });
    }
    /**
     * エレメントから情報を取得してシェア用ウィンドウを開く
     */

  }, {
    key: "openShareWindowWithElement",
    value: function openShareWindowWithElement(elm) {
      // エレメントからパラメータを取得
      var service = elm.getAttribute('data-share-service');
      var url = elm.getAttribute('data-share-url') || '';
      var message = elm.getAttribute('data-share-message') || document.title;
      var account = elm.getAttribute('data-share-account') || '';
      var follow = elm.getAttribute('data-share-follow') || ''; // シェア用ウィンドウを開く

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

  }, {
    key: "openShareWindow",
    value: function openShareWindow(service) {
      var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var message = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      var account = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
      var follow = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';

      // 存在しないサービスだったらエラー
      if (this.opt.services && Object.keys(this.opt.services).indexOf(service) === -1) {
        console.log("".concat(service, " is not supported."));
        return;
      } // テンプレートからコンバート


      var openUrl = this.convertOpenUrl(service, url, message, account, follow); // // LINEはアプリに飛ばす。それ以外はウィンドウを開く
      // if (service === this.SERVICES.LINE) {
      //   window.location.href = openUrl;
      // } else if (this.opt.window) {

      if (this.opt.window) {
        var windowOption = this.getWindowOption(this.opt.window);
        window.open(openUrl, "share_".concat(service), windowOption);
      } else {
        console.log('Window option is not defined.');
        return;
      }
    } ////////////////////////
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

  }, {
    key: "convertOpenUrl",
    value: function convertOpenUrl(service) {
      var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var message = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      var account = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
      var follow = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';
      var eu = encodeURIComponent;
      var shareUrl = url || location.href;
      var openUrl = this.opt.services ? this.opt.services[service] : "";

      if (!openUrl) {
        console.log("".concat(service, " is not supported."));
        return "";
      } // Twitterだけパラメータの内容によってURLが変わる


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

  }, {
    key: "getNodeArray",
    value: function getNodeArray(nodeList) {
      return Array.prototype.slice.call(nodeList, 0);
    }
    /**
     * Windowパラメータ作成
     * @param opt {Object} ウィンドウパラメータ
     * @return {String} 新規ウィンドウのパラメータ文字列
     */

  }, {
    key: "getWindowOption",
    value: function getWindowOption(opt) {
      var items = [];
      Object.keys(opt).forEach(function (key) {
        items.push("".concat(key, "=").concat(opt[key]));
      });
      return items.join(",");
    }
  }]);

  return JpSocialShare;
}();

_defineProperty(JpSocialShare, "SERVICES", {
  TWITTER: 'twitter',
  FACEBOOK: 'facebook',
  LINE: 'line',
  FEEDLY: 'feedly',
  POCKET: 'pocket',
  HATEBU: 'hatebu'
});

_defineProperty(JpSocialShare, "opt", void 0);

_defineProperty(JpSocialShare, "defaults", {
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
  services: {
    twitter: 'http://twitter.com/share?url={{URL}}&text={{MESSAGE}}&via={{ACCOUNT}}&related={{FOLLOW}}',
    facebook: 'http://www.facebook.com/share.php?u={{URL}}',
    // line: 'line://msg/text/{{MESSAGE}} {{URL}}',
    line: 'https://social-plugins.line.me/lineit/share?url={{URL}}',
    feedly: 'http://feedly.com/i/subscription/feed/{{URL}}',
    pocket: 'http://getpocket.com/edit?url={{URL}}',
    hatebu: '//b.hatena.ne.jp/add?mode=confirm&url={{URL}}&title={{MESSAGE}}'
  }
});

export { JpSocialShare as default };
//# sourceMappingURL=index.js.map
