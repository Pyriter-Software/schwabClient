import { Client } from '../connection/client';
import { USER_PREFERENCE } from '../connection/routes.config';
import { Request, ResponseType } from '../models/connect';
import { UserPreference } from '../models/trader';

export class UserPreferenceApi {
  constructor(private client: Client) {}

  async getUserPreference(): Promise<UserPreference[]> {
    const response = await this.client.get({
      url: USER_PREFERENCE,
      responseType: ResponseType.JSON,
    } as Request);
    return response.data;
  }
}
