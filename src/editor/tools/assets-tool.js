import React, { useState } from 'react';
import { assetsState } from '../../engine/assets-state';
import { Scoped } from 'kremling';

export function AssetsTool() {
  const [assets, updateAssets] = useState(assetsState.state.assets);
  let blankImg = document.createElement("img");

  assetsState.subscribe(({ assets }) => {
    updateAssets(assets);
  }, 'assets');

  function handleFileUpload(e) {
    console.log(JSON.parse(JSON.stringify(e.target.files[0])))
  }

  function onDragStart(e, asset) {
    blankImg.src = asset.url;
    e.dataTransfer.setDragImage(blankImg, 10, 10);
    e.dataTransfer.setData("text/plain", JSON.stringify(asset));
  }

  return (
    <Scoped css={css}>
      <div>
        <input type="file" onChange={handleFileUpload} />
        {assets.map(asset => (
          <div
            draggable
            onDragStart={(e) => onDragStart(e, asset)}
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