// @flow

import {
  createMuteReducer,
  createMuteSetAction, createMuteToggleAction,
} from './shared';
import type { MutesState } from '../Types';

export type MonitorsState = {
  monitorMutes?: MutesState,
}

const MONITOR_PREFIX = 'MONITOR_';

const reducer = {
  monitorMutes: createMuteReducer(MONITOR_PREFIX),
};

export default reducer;

export const muteMonitor = createMuteSetAction(MONITOR_PREFIX);
export const toggleMonitorMute = createMuteToggleAction(MONITOR_PREFIX);
