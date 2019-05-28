import { Graphics, Container } from 'pixi.js';
import { Grid } from './grid.canvas';
import { isBoolean, isNumber } from 'lodash';

const scrollBarSize = 10;
const scrollSpacing = 4;
const scrollBarRadius = scrollBarSize / 2;
const zoneSize = scrollBarSize + (scrollSpacing * 2);
const zoneColor = 0x2E2F30;
const scrollBarAlpha = 1;
const scrollBarColor = 0x3E4042;

export class Viewer {
  constructor(canvasEl, width, height, opts = {}) {
    this.canvasEl = canvasEl;
    this.viewContainer = new Container();
    this.scrollContainer = new Container();
    this.background = new Graphics();
    this.width = width;
    this.height = height;
    this.scale = 1;
    this.positionY = 0;
    this.positionX = 0;
    this.scrollZoneY = new Graphics();
    this.scrollZoneX = new Graphics();
    this.scrollBarY = new Graphics();
    this.scrollBarX = new Graphics();
    this.bottomFill = new Graphics();
    this.gridShow = isBoolean(opts.gridShow) ? opts.gridShow : false;
    this.gridSpacing = isNumber(opts.gridSpacing) && opts.gridSpacing > 0 ? opts.gridSpacing : 32;
    this.grid = new Grid(width, height, this.gridShow, this.gridSpacing);

    this.scrollContainer.addChild(this.scrollZoneY);
    this.scrollContainer.addChild(this.scrollZoneX);
    this.scrollContainer.addChild(this.scrollBarY);
    this.scrollContainer.addChild(this.scrollBarX);
    this.scrollContainer.addChild(this.bottomFill);
    this.viewContainer.addChild(this.background);
    this.viewContainer.addChild(this.grid.container);
    this.events();
    this.update();

    const publicApi = {
      update: this.update,
      onDestroy: this.onDestroy,
      viewContainer: this.viewContainer,
      scrollContainer: this.scrollContainer,
      width: this.width,
      height: this.height,
      scale: this.scale,
      gridShow: this.gridShow,
      gridSpacing: this.gridSpacing,
    };

    const validator = {
      set: (obj, prop, value) => {
        if (prop === 'width') this.setWidth(value);
        if (prop === 'height') this.setHeight(value);
        if (prop === 'scale') this.setScale(value);
        if (prop === 'gridShow') this.showGrid(value);
        if (prop === 'gridSpacing') this.setGridSpacing(value);
        obj[prop] = value;
        return true;
      },
    };
    return new Proxy(publicApi, validator);
  }

  events = () => {
    this.canvasEl.addEventListener('wheel', this.update);
  }

  onDestroy = () => {
    this.canvasEl.removeEventListener('wheel', this.update);
    this.viewContainer.destroy();
    this.scrollContainer.destroy();
  }

