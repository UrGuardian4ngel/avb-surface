// @flow

import {
  createMuteReducer,
  createSoloReducer,
  createMuteSetAction, createMuteToggleAction,
  createSoloSetAction, createSoloToggleAction,
} from './shared';
import type { MutesState, SolosState } from '../Types';

export type ReverbsState = {
  reverbMutes?: MutesState,
  reverbSolos?: SolosState,
}

const REVERB_PREFIX = 'REVERB_';

const reducer = {
  reverbMutes: createMuteReducer(REVERB_PREFIX),
  reverbSolos: createSoloReducer(REVERB_PREFIX),
};

export default reducer;

export const muteReverb = createMuteSetAction(REVERB_PREFIX);
export const toggleReverbMute = createMuteToggleAction(REVERB_PREFIX);

export const soloReverb = createSoloSetAction(REVERB_PREFIX);
export const toggleReverbSolo = createSoloToggleAction(REVERB_PREFIX);
