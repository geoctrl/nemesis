import React from 'react';
import { useCss } from 'kremling';

export function Tool(props) {
  const scope = useCss(css);
  return (
    <div {...scope} className="tool">
      <div className="tool__title">
        {props.title}
      </div>
      {props.children}
    </div>
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