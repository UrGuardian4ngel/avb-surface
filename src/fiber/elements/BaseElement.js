import AVBSurfaceContainer from '../AVBSurfaceContainer';

export default class BaseElement {
  constructor(
    props: Object,
    rootContainer: AVBSurfaceContainer,
  ) { }

  appendChildBeforeMount(
    type: string,
    props: Object,
    rootContainerInstance: AVBSurfaceContainer,
  ): boolean {
    return false;
  }

  finalizeBeforeMount(
    type: string,
    props: Object,
    rootContainerInstance: AVBSurfaceContainer,
  ): boolean {
    return false;
  }

  finalizeBeforeRemoval(): void { }

  commitMount(
    newProps: Object,
  ): void { }

  getPublicInstance(): mixed {
    return this;
  }

  prepareUpdate(
    oldProps: Object,
    newProps: Object,
    rootContainerInstance: AVBSurfaceContainer,
  ): null | Array<mixed> {
    return null;
  }

  commitUpdate(
    updatePayload: Array<mixed>,
    oldProps: Object,
    newProps: Object,
  ): void { }

  appendChild(
    child: BaseElement
  ): void { }

  insertBefore(
    child: BaseElement
  ): void { }

  removeChild(
    child: BaseElement
  ): void { }
}
