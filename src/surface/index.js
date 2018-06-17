// @flow

export interface IControlSurface {
  connect(): void;

  sendMessage(message: Array<number>): void;
}

export { default as HUIControlSurface } from './HUIControlSurface';
