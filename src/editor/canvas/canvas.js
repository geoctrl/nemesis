import React, { useEffect, useRef, useState } from 'react';
import { Application, SCALE_MODES, settings, Sprite, Texture } from "pixi.js";
import { useCss } from 'kremling';

import { CanvasScroll } from "./canvas-scroll";
import { editorState } from '../state/editor-state';
import { gameState } from '../state/game-state';
import { assetsState } from '../state/assets-state';

export function Canvas() {
  const activeScene = gameState.state.scenes.find(scene => scene.id === editorState.state.activeSceneId);
  const [canvasSize, updateCanvasSize] = useState({
    width: activeScene.width,
    height: activeScene.height,
  });
  const canvasWrapperRef = useRef(null);
  const scope = useCss(css);

  useEffect(() => {
    init();
    const scenesObserver = gameState.subscribe(({ scenes }) => {
      const activeScene = scenes.find(scene => scene.id === editorState.state.activeSceneId);
      console.log('active', activeScene)
      editorState.state.pixiApplication.renderer.resize(activeScene.width, activeScene.height);
      updateCanvasSize({
        width: activeScene.width,
        height: activeScene.height,
      });
    }, 'scenes');
    return scenesObserver.unsubscribe;
  }, []);

  const init = () => {
    const application = editorState.state.pixiApplication;
    application.renderer.backgroundColor = gameState.state.backgroundColor;

    let texture = Texture.from(assetsState.state.assets[0].url);
    let sprite = new Sprite(texture);
    sprite.x = 100;
    sprite.y = 100;
    application.stage.addChild(sprite);

    const canvasEl = canvasWrapperRef.current.appendChild(application.view);
  }

  function onDrop(e) {
    e.preventDefault();
    const asset = JSON.parse(e.dataTransfer.getData('text/plain'));
    console.log(asset.id);
  }

  function onDragOver(e) {
    e.preventDefault();
  }

  return (
    <div {...scope} className="canvas-layout">
      <CanvasScroll width={canvasSize.width} height={canvasSize.height}>
        <div
          className="canvas-container"
          style={{ width: canvasSize.width, height: canvasSize.height }}
          onDrop={onDrop}
          onDragOver={onDragOver}
          ref={canvasWrapperRef}
        />
      </CanvasScroll>
    </div>
  );
}

const css = `
  & .canvas-layout {
    flex-grow: 1;
    overflow: hidden;
    position: relative;
    height: 100%;
  }
  
  & .canvas-container {
    overflow: hidden;
  }
`;