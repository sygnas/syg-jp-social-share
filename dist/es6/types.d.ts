declare type TService = "twitter" | "x" | "facebook" | "line" | "feedly" | "pocket" | "hatebu";
declare type TOptionWindowParam = "width" | "height" | "personalbar" | "toolbar" | "scrollbars" | "resizable";
declare type TOptionWindow = {
    width: number;
    height: number;
    personalbar: number;
    toolbar: number;
    scrollbars: number;
    resizable: number;
};
declare type TOption = {
    window?: TOptionWindow;
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
