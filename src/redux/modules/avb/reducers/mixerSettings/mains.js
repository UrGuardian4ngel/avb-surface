// @flow

import {
  createMuteReducer,
  createMuteSetAction, createMuteToggleAction,
} from './shared';
import type { MutesState } from '../Types';

export type MainsState = {
  mainMutes?: MutesState,
}

const MAIN_PREFIX = 'MAIN_';

const reducers = {
  mainMutes: createMuteReducer(MAIN_PREFIX),
};

export default reducers;

export const muteMain = createMuteSetAction(MAIN_PREFIX);
export const toggleMainMute = createMuteToggleAction(MAIN_PREFIX);
