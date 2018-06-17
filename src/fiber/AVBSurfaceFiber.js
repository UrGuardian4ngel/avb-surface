// @flow

import ReactFiberReconciler from 'react-reconciler';
import type { FiberRoot } from 'react-reconciler';
import * as AVBSurfaceHostConfig from './AVBSurfaceHostConfig';
import AVBSurfaceContainer from './AVBSurfaceContainer';
import { IControlSurface } from '../surface';

const BundleType = {
  production: 0,
  development: 1,
};

export const AVBSurfaceRenderer = ReactFiberReconciler(AVBSurfaceHostConfig);

export const AVBSurfaceFiber: {|
  container: ?AVBSurfaceContainer,
  root: ?FiberRoot,

  create: (React$Element<any>, IControlSurface, ?Function) => void,
  update: (React$Element<any>, IControlSurface, ?Function) => void,
|} = {
  container: null,
  root: null,

  create(
    element: React$Element<any>,
    controlSurface: IControlSurface,
    callback: ?Function,
  ) {
    this.container = new AVBSurfaceContainer(controlSurface);
    this.root = AVBSurfaceRenderer.createContainer(this.container);

    return this.update(element, callback);
  },

  update(
    element: React$Element<any>,
    controlSurface: IControlSurface,
    callback: ?Function,
  ) {
    if (!this.root) {
      return this.start(element, callback);
    }

    if (process.env !== 'production') {
      require('./utils/setupDevTools');
      AVBSurfaceRenderer.injectIntoDevTools({
        bundleType: BundleType.development,
        version: '0.1.0', // version for your renderer
        rendererPackageName: 'avb-surface', // package name
        findHostInstanceByFiber: AVBSurfaceRenderer.findHostInstance // host instance (root)
      });
    }

    AVBSurfaceRenderer.updateContainer(element, this.root, null, callback);
  }
};
