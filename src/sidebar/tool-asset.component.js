import React, { Component } from 'react';
import { Scoped, k } from 'kremling';
import { Sprite } from '../canvas/sprite.canvas';
import uuid from 'uuid/v4';

import { roomState } from '../state/room.state';

export class ToolAsset extends Component {

  state = {
    assets: [
      new Sprite({
        name: 'barrel01.png',
        ext: 'png',
        url: 'temp_assets/barrel01.png',
      }),
    ],
  }

  addSpriteToCurrentRoom = (asset) => {
    roomState.addChild(asset);
  }

  render() {
    const { assets } = this.state;
    return (
      <Scoped css={css}>
        <div>
          Assets
          {assets.map(asset => (
            <div key={asset.id} onClick={() => this.addSpriteToCurrentRoom(asset)}>
              <img src={asset.url} alt=""/>
              {asset.name}
            </div>
          ))}
        </div>
      </Scoped>
    );
  }
}

const css = k`
  
`;