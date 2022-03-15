import { createPlugin, createRoutableExtension } from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const teamcloudPlugin = createPlugin({
  id: 'teamcloud',
  routes: {
    root: rootRouteRef,
  },
});

export const TeamcloudPage = teamcloudPlugin.provide(
  createRoutableExtension({
    name: 'TeamcloudPage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
