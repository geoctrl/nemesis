import React, { Component } from 'react';
import { Scoped } from 'kremling';
import { Tool } from "./tool";
import { AssetsTool } from "../tools/assets-tool";
import { engine } from '../../engine/engine';
import { Button } from 'comfy';

export class Sidebar extends Component {
  run = () => {
    engine.run()
  }
  render() {
    return (
      <Scoped css={css}>
        <div className="sidebar">
          <Tool title="Assets">
            <Button
              actionType="primary"
              onClick={this.run}
            >
              Run
            </Button>
            <AssetsTool/>
          </Tool>
        </div>
      </Scoped>
    );
  }
}

const css = `
  & .sidebar {
    width: 30rem;
    flex-grow: 0;
    flex-shrink: 0;
    background-color: var(--color-grey-900);
    color: var(--color-grey-100);
  }
`;