import React from 'react';
import { Button } from 'comfy';
import { useCss } from 'kremling';

import './canvas-state';
import { Sidebar } from './editor/layout/sidebar';
import { Canvas } from './editor/canvas/canvas';

export function Root() {
  const scope = useCss(css);
  return (
    <div {...scope} className="layout-container">
      <Canvas />
      <Sidebar />
    </div>
  );
}

const css = `
  & .layout-container {
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    min-height: 0;
  }  
`;