import React from 'react';
import { useCss } from 'kremling';
import { Tool } from "./tool";
import { AssetsTool } from "../tools/assets-tool";

export function Sidebar() {
  const scope = useCss(css);
  return (
    <div {...scope} className="sidebar">
      <Tool title="Assets">
        <AssetsTool/>
      </Tool>
    </div>
  );
}

Sidebar.propTypes = {};

const css = `
  & .sidebar {
    width: 30rem;
    flex-grow: 0;
    flex-shrink: 0;
    background-color: var(--color-grey-900);
    color: var(--color-grey-100);
  }
`;