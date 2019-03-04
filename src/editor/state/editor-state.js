import SimpleState from '@geoctrl/simple-state';
import { SCALE_MODES, settings } from 'pixi.js';

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
};

class EditorState extends SimpleState {

}

export const editorState = new EditorState(defaultState);