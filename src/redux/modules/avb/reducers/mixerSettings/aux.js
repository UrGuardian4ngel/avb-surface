// @flow

import {
  createMuteReducer,
  createMuteSetAction, createMuteToggleAction,
} from './shared';
import type { MutesState } from '../Types';

export type AuxState = {
  auxMutes?: MutesState,
}

const AUX_PREFIX = 'AUX_';

const reducer = {
  auxMutes: createMuteReducer(AUX_PREFIX),
};

export default reducer;

export const muteAux = createMuteSetAction(AUX_PREFIX);
export const toggleAuxMute = createMuteToggleAction(AUX_PREFIX);
