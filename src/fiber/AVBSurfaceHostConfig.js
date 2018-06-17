// @flow

import AVBSurfaceContainer from './AVBSurfaceContainer';
import createElement, { BaseElement } from './elements';

const EMPTY_OBJECT = Object.freeze({});

type Props = Object;
type TextElement = Object; // @todo

export type HostContext = {|
|};

const DEFAULT_HOST_CONTEXT = ({}: any);

export function getRootHostContext(
  rootContainerInstance: AVBSurfaceContainer,
): HostContext {
  return DEFAULT_HOST_CONTEXT;
}

export function getChildHostContext(
  parentHostContext: HostContext,
  type: string,
): HostContext {
  return parentHostContext;
}

// region Mutation

export const supportsMutation = true;

export function appendChild(
  parentInstance: BaseElement | AVBSurfaceContainer,
  child: BaseElement | TextElement,
): void {
  if (typeof parentInstance.appendChild === 'function') {
    parentInstance.appendChild(child);
  }
}

export function appendChildToContainer(
  // @todo
) { }

export function insertBefore(
  parentInstance: BaseElement | AVBSurfaceContainer,
  child: BaseElement | TextElement,
  beforeChild: BaseElement | TextElement,
): void {
  if (typeof parentInstance.insertBefore === 'function') {
    parentInstance.insertBefore(child, beforeChild);
  }
}

export function insertInContainerBefore(
  parentInstance: BaseElement | AVBSurfaceContainer,
  child: BaseElement | TextElement,
  beforeChild: BaseElement | TextElement,
) {
  if (typeof parentInstance.insertBefore === 'function') {
    parentInstance.insertBefore(child, beforeChild);
  }
}

export function removeChild (
  parentInstance: BaseElement | AVBSurfaceContainer,
  child: BaseElement | TextElement,
): void {
  if (typeof child.finalizeBeforeRemoval === 'function') {
    child.finalizeBeforeRemoval();
  }

  if (typeof parentInstance.removeChild === 'function') {
    parentInstance.removeChild(child);
  }
}

export function removeChildFromContainer(
  // @todo
  parentInstance: BaseElement | AVBSurfaceContainer,
  child: BaseElement | TextElement,
): void {
  if (typeof child.finalizeBeforeRemoval === 'function') {
    child.finalizeBeforeRemoval();
  }

  if (typeof parentInstance.removeChild === 'function') {
    parentInstance.removeChild(child);
  }
}


export function prepareForCommit(): void {
  // noop
}

export function commitMount(
  instance: BaseElement,
  type: string,
  newProps: Object,
  internalInstanceHandle: Object,
) : void {
  instance.commitMount(newProps);
}

export function commitUpdate(
  instance: *,
  updatePayload: Array<mixed>,
  type: string,
  oldProps: Props,
  newProps: Props,
  internalInstanceHandle: Object,
): void {
  // @todo Update fiber props to leverage async resume.
  console.log(`${instance.constructor.name}#${newProps.zone}::commitUpdate()`, updatePayload);
  instance.commitUpdate(updatePayload, oldProps, newProps);
}

// endregion Mutation

export function resetAfterCommit(): void {
  // noop
}

// ---

export function createInstance(
  type: string,
  props: Props,
  rootContainerInstance: AVBSurfaceContainer,
  hostContext: HostContext,
  internalInstanceHandle: Object,
) {
  const element = createElement(type, props, rootContainerInstance, hostContext);

  return element;
}

export function appendInitialChild(
  parentInstance: BaseElement | AVBSurfaceContainer,
  child: BaseElement,
): void {
  // noop
}

export function finalizeInitialChildren(
  newElement: BaseElement,
  type: string,
  props: Props,
  rootContainerInstance: AVBSurfaceContainer,
): boolean {
  return newElement.finalizeBeforeMount(type, props, rootContainerInstance)
}

export function prepareUpdate(
  instance: BaseElement,
  type: string,
  oldProps: Props,
  newProps: Props,
  rootContainerInstance: AVBSurfaceContainer,
  hostContext: HostContext,
): null | Array<any> {
  return instance.prepareUpdate(oldProps, newProps, rootContainerInstance);
}

export function shouldSetTextContent(
  props: Object
): boolean {
  return false;
}

export function resetTextContent(
  element: BaseElement
): void {
  // noop
}

export function createTextInstance(
  text: string,
  rootContainerInstance : AVBSurfaceContainer,
  hostContext: Object,
  internalInstanceHandle: Object
) { /*TextElement */
  // noop
  //return new TextElement(text, rootContainerInstance);
}

export function commitTextUpdate(
  textElement: TextElement,
  oldText: string,
  newText: string,
): void {
  // noop
  //return textElement.commitUpdate(oldText, newText);
}

export const useSyncScheduling = false;

export function now() {
  return Date.now();
}
