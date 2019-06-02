import { Container, Sprite as PixiSprite } from 'pixi.js';
import uuid from 'uuid/v4';
import { editorState } from '../state/editor.state';

export class Sprite {
  constructor(asset) {
    this.id = uuid();
    this.name = asset.name;
    this.asset = asset;

    // container
    this.container = new Container();
    this.container.name = this.id;
    this.container.interactive = true;

    // sprite
    this.sprite = PixiSprite.from(asset.url);

    // selector
    this.container.addChild(this.sprite);

    this.events();
  }

  events = () => {
    this.container.on('click', () => {
      editorState.selection(this.container);
    })
  }
}