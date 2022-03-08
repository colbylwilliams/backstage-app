// import { useHotCleanup } from '@backstage/backend-common';
import { TaskScheduler } from '@backstage/backend-tasks';
import { CatalogBuilder } from '@backstage/plugin-catalog-backend';
import { ScaffolderEntitiesProcessor } from '@backstage/plugin-scaffolder-backend';
import { MicrosoftGraphOrgEntityProvider } from '@backstage/plugin-catalog-backend-module-msgraph';
import { Router } from 'express';
import { Duration } from 'luxon';
import { PluginEnvironment } from '../types';
import { TeamCloudProvider } from './teamcloud';

export default async function createPlugin(env: PluginEnvironment): Promise<Router> {

  const builder = await CatalogBuilder.create(env);

  builder.addProcessor(new ScaffolderEntitiesProcessor());

  const msGraphOrgEntityProvider = MicrosoftGraphOrgEntityProvider.fromConfig(
    env.config,
    {
      id: 'https://graph.microsoft.com/v1.0',
      target: 'https://graph.microsoft.com/v1.0',
      logger: env.logger,
    },
  );
  builder.addEntityProvider(msGraphOrgEntityProvider);

  // const teamCloudEntityProvider = new TeamCloudProvider('development');

  // builder.addEntityProvider(msGraphOrgEntityProvider, teamCloudEntityProvider)

  // Trigger a read every 5 minutes
  const msgraphScheduler = TaskScheduler.fromConfig(env.config).forPlugin('plugin-catalog-backend-module-msgraph');
  await msgraphScheduler.scheduleTask({
    id: 'refresh_msgraph',
    initialDelay: Duration.fromObject({ seconds: 5 }),
    frequency: Duration.fromObject({ minutes: 5 }),
    timeout: Duration.fromObject({ minutes: 10 }),
    fn: async () => {
      await msGraphOrgEntityProvider.read()
    },
  })


  // const teamcloudScheduler = TaskScheduler.fromConfig(env.config).forPlugin('plugin-teamcloud');
  // await teamcloudScheduler.scheduleTask({
  //   id: 'refresh_components',
  //   initialDelay: Duration.fromObject({ seconds: 5 }),
  //   frequency: Duration.fromObject({ minutes: 2 }),
  //   timeout: Duration.fromObject({ minutes: 3 }),
  //   fn: async () => {
  //     await teamCloudEntityProvider.run()
  //   },
  // })
  // useHotCleanup(
  //   module,
  //   runPeriodically(() => msGraphOrgEntityProvider.read(), 5 * 60 * 1000),
  // );

  const { processingEngine, router } = await builder.build();

  await processingEngine.start();

  return router;
}
