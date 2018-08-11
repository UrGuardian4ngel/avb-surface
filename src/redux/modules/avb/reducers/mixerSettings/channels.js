// @flow

import {
  createMuteReducer,
  createSoloReducer,
  createVolumeReducer,
  createMuteSetAction, createMuteToggleAction,
  createSoloSetAction, createSoloToggleAction,
} from './shared';
import type { MutesState, SolosState, VolumesState } from '../Types';

export type ChannelsState = {
  channelMutes?: MutesState,
  channelSolos?: SolosState,
  channelVolumes?: VolumesState,
}

const CHANNEL_PREFIX = 'CHANNEL_';

const reducers = {
  channelMutes: createMuteReducer(CHANNEL_PREFIX),
  channelSolos: createSoloReducer(CHANNEL_PREFIX),
  channelVolumes: createVolumeReducer(CHANNEL_PREFIX),
};

export default reducers;

export const muteChannel = createMuteSetAction(CHANNEL_PREFIX);
export const toggleChannelMute = createMuteToggleAction(CHANNEL_PREFIX);

export const soloChannel = createSoloSetAction(CHANNEL_PREFIX);
export const toggleChannelSolo = createSoloToggleAction(CHANNEL_PREFIX);

export const setChannelVolume = createVolumeReducer(CHANNEL_PREFIX);
