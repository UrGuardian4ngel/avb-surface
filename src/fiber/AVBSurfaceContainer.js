// @flow

import { IControlSurface } from '../surface';

export default class AVBSurfaceContainer {
  controlSurface: IControlSurface;

  constructor(
    controlSurface: IControlSurface,
  ) {
    this.controlSurface = controlSurface;
  }

  sendMessage(message: Array<number>): void {
    this.controlSurface.sendMessage(message);
  }
}
