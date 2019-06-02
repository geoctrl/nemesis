import React, { Component, createRef } from 'react';
import { number } from 'prop-types';
import { Scoped, k } from 'kremling';
import { Application } from "pixi.js";

import { editorState } from './state/editor.state';

export class CanvasComponent extends Component {
  constructor(props) {
    super(props);
    this.canvasWrapperRef = createRef();
    window.addEventListener('resize', () => {
      const { clientWidth, clientHeight } = this.canvasWrapperRef.current;
      this.pixiApplication.renderer.resize(clientWidth, clientHeight);
      this.viewer.update();
    })
  }

  static propTypes = {
    parentWidth: number,
  }

  componentDidUpdate(prevProps) {
    if (prevProps.parentWidth !== this.props.parentWidth) {
      const { clientWidth } = this.canvasWrapperRef.current;
      this.pixiApplication.renderer.resize(clientWidth, this.canvasEl.height);
      this.viewer.update();
    }
  }

  componentDidMount() {
    const { clientWidth, clientHeight } = this.canvasWrapperRef.current;

    this.pixiApplication = new Application({
      antialias: true,
      resolution: 1,
      width: clientWidth,
      height: clientHeight,
      backgroundColor: 0x484C50,
    });

    this.canvasEl = this.canvasWrapperRef.current.appendChild(this.pixiApplication.view);

    editorState.init(this.canvasEl, this.pixiApplication);
    this.viewer = editorState.state.viewer;
    this.viewer.width = 1920;
    this.viewer.height = 1080;
    this.viewer.scale = 4;
  }

  render() {
    return (
      <Scoped css={css}>
        <div
          className="canvas-layout"
          ref={this.canvasWrapperRef}
        >
        </div>
      </Scoped>
    );
  }
}

const css = k`
  .canvas-layout {
    flex-grow: 1;
    overflow: hidden;
    position: relative;
    height: 100%;
    border-top: solid .1rem var(--color-grey-920);
  }
`;