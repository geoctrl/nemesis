import React, { Component, Children, createRef } from 'react';
import { number, oneOf, oneOfType, string, bool } from 'prop-types';
import { Scoped, k, a } from 'kremling';
import { isNumber, isString, isFunction } from 'lodash';
import uuid from 'uuid/v4';

export const VERTICAL = 'vertical';
export const HORIZONTAL = 'horizontal';

let borderIndex = null;
const storagePrefix = 'nemesis.zone';

export class Zone extends Component {
  constructor(props) {
    super(props);
    this.zoneRef = createRef();
  }

  static propTypes = {
    direction: oneOf([VERTICAL, HORIZONTAL]),
    lineColor: string,
  }

  static defaultProps = {
    direction: VERTICAL,
  }

  state = {
    sizes: [],
    borders: [],
    initialSizes: [],
    moving: false,
    zoneId: uuid(),
  }

  componentDidMount() {
    this.setSizes().then(() => {
      const childrenArray = Children.toArray(this.props.children);
      if (!childrenArray.find(child => child.props.fixed)) {
        childrenArray.forEach((child, i) => {
          if (child && child.props.id) {
            localStorage.setItem(`${storagePrefix}.${child.props.id}`, `${this.state.sizes[i]}%`);
          }
        })
      }
    });
    window.addEventListener('mouseup', this.mouseUpHandler);
    window.addEventListener('mousedown', this.mouseDownHandler);
    window.addEventListener('resize', this.setSizes);
  }

