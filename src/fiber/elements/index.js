import BaseElement from './BaseElement';
import Button from './Button';
import Fader from './Fader';
import AVBSurfaceContainer from '../AVBSurfaceContainer';
import type { HostContext } from '../AVBSurfaceHostConfig';

export default function createElement(
  type: string,
  props: Object,
  container: AVBSurfaceContainer,
  context: HostContext,
): BaseElement {
  switch (type) {
    case 'fader':
      return new Fader(props, container);

    case 'button':
      return new Button(props, container);
  }
}

export {
  BaseElement,
  Button,
  Fader,
};
