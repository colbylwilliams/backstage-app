/* eslint-disable no-console */
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { useQuery } from 'react-query'
import { useIsAuthenticated } from '@azure/msal-react';
import { getSubscriptions } from '../azure';

export const useAzureSubscriptions = () => {

    const isAuthenticated = useIsAuthenticated();

    return useQuery(['azure', 'subscriptions'], async () => {
        try {
            const subs = await getSubscriptions();
            return (subs ?? []).sort((s1, s2) => {
                if (s1.displayName < s2.displayName) {
                    return -1;
                } else if (s1.displayName > s2.displayName) {
                    return 1;
                }
                return 0;
            });
        } catch (error) {
            console.error(error);
            return [];
        }
    }, {
        enabled: isAuthenticated
    });
}
