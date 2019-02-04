import React from 'react';
import { Scoped } from 'kremling';

export function Tool(props) {
  return (
    <Scoped css={css}>
      <div className="tool">
        <div className="tool__title">
          {props.title}
        </div>
        {props.children}
      </div>
    </Scoped>
  );
}

Tool.propTypes = {};

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