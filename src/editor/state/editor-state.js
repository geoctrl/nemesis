import SimpleState from '@geoctrl/simple-state';
import { SCALE_MODES, settings } from 'pixi.js';
import { CanvasSprite } from '../canvas/canvas-sprite';

settings.SCALE_MODE = SCALE_MODES.NEAREST;

/**
 * Default State
 * -------------
 * zoom:              editor zooming
 * activeSceneId:     id of active scene
 * pixiApplication    pixi application instance
 * spriteSelector     box to show selection
 * selectedSprite     selected sprite
 */
const defaultState = {
  zoom: 1,
  activeSceneId: null,
  pixiApplication: null,
  sprites: [],
  spriteSelector: null,
};

class EditorState extends SimpleState {
  spriteAdd = (asset, x, y) => {
    const sprite = new CanvasSprite(asset, Math.round(x / 2), Math.round(y / 2));
    this.state.pixiApplication.stage.addChild(sprite.container);
  }
  spriteSelect = (x, y, width, height) => {
    this.state.spriteSelector
    console.log(x, y, width, height)
  }
}

export const editorState = new EditorState(defaultState);