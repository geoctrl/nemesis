import React, { Component } from 'react';
import { Scoped, k } from 'kremling';
import { roomState } from '../state/room.state';

export class ToolHierarchy extends Component {
  state = {
    hierarchy: [],
  }

  componentDidMount() {
    this.roomObservable = roomState.subscribe(({ hierarchy }) => {
      this.setState({ hierarchy })
    },'hierarchy');
  }

  componentWillUnmount() {
    this.roomObservable.unsubscribe();
  }

  render() {
    const { hierarchy } = this.state;
    return (
      <Scoped css={css}>
        <div className="tool">
          <div className="tool__header">
            Scene Hierarchy
          </div>
          <div className="tool__body">
            {hierarchy.map(item => (
              <div key={item.id}>
                <img src={item.asset.url} alt=""/>
                {item.name}
              </div>
            ))}
          </div>
        </div>
      </Scoped>
    );
  }
}

const css = k`
`;