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
 */
const defaultState = {
  zoom: 1,
  activeSceneId: null,
  pixiApplication: null,
  sprites: [],
};

class EditorState extends SimpleState {
  addSprite = (asset) => {
    const sprite = new CanvasSprite(asset);
    this.state.pixiApplication.stage.addChild(sprite.container);
  }
}

export const editorState = new EditorState(defaultState);