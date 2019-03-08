import React, { Component } from 'react';
import { Scoped } from 'kremling';

export class Tool extends Component {
  render() {
    const { title, children } = this.props;
    return (
      <Scoped css={css}>
        <div className="tool">
          <div className="tool__title">
            {title}
          </div>
          {children}
        </div>
      </Scoped>
    );
  }
}

const css = `
  & .tool {
    border-radius: .8rem;
  }
  
  & .tool__title {
    font-size: 1.2rem;
    font-weight: 700;
    text-transform: uppercase;
  }
`;