import React from 'react';

import { VisualStudioLogoIcon } from '../icons/VisualStudioLogoIcon';
import { VisualStudioCodeLogoIcon } from '../icons/VisualStudioCodeLogoIcon';
import { AzureDevOpsLogoIcon } from '../icons/AzureDevOpsLogoIcon';
import { CodespacesLogoIcon } from '../icons/CodespacesLogoIcon';
import { AzureLogoIcon } from '../icons/AzureLogoIcon';
import { GitHubActionsLogoIcon } from '../icons/GitHubActionsLogoIcon';
import { GitHubLogoIcon } from '../icons/GitHubLogoIcon';
import { StackOverflowLogoIcon } from '../icons/StackOverflowLogoIcon';
import { TeamsLogoIcon } from '../icons/TeamsLogoIcon';
import { TemplateContosoLogo } from './TemplateContosoLogo';
import {
    HomePageCompanyLogo,
    HomePageStarredEntities,
    HomePageToolkit,
} from '@backstage/plugin-home';
import { Content, Page, InfoCard } from '@backstage/core-components';
import {
    HomePageSearchBar,
    SearchContextProvider,
} from '@backstage/plugin-search';
import {
    Grid,
    makeStyles
} from '@material-ui/core';
import { ProjectList } from '@internal/plugin-teamcloud';
// import { Grid, List, ListItemText, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    searchBar: {
        display: 'flex',
        maxWidth: '60vw',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[1],
        padding: '8px 0',
        borderRadius: '50px',
        margin: 'auto',
    },
    toolkit: {
        justifyContent: 'space-between'
    },
    tool: {
        minWidth: '112px'
    }
}));

const useLogoStyles = makeStyles(theme => ({
    container: {
        margin: theme.spacing(5, 0),
    },
    svg: {
        width: 'auto',
        height: 100,
    },
    path: {
        fill: '#7df3e1',
    },
}));

const tools = [
    {
        url: 'https://github.com/features/codespaces',
        label: 'VS Code',
        icon: <VisualStudioCodeLogoIcon />
    }, {
        url: 'https://github.com/features/codespaces',
        label: 'Codespaces',
        icon: <CodespacesLogoIcon />
    }, {
        url: '#',
        label: 'Stack Overflow',
        icon: <StackOverflowLogoIcon />
    }, {
        url: '#',
        label: 'AzureDevOps',
        icon: <AzureDevOpsLogoIcon />
    }, {
        url: '#',
        label: 'Azure',
        icon: <AzureLogoIcon />
    }, {
        url: '#',
        label: 'GitHub',
        icon: <GitHubLogoIcon />
    }, {
        url: '#',
        label: 'Teams',
        icon: <TeamsLogoIcon />
    }, {
        url: '#',
        label: 'Visual Studio',
        icon: <VisualStudioLogoIcon />
    }, {
        url: '#',
        label: 'GitHub Actions',
        icon: <GitHubActionsLogoIcon />
    }
]

// #root > div > div.BackstagePage-root-48.BackstagePage-root-49 > article > div > div:nth-child(3) > div:nth-child(2) > div > div.MuiCardContent-root-236 > ul
export const HomePage = () => {
    const classes = useStyles();

    const { svg, path, container } = useLogoStyles();

    return (
        <SearchContextProvider>
            <Page themeId="home">
                <Content>
                    <Grid container justifyContent="center" spacing={6}>
                        <HomePageCompanyLogo className={container} logo={<TemplateContosoLogo classes={{ svg, path }} />} />
                        <Grid container item xs={12} alignItems="center" direction="row">
                            <HomePageSearchBar classes={{ root: classes.searchBar }} placeholder="Search" />
                        </Grid>
                        <Grid container item xs={12}>
                            <Grid item xs={12} md={6} lg={8} >
                                <ProjectList />
                            </Grid>
                            <Grid item xs={12} md={6} lg={4}>
                                <HomePageStarredEntities title='Favorites' />
                            </Grid>
                            <Grid item xs={12} md={6} lg={8}>
                                <InfoCard title="Composable Section">
                                    {/* placeholder for content */}
                                    <div style={{ height: 210 }} />
                                </InfoCard>
                            </Grid>
                            <Grid item xs={12} md={6} lg={4} >
                                <HomePageToolkit tools={tools} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Content>
            </Page>
        </SearchContextProvider>
    );
};