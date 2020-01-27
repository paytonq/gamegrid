export interface GameGridConfig {
    /**
     * The canvas element to draw on.
     */
    canvasElement: HTMLCanvasElement;

    /**
     * The spacing (in pixels) between the gridlines.
     */
    lineSpacing: number;

    /**
     * The number of lines to draw in both directions.
     */
    lineCount: number;

    /**
     * The percentage of the window (expressed as a decimal) from the edges,
     * on which mouse positioning should trigger grid movement.
     *
     * For example, if this is set to 0.4, 40% of the window (from the edges) will be zones where mouse placement will
     * cause movement.
     */
    mouseMovementBorder: number;

    /**
     * A value to control movement speed.
     * It is multiplied by the relative positioning of the mouse from the center of the window.
     */
    mouseMovementSpeedMultiplier: number;
}
