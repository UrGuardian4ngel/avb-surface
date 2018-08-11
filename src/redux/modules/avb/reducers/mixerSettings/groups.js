// @flow

import {
  createMuteReducer,
  createSoloReducer,
  createMuteSetAction, createMuteToggleAction,
  createSoloSetAction, createSoloToggleAction,
} from './shared';
import type { MutesState, SolosState } from '../Types';

export type GroupsState = {
  groupMutes?: MutesState,
  groupSolos?: SolosState,
}

const GROUP_PREFIX = 'GROUP_';

const reducer = {
  groupMutes: createMuteReducer(GROUP_PREFIX),
  groupSolos: createSoloReducer(GROUP_PREFIX),
};

export default reducer;

export const muteGroup = createMuteSetAction(GROUP_PREFIX);
export const toggleGroupMute = createMuteToggleAction(GROUP_PREFIX);

export const soloGroup = createSoloSetAction(GROUP_PREFIX);
export const toggleSoloGroup = createSoloToggleAction(GROUP_PREFIX);
