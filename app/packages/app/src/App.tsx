import React from 'react';
import { Route } from 'react-router';
import { apiDocsPlugin, ApiExplorerPage } from '@backstage/plugin-api-docs';
import {
  CatalogEntityPage,
  CatalogIndexPage,
  catalogPlugin,
} from '@backstage/plugin-catalog';
import {
  CatalogImportPage,
  catalogImportPlugin,
} from '@backstage/plugin-catalog-import';
import { ScaffolderPage, scaffolderPlugin } from '@backstage/plugin-scaffolder';
import { orgPlugin } from '@backstage/plugin-org';
import { SearchPage } from '@backstage/plugin-search';
import { TechRadarPage } from '@backstage/plugin-tech-radar';
import {
  DefaultTechDocsHome,
  TechDocsIndexPage,
  // techdocsPlugin,
  TechDocsReaderPage,
} from '@backstage/plugin-techdocs';
import { UserSettingsPage } from '@backstage/plugin-user-settings';
import { apis } from './apis';
import { entityPage } from './components/catalog/EntityPage';
import { searchPage } from './components/search/SearchPage';
import { Root } from './components/Root';

import { AlertDisplay, OAuthRequestDialog, SignInPage, SignInProviderConfig } from '@backstage/core-components';
import { createApp } from '@backstage/app-defaults';
import { FlatRoutes } from '@backstage/core-app-api';
import { CatalogGraphPage } from '@backstage/plugin-catalog-graph';
import { PermissionedRoute } from '@backstage/plugin-permission-react';
import { catalogEntityCreatePermission } from '@backstage/plugin-catalog-common/alpha';

import { TeamCloudProvider, ProjectsPage, ProjectPage } from '@internal/plugin-teamcloud';
import { HomepageCompositionRoot } from '@backstage/plugin-home';
import { HomePage } from './components/home/HomePage';
import { microsoftAuthApiRef } from '@backstage/core-plugin-api';
import { Entity } from '@backstage/catalog-model';

const microsoftProvider: SignInProviderConfig = {
  id: 'microsoft-auth-provider',
  title: 'Microsoft Login',
  message: 'Sign in using Microsoft',
  apiRef: microsoftAuthApiRef
}

const app = createApp({
  apis,
  components: {
    SignInPage: props => <SignInPage {...props} auto provider={microsoftProvider} />
    //   // SignInPage: props => <SignInPage {...props} auto providers={['guest', microsoftProvider]} />
  },
  bindRoutes({ bind }) {
    bind(catalogPlugin.externalRoutes, {
      createComponent: scaffolderPlugin.routes.root,
      // viewTechDoc: techdocsPlugin.routes.docRoot,
    });
    bind(apiDocsPlugin.externalRoutes, {
      registerApi: catalogImportPlugin.routes.importPage,
    });
    bind(scaffolderPlugin.externalRoutes, {
      registerComponent: catalogImportPlugin.routes.importPage,
    });
    bind(orgPlugin.externalRoutes, {
      catalogIndex: catalogPlugin.routes.catalogIndex,
    });
  },
});

const AppProvider = app.getProvider();
const AppRouter = app.getRouter();

const templateGroups: {
  title?: string;
  titleComponent?: React.ReactNode;
  filter: (entity: Entity) => boolean;
}[] = [
    {
      title: 'Dev Boxes',
      filter: (e) => e.spec?.type === 'dev-box'
    },
    {
      title: 'Environments',
      filter: (e) => e.spec?.type === 'service'
    }
  ]

const routes = (
  <TeamCloudProvider>
    <FlatRoutes>
      <Route path="/" element={<HomepageCompositionRoot />}>
        <HomePage />
      </Route>
      <Route path="/catalog" element={<CatalogIndexPage />} />
      <Route path="/catalog/:namespace/:kind/:name" element={<CatalogEntityPage />}>
        {entityPage}
      </Route>
      <Route path="/docs" element={<TechDocsIndexPage />}>
        <DefaultTechDocsHome />
      </Route>
      <Route path="/docs/:namespace/:kind/:name/*" element={<TechDocsReaderPage />} />
      <Route path="/create" element={<ScaffolderPage groups={templateGroups} />} />
      <Route path="/api-docs" element={<ApiExplorerPage />} />
      <Route path="/tech-radar" element={<TechRadarPage width={1500} height={800} />} />
      <PermissionedRoute path="/catalog-import" permission={catalogEntityCreatePermission} element={<CatalogImportPage />} />
      <Route path="/search" element={<SearchPage />}>
        {searchPage}
      </Route>
      <Route path="/settings" element={<UserSettingsPage />} />
      <Route path="/catalog-graph" element={<CatalogGraphPage />} />
      {/* <Route path="/orgs" element={<OrgsPage />} /> */}
      {/* <Route path="/orgs/:orgId" element={<OrgPage />} /> */}
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/projects/:projectId" element={<ProjectPage />} />
    </FlatRoutes>
  </TeamCloudProvider >
);

const App = () => (
  // <TeamCloudProvider>
  <AppProvider>
    <AlertDisplay />
    <OAuthRequestDialog />
    <AppRouter>
      <Root>{routes}</Root>
    </AppRouter>
  </AppProvider>
  // </TeamCloudProvider>
);

export default App;
