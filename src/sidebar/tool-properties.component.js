import React, { Component } from 'react';
import { Scoped, k } from 'kremling';

export class ToolProperties extends Component {
  render() {
    return (
      <Scoped css={css}>
        <div className="tool">
          <div className="tool__header">
            Properties
          </div>
          <div className="tool__body">
          </div>
        </div>
      </Scoped>
    );
  }
}

const css = k`
`;