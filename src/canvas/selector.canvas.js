import { Graphics } from 'pixi.js';

export class Selector {
  constructor(width, height, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.box = new Graphics();
  }

  update = () => {
    this.box.clear();
    this.box.lineStyle(1, 0xFF00FF, 1, 1);
    this.box.drawRect(this.x, this.y, this.width, this.height);
  }
}