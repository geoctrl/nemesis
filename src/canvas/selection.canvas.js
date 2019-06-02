import { Graphics } from 'pixi.js';
import { editorState } from '../state/editor.state';

export class Selection {
  constructor() {
    this.container = new Graphics();
    this.scale = editorState.state.scale;

    editorState.subscribe(({ scale }) => {
      this.scale = scale;
      if (this.item) {
        this.draw();
      }
    }, 'scale');
  }

  draw = (item) => {
    if (item) this.item = item;
    const { x, y, width, height } = this.item;
    this.container.clear();
    this.container.lineStyle(2, 0x6F9CEB, 1, 0);
    this.container.drawRect(x, y, width * this.scale, height * this.scale);
  }
}