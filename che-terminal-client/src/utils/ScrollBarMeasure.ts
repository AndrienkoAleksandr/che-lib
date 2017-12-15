/**
 * @module xterm/utils/ScrollBarMeasure
 * @license MIT
 */

import { EventEmitter } from '../EventEmitter.js';

/**
 * Utility class to measures the width of the vertical and horizontal scrollBars.
 */
export class ScrollBarMeasure extends EventEmitter {
  private _document: Document;
  private _parentElement: HTMLElement;
  private _measureElement: HTMLElement;
  private _childMeasureElement: HTMLElement;
  private _verticalWidth: number;
  private _horizontalWidth: number;

  constructor(document: Document, parentElement: HTMLElement) {
    super();
    this._document = document;
    this._parentElement = parentElement;
  }

  public getVerticalWidth(): number {
    return this._verticalWidth;
  }

  public getHorizontalWidth(): number {
    return this._horizontalWidth;
  }

  public measure(): void {
    if (!this._measureElement) {
      this._measureElement = document.createElement('div');
      this._measureElement.style.visibility = 'hidden';
      this._measureElement.style.width = '150px';
      this._measureElement.style.height = '150px';
      this._parentElement.appendChild(this._measureElement);

      // Perform _doMeasure async if the element was just attached as sometimes
      // getBoundingClientRect does not return accurate values without this.
      setTimeout(() => this._doMeasure(), 0);
    } else {
      this._doMeasure();
    }
  }

  private _doMeasure() {
    const widthWithoutScroll = this._measureElement.offsetWidth;
    const heigthWithoutScroll = this._measureElement.offsetHeight;

    if (this._childMeasureElement) {
      this._measureElement.removeChild(this._childMeasureElement);
      this._childMeasureElement = null;
    }

    // create child element
    this._childMeasureElement = document.createElement('div');
    this._childMeasureElement.style.width = '100%';
    this._childMeasureElement.style.height = '100%';

    this._measureElement.appendChild(this._childMeasureElement);

    // activate scroll
    this._measureElement.style.overflow = 'scroll';

    const widthWithScroll = this._childMeasureElement.offsetWidth;
    const heigthWithScroll = this._childMeasureElement.offsetHeight;

    const verticalWidth = widthWithoutScroll - widthWithScroll;
    const horizontalWidth = heigthWithoutScroll - heigthWithScroll;

    if (this._verticalWidth !== verticalWidth || this._horizontalWidth !== horizontalWidth) {
      this._verticalWidth = verticalWidth;
      this._horizontalWidth = horizontalWidth;
      console.log('Measure scrollBar: ' + this._verticalWidth + ' ' + this._horizontalWidth);
      this.emit('scrollbarsizechanged');
    }
  }
}
