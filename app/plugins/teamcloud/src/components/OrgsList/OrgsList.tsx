/* eslint-disable no-console */
import React from 'react';
import { Table, TableColumn, Progress, Link } from '@backstage/core-components';
import Alert from '@material-ui/lab/Alert';
import { Organization } from 'teamcloud';
import { useOrgs } from '../../hooks';

type DenseTableProps = {
    orgs: Organization[];
};

export const DenseTable = ({ orgs: orgs }: DenseTableProps) => {

    const columns: TableColumn<Organization>[] = [
        { title: 'Name', field: 'name', render: (o) => <Link to={`${o.slug}`}>{o.displayName}</Link> },
        { title: 'Slug', field: 'slug' },
        { title: 'Id', field: 'id' },
        { title: 'Location', field: 'locaiton' },
    ];

    return (
        <Table
            title='Organizations'
            options={{ search: false, paging: false }}
            columns={columns}
            data={orgs}
        />
    );
};

export const OrgsList = () => {

    const { data: orgs, isLoading: loading, error: error } = useOrgs();

    if (loading) {
        return <Progress />;
    } else if (error) {
        return <Alert severity="error">{`${error}`}</Alert>;
    }

    return <DenseTable orgs={orgs || []} />;
};
