// @flow

import * as midi from 'midi';
import { IControlSurface } from '.';
import type { MidiInput, MidiOutput } from 'midi';

type HUIControlSurfaceConfig = {|
  portIn: number,
  portOut: number,
  sysexHeader: Array<number>,
  sysexFooter: Array<number>,
|}

const DEFAULT_CONFIG = {
  portIn: 0,
  portOut: 0,
  sysexHeader: [240, 0, 0, 102, 5, 0], // hex: f0 00 00 66 05 00
  sysexFooter: [247],                  // hex: f7
};

export default class HUIControlSurface implements IControlSurface {
  +config: HUIControlSurfaceConfig;
  +input: MidiInput;
  +output: MidiOutput;

  _connected: boolean;

  constructor(
    config?: {
      portIn?: number,
      portOut?: number,
      sysexHeader?: Array<number>,
      sysexFooter?: Array<number>,
    } = {},
    input?: MidiInput,
    output?: MidiOutput,
  ) {

    this.config = { ...DEFAULT_CONFIG, ...config };
    this.input = (input || new midi.input());
    this.output = (output || new midi.output());

    this.connect();
  }

  connect() {
    if (this._connected) return;

    console.info(`Connecting...`);
    this.input.openPort(this.config.portIn);
    this.output.openPort(this.config.portOut);

    this._connected = true;
  }

  sendMessage(message: Array<number>): void {
    let m = message;

    // Wrap message in sysex header / footer when necessary.
    if (message.length > 3) {
      const { sysexHeader, sysexFooter } = this.config;
      m = [
        ...sysexHeader,
        ...message,
        ...sysexFooter,
      ];
    }

    this.output.sendMessage(m);
  }
}
