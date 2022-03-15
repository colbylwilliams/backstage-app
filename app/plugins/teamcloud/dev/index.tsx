import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { teamcloudPlugin, TeamcloudPage } from '../src/plugin';

createDevApp()
  .registerPlugin(teamcloudPlugin)
  .addPage({
    element: <TeamcloudPage />,
    title: 'Root Page',
    path: '/teamcloud'
  })
  .render();
