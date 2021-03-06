/* eslint-disable no-console */
import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import {
  InfoCard,
  Header,
  Page,
  Content,
  ContentHeader,
  HeaderLabel,
  SupportButton,
} from '@backstage/core-components';
import { ExampleFetchComponent } from '../ExampleFetchComponent/ExampleFetchComponent';
// import useAsync from 'react-use/lib/useAsync';
// import { errorApiRef, useApi, microsoftAuthApiRef } from '@backstage/core-plugin-api';
// import { useTeamCloud } from '../../hooks/useTeamCloud';
// import { useOrgs } from '../../hooks';


export const ExampleComponent = () => {

  // const { data: orgs } = useOrgs();

  // console.log(orgs);

  return (
    <Page themeId="tool">
      <Header title="Welcome to TeamCloud!" subtitle="Optional subtitle">
        <HeaderLabel label="Owner" value="Team X" />
        <HeaderLabel label="Lifecycle" value="Alpha" />
        {/* <HeaderLabel label="Token" value={orgs?.map(o => o.displayName).join(', ')} /> */}
      </Header>
      <Content>
        <ContentHeader title="Plugin title">
          <SupportButton>A description of your plugin goes here.</SupportButton>
        </ContentHeader>
        <Grid container spacing={3} direction="column">
          <Grid item>
            <InfoCard title="Information card">
              <Typography variant="body1">
                All content should be wrapped in a card like this.
              </Typography>
            </InfoCard>
          </Grid>
          <Grid item>
            <ExampleFetchComponent />
          </Grid>
        </Grid>
      </Content>
    </Page>
  );
};
