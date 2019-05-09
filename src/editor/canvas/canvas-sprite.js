import { Sprite, Texture } from 'pixi.js';
import { editorState } from '../state/editor-state';

export class CanvasSprite {
  constructor(asset, x, y) {
    this.asset = asset;
    this.texture = Texture.fromImage(asset.url);
    this.container = new Sprite(this.texture);
    this.container.x = Math.round(x - (asset.width / 2));
    this.container.y = Math.round(y - (asset.height / 2));
    this.container.interactive = true;
    this.container.on('click', () => {
      editorState.spriteSelect(this.container.x, this.container.y, this.texture.width, this.texture.height);
    });
  }


}