/* eslint-disable no-console */
import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import {
    Header,
    Page,
    Content,
    ContentHeader,
    HeaderLabel,
    SupportButton,
    InfoCard,
} from '@backstage/core-components';
import { useOrg, useProject, useProjectMembers } from '../../hooks';

export const ProjectPage = () => {

    // const { data: info } = useInfo();
    const { data: org } = useOrg();
    const { data: project } = useProject();
    const { data: members } = useProjectMembers();

    // console.log(orgs);

    return (
        <Page themeId="tool">
            {/* <Header title={project?.displayName} subtitle={org?.displayName}> */}
            <Header title={org?.displayName} subtitle='Developer Cloud'>
                {/* <HeaderLabel label="Slug" value={org?.slug} /> */}
                <HeaderLabel label="Region" value={org?.location} />
                {/* <HeaderLabel label="Token" value={orgs?.map(o => o.displayName).join(', ')} /> */}
            </Header>
            <Content>
                <ContentHeader title={project?.displayName ?? ""}>
                    <SupportButton>A plugin for TeamCloud</SupportButton>
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
                        {/* <ProjectsList /> */}
                    </Grid>
                </Grid>
            </Content>
        </Page>
    );
};
