import React, { Component } from 'react';
import { Scoped, k } from 'kremling';

export class Sidebar extends Component {
  render() {
    return (
      <Scoped css={css}>
        <div className="sidebar">
          sidebar
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