import { Container, Graphics } from 'pixi.js';

const gridColor = 0x000000;
const gridAlpha = .1;

export class Grid {
  constructor(width, height, spacing) {
    this.container = new Container();
    this.width = width;
    this.height = height;
    this.spacing = spacing;

    const xLines = Array.from({ length: Math.floor(this.width / this.spacing)}, (k, i) => i);
    const yLines = Array.from({ length: Math.floor(this.height / this.spacing)}, (k, i) => i);

    xLines.forEach((k) => {
      const line = new Graphics();
      line.lineStyle(1, gridColor);
      line.moveTo(((k + 1) * this.spacing) - .5, 0);
      line.lineTo(((k + 1) * this.spacing) - .5, height);
      this.container.addChild(line);
    });

    yLines.forEach((k) => {
      const line = new Graphics();
      line.lineStyle(1, gridColor);
      line.moveTo(0, ((k + 1) * this.spacing) - .5);
      line.lineTo(width, ((k + 1) * this.spacing) - .5);
      this.container.addChild(line);
    });

    this.container.alpha = gridAlpha;
  }
}