// @flow

import type { MixerSettingState } from '../reducers/mixerSettings';
import type { MutesState, SolosState, VolumesState } from '../reducers/Types';

const selectAuxMutes = (state: MixerSettingState): MutesState => state.auxMutes;

const selectChannelMutes = (state: MixerSettingState): MutesState => state.channelMutes;
const selectChannelSolos = (state: MixerSettingState): SolosState => state.channelSolos;
const selectChannelVolumes = (state: MixerSettingState): VolumesState => state.channelVolumes;

const selectGroupMutes = (state: MixerSettingState): MutesState => state.groupMutes;

const selectMainMutes = (state: MixerSettingState): MutesState => state.mainMutes;

const selectMonitorMutes = (state: MixerSettingState): MutesState => state.monitorMutes;

const selectReverbMutes = (state: MixerSettingState): MutesState => state.reverbMutes;
const selectReverbSolos = (state: MixerSettingState): SolosState => state.reverbSolos;

export const isAuxMuted = (state: MixerSettingState, auxIndex: number): boolean => !!selectAuxMutes(state)[auxIndex];

export const isChannelMuted  = (state: MixerSettingState, channelIndex: number): boolean => !!selectChannelMutes(state)[channelIndex];
export const isChannelSoloed = (state: MixerSettingState, channelIndex: number): boolean => !!selectChannelSolos(state)[channelIndex];

export const isGroupMuted = (state: MixerSettingState, groupIndex: number): boolean => !!selectGroupMutes(state)[groupIndex];

export const isMainMuted = (state: MixerSettingState, mainIndex: number): boolean => !!selectMainMutes(state)[mainIndex];

export const isMonitorMuted = (state: MixerSettingState, monitorIndex: number): boolean => !!selectMonitorMutes(state)[monitorIndex];

export const isReverbMuted  = (state: MixerSettingState, reverbIndex: number): boolean => !!selectReverbMutes(state)[reverbIndex];
export const isReverbSoloed = (state: MixerSettingState, reverbIndex: number): boolean => !!selectReverbSolos(state)[reverbIndex];
