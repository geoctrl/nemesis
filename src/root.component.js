import React, { Component } from 'react';
import { Scoped, k } from 'kremling';

import { Panel, Zone, VERTICAL } from './components/zone.component';
import { Sidebar } from './sidebar/sidebar.component';
import { Editor } from './editor/editor.component';

export class Root extends Component {
  render() {
    return (
      <Scoped css={css}>
        <div className="root-layout">
          <Zone direction={VERTICAL} lineColor="#484C50">
            <Panel id="editor">
              {({ size }) => (
                <Editor parentWidth={size} />
              )}
            </Panel>
            <Panel id="tools" size={288} fixed>
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