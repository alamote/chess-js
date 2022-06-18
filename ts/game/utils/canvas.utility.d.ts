export interface DrawOptions {
    stroke?: boolean;
    line_width?: number;
    line_color?: string;
    fill?: boolean;
    fill_color?: string;
    shadow_blur?: number;
    shadow_color?: string;
    text_align?: CanvasTextAlign;
    text_valign?: CanvasTextBaseline;
    font?: string;
}
export declare class CanvasUtility {
    static circle(context: CanvasRenderingContext2D, x: number, y: number, radius: number, options?: DrawOptions): void;
    static rect(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, options?: DrawOptions): void;
    static roundedRect(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number, options?: DrawOptions): void;
    static text(context: CanvasRenderingContext2D, text: string, x: number, y: number, options?: DrawOptions): void;
    static image(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, path: string, options?: DrawOptions, callback?: () => void): void;
    private static draw;
    private static reset;
}
