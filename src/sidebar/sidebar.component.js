import React, { Component } from 'react';
import { Scoped, k } from 'kremling';
import { HORIZONTAL, Panel, Zone } from '../components/zone.component';
import { ToolAsset } from './tool-asset.component';
import { ToolHierarchy } from './tool-hierarchy.component';
import { ToolProperties } from './tool-properties.component';

export class Sidebar extends Component {
  render() {
    return (
      <Scoped css={css}>
        <div className="sidebar">
          <Zone direction={HORIZONTAL}>
            <Panel id="tool-properties">
              <ToolProperties />
            </Panel>
            <Panel id="tool-asset">
              <ToolAsset />
            </Panel>
            <Panel id="tool-hierarchy">
              <ToolHierarchy />
            </Panel>
          </Zone>
        </div>
      </Scoped>
    );
  }
}

const css = k`
  .sidebar {
    background-color: var(--color-grey-860);
    height: 100%;
    border-left: solid .1rem var(--color-grey-940);
  }
  
  .zone > .panel {
    border-top: solid .1rem var(--color-grey-800);
    border-bottom: solid .1rem var(--color-grey-940);
  }
  
  .zone > .panel:first-child {
    border-top: none !important;
  }
  
  .zone > .panel:last-child {
    border-bottom: none;
  }

  .tool {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .tool__header {
    border-bottom: solid .1rem var(--color-grey-920);
    background-color: var(--color-grey-800);
    text-transform: uppercase;
    font-size: 1.2rem;
    font-weight: 700;
    padding: .2rem .8rem;
    flex-shrink: 0;
    flex-grow: 0;
  }

  .tool__body {
    flex-grow: 1;
    overflow: auto;
  }
`;