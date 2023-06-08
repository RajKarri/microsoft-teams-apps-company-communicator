// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ROUTE_PARTS } from '../routes';
import i18n from '../i18n';
import { store } from '../store';
import { authentication, HostClientType } from '@microsoft/teams-js';

const isIOSHost = () => {
  const clientType = store.getState().messages.hostClientType.payload;
  return clientType === HostClientType.ios || clientType === HostClientType.ipados;
};

export class ApiDecorator {
  public async get(url: string): Promise<any> {
    try {
      return await this.handleAxiosCall('get', url).then((response) => {
        if (isIOSHost() && response.type === 'cors' && response.status === 401) {
          return this.handleAxiosCall('get', response.url).then((result) => result.json());
        } else {
          return response.json();
        }
      });
    } catch (ex) {
      this.handleError(ex);
      throw ex;
    }
  }

  public async delete(url: string): Promise<any> {
    try {
      return await this.handleAxiosCall('delete', url).then((response) => {
        if (isIOSHost() && response.type === 'cors' && response.status === 401) {
          return this.handleAxiosCall('delete', response.url).then((result) => result.json());
        } else {
          return response.json();
        }
      });
    } catch (ex) {
      this.handleError(ex);
      throw ex;
    }
  }

  public async post(url: string, data?: any): Promise<any> {
    try {
      return await this.handleAxiosCall('post', url, data).then((response) => {
        if (isIOSHost() && response.type === 'cors' && response.status === 401) {
          return this.handleAxiosCall('post', response.url, data).then((result) => result.json());
        } else {
          return response.json();
        }
      });
    } catch (ex) {
      this.handleError(ex);
      throw ex;
    }
  }

  public async put(url: string, data?: any): Promise<any> {
    try {
      return await this.handleAxiosCall('put', url, data).then((response) => {
        if (isIOSHost() && response.type === 'cors' && response.status === 401) {
          return this.handleAxiosCall('put', response.url, data).then((result) => result.json());
        } else {
          return response.json();
        }
      });
    } catch (ex) {
      this.handleError(ex);
      throw ex;
    }
  }

  private async handleAxiosCall(verb: string, url: string, data: any = {}): Promise<any> {
    try {
      const token = await authentication.getAuthToken();
      switch (verb) {
        case 'get':
          return await fetch(url, {
            method: 'GET',
            headers: { Accept: 'application/json', 'content-type': 'application/json', Authorization: 'Bearer ' + token },
          });
        case 'post':
          return await fetch(url, {
            method: 'POST',
            headers: { Accept: 'application/json', 'content-type': 'application/json', Authorization: 'Bearer ' + token },
            body: JSON.stringify(data),
          });
        case 'put':
          return await fetch(url, {
            method: 'PUT',
            headers: { Accept: 'application/json', 'content-type': 'application/json', Authorization: 'Bearer ' + token },
            body: JSON.stringify(data),
          });
        case 'delete':
          return await fetch(url, {
            method: 'DELETE',
            headers: { Accept: 'application/json', 'content-type': 'application/json', Authorization: 'Bearer ' + token },
            body: JSON.stringify(data),
          });
        default:
          return await fetch(url, {
            method: 'GET',
            headers: { Accept: 'application/json', 'content-type': 'application/json', Authorization: 'Bearer ' + token },
          });
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

const apiCallDecoratorInstance = new ApiDecorator();
export default apiCallDecoratorInstance;
