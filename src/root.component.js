import React, { useRef, useEffect, useState } from 'react';
import { Application, Texture, Sprite, SCALE_MODES, settings } from 'pixi.js';
import { Button } from 'comfy';
import { Scoped } from 'kremling';

import './canvas-state';
import { assetsState } from './engine/assets-state';
import { Sidebar } from "./editor/layout/sidebar";

settings.SCALE_MODE = SCALE_MODES.NEAREST;

export function Root() {
  const ratio = window.devicePixelRatio;
  const canvasWrapperRef = useRef(null);
  const [isInit, updateIsInit] = useState(false);

  useEffect(() => {
    if (!isInit) {
      updateIsInit(true);
      assetsState.getAssets();
      init();
    }
  });

  const init = () => {
    const application = new Application({
      antialias: true,
      resolution: 2,
      backgroundColor: 0xffffff,
      forceCanvas: true,
    });

    let texture = Texture.from('./temp_assets/barrel01.png');
    let sprite = new Sprite(texture);
    sprite.x = 100;
    sprite.y = 100;
    application.stage.addChild(sprite);

    const canvas = canvasWrapperRef.current.appendChild(application.view);
    console.log(canvas);
  }

  return (
    <Scoped css={css}>
      <div className="layout-container">
        <div
          className="layout-canvas"
          onDrop={e => console.log('files dropped', e)}
          ref={canvasWrapperRef}
        />
        <Sidebar />
      </div>
    </Scoped>
  );
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
  
  & .layout-canvas {
    flex-grow: 1;
    overflow: hidden;
  }
`;