  update = ({ deltaX = 0, deltaY = 0 } = {}) => {
    const { clientWidth, clientHeight } = this.canvasEl;

    // background
    this.background.clear();
    this.background.beginFill(0xffffff);
    this.background.drawRect(0, 0, this.width, this.height);

    // bottom fill
    this.bottomFill.clear();
    this.bottomFill.beginFill(0x343637);
    this.bottomFill.drawRect(this.canvasEl.width - zoneSize, this.canvasEl.height - zoneSize, zoneSize, zoneSize);

    // grid
    this.grid.setSizes(this.width, this.height);

    // x
    const newPositionX = this.positionX + (deltaX / 6);
    const fullX = clientWidth - zoneSize - (scrollSpacing * 2);
    const percentageX = (clientWidth - zoneSize) / (this.width * this.scale);
    if (percentageX < 1) {
      const scrollBarWidth = fullX * percentageX;
      if (newPositionX < 0) {
        this.positionX = 0;
      } else if (newPositionX > fullX - scrollBarWidth) {
        this.positionX = fullX - scrollBarWidth;
      } else {
        this.positionX = newPositionX;
      }
      this.viewContainer.x = -Math.floor(this.positionX * ((this.width * this.scale) - clientWidth + zoneSize) / (fullX - scrollBarWidth));
    } else {
      this.viewContainer.x = Math.floor(((this.canvasEl.width - (this.width * this.scale)) / 2) - (zoneSize / 2));
    }

    // y
    const newPositionY = this.positionY + (deltaY / 6);
    const fullY = clientHeight - zoneSize - (scrollSpacing * 2);
    const percentageY = (clientHeight - zoneSize) / (this.height * this.scale);
    if (percentageY < 1) {
      const scrollBarHeight = fullY * percentageY;
      if (newPositionY < 0) {
        this.positionY = 0
      } else if (newPositionY > fullY - scrollBarHeight) {
        this.positionY = fullY - scrollBarHeight;
      } else {
        this.positionY = newPositionY;
      }
      this.viewContainer.y = -Math.floor(this.positionY * ((this.height * this.scale) - clientHeight + zoneSize) / (fullY - scrollBarHeight));
    } else {
      this.viewContainer.y = Math.floor(((this.canvasEl.height - (this.height * this.scale)) / 2) - (zoneSize / 2));
    }

    this.updateScrollX();
    this.updateScrollY();
  }


  updateScrollX = () => {
    const { clientWidth, clientHeight } = this.canvasEl;
    this.scrollZoneX.clear();
    this.scrollBarX.clear();

    if ((this.width * this.scale) <= 0) return;
    const percentage = (clientWidth - zoneSize) / (this.width * this.scale);

    // scrollZone
    this.scrollZoneX.beginFill(zoneColor, 1);
    this.scrollZoneX.drawRect(0, clientHeight - zoneSize, clientWidth - zoneSize, zoneSize);
    this.scrollZoneX.endFill();

    if (percentage >= 1) return;
    const full = clientWidth - (scrollSpacing * 2) - zoneSize;
    const scrollBarWidth = full * percentage;

    // scrollBar
    this.scrollBarX.beginFill(scrollBarColor, scrollBarAlpha);
    this.scrollBarX.drawRoundedRect(scrollSpacing + this.positionX, clientHeight - scrollBarSize - scrollSpacing, scrollBarWidth, scrollBarSize, scrollBarRadius);
    this.scrollBarX.endFill();
  }

  updateScrollY = () => {
    const { clientWidth, clientHeight } = this.canvasEl;
    this.scrollZoneY.clear();
    this.scrollBarY.clear();

    if ((this.height * this.scale) <= 0) return;
    const percentage = (clientHeight - zoneSize) / (this.height * this.scale);

    // scrollZone
    this.scrollZoneY.beginFill(zoneColor, 1);
    this.scrollZoneY.drawRect(clientWidth - zoneSize, 0, zoneSize, clientHeight - zoneSize);
    this.scrollZoneY.endFill();

    if (percentage >= 1) return;
    const full = clientHeight - (scrollSpacing * 2) - zoneSize;
    const scrollBarHeight = full * percentage;

    // scrollBar
    this.scrollBarY.beginFill(scrollBarColor, scrollBarAlpha);
    this.scrollBarY.drawRoundedRect(clientWidth - scrollBarSize - scrollSpacing, scrollSpacing + this.positionY, scrollBarSize, scrollBarHeight, scrollBarRadius);
    this.scrollBarY.endFill();
  }

  setScale = (scale) => {
    this.scale = scale;
    this.viewContainer.scale = { x: scale, y: scale };
    this.update();
  }

  setWidth = (width) => {
    this.width = width;
    this.viewContainer.x = 0;
    this.update();
  }

  setHeight = (height) => {
    this.height = height;
    this.viewContainer.y = 0;
    this.update();
  }

  showGrid = (gridShow) => {
    this.gridShow = gridShow;
    this.grid.setShow(gridShow);
  }

  setGridSpacing = (gridSpacing) => {
    this.gridSpacing = gridSpacing;
    this.grid.setSpacing(gridSpacing);
  }

}