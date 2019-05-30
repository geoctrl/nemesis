import React, { Component } from 'react';
import { Scoped, k } from 'kremling';

import { editorState } from '../state/editor.state';
import { Button } from '../components/button.component';

export class EditorToolbar extends Component {
  state = {
    zoom: `${editorState.state.scale * 100}%`,
    gridSpacingPx: `${editorState.state.gridSpacing}px`,
    gridSpacing: editorState.state.gridSpacing,
  }

  componentDidMount() {
    this.editorObservable = editorState.subscribe(({ gridShow, gridSpacing }) => {
      this.setState({ gridShow, gridSpacing });
    }, 'gridShow', 'gridSpacing');
  }

  componentWillUnmount() {
    this.editorObservable.unsubscribe();
  }

  handleEnterKey = (e) => {
    if (e.key === 'Enter') e.target.blur();
  }

  updateZoom = (e) => {
    const hasPercent = e.target.value.indexOf('%') > -1;
    const zoom = e.target.value.replace(/\D/g, '');
    this.setState({ zoom: `${zoom}${hasPercent ? '%' : ''}` });
  }

  setScale = (e) => {
    const raw = parseInt(e.target.value.replace(/\D/g, ''), 10) / 100;
    const scale = raw > 9.99 ? 9.99 : raw < 0.01 ? 0.01 : !raw ? 1 : raw;
    editorState.setScale(scale);
    this.setState({
      zoom: `${Math.round(scale * 100)}%`,
    });
  }

  updateGridSpacing = (e) => {
    const hasPixels = e.target.value.indexOf('px') > -1;
    const spacing = e.target.value.replace(/\D/g, '');
    this.setState({ gridSpacingPx: `${spacing}${hasPixels ? 'px' : ''}` });
  }

  setGridSpacing = (e) => {
    const raw = parseInt(e.target.value.replace(/\D/g, ''), 10);
    const spacing = raw > 9999 ? 9999 : raw < 1 ? 1 : !raw ? 1 : raw;
    editorState.setGridSpacing(spacing);
    this.setState({
      gridSpacingPx: `${spacing}px`,
    });
  }

  stepZoom = (step) => {
    const scale = (Math.round(editorState.state.scale * 100) + step) / 100;
    editorState.setScale(scale);
    this.setState({
      zoom: `${Math.round(scale * 100)}%`,
    });
  }

  toggleGrid = () => {
    editorState.setGridShow(!editorState.state.gridShow);
  }

  render() {
    const { zoom, gridShow, gridSpacingPx } = this.state;
    return (
      <Scoped css={css}>
        <div className="editor-toolbar">
          <div className="toggler">
            <Button icon="mouse-pointer" actionType="primary" />
            <Button icon="hand-paper" />
          </div>

          <div className="button-divider" />

          <div className="toggler">
            <Button
              onClick={this.toggleGrid}
              icon="th-large"
              actionType={gridShow ? 'primary' : null}
            />
            <input
              type="text"
              className="form-control editor-spacing"
              value={gridSpacingPx}
              onKeyPress={this.handleEnterKey}
              onChange={this.updateGridSpacing}
              onBlur={this.setGridSpacing}
            />
          </div>

          <div className="button-divider" />

          <div className="toggler">
            <Button
              small
              icon="minus"
              onClick={() => this.stepZoom(-10)}
            />
            <input
              type="text"
              className="form-control small editor-zoom"
              value={zoom}
              maxLength={4}
              onKeyPress={this.handleEnterKey}
              onChange={this.updateZoom}
              onBlur={this.setScale}
            />
            <Button
              small
              icon="plus"
              onClick={() => this.stepZoom(10)}
            />
          </div>

        </div>
      </Scoped>
    );
  }
}

const css = k`
  .editor-toolbar {
    flex-shrink: 0;
    flex-grow: 0;
    display: flex;
    align-items: center;
    padding: .4rem;
    font-size: 1.2rem;
    border-right: solid .1rem var(--color-grey-920);
  }
  
  .button-divider {
    height: 3rem;
    border-right: solid .1rem var(--color-grey-920);
    padding-left: .8rem;
    margin-right: .8rem;
  }
  
  .editor-zoom {
    display: flex;
    align-items: center;
  }
  
  .editor-zoom {
    width: 5.8rem;
    text-align: center;
  }
  
  .editor-spacing {
    width: 6rem;
    text-align: center;
  }
`;