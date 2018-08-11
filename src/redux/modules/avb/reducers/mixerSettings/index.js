// @flow

import { combineReducers } from 'redux';
import auxReducers from './aux';
import channelReducers from './channels';
import groupReducers from './groups';
import mainReducers from './mains';
import monitorReducers from './monitors';
import reverbReducers from './reverbs';
import type { AuxState } from './aux';
import type { ChannelsState } from './channels';
import type { GroupsState } from './groups';
import type { MainsState } from './mains';
import type { MonitorsState } from './monitors';
import type { ReverbsState } from './reverbs';

export type MixerSettingState =
  & AuxState
  & ChannelsState
  & GroupsState
  & MainsState
  & MonitorsState
  & ReverbsState

const reducer = combineReducers({
  ...auxReducers,
  ...channelReducers,
  ...groupReducers,
  ...mainReducers,
  ...monitorReducers,
  ...reverbReducers,
});

export default reducer;

export * from './aux';
export * from './channels';
export * from './groups';
export * from './mains';
export * from './monitors';
export * from './reverbs';
