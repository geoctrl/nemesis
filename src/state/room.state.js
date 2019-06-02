import SimpleState from '@geoctrl/simple-state';
import { editorState } from './editor.state';
import { gameState } from './game.state';

const initState = {
  width: 800,
  height: 600,
  hierarchy: [],
};

class RoomState extends SimpleState {
  addChild = (child, index) => {
    const i = index || this.state.hierarchy.length;
    this.set({
      hierarchy: [
        ...this.state.hierarchy.slice(0, i),
        child,
        ...this.state.hierarchy.slice(i + 1),
      ],
    });
    editorState.addChild(child.container, i);
  }
}

export const roomState = new RoomState(initState);