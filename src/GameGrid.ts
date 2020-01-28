/**
 * Copyright 2020 Payton Quinn
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { GameGridConfig } from "./GameGridConfig";

export class GameGrid {
    private canvasOrigin: [number, number] = [0.5, 0.5];
    private mouseOffset?: [number, number];
    private config: GameGridConfig;

    /**
     * Creates an instance of game grid.
     * @param config The configuration for the game grid.
     */
    public constructor(config: GameGridConfig) {
        this.config = config;
    }

    /**
     * Draws game grid
     */
    public draw() {
        window.addEventListener("resize", this.drawBoard.bind(this), false);
        window.addEventListener("mousemove", this.handleMouseMove.bind(this));

        this.drawBoard();
    }

    private handleMouseMove(event: MouseEvent) {
        this.mouseOffset = [event.offsetX, event.offsetY];
    }

    private drawBoard() {
        if (this.config.canvasElement) {
            const canvasElement = this.config.canvasElement;
            canvasElement.width = window.innerWidth;
            canvasElement.height = window.innerHeight;
            const boardContext = canvasElement.getContext("2d");

            if (boardContext) {
                boardContext.translate(this.canvasOrigin[0], this.canvasOrigin[1]);
                boardContext.fillStyle = "rgba(0, 0, 0, 0)";

                window.requestAnimationFrame(this.updateBoard.bind(this, boardContext));
            }
        }
    }

    private updateBoard(boardContext: CanvasRenderingContext2D) {
        window.requestAnimationFrame(this.updateBoard.bind(this, boardContext));

        boardContext.clearRect(
            -this.canvasOrigin[0],
            -this.canvasOrigin[1],
            boardContext.canvas.width,
            boardContext.canvas.height,
        );

        this.updateOriginLocation(boardContext);

        this.drawGrid(boardContext);
    }

    private updateOriginLocation(boardContext: CanvasRenderingContext2D) {
        if (this.mouseOffset) {
            const xPercentile = this.mouseOffset[0] / boardContext.canvas.width;
            const yPercentile = this.mouseOffset[1] / boardContext.canvas.height;
            const movementSpeedMultiplier = this.config.mouseMovementSpeedMultiplier;
            const mouseMovementBorder = this.config.mouseMovementBorder;
            const rightHandMouseMovementBorder = 1 - mouseMovementBorder;

            if (xPercentile < rightHandMouseMovementBorder
                && xPercentile > mouseMovementBorder
                && yPercentile < rightHandMouseMovementBorder
                && yPercentile > mouseMovementBorder) {
                return;
            }

            const deltaX = movementSpeedMultiplier * (0.5 - xPercentile);
            const deltaY = movementSpeedMultiplier * (0.5 - yPercentile);

            boardContext.translate(deltaX, deltaY);
            this.canvasOrigin[0] += deltaX;
            this.canvasOrigin[1] += deltaY;
        }
    }

    private drawGrid(boardContext: CanvasRenderingContext2D) {
        if (boardContext) {
            const lineCount = this.config.lineCount;
            const lineSpacing = this.config.lineSpacing;
            const totalDimensionSize = lineCount * lineSpacing;
            boardContext.lineWidth = 0.5;
            const leftBoundary = 0;
            const rightBoundary = totalDimensionSize;
            const topBoundary = 0;
            const bottomBoundary = totalDimensionSize;

            for (let i = 0; i <= lineCount; i++) {
                const curLineLocation = i * lineSpacing;

                // Horizontal lines
                boardContext.beginPath();
                boardContext.moveTo(leftBoundary, topBoundary + curLineLocation);
                boardContext.lineTo(rightBoundary, topBoundary + curLineLocation);
                boardContext.stroke();

                // Vertical lines
                boardContext.beginPath();
                boardContext.moveTo(leftBoundary + curLineLocation, topBoundary);
                boardContext.lineTo(leftBoundary + curLineLocation, bottomBoundary);
                boardContext.stroke();
            }
        }
    }
}
