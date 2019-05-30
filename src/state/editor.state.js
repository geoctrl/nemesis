import SimpleState from '@geoctrl/simple-state';

const initState = {
  scale: 1,
  gridSpacing: 32,
  gridShow: false,
  pixiApplication: null,
  canvasEl: null,
  viewContainer: null,
  assetContainer: null,
  viewer: null,
  selection: [],
};

class EditorState extends SimpleState {
  setScale(scale) {
    this.set({ scale });
    this.state.viewer.scale = scale;
  }
  setGridShow(gridShow) {
    this.set({ gridShow });
    this.state.viewer.gridShow = gridShow;
  }
  setGridSpacing(gridSpacing) {
    this.set({ gridSpacing });
    this.state.viewer.gridSpacing = gridSpacing;
  }

  addChild = (child, index) => {
    this.state.assetContainer.addChildAt(child, index);
  }
}

export const editorState = new EditorState(initState);