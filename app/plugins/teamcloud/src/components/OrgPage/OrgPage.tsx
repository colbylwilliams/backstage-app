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
import { useOrg } from '../../hooks';
import { ProjectsList } from '../ProjectsList';

export const OrgPage = () => {

    // const { data: info } = useInfo();
    const { data: org } = useOrg();

    // console.log(orgs);

    return (
        <Page themeId="tool">
            <Header title="TeamCloud" subtitle="Optional subtitle">
                <HeaderLabel label="Slug" value={org?.slug} />
                <HeaderLabel label="Region" value={org?.location} />
                {/* <HeaderLabel label="Token" value={orgs?.map(o => o.displayName).join(', ')} /> */}
            </Header>
            <Content>
                <ContentHeader title={org?.displayName}>
                    <SupportButton>A plugin for TeamCloud</SupportButton>
                </ContentHeader>
                <Grid container spacing={3} direction="column">
                    {/* <Grid item>
                        <InfoCard title="Information card">
                            <Typography variant="body1">
                                All content should be wrapped in a card like this.
                            </Typography>
                        </InfoCard>
                    </Grid> */}
                    <Grid item>
                        <ProjectsList />
                    </Grid>
                </Grid>
            </Content>
        </Page>
    );
};
