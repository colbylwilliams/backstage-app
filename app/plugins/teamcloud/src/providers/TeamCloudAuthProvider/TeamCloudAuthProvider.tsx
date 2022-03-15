import React, { PropsWithChildren, useEffect } from "react";
import { QueryClientProvider } from 'react-query';
import { auth, queryClient } from '@internal/plugin-teamcloud/src/api';
import { MsalProvider } from '@azure/msal-react';
import { InteractionType } from '@azure/msal-browser';
import { MsalAuthenticationResult, useMsalAuthentication } from '@azure/msal-react';

export const TeamCloudAuthProvider = ({ children }: PropsWithChildren<{}>) => {

    const authResult: MsalAuthenticationResult = useMsalAuthentication(InteractionType.Redirect, { scopes: auth.getScopes() });

    useEffect(() => {
        if (authResult.error) {
            // eslint-disable-next-line no-console
            console.log('logging in...')
            authResult.login(InteractionType.Redirect, { scopes: auth.getScopes() });
        }
    }, [authResult]);

    return (
        <MsalProvider instance={auth.clientApplication}>
            {/* <AuthenticatedTemplate>*/}
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
            {/* </AuthenticatedTemplate> */}
        </MsalProvider>
    );
}