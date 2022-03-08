// import { UrlReader } from '@backstage/backend-common';
import { Entity } from '@backstage/catalog-model';
import {
    EntityProvider,
    EntityProviderConnection,
} from '@backstage/plugin-catalog-backend';
import { microsoftAuthApiRef, useApi } from '@backstage/core-plugin-api'
import { TeamCloud } from 'teamcloud';
import { AccessToken, GetTokenOptions, TokenCredential } from '@azure/core-auth'


export class TeamCloudTokenProvider implements TokenCredential {

    getScopes = (scopes: string | string[] = 'openid', parseScopes: boolean = true): string[] => {

        const oidScope = 'openid'
        const hostScope = '{$host}/.default';
        const tcwebScope = 'http://TeamCloud.Web/user_impersonation';

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

    getToken = async (scopes: string | string[], _options?: GetTokenOptions): Promise<AccessToken | null> => {

        const auth = useApi(microsoftAuthApiRef);
        const token = await auth.getAccessToken(this.getScopes(scopes));
        const timestamp = new Date().valueOf() + (5 * 60);

        console.log(token);

        return { token: token, expiresOnTimestamp: timestamp }
    }
}

/**
 * Provides entities from fictional teamcloud service.
 */
export class TeamCloudProvider implements EntityProvider {
    private readonly env: string;
    // private readonly reader: UrlReader;
    private connection?: EntityProviderConnection;

    constructor(env: string) {
        this.env = env;
        // this.reader = reader;
    }

    // constructor(env: string, reader: UrlReader) {
    //     this.env = env;
    //     this.reader = reader;
    // }

    getProviderName(): string {
        return `teamcloud-${this.env}`;
    }

    async connect(connection: EntityProviderConnection): Promise<void> {
        this.connection = connection;
    }

    async getComponentEntities(): Promise<Entity[]> {
        const teamcloud = new TeamCloud(new TeamCloudTokenProvider(), 'https://teamclouddemo-api.azurewebsites.net/', { credentialScopes: [] });

        const orgs = await teamcloud.getOrganizations();

        console.log(orgs.data);

        return [];
    }

    async run(): Promise<void> {

        if (!this.connection) {
            throw new Error('Not initialized');
        }

        // const raw = await this.reader.read(
        //     `https://teamcloud-${this.env}.example.com/data`,
        // );

        // const data = JSON.parse(raw.toString());


        const entities: Entity[] = await this.getComponentEntities();


        await this.connection.applyMutation({
            type: 'full',
            entities: entities.map(entity => ({
                entity,
                locationKey: `teamcloud-provider:${this.env}`,
            })),
        });
    }
}

