import React, { useState, useRef, useEffect } from 'react';
import { number } from 'prop-types';
import { useCss, a } from 'kremling';

export function CanvasScroll({ children, width, height }) {
  const scrollEl = useRef(null);
  const scope = useCss(css);
  const [hover, updateHover] = useState(false);

  useEffect(() => {


    return () => {

    }
  }, [])

  return (
    <div
      {...scope}
      className={a('canvas-scroll').m('canvas-scroll--hover', hover)}
      onMouseOver={() => updateHover(true)}
      onMouseOut={() => updateHover(false)}
      onScroll={(e) => console.log(e)}
      ref={scrollEl}
    >
      <div
        className={a('canvas-scroller canvas-scroller__v').m('canvas-scroll--active', false)}
      ><div className="canvas-scroller__inner" /></div>
      <div
        className={a('canvas-scroller canvas-scroller__h').m('canvas-scroll--active', false)}
      ><div className="canvas-scroller__inner" /></div>
      {children}
    </div>
  );
}

CanvasScroll.propTypes = {
  width: number,
  height: number,
};

const css = `
  & .canvas-scroll {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
  
  & .canvas-scroller {
    position: absolute;    
    transition: opacity 200ms ease, background-color 200ms ease;
  }
  
  & .canvas-scroller__v {
    top: 0;
    right: 0;
    bottom: 0;
    width: 1.6rem;
    opacity: 0;
  }
  
  & .canvas-scroller__v .canvas-scroller__inner {
    position: absolute;
    width: .8rem;
    margin: 0 .4rem;
    border-radius: 1rem;
    background-color: rgba(0,0,0,.4);
    top: 0;
    right: 0;
  }

    & .canvas-scroller__h {
    bottom: 0;
    left: 0;
    right: 0;
    height: 1.6rem;
    opacity: 0;
  }
  
  & .canvas-scroller__h .canvas-scroller__inner {
    position: absolute;
    height: .8rem;
    margin: .4rem 0;
    border-radius: 1rem;
    background-color: rgba(0,0,0,.4);
    bottom: 0;
    left: 0;
  }
  
  & .canvas-scroll--hover .canvas-scroller__v {
    opacity: 1;
  }

  & .canvas-scroll--hover .canvas-scroller__h {
    opacity: 1;
  }
`;