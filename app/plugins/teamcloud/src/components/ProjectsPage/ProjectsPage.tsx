/* eslint-disable no-console */
import React from 'react';
import { Grid } from '@material-ui/core';
import {
    // InfoCard,
    Header,
    Page,
    Content,
    ContentHeader,
    HeaderLabel,
    SupportButton,
} from '@backstage/core-components';
import { useInfo } from '../../hooks';
import { ProjectsList } from '../ProjectsList';

export const ProjectsPage = () => {

    const { data: info } = useInfo();

    // console.log(orgs);

    return (
        <Page themeId="tool">
            <Header title="Contoso" subtitle="Developer Cloud">
                <HeaderLabel label="Version" value={info?.imageVersion} />
                {/* <HeaderLabel label="Template Version" value={info?.templateVersion} /> */}
                {/* <HeaderLabel label="Token" value={orgs?.map(o => o.displayName).join(', ')} /> */}
            </Header>
            <Content>
                <ContentHeader title="">
                    <SupportButton>A plugin for TeamCloud</SupportButton>
                </ContentHeader>
                <Grid container spacing={3} direction="column">
                    <Grid item>
                        {/* <InfoCard title="Information card">
                            <Typography variant="body1">
                                All content should be wrapped in a card like this.
                            </Typography>
                        </InfoCard> */}
                    </Grid>
                    <Grid item>
                        <ProjectsList />
                    </Grid>
                </Grid>
            </Content>
        </Page>
    );
};
