import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.scss';
import { Root } from './root.component';
import { assetsState } from './engine/assets-state';

Promise.all([assetsState.get()]).then(() => {
  ReactDOM.render(<Root />, document.querySelector('#app'));
})