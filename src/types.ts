type TService =
  | "twitter"
  | "x"
  | "facebook"
  | "line"
  | "feedly"
  | "pocket"
  | "hatebu";

type TOptionWindowParam =
  | "width"
  | "height"
  | "personalbar"
  | "toolbar"
  | "scrollbars"
  | "resizable";

type TOptionWindow = {
  width: number;
  height: number;
  personalbar: number;
  toolbar: number;
  scrollbars: number;
  resizable: number;
};

type TOption = {
  window?: TOptionWindow;
  // シェア用URLのテンプレート
  services?: {
    x: string;
    twitter: string;
    facebook: string;
    line: string;
    feedly: string;
    pocket: string;
    hatebu: string;
  };
};

export type { TService, TOption, TOptionWindow, TOptionWindowParam };
