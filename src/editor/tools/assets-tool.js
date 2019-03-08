import React, { Component } from 'react';
import { assetsState } from '../state/assets-state';
import { Scoped } from 'kremling';

let blankImg = document.createElement("img");

export class AssetsTool extends Component {
  constructor(props) {
    super(props);
    assetsState.subscribe(({ assets }) => {
      this.setState({ assets });
    }, 'assets');
  }

  state = {
    assets: assetsState.state.assets,
  };

  handleFileUpload = (e) => {
    console.log(e.target.files)
  }

  onDragStart = (e, asset) => {
    blankImg.src = asset.url;
    e.dataTransfer.setDragImage(blankImg, 10, 10);
    e.dataTransfer.setData("text/plain", JSON.stringify(asset));
  }

  onload = () => {
    const img = new Image;

    img.onload = function() {
      console.log('img', img.width);
    }

    img.src = fr.result;
  }

  render() {
    const { assets } = this.state;
    return (
      <Scoped css={css}>
        <div>
          <input type="file" onChange={this.handleFileUpload} />
          {assets.map(asset => (
            <div
              draggable
              onDragStart={(e) => this.onDragStart(e, asset)}
              key={asset.id}
              className="assets-item"
            >
              <div className="assets-item__img">
                <img src={asset.url} alt=""/>
              </div>
              <div>
                {asset.fileName}
              </div>
            </div>
          ))}
        </div>
      </Scoped>
    );
  };
}

AssetsTool.propTypes = {};

const css = `
  & .assets-item {
    display: flex;
    align-items: center;
    font-size: 1.2rem;
    padding: .4rem .8rem;
    cursor: default;
  }
  
  & .assets-item__img {
    height: 3rem;
    width: 3rem;
    background-color: var(--color-grey-950);
    border-radius: var(--base-border-radius);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: .8rem;
  }
  
  & .assets-item__img > img {
    max-width: 3rem;
    max-height: 3rem;
  }
`;