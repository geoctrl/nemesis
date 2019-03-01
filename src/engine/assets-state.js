import SimpleState from '@geoctrl/simple-state';
import { getAssets } from '../core/assets-api';

class AssetsState extends SimpleState {
  constructor(config) {
    super(config);
  }
  get() {
    return getAssets().then(
      assets => {
        this.set({ assets })
        return assets;
      }
    );
  }
}

export const assetsState = new AssetsState({
  assets: [],
})