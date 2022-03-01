import { useHotCleanup } from '@backstage/backend-common';
// import { PluginTaskScheduler } from '@backstage/backend-tasks';
import { CatalogBuilder, runPeriodically } from '@backstage/plugin-catalog-backend';
import { ScaffolderEntitiesProcessor } from '@backstage/plugin-scaffolder-backend';
import { MicrosoftGraphOrgEntityProvider } from '@backstage/plugin-catalog-backend-module-msgraph';
import { Router } from 'express';
import { PluginEnvironment } from '../types';

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

  // Trigger a read every 5 minutes
  useHotCleanup(
    module,
    runPeriodically(() => msGraphOrgEntityProvider.read(), 5 * 60 * 1000),
  );

  const { processingEngine, router } = await builder.build();

  await processingEngine.start();

  return router;
}
