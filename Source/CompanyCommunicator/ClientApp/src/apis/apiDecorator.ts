// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ROUTE_PARTS } from '../routes';
import i18n from '../i18n';
import { store } from '../store';

export class AuthDecorator {
  public async get(url: string): Promise<any> {
    return await this.handleAxiosCall('get', url);
  }

  public async delete(url: string): Promise<any> {
    return await this.handleAxiosCall('delete', url);
  }

  public async post(url: string, data?: any): Promise<any> {
    return await this.handleAxiosCall('post', url, data);
  }

  public async put(url: string, data?: any): Promise<any> {
    return await this.handleAxiosCall('put', url, data);
  }

  private async handleAxiosCall(verb: string, url: string, data: any = {}): Promise<any> {
    try {
      const token = store.getState().auth.authToken.payload;

      switch (verb) {
        case 'get':
          return await fetch(url, { method: 'GET', headers: { Authorization: 'Bearer ' + token }, body: JSON.stringify(data) });
        case 'post':
          return await fetch(url, { method: 'POST', headers: { Authorization: 'Bearer ' + token }, body: JSON.stringify(data) });
        case 'put':
          return await fetch(url, { method: 'PUT', headers: { Authorization: 'Bearer ' + token }, body: JSON.stringify(data) });
        case 'delete':
          return await fetch(url, { method: 'DELETE', headers: { Authorization: 'Bearer ' + token }, body: JSON.stringify(data) });
        default:
          return await fetch(url, { method: 'GET', headers: { Authorization: 'Bearer ' + token }, body: JSON.stringify(data) });
      }
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  private handleError(error: any): void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment, @typescript-eslint/prefer-ts-expect-error
    // @ts-ignore
    const lang: string = i18n.language;

    if (error?.response?.status) {
      if (error.response.status === 403) {
        window.location.href = `/${ROUTE_PARTS.ERROR_PAGE}/403?locale=${lang}`;
      } else if (error.response.status === 401) {
        window.location.href = `/${ROUTE_PARTS.ERROR_PAGE}/401?locale=${lang}`;
      } else {
        window.location.href = `/${ROUTE_PARTS.ERROR_PAGE}?locale=${lang}`;
      }
    } else {
      window.location.href = `/${ROUTE_PARTS.ERROR_PAGE}?locale=${lang}`;
    }
  }
}

const apiCallDecoratorInstance = new AuthDecorator();
export default apiCallDecoratorInstance;
