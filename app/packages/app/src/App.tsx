import React from 'react';
import { Navigate, Route } from 'react-router';
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

import { AlertDisplay, OAuthRequestDialog } from '@backstage/core-components';
import { createApp } from '@backstage/app-defaults';
import { FlatRoutes } from '@backstage/core-app-api';
import { CatalogGraphPage } from '@backstage/plugin-catalog-graph';
import { PermissionedRoute } from '@backstage/plugin-permission-react';
import { catalogEntityCreatePermission } from '@backstage/plugin-catalog-common/alpha';
// import { TeamCloudProvider } from '@internal/plugin-teamcloud/src/providers/TeamCloudProvider';
import { OrgPage, OrgsPage, TeamCloudProvider } from '@internal/plugin-teamcloud';

// import { microsoftAuthApiRef } from '@backstage/core-plugin-api';
// import { SignInProviderConfig, SignInPage } from '@backstage/core-components';
// import { OrgPage, OrgsPage, TeamCloudProvider } from '@internal/plugin-teamcloud';

// const microsoftProvider: SignInProviderConfig = {
//   id: 'microsoft-auth-provider',
//   title: 'Microsoft',
//   message: 'Sign in using Microsoft',
//   apiRef: microsoftAuthApiRef
// }

const app = createApp({
  apis,
  // components: {
  //   // SignInPage: props => <SignInPage {...props} auto provider={microsoftProvider} />
  //   // SignInPage: props => <SignInPage {...props} auto providers={['guest', microsoftProvider]} />
  // },
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

const routes = (
  <TeamCloudProvider>
    <FlatRoutes>
      <Navigate key="/" to="catalog" />
      <Route path="/catalog" element={<CatalogIndexPage />} />
      <Route path="/catalog/:namespace/:kind/:name" element={<CatalogEntityPage />}>
        {entityPage}
      </Route>
      <Route path="/docs" element={<TechDocsIndexPage />}>
        <DefaultTechDocsHome />
      </Route>
      <Route path="/docs/:namespace/:kind/:name/*" element={<TechDocsReaderPage />} />
      <Route path="/create" element={<ScaffolderPage />} />
      <Route path="/api-docs" element={<ApiExplorerPage />} />
      <Route path="/tech-radar" element={<TechRadarPage width={1500} height={800} />} />
      <PermissionedRoute path="/catalog-import" permission={catalogEntityCreatePermission} element={<CatalogImportPage />} />
      <Route path="/search" element={<SearchPage />}>
        {searchPage}
      </Route>
      <Route path="/settings" element={<UserSettingsPage />} />
      <Route path="/catalog-graph" element={<CatalogGraphPage />} />
      <Route path="/orgs" element={<OrgsPage />} />
      <Route path="/orgs/:orgId" element={<OrgPage />} />
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
