# gamegrid
A gamegrid for an IO-style browser game.

![output](https://user-images.githubusercontent.com/59527089/73527621-33373e00-43c8-11ea-9918-7f307d237f26.gif)

## Usage
```typescript
import { GameGrid, GameGridConfig } from "@io-game-framework/gamegrid";

...

if (this.canvas.current) {
    const gameGridConfig: GameGridConfig = {
        canvasElement: this.canvas.current,
        lineCount: 50,
        lineSpacing: 30,
        mouseMovementBorder: 0.4,
        mouseMovementSpeedMultiplier: 3.5,
    };

    const grid = new GameGrid(gameGridConfig);
    grid.draw();
}
```
