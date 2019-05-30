import SimpleState from '@geoctrl/simple-state';

const initState = {
  width: null,
  height: null,
  backgroundColor: null,
  scaleOffset: 3,
  assets: [],
};

class GameState extends SimpleState {}

export const gameState = new GameState(initState);