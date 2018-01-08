/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dist_jp_social_share_es__ = __webpack_require__(1);



__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__dist_jp_social_share_es__["a" /* default */])('.js-social-share');

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * 日本向けソーシャルシェアボタン
 *
 * @author   Hiroshi Fukuda <info.sygnas@gmail.com>
 * @license  MIT
 */

/* global location */
/* eslint no-restricted-globals: ["off", "location"] */
/* eslint no-empty: ["off"] */
/* eslint no-lone-blocks: ["off"] */

var SERVICE_TWITTER = 'twitter';
var defaults = {
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

/**
 * シェアボタンのリンクを設定する
 * @param {String} target 対象ボタンのセレクタ
 * @param {Object} options 新規ウィンドウのパラメータ（defaults参照）
 */
var index = function index(target, options) {
    // 設定のマージ
    var opt = Object.assign(defaults, options);

    // クリック動作
    get_node_array(document.querySelectorAll(target)).forEach(function (elm) {
        elm.addEventListener('click', function (e) {
            // シェア用ウィンドウを開く
            open_window(elm);
            e.preventDefault();
        });
    });

    /**
     * シェア用ウィンドウを開く
     * @param elm {Element} クリックしたエレメント
     */
    function open_window(elm) {
        // エレメントからパラメータを取得
        var service = elm.getAttribute('data-share-service');
        var account = elm.getAttribute('data-share-account') || '';
        var follow = elm.getAttribute('data-share-follow') || '';
        var message = elm.getAttribute('data-share-message') || document.title;
        var url = elm.getAttribute('data-share-url') || location.href;

        // 存在しないサービスだったら抜ける
        if (Object.keys(opt).indexOf(service) === -1) {
            console.log(service + ' is not supported.');
            return;
        }

        // テンプレートからコンバート
        var open_url = convert_open_url(service, account, follow, message, url);

        // LINEはアプリに飛ばす。それ以外はウィンドウを開く
        if (service === 'line') {
            window.location.href = open_url;
        } else {
            var window_opt = get_window_option(opt.window);
            window.open(open_url, 'share_' + service, window_opt);
        }
    }
    /**
     * サービス毎のURLを取得
     * パラメータによっては加工がされる
     * @param service {String} ソーシャルサービス識別子
     * @param account {String} ツイートに付けるRepleyアカウント
     * @param follow {String} ツイート後に表示するフォロー候補アカウント
     * @param message {String} メッセージ本文
     * @param url {String} シェアURL
     * @return {String} シェア窓オープンURL
     */
    function convert_open_url(service, account, follow, message, url) {
        var eu = encodeURIComponent;
        var open_url = opt[service];

        // Twitterだけパラメータの内容によってURLが変わる
        if (service === SERVICE_TWITTER) {
            if (!account) open_url = open_url.replace('&via={{ACCOUNT}}', '');
            if (!follow) open_url = open_url.replace('&related={{FOLLOW}}', '');
        }

        open_url = open_url.replace('{{ACCOUNT}}', eu(account));
        open_url = open_url.replace('{{FOLLOW}}', eu(follow));
        open_url = open_url.replace('{{MESSAGE}}', eu(message));
        open_url = open_url.replace('{{URL}}', eu(url));

        return open_url;
    }
};

/**
 * Element.matches() polyfill
 */
if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function (s) {
        var matches = (this.document || this.ownerDocument).querySelectorAll(s);
        var i = matches.length;
        do {
            i -= 1;
        } while (i >= 0 && matches.item(i) !== this);return i > -1;
    };
}

/**
 * NodeListをArrayとして取り出す（IE対策）
 */
function get_node_array(node_list) {
    return Array.prototype.slice.call(node_list, 0);
}

/**
 * Windowパラメータ作成
 * @param opt {Object} ウィンドウパラメータ
 * @return {String} 新規ウィンドウのパラメータ文字列
 */
function get_window_option(opt) {
    var items = [];
    Object.keys(opt).forEach(function (key) {
        items.push(key + '=' + opt[key]);
    });
    return items.join(',');
}

/* harmony default export */ __webpack_exports__["a"] = (index);
//# sourceMappingURL=jp-social-share.es.js.map

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ })
/******/ ]);