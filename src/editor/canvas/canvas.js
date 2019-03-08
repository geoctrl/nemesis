import React, { Component, createRef } from 'react';
import { Application, SCALE_MODES, settings, Sprite, Texture } from "pixi.js";
import { Scoped } from 'kremling';

import { CanvasScroll } from "./canvas-scroll";
import { editorState } from '../state/editor-state';
import { gameState } from '../state/game-state';
import { assetsState } from '../state/assets-state';

export class Canvas extends Component {
  constructor(props) {
    super(props);
    const { width, height } = gameState.getActiveScene();
    this.state = {
      canvasSize: { width, height },
    };

    this.canvasWrapperRef = createRef();
  }

  componentDidMount() {
    this.init();
    const scenesObserver = gameState.subscribe(() => {
      const { width, height } = gameState.getActiveScene();
      editorState.state.pixiApplication.renderer.resize(width, height);
      this.setState({ canvasSize: { width, height } })
    }, 'scenes');
    return scenesObserver.unsubscribe;
  }

  init = () => {
    const application = editorState.state.pixiApplication;
    application.renderer.backgroundColor = gameState.state.backgroundColor;
    const canvasEl = this.canvasWrapperRef.current.appendChild(application.view);
  }

  onDrop = (e) => {
    e.preventDefault();
    const asset = JSON.parse(e.dataTransfer.getData('text/plain'));
    console.log(asset.id);
  }

  onDragOver = (e) => {
    e.preventDefault();
  }

  render() {
    const { canvasSize } = this.state;
    return (
      <Scoped css={css}>
        <div  className="canvas-layout">
          <CanvasScroll width={canvasSize.width} height={canvasSize.height}>
            <div
              className="canvas-container"
              style={{ width: canvasSize.width, height: canvasSize.height }}
              onDrop={this.onDrop}
              onDragOver={this.onDragOver}
              ref={this.canvasWrapperRef}
            />
          </CanvasScroll>
        </div>
      </Scoped>
    );
  }
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