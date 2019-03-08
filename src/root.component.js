import React, { Component } from 'react';
import { Button } from 'comfy';
import { Scoped } from 'kremling';
import { Application } from 'pixi.js';

import { Sidebar } from './editor/layout/sidebar';
import { Canvas } from './editor/canvas/canvas';
import { getGame } from './core/games-api';
import { getAssets } from './core/assets-api';
import { gameState } from './editor/state/game-state';
import { assetsState } from './editor/state/assets-state';
import { editorState } from './editor/state/editor-state';

export class Root extends Component {
  state = {
    loading: true,
  }

  componentDidMount() {
    Promise.all([getGame(1), getAssets()]).then(([game, assets]) => {

      // set game state
      gameState.set(game);

      // set asset state
      assetsState.set({ assets });

      // set editor state
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

      this.setState({ loading: false });
    })
  }

  render() {
    if (this.state.loading) return <div>loading</div>;

    return (
      <Scoped css={css}>
        <div className="layout-container">
          <Canvas />
          <Sidebar />
        </div>
      </Scoped>
    );
  }
}

const css = `
  & .layout-container {
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    min-height: 0;
  }  
`;