// @flow

import type { Reducer } from 'redux';
import type {
  MutesState, MuteAction, MuteSetAction, MuteToggleAction,
  SolosState, SoloAction, SoloSetAction, SoloToggleAction,
  VolumesState, VolumeAction, VolumeSetAction,
} from '../Types';

export const createMuteReducer = (prefix: string, initialState: MutesState = {}): Reducer<MutesState, MuteAction> => {
  return function muteReducer(state: MutesState = initialState, action: MuteAction) {
    const { index, type } = action;

    switch (type) {
      case `avb-surface/reducer/avb/mixerSettings/${prefix}MUTE_SET`:
        return { ...state, [index]: action.muted };

      case `avb-surface/reducer/avb/mixerSettings/${prefix}MUTE_TOGGLE`:
        const currentMuteStatus = state[index];
        return { ...state, [index]: !currentMuteStatus };

      default:
        return state;
    }
  };
};

export const createSoloReducer = (prefix: string, initialState: SolosState = {}): Reducer<SolosState, SoloAction> => {
  return function soloReducer(state: SolosState = initialState, action: SoloAction) {
    const { index, type } = action;

    switch (type) {
      case `avb-surface/reducer/avb/mixerSettings/${prefix}SOLO_SET`:
        return { ...state, [index]: action.soloed };

      case `avb-surface/reducer/avb/mixerSettings/${prefix}SOLO_TOGGLE`:
        const currentSoloStatus = state[index];
        return { ...state, [index]: !currentSoloStatus };

      default:
        return state;
    }
  };
};

export const createVolumeReducer = (prefix: string, initialState: VolumesState = {}): Reducer<VolumesState, VolumeAction> => {
  return function volumeReducer(state: VolumesState = initialState, action: VolumeAction) {
    const { index, type } = action;

    switch (type) {
      case `avb-surface/reducer/avb/mixerSettings/${prefix}FADER_SET`:
        return { ...state, [index]: action.volume };

      default:
        return state;
    }
  };
};

type MuteSetActionCreator = (index: number, muted?: boolean) => MuteSetAction;
export const createMuteSetAction = (prefix: string): MuteSetActionCreator => {
  return function muteSet(index: number, muted: boolean = true): MuteSetAction {
    return {
      type: `avb-surface/reducer/avb/mixerSettings/${prefix}MUTE_SET`,
      index,
      muted,
    };
  };
};

type MuteToggleActionCreator = (index: number) => MuteToggleAction;
export const createMuteToggleAction = (prefix: string): MuteToggleActionCreator => {
  return function muteToggle(index: number): MuteToggleAction {
    return {
      type: `avb-surface/reducer/avb/mixerSettings/${prefix}MUTE_TOGGLE`,
      index,
    };
  };
};

type SoloSetActionCreator = (index: number, muted?: boolean) => SoloSetAction;
export const createSoloSetAction = (prefix: string): SoloSetActionCreator => {
  return function soloSet(index: number, muted: boolean = true): SoloSetAction {
    return {
      type: `avb-surface/reducer/avb/mixerSettings/${prefix}SOLO_SET`,
      index,
      muted,
    };
  };
};

type SoloToggleActionCreator = (index: number) => SoloToggleAction;
export const createSoloToggleAction = (prefix: string): SoloToggleActionCreator => {
  return function soloToggle(index: number): SoloToggleAction {
    return {
      type: `avb-surface/reducer/avb/mixerSettings/${prefix}SOLO_TOGGLE`,
      index,
    };
  };
};

type VolumeSetActionCreator = (index: number, volume: number) => VolumeSetAction;
export const createVolumeSetAction = (prefix: string): VolumeSetActionCreator => {
  return function volumeSet(index: number, volume: number): VolumeSetAction {
    return {
      type: `avb-surface/reducer/avb/mixerSettings/${prefix}VOLUME_SET`,
      index,
      volume,
    };
  };
};
