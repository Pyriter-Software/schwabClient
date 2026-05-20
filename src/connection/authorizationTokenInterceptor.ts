import { GrantType, oauth, OAuthData } from '../api/authenticate';
import { AUTHENTICATION, OAUTH2_TOKEN } from './routes.config';
import { CredentialProvider, SchwabCredential } from '../providers/credentialProvider';
import { AxiosError } from 'axios';
import { Interceptor } from './interceptor';
import { Client } from './client';

const MAX_RETRIES = 1;

/**
 * Marker key on the axios request config that tracks how many 401
 * retries this *specific* request still has. Stored on the config
 * (not on the interceptor instance) so concurrent requests don't
 * race a single counter — see the PingController case where three
 * Schwab calls fan out in parallel after a lambda cold start.
 */
const AUTH_RETRIES_KEY = '__schwabAuthRetries';

export class AuthorizationTokenInterceptor extends Interceptor {
  /**
   * In-flight refresh promise. When a 401 races with another 401, the
   * second caller awaits the same refresh instead of double-refreshing
   * (and potentially invalidating each other's refresh tokens).
   */
  private refreshInFlight: Promise<void> | null = null;

  constructor(private readonly credentialProvider: CredentialProvider) {
    super();
  }

  async onSuccessRequestHandler(config): Promise<any> {
    if (config.url?.includes(AUTHENTICATION) || config.url?.includes(OAUTH2_TOKEN)) return config;
    const accessToken = await this.getAccessToken();
    config.headers.Authorization = `Bearer ${accessToken}`;
    if (config[AUTH_RETRIES_KEY] === undefined) {
      config[AUTH_RETRIES_KEY] = MAX_RETRIES;
    }
    return config;
  }

  async onErrorResponseHandler(error: AxiosError, client: Client): Promise<any> {
    const { config = {} as any, response } = error;

    if (config.url?.includes(OAUTH2_TOKEN) || config.url?.includes(AUTHENTICATION)) throw error;

    const remaining = config[AUTH_RETRIES_KEY] ?? 0;
    if (response?.status === 401 && remaining > 0) {
      console.info(
        `Response is 401; refreshing access token and retrying ${config.method?.toUpperCase()} ${config.url}`,
      );
      config[AUTH_RETRIES_KEY] = remaining - 1;
      await this.coalescedRefresh(client);
      // Drop the stale Authorization header so onSuccessRequestHandler
      // applies the freshly refreshed token to the retry.
      if (config.headers) delete config.headers.Authorization;
      return client.connect(config);
    }

    throw error;
  }

  private coalescedRefresh(client: Client): Promise<void> {
    if (!this.refreshInFlight) {
      this.refreshInFlight = this.refreshAccessToken(client).finally(() => {
        this.refreshInFlight = null;
      });
    }
    return this.refreshInFlight;
  }

  private async getAccessToken(): Promise<string> {
    const { access_token } = await this.getCredential();
    return access_token;
  }

  private async generateOAuthData(): Promise<OAuthData> {
    const tdaCredential = await this.getCredential();
    const { client_id, redirect_uri, refresh_token, client_secret, code } = tdaCredential;
    return {
      client_secret,
      client_id,
      redirect_uri,
      refresh_token,
      grant_type: GrantType.REFRESH_TOKEN,
    };
  }

  private async refreshAccessToken(client: Client) {
    const oAuthData = await this.generateOAuthData();
    const credential = await oauth(oAuthData, client);

    const now = Date.now();
    await this.updateCredential({
      ...credential,
      access_token_modified_date: now,
      refresh_token_modified_date: now,
    });
  }

  private async getCredential(): Promise<SchwabCredential> {
    return await this.credentialProvider.getCredential.bind(this.credentialProvider)();
  }

  private async updateCredential(tdaCredential: Partial<SchwabCredential>): Promise<void> {
    await this.credentialProvider.updateCredential.bind(this.credentialProvider, tdaCredential)();
  }
}
