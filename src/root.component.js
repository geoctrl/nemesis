import React, { Component } from 'react';
import { Scoped, k } from 'kremling';

import { CanvasComponent } from './canvas.component';
import { Panel, Zone, VERTICAL, HORIZONTAL } from './components/zone.component';
import { Sidebar } from './sidebar/sidebar.component';

export class Root extends Component {
  render() {
    return (
      <Scoped css={css}>
        <div className="root-layout">
          <Zone direction={VERTICAL} lineColor="red">
            <Panel id="editor">
              {(props) => (
                <CanvasComponent {...props} />
              )}
            </Panel>
            <Panel id="tools">
              <Sidebar />
            </Panel>
          </Zone>
        </div>
      </Scoped>
    );
  }
}

const css = k`
  .root-layout {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
`;