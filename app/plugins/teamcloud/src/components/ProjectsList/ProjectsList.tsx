/* eslint-disable no-console */
import React from 'react';
import { Table, TableColumn, Progress, Link } from '@backstage/core-components';
import Alert from '@material-ui/lab/Alert';
import { Organization, Project } from 'teamcloud';
import { useAllProjects, useOrg } from '../../hooks';

type DenseTableProps = {
    org: Organization | undefined;
    projects: Project[];
};

export const DenseTable = ({ projects: projects }: DenseTableProps) => {

    const columns: TableColumn<Project>[] = [
        { title: 'Name', field: 'name', render: (p) => <Link to={`/projects/${p.slug}`}>{p.displayName}</Link> },
        // { title: 'Organization', field: 'organizationName' },
        // { title: 'Organization', field: 'organizationName', render: () => org?.displayName },
        { title: 'Slug', field: 'slug' },
        { title: 'Id', field: 'id' },
    ];

    return (
        <Table
            title='Projects'
            options={{ search: false, paging: false }}
            columns={columns}
            data={projects}
        />
    );
};

export const ProjectsList = () => {

    const { data: org, isLoading: orgLoading, error: orgError } = useOrg();
    // const { data: projects, isLoading: projectsLoading, error: projectsError } = useProjects();
    const allProjects = useAllProjects();

    const projects = allProjects.filter(p => p.data !== undefined)?.flatMap(p => p.data!)

    if (orgLoading) {
        return <Progress />;
    } else if (orgError) {
        return <Alert severity="error">{`${orgError}`}</Alert>;
    }

    return <DenseTable org={org} projects={projects || []} />;
};
