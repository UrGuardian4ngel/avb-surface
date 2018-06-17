// @flow

export interface IControlSurface {
  connect(): void;

  sendMessage(message: Array<number>): void;
}
