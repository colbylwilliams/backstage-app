// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { useQuery } from 'react-query'
import { useIsAuthenticated } from '@azure/msal-react';
import { getMe } from '../msgraph';

export const useGraphUser = () => {

    const isAuthenticated = useIsAuthenticated();

    return useQuery(['graphUser', 'me'], async () => await getMe(), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5, // 5 minutes
        enabled: isAuthenticated
    });
}
