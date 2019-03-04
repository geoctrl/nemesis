import React from 'react';
import ReactDOM from 'react-dom';
import { Application } from "pixi.js";

import './styles/main.scss';
import { Root } from './root.component';
import { getGame } from './core/games-api';
import { getAssets } from './core/assets-api';
import { assetsState } from './editor/state/assets-state';
import { gameState } from "./editor/state/game-state";
import { editorState } from './editor/state/editor-state';

Promise.all([getGame(1), getAssets()]).then(([game, assets]) => {
  gameState.set(game);
  assetsState.set({ assets });
  const activeScene = gameState.state.scenes[0];
  editorState.set({
    activeSceneId: activeScene.id,
    pixiApplication: new Application({
      antialias: true,
      resolution: gameState.state.scale,
      forceCanvas: true,
      width: activeScene.width,
      height: activeScene.height,
    }),
  });

  ReactDOM.render(<Root />, document.querySelector('#app'));
})