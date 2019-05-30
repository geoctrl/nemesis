import { Sprite as PixiSprite } from 'pixi.js';
import uuid from 'uuid/v4';

export class Sprite {
  constructor(asset) {
    this.id = uuid();
    this.name = asset.name;
    this.asset = asset;
    this.container = PixiSprite.from(asset.url);
    this.container.interactive = true;
  }

  events = () => {
    this.container.on('click', () => {
      console.log('click!')
    })
  }
}