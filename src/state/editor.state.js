import SimpleState from '@geoctrl/simple-state';
import { Container } from 'pixi.js';

import { Viewer } from '../canvas/viewer.canvas';
import { Selection } from '../canvas/selection.canvas';

const initState = {
  pixiApplication: null,
  canvasEl: null,
  scale: 4,
  gridSpacing: 32,
  gridShow: true,
  viewer: null,
  viewContainer: null,
  assetContainer: null,
  selection: null,
};

class EditorState extends SimpleState {
  init = (canvasEl, pixiApplication) => {
    const { gridSpacing, gridShow } = this.state;
    const viewer = new Viewer(canvasEl, null, null, {
      gridShow,
      gridSpacing,
    });
    const { viewContainer, scrollContainer } = viewer;
    const assetContainer = new Container();
    const selection = new Selection();
    pixiApplication.stage.addChild(viewContainer);
    pixiApplication.stage.addChild(scrollContainer);
    pixiApplication.stage.addChild(selection.container);
    viewContainer.addChild(assetContainer);
    this.set({
      canvasEl,
      pixiApplication,
      viewer,
      viewContainer,
      assetContainer,
      selection,
    });
  }

  setScale = (scale) => {
    this.set({ scale });
    this.state.viewer.scale = scale;
  }
  setGridShow = (gridShow) => {
    this.set({ gridShow });
    this.state.viewer.gridShow = gridShow;
  }
  setGridSpacing = (gridSpacing) => {
    this.set({ gridSpacing });
    this.state.viewer.gridSpacing = gridSpacing;
  }
  addChild = (child, index) => {
    this.state.assetContainer.addChildAt(child, index);
  }

  selection = (item) => {
    this.state.selection.draw(item);
  }
}

export const editorState = new EditorState(initState);