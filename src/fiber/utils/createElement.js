// @flow

import AVBSurfaceContainer from '../AVBSurfaceContainer';
import type { HostContext } from '../AVBSurfaceHostConfig';
import {
  Button,
  Fader,
} from '../elements';

export default function createElement(
  type: string,
  props: Object,
  container: AVBSurfaceContainer,
  context: HostContext,
) {
  switch (type) {
    case 'button':
      return new Button(props, container);

    case 'fader':
      return new Fader(props, container);

    case 'sysex':
      return props.message;
  }
}
