import { Graphics } from 'pixi.js';

export class CanvasSelect {
  constructor() {
    this.container = new Graphics();
  }

  select = () => {
    this.container.lineStyle(1, 0x53aef2);
    this.container.moveTo(10/2, 10/2);
    this.container.lineTo(200/2, 200/2);
    this.container.lineTo(10/2, 200/2);
  }
}