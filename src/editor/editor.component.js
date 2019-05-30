import React, { Component } from 'react';
import { Scoped, k } from 'kremling';

import { CanvasComponent } from '../canvas.component';
import { EditorToolbar } from './editor-toolbar.component';

export class Editor extends Component {
  componentWillUpdate(nextProps, nextState, nextContext) {
    return nextProps.size === this.props.size;
  }

  render() {
    const { parentWidth } = this.props;
    return (
      <Scoped css={css}>
        <div className="editor">

          <EditorToolbar />
          <CanvasComponent
            parentWidth={parentWidth}
          />
        </div>
      </Scoped>
    );
  }
}

const css = k`
  .editor {
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
  }
`;