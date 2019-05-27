import React, { Component, createRef } from 'react';
import { Scoped, k } from 'kremling';
import { Application, Graphics } from "pixi.js";
import { Scroll } from './canvas/scroll.canvas';
import { Grid } from './canvas/grid.canvas';

const gameWidth = 600;
const gameHeight = 400;

export class CanvasComponent extends Component {
  constructor(props) {
    super(props);
    this.canvasWrapperRef = createRef();
    window.addEventListener('resize', () => {
      const { clientWidth, clientHeight } = this.canvasWrapperRef.current;
      this.application.renderer.resize(clientWidth, clientHeight);
      this.scroll.update();
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.size !== this.props.size) {
      const { clientWidth } = this.canvasWrapperRef.current;
      this.application.renderer.resize(clientWidth, this.canvasEl.height);
      this.scroll.update();
    }
  }

  componentDidMount() {
    const { clientWidth, clientHeight } = this.canvasWrapperRef.current;

    // pixi app
    this.application = new Application({
      antialias: true,
      resolution: 1,
      width: clientWidth,
      height: clientHeight,
      backgroundColor: 0x3E4042,
    });

    // canvas element
    this.canvasEl = this.canvasWrapperRef.current.appendChild(this.application.view);

    // Scroll instance
    this.scroll = new Scroll(this.canvasEl, gameWidth, gameHeight);
    const { viewContainer, scrollContainer } = this.scroll;
    const grid = new Grid(gameWidth, gameHeight, 32);

    // view container - add all content into this
    this.application.stage.addChild(viewContainer);
    this.application.stage.addChild(scrollContainer);
    viewContainer.addChild(grid.container);
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
  }
  
  .canvas-layout canvas {
  }
  
`;