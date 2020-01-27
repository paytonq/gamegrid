# gamegrid
A gamegrid for an IO-style browser game.

![image](https://user-images.githubusercontent.com/59527089/73162388-86e11900-40a2-11ea-9a4f-cd3993710bef.png)


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
