// @flow

import { combineReducers } from 'redux';
import mixerSettingsReducer from './mixerSettings';
import type { MixerSettingState } from './mixerSettings';

export type AVBState = {
  mixerSettings: MixerSettingState,
}

const reducer = combineReducers({
  mixerSettings: mixerSettingsReducer,
});

export default reducer;
