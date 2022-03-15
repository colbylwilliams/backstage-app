/* eslint-disable no-console */
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Configuration, InteractionRequiredAuthError, PublicClientApplication } from '@azure/msal-browser';
import { AccessToken, TokenCredential } from '@azure/core-auth'
import { AuthenticationProvider, AuthenticationProviderOptions } from "@microsoft/microsoft-graph-client";

export class Auth implements TokenCredential, AuthenticationProvider {

    _getClientId = () => {
        return '3ab1e3d4-9de4-41aa-96b6-7909108295c9';

        // if (process.env.NODE_ENV !== 'production') {
        //     if (!process.env.REACT_APP_MSAL_CLIENT_ID) throw new Error('Must set env variable $REACT_APP_MSAL_CLIENT_ID');
        //     return process.env.REACT_APP_MSAL_CLIENT_ID;
        // }

        // return '__REACT_APP_MSAL_CLIENT_ID__';
    };

    _getAuthority = () => {
        return 'https://login.microsoftonline.com/ec509c4c-6b8f-4558-a7b7-030ff99b57e0';

        // if (process.env.NODE_ENV !== 'production') {
        //     if (!process.env.REACT_APP_MSAL_TENANT_ID) throw new Error('Must set env variable $REACT_APP_MSAL_TENANT_ID');
        //     return `https://login.microsoftonline.com/${process.env.REACT_APP_MSAL_TENANT_ID}`;
        // }

        // return 'https://login.microsoftonline.com/__REACT_APP_MSAL_TENANT_ID__';
    };

    _getScope = () => {
        return 'http://TeamCloud.Web/user_impersonation';

        // if (process.env.NODE_ENV !== 'production') {
        //     if (!process.env.REACT_APP_MSAL_SCOPE) throw new Error('Must set env variable REACT_APP_MSAL_SCOPE');
        //     return process.env.REACT_APP_MSAL_SCOPE;
        // }

        // return '__REACT_APP_MSAL_SCOPE__';
    };

    configuration: Configuration = {
        auth: {
            clientId: this._getClientId(),
            authority: this._getAuthority(),
            redirectUri: window.location.origin,
            postLogoutRedirectUri: window.location.origin,
            navigateToLoginRequestUrl: true,
        },
        cache: {
            cacheLocation: 'sessionStorage',
            storeAuthStateInCookie: false
        }
    };

    clientApplication = new PublicClientApplication(this.configuration);

    getScopes = (scopes: string | string[] = 'openid', parseScopes: boolean = true): string[] => {

        const oidScope = 'openid'
        const hostScope = '{$host}/.default';
        const tcwebScope = this._getScope();// 'http://TeamCloud.Web/user_impersonation';

        let _scopes = scopes;

        if (!Array.isArray(_scopes))
            _scopes = [_scopes];

        if (parseScopes) {

            const hostIndex = _scopes.indexOf(hostScope);

            if (hostIndex >= -1)
                _scopes.splice(hostIndex, 1)

            if (!_scopes.includes(oidScope))
                _scopes.push(oidScope);

            if (!_scopes.includes(tcwebScope))
                _scopes.push(tcwebScope);
        }

        return _scopes;
    }

    getManagementToken = async (): Promise<AccessToken | null> => {

        const scopes = ['https://management.azure.com/.default'];

        const accounts = this.clientApplication.getAllAccounts();

        if (accounts.length <= 0) {
            console.error('nope')
            return null;
        }

        const account = accounts[0];

        const authResult = await this.clientApplication.acquireTokenSilent({ account: account, scopes: scopes });

        return { token: authResult.accessToken, expiresOnTimestamp: authResult.expiresOn!.getTime() };
    }

    getToken = async (scopes: string | string[] = 'openid'): Promise<AccessToken | null> => {

        const _scopes = this.getScopes(scopes);

        // console.log(`getToken (${scopes.includes('User.Read') ? 'graph' : 'api'})`);
        const accounts = this.clientApplication.getAllAccounts();

        if (accounts.length <= 0) {
            console.error('nope')
            return null;
        }
        const account = accounts[0];

        try {

            const authResult = await this.clientApplication.acquireTokenSilent({ account: account, scopes: _scopes });

            console.log(`got token: ${authResult.accessToken}`);

            return { token: authResult.accessToken, expiresOnTimestamp: authResult.expiresOn!.getTime() };

        } catch (error) {

            if (error instanceof InteractionRequiredAuthError) {
                // console.error(error);
                console.error(`errorCode : ${error.errorCode}`);
                console.error(`errorMessage : ${error.errorMessage}`);
                console.error(`message : ${error.message}`);
                console.error(`name : ${error.name}`);
                console.error(`subError : ${error.subError}`);

                try {

                    await this.clientApplication.acquireTokenRedirect({ account: account, scopes: scopes as string[] })

                } catch (err) {

                    if (err instanceof InteractionRequiredAuthError) {
                        console.error(`err.errorCode : ${err.errorCode}`);
                        console.error(`err.errorMessage : ${err.errorMessage}`);
                        console.error(`err.message : ${err.message}`);
                        console.error(`err.name : ${err.name}`);
                        console.error(`err.subError : ${err.subError}`);
                    }
                }
            }

            return null;
        }

        // console.log('TOKEN (' + (authParameters.scopes || []).join(' | ') + ' | ' + authResponse.expiresOn + ') ' + authResponse.accessToken);
    }

    getAccessToken = async (authenticationProviderOptions?: AuthenticationProviderOptions): Promise<string> => {
        const graphScopes = ['User.Read', 'User.ReadBasic.All', 'Directory.Read.All', 'People.Read']; // An array of graph scopes

        if (authenticationProviderOptions?.scopes)
            graphScopes.concat(authenticationProviderOptions.scopes)

        const token = await this.getToken(graphScopes);

        console.log(`got access token: ${token}`);

        return token?.token ?? Promise.reject('Unable to get token');
    }

    logout = async (): Promise<void> => this.clientApplication.logout();
}

// import { errorApiRef, useApi, microsoftAuthApiRef } from '@backstage/core-plugin-api';
// import { TeamCloud } from 'teamcloud';
// import { AccessToken, GetTokenOptions, TokenCredential } from '@azure/core-auth'

// export class TeamCloudTokenProvider implements TokenCredential {

//     getScopes = (scopes: string | string[] = 'openid', parseScopes: boolean = true): string[] => {

//         const oidScope = 'openid'
//         const hostScope = '{$host}/.default';
//         const tcwebScope = 'http://TeamCloud.Web/user_impersonation';

//         let _scopes = scopes;

//         if (!Array.isArray(_scopes))
//             _scopes = [_scopes];

//         if (parseScopes) {

//             const hostIndex = _scopes.indexOf(hostScope);

//             if (hostIndex >= -1)
//                 _scopes.splice(hostIndex, 1)

//             if (!_scopes.includes(oidScope))
//                 _scopes.push(oidScope);

//             if (!_scopes.includes(tcwebScope))
//                 _scopes.push(tcwebScope);
//         }

//         return _scopes;
//     }

//     getToken = async (scopes: string | string[], _options?: GetTokenOptions): Promise<AccessToken | null> => {

//         const auth = useApi(microsoftAuthApiRef);
//         const token = await auth.getAccessToken(this.getScopes(scopes));
//         const timestamp = new Date().valueOf() + (5 * 60);

//         // console.log(token);

//         return { token: token, expiresOnTimestamp: timestamp }
//     }
// }
