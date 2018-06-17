// @flow

import * as midi from 'midi';
import EventEmitter from 'events';
import { IControlSurface } from '.';
import type { MidiInput, MidiOutput } from 'midi';

type HUIControlSurfaceConfig = {|
  portIn: number,
  portOut: number,
  sysexHeader: Array<number>,
  sysexFooter: Array<number>,
|}

type Message = [number, number, number];

const DEFAULT_CONFIG = {
  portIn: 0,
  portOut: 0,
  sysexHeader: [240, 0, 0, 102, 5, 0], // hex: f0 00 00 66 05 00
  sysexFooter: [247],                  // hex: f7
};

export default class HUIControlSurface extends EventEmitter implements IControlSurface {
  +config: HUIControlSurfaceConfig;
  +input: MidiInput;
  +output: MidiOutput;

  _connected: boolean;
  _selectedZone: number;

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
    super();

    this.config = { ...DEFAULT_CONFIG, ...config };
    this.input = (input || new midi.input());
    this.output = (output || new midi.output());

    this._selectedZone = 0;

    this.handleMessage = this.handleMessage.bind(this);

    this.connect();
  }

  connect() {
    if (this._connected) return;

    console.info(`Connecting...`);
    this.input.openPort(this.config.portIn);
    this.output.openPort(this.config.portOut);

    this.input.addListener('message', this.handleMessage);

    this._connected = true;
  }

  handleMessage(deltaTime: number, message: Message): void {
    // @see https://stackoverflow.com/a/29481098
    const [status, data1, data2] = message;

    this.emit('message', message);

    if (status === /*b0*/176) {
      // Channel select
      if (data1 === /*0f*/15) {
        this._selectedZone = data2;
        this.emit(`zone:selected`, { zone: data2 });
        return void 0;
      }

      // Fader moved (hi)
      if (data1 < /*10*/16) {
        // @todo Group calls of "hi" & "lo" together.
        this.emit(`fader:moved`, { zone: data1, valueHi: data2 });
        this.emit(`fader:${data1}:moved`, { zone: data1, valueHi: data2 });
        return void 0;
      }

      // Fader moved (lo)
      if (data1 >= /*20*/32 && data1 < /*30*/48) {
        // @fixme There is a logical conflict with "port on" here... :)
//      this.emit(`fader:moved:lo`, { zone: data1, value: data2 });
//      this.emit(`fader:${data1}:moved:lo`, { zone: data1, value: data2 });
//      return void 0;
      }

      // Fader touch
      if (data1 === /*2f*/47 && data2 === /*40*/64) {
        const zone = this._selectedZone; // called after "Channel select".
        this.emit(`fader:touched`, { zone });
        this.emit(`fader:${zone}:touched`, { zone });
        return void 0;
      }

      // Fader release
      if (data1 === /*2f*/47 && data2 === /*00*/0) {
        const zone = this._selectedZone; // called after "Channel select".
        this.emit(`fader:released`, { zone });
        this.emit(`fader:${zone}:released`, { zone });
        return void 0;
      }

      // V-pot changed
      if (data1 >= /*40*/64 && data1 < /*50*/80) {
        const zone = data1 - /*40*/64;
        const delta = (data2 < /*40*/64) ? -data2 : data2 - /*40*/64;
        // @fixme Check why calculation is sometimes off with BCF2000 on first channels.

        this.emit(`encoder:decreased`, { zone, delta });
        this.emit(`encoder:${zone}:decreased`, { zone, delta });
        return void 0;
      }

      // Port on
      if (data1 === /*2f*/47 && data2 >= /*40*/64 && data2 < /*50*/80) {
        const zone = this._selectedZone; // called after "Channel select".
        const port = data2 - /*40*/64;
        this.emit(`port:on`, { zone, port });
        this.emit(`port:${zone}:on`, { zone, port });
        this.emit(`port:${zone}:${port}:on`, { zone, port });
        return void 0;
      }

      // Port off
      if (data1 === /*2f*/47 && data2 < /*10*/16) {
        const zone = this._selectedZone; // called after "Channel select".
        const port = data2 - /*40*/64;
        this.emit(`port:off`, { zone, port });
        this.emit(`port:${zone}:off`, { zone, port });
        this.emit(`port:${zone}:${port}:off`, { zone, port });
        return void 0;
      }
    }
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
