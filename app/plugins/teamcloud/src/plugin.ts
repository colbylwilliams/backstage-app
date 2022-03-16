import { createComponentExtension, createPlugin, createRoutableExtension } from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const teamcloudPlugin = createPlugin({
  id: 'teamcloud',
  routes: {
    root: rootRouteRef,
  },
});

export const TeamCloudProvider = teamcloudPlugin.provide(
  createComponentExtension({
    name: 'TeamCloudProvider',
    component: {
      lazy: () => import('./providers/TeamCloudProvider/TeamCloudProvider').then(m => m.TeamCloudProvider)
    }
  })
);

export const ProjectsPage = teamcloudPlugin.provide(
  createRoutableExtension({
    name: 'ProjectsPage',
    component: () =>
      import('./components/ProjectsPage/ProjectsPage').then(m => m.ProjectsPage),
    mountPoint: rootRouteRef,
  }),
);

export const ProjectList = teamcloudPlugin.provide(
  createComponentExtension({
    name: 'ProjectsList',
    component: {
      lazy: () => import('./components/ProjectsList/ProjectsList').then(m => m.ProjectsList)
    }
  }),
);

// export const OrgsPage = teamcloudPlugin.provide(
//   createRoutableExtension({
//     name: 'OrgsPage',
//     component: () =>
//       import('./components/OrgsPage/OrgsPage').then(m => m.OrgsPage),
//     mountPoint: rootRouteRef,
//   }),
// );

// export const OrgPage = teamcloudPlugin.provide(
//   createRoutableExtension({
//     name: 'OrgsPage',
//     component: () =>
//       import('./components/OrgPage/OrgPage').then(m => m.OrgPage),
//     mountPoint: rootRouteRef,
//   }),
// );

export const TeamcloudPage = teamcloudPlugin.provide(
  createRoutableExtension({
    name: 'TeamcloudPage',
    component: () =>
      import('./components/ExampleComponent/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
