import BaseElement from './BaseElement';
import AVBSurfaceContainer from '../AVBSurfaceContainer';

type Props = {
  zone: number,
  port: number,
  enabled: bool,
}

export default class Button extends BaseElement {
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
    props: Props|Object,
    rootContainerInstance: AVBSurfaceContainer
  ): boolean {
    return true; // Run initial `commitMount` hook.
  }

  finalizeBeforeRemoval(): void {
    // Reset to initial state.
    console.log('Button::finalizeBeforeRemoval()');
    const initialState = Button.prepareMessage(this.props.zone, this.props.port, false);
    this.rootContainer.sendMessage(initialState);
  }

  prepareUpdate(
    oldProps: Props | Object,
    newProps: Props | Object,
    rootContainerInstance: AVBSurfaceContainer
  ): null | Array<number> {
    if (
      newProps.zone === oldProps.zone &&
      newProps.port === oldProps.port &&
      newProps.enabled === oldProps.enabled
    ) {
      // No update is required.
      return null;
    }

    const { zone, port, enabled } = newProps;

    return [zone, port, enabled]; // @todo Try to send only changed values.
  }

  commitMount(
    newProps: Object,
  ): void {
    console.log(`Button#${newProps.zone}[${newProps.port}]::commitMount()`, newProps);
    const message = Button.prepareMessage(newProps.zone, newProps.port, newProps.enabled);
    this.rootContainer.sendMessage(message);
  }

  commitUpdate(
    updatePayload: Array<mixed>,
    oldProps: Props | Object,
    newProps: Props | Object,
  ): void {
    console.log(`Button#${newProps.zone}[${newProps.port}]::commitUpdate()`, newProps);
    const [zone, port, enabled] = updatePayload;
    const message = Button.prepareMessage(zone, port, enabled);
    this.rootContainer.sendMessage(message);
  }

  static prepareMessage(zone: number, port: number, enabled: boolean): Array<number> {
    return [
      /*b0*/176, /*0c*/12, zone,
      /*b0*/176, /*2c*/44, port + (enabled ? /*40*/64 : 0),
    ];
  }
}
