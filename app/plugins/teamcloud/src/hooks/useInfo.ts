// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { useQuery } from 'react-query'
import { useIsAuthenticated } from '@azure/msal-react';
import { api, onResponse } from '../api';

export const useInfo = () => {

    const isAuthenticated = useIsAuthenticated();

    return useQuery(['info'], async () => {

        const { data } = await api.getInfo({
            onResponse: onResponse
        });

        return data;
    }, {
        enabled: isAuthenticated
    });
}
