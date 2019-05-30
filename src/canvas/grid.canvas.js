import { Container, Graphics } from 'pixi.js';

const gridColor = 0xe3e3e3;
const gridAlpha = .1;

export class Grid {
  constructor(width, height, show, spacing) {
    this.container = new Container();
    this.width = width;
    this.height = height;
    this.spacing = spacing;
    this.show = show;
    this.update();
  }

  update = () => {
    this.container.removeChildren(0);

    if (this.show) {
      const xLines = Array.from({ length: Math.floor(this.width / this.spacing)}, (k, i) => i);
      const yLines = Array.from({ length: Math.floor(this.height / this.spacing)}, (k, i) => i);

      xLines.forEach((k) => {
        const line = new Graphics();
        line.lineStyle(1, gridColor);
        line.moveTo(((k + 1) * this.spacing) - .5, 0);
        line.lineTo(((k + 1) * this.spacing) - .5, this.height);
        this.container.addChild(line);
      });

      yLines.forEach((k) => {
        const line = new Graphics();
        line.lineStyle(1, gridColor);
        line.moveTo(0, ((k + 1) * this.spacing) - .5);
        line.lineTo(this.width, ((k + 1) * this.spacing) - .5);
        this.container.addChild(line);
      });
    }
  }

  setSizes = (width, height) => {
    this.width = width;
    this.height = height;
    this.update();
  }

  setSpacing = (spacing) => {
    this.spacing = spacing;
    this.update();
  }

  setShow = (show) => {
    this.show = show;
    this.update();
  }
}