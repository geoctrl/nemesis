import React, { Component, createRef } from 'react';
import { number } from 'prop-types';
import { Scoped, k } from 'kremling';
import { Application, Graphics } from "pixi.js";
import { Viewer } from './canvas/viewer.canvas';

const gameWidth = 1920;
const gameHeight = 1080;

export class CanvasComponent extends Component {
  constructor(props) {
    super(props);
    this.canvasWrapperRef = createRef();
    window.addEventListener('resize', () => {
      const { clientWidth, clientHeight } = this.canvasWrapperRef.current;
      this.application.renderer.resize(clientWidth, clientHeight);
      this.viewer.update();
    })
  }

  static propTypes = {
    parentWidth: number,
  }

  componentDidUpdate(prevProps) {
    if (prevProps.parentWidth !== this.props.parentWidth) {
      const { clientWidth } = this.canvasWrapperRef.current;
      this.application.renderer.resize(clientWidth, this.canvasEl.height);
      this.viewer.update();
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
    this.viewer = new Viewer(this.canvasEl, gameWidth, gameHeight, { gridShow: true, gridSpacing: 50 });
    const { viewContainer, scrollContainer } = this.viewer;

    // view container - add all content into this
    this.application.stage.addChild(viewContainer);
    this.application.stage.addChild(scrollContainer);

    const circle = new Graphics();
    circle.beginFill(0xFF00FF);
    circle.drawCircle(300, 300, 100);
    circle.endFill();

    viewContainer.addChild(circle);

    setTimeout(() => {

    }, 2000);

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
`;