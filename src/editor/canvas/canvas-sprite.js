import { Sprite, Texture } from 'pixi.js';

export class CanvasSprite {
  constructor(asset) {
    this.asset = asset;
    this.texture = Texture.from(asset.url);
    this.container = new Sprite(this.texture);
  }
}