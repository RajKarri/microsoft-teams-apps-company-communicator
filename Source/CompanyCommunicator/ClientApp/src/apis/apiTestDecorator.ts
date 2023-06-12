// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ROUTE_PARTS } from '../routes';
import i18n from '../i18n';
import { store } from '../store';
import { HostClientType, authentication } from '@microsoft/teams-js';

const isIOSHost = () => {
  const clientType = store.getState().messages.hostClientType.payload;
  return clientType === HostClientType.ios || clientType === HostClientType.ipados;
};

export class ApTestDecorator {
  public async get(url: string): Promise<any> {
    return await this.handleApiCall('get', url).then((response) => {
      if (response.type === 'cors' && response.status === 401 && isIOSHost()) {
        return this.handleApiCall('get', response.url).then((result) => result.json());
      } else {
        return response.json();
      }
    });
  }

  public async getText(url: string): Promise<any> {
    return await this.handleApiCall('get', url).then((response) => {
      if (response.type === 'cors' && response.status === 401 && isIOSHost()) {
        return this.handleApiCall('get', response.url).then((result) => result.text());
      } else {
        return response.text();
      }
    });
  }

  public async post(url: string, data?: any): Promise<any> {
    return await this.handleApiCall('post', url, data).then((response) => {
      if (response.type === 'cors' && response.status === 401 && isIOSHost()) {
        return this.handleApiCall('post', response.url, data).then((result) => result.json());
      } else {
        return response.json();
      }
    });
  }

  public async postText(url: string, data?: any): Promise<any> {
    return await this.handleApiCall('post', url, data).then((response) => {
      if (response.type === 'cors' && response.status === 401 && isIOSHost()) {
        return this.handleApiCall('post', response.url, data).then((result) => result.text());
      } else {
        return response.text();
      }
    });
  }

  public async put(url: string, data?: any): Promise<any> {
    return await this.handleApiCall('put', url, data).then((response) => {
      if (response.type === 'cors' && response.status === 401 && isIOSHost()) {
        return this.handleApiCall('put', response.url, data).then((result) => result.json());
      } else {
        return response.json();
      }
    });
  }

  public async putText(url: string, data?: any): Promise<any> {
    return await this.handleApiCall('put', url, data).then((response) => {
      if (response.type === 'cors' && response.status === 401 && isIOSHost()) {
        return this.handleApiCall('put', response.url, data).then((result) => result.text());
      } else {
        return response.text();
      }
    });
  }

  public async delete(url: string): Promise<any> {
    return await this.handleApiCall('delete', url).then((response) => {
      if (response.type === 'cors' && response.status === 401 && isIOSHost()) {
        return this.handleApiCall('delete', response.url).then((result) => result.json());
      } else {
        return response.json();
      }
    });
  }

  public async deleteText(url: string): Promise<any> {
    return await this.handleApiCall('delete', url).then((response) => {
      if (response.type === 'cors' && response.status === 401 && isIOSHost()) {
        return this.handleApiCall('delete', response.url).then((result) => result.text());
      } else {
        return response.text();
      }
    });
  }

  //   private processResponse(response: any) {
  //     const text = response.text();
  //     try {
  //       return JSON.parse(text);
  //     } catch {
  //       return text;
  //     }
  //   }

  private async handleApiCall(verb: string, url: string, data: any = {}): Promise<any> {
    const token = await authentication.getAuthToken();

    try {
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

const apiCallDecoratorInstance = new ApTestDecorator();
export default apiCallDecoratorInstance;
