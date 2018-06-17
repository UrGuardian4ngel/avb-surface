import BaseElement from './BaseElement';
import AVBSurfaceContainer from '../AVBSurfaceContainer';

type Props = {
  zone: number,
  valueHi: number,
  valueLo: number,
}

export default class Fader extends BaseElement {
  props: Props;
  rootContainer: AVBSurfaceContainer;

  constructor(
    props: Props,
    rootContainer: AVBSurfaceContainer,
  ) {
    super(props, rootContainer);
    this.props = props;
    this.rootContainer = rootContainer;
  }

  finalizeBeforeMount(
    type: string,
    props: Props | Object,
    rootContainerInstance: AVBSurfaceContainer
  ): boolean {
    return true; // Run initial `commitMount` hook.
  }

  finalizeBeforeRemoval(): void {
    // Reset to initial state.
    console.log('Fader::finalizeBeforeRemoval()');
    const initialPositionMessage = Fader.prepareMessage(this.props.zone, 0, 0);
    this.rootContainer.sendMessage(initialPositionMessage);
  }

  prepareUpdate(
    oldProps: Object,
    newProps: Object,
    rootContainerInstance: AVBSurfaceContainer
  ): null | Array<number> {
    if (
      newProps.zone === oldProps.zone &&
      newProps.valueHi === oldProps.valueHi &&
      newProps.valueLo === oldProps.valueLo
    ) {
      // No update is required.
      return null;
    }

    const { zone, valueHi, valueLo } = newProps;

    return [zone, valueHi, valueLo]; // @todo Try to send only changed values.
  }

  commitMount(
    newProps: Object,
  ): void {
    console.log(`Fader#${newProps.zone}::commitMount()`, newProps);
    const message = Fader.prepareMessage(newProps.zone, newProps.valueHi, newProps.valueLo);
    this.rootContainer.sendMessage(message);
  }

  commitUpdate(
    updatePayload: Array<mixed>,
    oldProps: Object,
    newProps: Object,
  ): void {
    const [zone, valueHi, valueLo] = updatePayload;
    const message = Fader.prepareMessage(zone, valueHi, valueLo);
    this.rootContainer.sendMessage(message);
  }

  static prepareMessage(zone: number, valueHi: number, valueLo?: number = 0): Array<number> {
    return [
      /*b0*/176, zone, valueHi,
      /*b0*/176, zone + 32, valueLo,
    ];
  }
}
