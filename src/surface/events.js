// @flow

export type { ButtonEvent, ButtonPressedEvent, ButtonReleasedEvent };
export type { FaderEvent, FaderMovedEvent };

type ButtonPressedEvent = {
  zone: number,
  port: number,
}

type ButtonReleasedEvent = {
  zone: number,
  port: number,
}

type ButtonEvent =
  | ButtonPressedEvent
  | ButtonReleasedEvent

type FaderMovedEvent = {
  zone: number,
  value: number,
}

type FaderEvent =
  | FaderMovedEvent
