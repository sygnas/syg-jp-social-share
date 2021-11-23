/**
 * 日本向けソーシャルシェアボタン
 *
 * @author   Hiroshi Fukuda <info.sygnas@gmail.com>
 * @license  MIT
 */
import { TService, TOption } from "./types";
declare class JpSocialShare {
    static SERVICES: {
        [key: string]: TService;
    };
    static opt: TOption;
    private static defaults;
    /**
     * シェアボタンのリンクを設定する
     * @param {String} target 対象ボタンのセレクタ
     * @param {Object} option 新規ウィンドウのパラメータ（defaults参照）
     */
    static setShareButton(target: string, option?: TOption): void;
    /**
     * エレメントから情報を取得してシェア用ウィンドウを開く
     */
    static openShareWindowWithElement(elm: HTMLElement): void;
    /**
     * シェア用ウィンドウを開く
     * @param service {String} ソーシャルサービス識別子
     * @param url {String} シェアURL
     * @param message {String} メッセージ本文
     * @param account {String} ツイートに付けるRepleyアカウント
     * @param follow {String} ツイート後に表示するフォロー候補アカウント
     */
    static openShareWindow(service: TService, url?: string, message?: string, account?: string, follow?: string): void;
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
    private static convertOpenUrl;
    /**
     * NodeListをArrayとして取り出す（IE対策）
     */
    private static getNodeArray;
    /**
     * Windowパラメータ作成
     * @param opt {Object} ウィンドウパラメータ
     * @return {String} 新規ウィンドウのパラメータ文字列
     */
    private static getWindowOption;
}
export default JpSocialShare;
