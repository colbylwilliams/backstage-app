/* eslint-disable no-console */
import React from 'react';
import { Table, TableColumn, Progress } from '@backstage/core-components';
import Alert from '@material-ui/lab/Alert';
import { Organization } from 'teamcloud';
import { useOrgs } from '../../hooks';

type DenseTableProps = {
  orgs: Organization[];
};

export const DenseTable = ({ orgs: orgs }: DenseTableProps) => {

  const columns: TableColumn[] = [
    { title: 'Id', field: 'id' },
    { title: 'Name', field: 'name' },
  ];

  const data = orgs.map(o => {
    return {
      id: o.id,
      name: o.displayName,
    };
  });

  return (
    <Table
      title="Example User List (fetching data from randomuser.me)"
      options={{ search: false, paging: false }}
      columns={columns}
      data={data}
    />
  );
};

export const ExampleFetchComponent = () => {

  const { data: orgs, isLoading: loading, error: error } = useOrgs();

  if (loading) {
    return <Progress />;
  } else if (error) {
    return <Alert severity="error">{`${error}`}</Alert>;
  }

  return <DenseTable orgs={orgs || []} />;
};
