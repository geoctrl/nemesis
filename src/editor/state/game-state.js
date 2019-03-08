import SimpleState from '@geoctrl/simple-state';
import { editorState } from './editor-state';

class GameState extends SimpleState {
  getActiveScene = () => {
    return this.state.scenes.find(scene => scene.id === editorState.state.activeSceneId);
  }
}

export const gameState = new GameState();