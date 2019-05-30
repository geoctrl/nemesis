import React, { Component } from 'react';
import { Scoped, k } from 'kremling';
import { HORIZONTAL, Panel, Zone } from '../components/zone.component';
import { ToolAsset } from './tool-asset.component';
import { ToolHierarchy } from './tool-hierarchy.component';

export class Sidebar extends Component {
  render() {
    return (
      <Scoped css={css}>
        <div className="sidebar">
          <Zone direction={HORIZONTAL}>
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
  }
`;