  componentWillUnmount() {
    window.removeEventListener('mouseup', this.mouseUpHandler);
    window.removeEventListener('mousedown', this.mouseDownHandler);
    window.removeEventListener('resize', this.setSizes);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.children !== this.props.children) {
      this.setSizes();
    }
  }

  setSizes = () => {
    const { direction, children } = this.props;
    const ref = this.zoneRef.current;
    const clientSize = direction === VERTICAL ? ref.clientWidth : ref.clientHeight;

    let childrenArray = Children.toArray(children);
    if (childrenArray.filter(child => child.props.fixed).length === childrenArray.length) {
      console.warn(`[Zone] Cannot have prop "fixed"={true} on all "Panel" components -- all "fixed" props will be ignored.`);
    }

    let sizes = childrenArray.map(child => {
      const storage = localStorage.getItem(`${storagePrefix}.${child.props.id}`);
      let initialSize = child.props.size || child.props.initialSize;
      if (storage) {
        if (storage.indexOf('%') > -1) {
          initialSize = storage;
        } else {
          initialSize = parseFloat(storage);
        }
      }
      if (isString(initialSize)) {
        return parseFloat(initialSize.replace(/%/g, '')) || null;
      }
      if (isNumber(initialSize)) {
        const size = (initialSize / clientSize) * 100;
        return size > 100 ? 100 : size;
      }
      return null;
    });

    // if any of the sizes are null, fill them up with the diff (not equal)
    const nullSizes = sizes.filter(size => !isNumber(size));
    if (nullSizes.length) {
      const rest = sizes.reduce((acc, next) => {
        return isNumber(next) ? acc + next : acc;
      }, 0);
      const diff = (100 - rest) / nullSizes.length;
      sizes = sizes.map(size => isNumber(size) ? size : diff);
    }

    let total = sizes.reduce((acc, size) => acc + size, 0);

    // equally distribute sizes
    if (total < 100) {
      const diff = (100 - total) / sizes.length;
      sizes = sizes.map(size => size + diff);
    }
    if (total > 100) {
      const diff = (total - 100) / sizes.length;
      sizes = sizes.map(size => size - diff);
    }
    total = 100;

    const emptyCount = sizes.filter(size => {
      return !size;
    }).length;

    const difference = (100 - total) / emptyCount;
    sizes = sizes.map(size => size || difference);
    const borders = this.buildBorder(sizes);
    return new Promise(resolve => {
      this.setState({ sizes, borders }, resolve);
    });
  }

  buildBorder = (sizes) => {
    return sizes.map((size, i) => {
      return sizes.slice(0, i).reduce((acc, size) => acc + size, 0);
    }).slice(1);

  }

  mouseDownHandler = (e) => {
    e.stopPropagation();
    const zoneBorder = e.target.getAttribute('zone-border');
    if (zoneBorder) {
      this.startDragging();
    }
  }

  mouseUpHandler = () => {
    this.endDragging();
  }

  mouseMoveHandler = (e) => {
    if (this.state.moving === this.state.zoneId) {
      const { movementX, movementY } = e;
      const { direction } = this.props;
      const { sizes } = this.state;
      const isHorizontal = direction === HORIZONTAL;
      const ref = this.zoneRef.current;
      const panelLeftIndex = borderIndex;
      const panelRightIndex = borderIndex + 1;
      const zoneSize = ref[isHorizontal ? 'clientHeight' : 'clientWidth'];

      // convert panels to pixels
      const panelLeft = (zoneSize * (sizes[panelLeftIndex] / 100)) + (isHorizontal ? movementY : movementX);
      const panelRight = (zoneSize * (sizes[panelRightIndex] / 100)) - (isHorizontal ? movementY : movementX);
      let panelLeftPercent = (panelLeft / zoneSize) * 100;
      let panelRightPercent = (panelRight / zoneSize) * 100;
      const total = panelLeftPercent + panelRightPercent;

      const minSize = 10 * 100 / zoneSize;

      if (panelLeftPercent < minSize) {
        panelLeftPercent = minSize;
        panelRightPercent = total - minSize;
      } else if (panelRightPercent < minSize) {
        panelLeftPercent = total - minSize;
        panelRightPercent = minSize;
      }

      const newSizes = [
        ...sizes.slice(0, panelLeftIndex),
        panelLeftPercent,
        panelRightPercent,
        ...sizes.slice(panelRightIndex + 1)
      ];
      this.setState({
        sizes: newSizes,
        borders: this.buildBorder(newSizes),
      });
    }
  }

  onBorderMouseDown = (zoneId, i) => {
    this.setState({ moving: zoneId });
    borderIndex = i;
  }

  startDragging = () => {
    const { direction } = this.props;
    document.body.classList.add('body--panel-dragging');
    document.body.classList.add(`body--panel-${direction}`)
  }

  endDragging = () => {
    if (this.state.moving === this.state.zoneId) {
      this.setState({ moving: null });
      document.body.classList.remove('body--panel-dragging');
      document.body.classList.remove(`body--panel-${VERTICAL}`);
      document.body.classList.remove(`body--panel-${HORIZONTAL}`);
      const childrenArray = Children.toArray(this.props.children);
      childrenArray.forEach((child, i) => {
        if (child && child.props.id) {
          if (!childrenArray.find(child => child.props.fixed)) {
            localStorage.setItem(`${storagePrefix}.${child.props.id}`, `${this.state.sizes[i]}%`);
          } else {
            if (child.props.fixed) {
              const { direction } = this.props;
              const ref = this.zoneRef.current;
              const clientSize = direction === VERTICAL ? ref.clientWidth : ref.clientHeight;
              localStorage.setItem(`${storagePrefix}.${child.props.id}`,  `${this.state.sizes[i] * clientSize / 100}`);
            }
          }
        }
      })
    }
  }

  render() {
    const { children, direction, lineColor } = this.props;
    const { sizes, borders, zoneId } = this.state;
    const ref = this.zoneRef.current;
    let zoneSize = null;
    if (ref) {
      zoneSize = direction === VERTICAL ? ref.clientWidth : ref.clientHeight;
    }
    const directionName = direction === VERTICAL ? 'width' : 'height';
    const positionName = direction === VERTICAL ? 'left' : 'top';
    return (
      <Scoped css={css}>
        <div
          onMouseMove={this.mouseMoveHandler}
          ref={this.zoneRef}
          className={
            a('zone')
              .m('zone--vertical', direction === VERTICAL)
              .m('zone--horizontal', direction === HORIZONTAL)
          }
        >
          {sizes.length > 1 && (
            <>
              {borders.map((border, i) => (
                <div
                  className="zone-border"
                  key={i}
                  zone-border={i}
                  onMouseDown={(e) => this.onBorderMouseDown(zoneId, i)}
                  style={{ [positionName]: `calc(${border}% - .4rem)` }}
                />
              ))}
              {children.map((child, i) => {
                if (child) {
                  return (
                    <div
                      className="panel"
                      key={i}
                      style={{
                        [directionName]: `${sizes[i]}%`,
                        borderColor: lineColor,
                      }}
                    >
                      {isFunction(child.props.children)
                        ? child.props.children({
                          direction,
                          size: zoneSize ? zoneSize * (sizes[i] / 100) : null,
                        })
                        : child.props.children
                      }
                    </div>

                  );
                }
                return null;
              })}
            </>
          )}
          {sizes.length === 1 && children}
        </div>
      </Scoped>
    );
  }
}

export class Panel extends Component {
  static propTypes = {
    initialSize: oneOfType([string, number]),
    minSize: number,
    size: oneOfType([string, number]),
    id: string.isRequired,
    fixed: bool,
  }
  render() {
    const { children } = this.props;
    return isFunction(children) ? children(this.props) : children;
  }
}

const css = k`  
  .zone {
    display: flex;
    height: 100%;
    width: 100%;
    position: relative;
  }
  
  .zone.zone--vertical {
    flex-direction: row;
  }
  
  .zone.zone--vertical > .panel {
    border-right: solid .1rem var(--color-grey-920);
  }

  .zone.zone--vertical > .panel:last-child {
    border: none;
  }
  
  .zone.zone--vertical > .zone-border {
    width: .8rem;
    cursor: col-resize;
    opacity: .5;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 9999;
  }
  
  .zone.zone--horizontal {
    flex-direction: column;
  }
  
  .panel {
    position: relative;
    z-index: 0;
  }

  .zone.zone--horizontal > .panel {
    border-bottom: solid .1rem var(--color-grey-920);
  }

  .zone.zone--horizontal > .panel:last-child {
    border: none;
  }

  .zone.zone--horizontal > .zone-border {
    height: .8rem;
    cursor: row-resize;
    opacity: .5;
    position: absolute;
    left: 0;
    right: 0;
    z-index: 9999;
  }
`;