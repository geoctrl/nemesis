import React from 'react';
import ReactDOM from 'react-dom';
import { settings, SCALE_MODES } from 'pixi.js';

import './styles/main.scss';
import { Root } from './root.component';

settings.ROUND_PIXELS = true;
settings.SCALE_MODE = SCALE_MODES.NEAREST;

ReactDOM.render(<Root />, document.querySelector('#app'));