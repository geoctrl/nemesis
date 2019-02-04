import SimpleState from '@geoctrl/simple-state';
import { getAssets } from '../resources/assets-resource';

class AssetsState extends SimpleState {
  constructor(config) {
    super(config);
  }
  getAssets() {
    getAssets().then(
      assets => this.set({ assets })
    );
  }
}

export const assetsState = new AssetsState({
  assets: [],
})