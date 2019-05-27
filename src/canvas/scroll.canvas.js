import { Graphics, Container } from 'pixi.js';

const scrollBarSize = 10;
const scrollSpacing = 4;
const scrollBarRadius = scrollBarSize / 2;
const zoneSize = scrollBarSize + (scrollSpacing * 2);
const zoneColor = 0x2E2F30;
const scrollBarAlpha = 1;
const scrollBarColor = 0x3E4042;

export class Scroll {
  constructor(canvasEl, width, height) {
    this.canvasEl = canvasEl;
    this.viewContainer = new Container();
    this.scrollContainer = new Container();
    this.background = new Graphics();
    this.width = width;
    this.height = height;
    this.positionY = 0;
    this.positionX = 0;
    this.scrollZoneY = new Graphics();
    this.scrollZoneX = new Graphics();
    this.scrollBarY = new Graphics();
    this.scrollBarX = new Graphics();
    this.bottomFill = new Graphics();

    this.scrollContainer.addChild(this.scrollZoneY);
    this.scrollContainer.addChild(this.scrollZoneX);
    this.scrollContainer.addChild(this.scrollBarY);
    this.scrollContainer.addChild(this.scrollBarX);
    this.scrollContainer.addChild(this.bottomFill);
    this.viewContainer.addChild(this.background);
    this.events();
    this.update();
  }

  events = () => {
    this.canvasEl.addEventListener('wheel', this.onScroll);
  }

  onScroll = ({ deltaX = 0, deltaY = 0 } = {}) => {
    const { clientWidth, clientHeight } = this.canvasEl;

    // background
    this.background.clear();
    this.background.beginFill(0xffffff);
    this.background.drawRect(0, 0, this.width, this.height);

    // bottom fill
    this.bottomFill.clear();
    this.bottomFill.beginFill(0x343637);
    this.bottomFill.drawRect(this.canvasEl.width - zoneSize, this.canvasEl.height - zoneSize, zoneSize, zoneSize);


    // x
    const newPositionX = this.positionX + (deltaX / 6);
    const fullX = clientWidth - zoneSize - (scrollSpacing * 2);
    const percentageX = (clientWidth - zoneSize) / this.width;
    if (percentageX < 1) {
      const scrollBarWidth = fullX * percentageX;
      if (newPositionX < 0) {
        this.positionX = 0;
      } else if (newPositionX > fullX - scrollBarWidth) {
        this.positionX = fullX - scrollBarWidth;
      } else {
        this.positionX = newPositionX;
      }
      this.viewContainer.x = -Math.floor(this.positionX * (this.width - clientWidth + zoneSize) / (fullX - scrollBarWidth));
    } else {
      this.viewContainer.x = Math.floor(((this.canvasEl.width - this.width) / 2) - (zoneSize / 2));
    }

    // y
    const newPositionY = this.positionY + (deltaY / 6);
    const fullY = clientHeight - zoneSize - (scrollSpacing * 2);
    const percentageY = (clientHeight - zoneSize) / this.height;
    if (percentageY < 1) {
      const scrollBarHeight = fullY * percentageY;
      if (newPositionY < 0) {
        this.positionY = 0
      } else if (newPositionY > fullY - scrollBarHeight) {
        this.positionY = fullY - scrollBarHeight;
      } else {
        this.positionY = newPositionY;
      }
      this.viewContainer.y = -Math.floor(this.positionY * (this.height - clientHeight + zoneSize) / (fullY - scrollBarHeight));
    } else {
      this.viewContainer.y = Math.floor(((this.canvasEl.height - this.height) / 2) - (zoneSize / 2));
    }

    this.updateX();
    this.updateY();
  }


  updateX = () => {
    const { clientWidth, clientHeight } = this.canvasEl;
    this.scrollZoneX.clear();
    this.scrollBarX.clear();

    if (this.width <= 0) return;
    const percentage = (clientWidth - zoneSize) / this.width;

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

  updateY = () => {
    const { clientWidth, clientHeight } = this.canvasEl;
    this.scrollZoneY.clear();
    this.scrollBarY.clear();

    if (this.height <= 0) return;
    const percentage = (clientHeight - zoneSize) / this.height;

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

  update = () => {
    this.onScroll();
  }

  setWidth = (width) => {
    this.width = width;
    this.viewContainer.x = 0;
    this.onScroll();
  }

  setHeight = (height) => {
    this.height = height;
    this.viewContainer.y = 0;
    this.onScroll();
  }

}