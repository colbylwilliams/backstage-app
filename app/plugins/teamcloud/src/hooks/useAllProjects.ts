// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// import { useQueries, useQuery } from 'react-query'
import { useIsAuthenticated } from '@azure/msal-react';
import { api, onResponse } from '../api';
import { useOrgs } from '.';
import { useQueriesTyped } from './useQueriesTyped';

export const useAllProjects = () => {

    const { data: orgs } = useOrgs();

    const isAuthenticated = useIsAuthenticated();

    return useQueriesTyped(orgs ? orgs!.map(org => {
        return {
            queryKey: ['org', org.id, 'projects'],
            queryFn: async () => {
                const { data } = await api.getProjects(org!.id, {
                    onResponse: onResponse
                })
                return data;
            },
            enabled: isAuthenticated && !!orgs && orgs.length > 0
        }
    }) : []);
    //     useQuery(['org', org?.id, 'projects'], async () => {

    //         const { data } = await api.getProjects(org!.id, {
    //             onResponse: onResponse
    //         });

    //         return data;
    //     }
    //     ), {
    //     enabled: isAuthenticated && !!orgs && orgs.length > 0
    // });

    // return useQuery(['projects'], async () => {

    //     const { data } = await Promise.all(orgs?.map(async o => await api.getProjects(o.id)))
    //     await api.getProjects(org!.id, {
    //         onResponse: onResponse
    //     });

    //     return data;
    // }, {
    //     enabled: isAuthenticated && !!orgs && orgs.length > 0
    // });
}
