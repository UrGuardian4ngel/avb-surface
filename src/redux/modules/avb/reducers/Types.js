export type MutesState = { [number]: boolean }
export type SolosState = { [number]: boolean }
export type VolumesState = { [number]: number }

type Action = {
  type: string,
}

export type MuteSetAction = Action & {
  index: number,
  muted: boolean,
}

export type MuteToggleAction = Action & {
  index: number,
  muted: boolean,
}

export type MuteAction =
  | MuteSetAction
  | MuteToggleAction

export type SoloSetAction = Action & {
  index: number,
  soloed: boolean,
}

export type SoloToggleAction = Action & {
  index: number,
}

export type SoloAction =
  | SoloSetAction
  | SoloToggleAction

export type VolumeSetAction = Action & {
  index: number,
  volume: number,
}

export type VolumeAction =
  | VolumeSetAction
