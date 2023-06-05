// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { app, authentication } from '@microsoft/teams-js';
import { ROUTE_PARTS } from '../routes';
import i18n from '../i18n';

export class AxiosJWTDecorator {
  public async get<T = any, R = AxiosResponse<T>>(url: string): Promise<R> {
    return await this.handleAxiosCall('get', url);
  }

  public async delete<T = any, R = AxiosResponse<T>>(url: string): Promise<R> {
    return await this.handleAxiosCall('delete', url);
  }

  public async post<T = any, R = AxiosResponse<T>>(url: string, data?: any): Promise<R> {
    return await this.handleAxiosCall('post', url, data);
  }

  public async put<T = any, R = AxiosResponse<T>>(url: string, data?: any): Promise<R> {
    return await this.handleAxiosCall('put', url, data);
  }

  private async handleAxiosCall<T = any, R = AxiosResponse<T>>(verb: string, url: string, data?: any): Promise<R> {
    try {
      const config = await this.setupAuthorizationHeader();
      switch (verb) {
        case 'get':
          return await axios.get(url, config);
        case 'post':
          return await axios.post(url, data, config);
        case 'put':
          return await axios.put(url, data, config);
        case 'delete':
          return await axios.delete(url, config);
        default:
          return await axios.get(url, config);
      }
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  private async setupAuthorizationHeader(): Promise<AxiosRequestConfig> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment, @typescript-eslint/prefer-ts-expect-error
    // @ts-ignore
    const lang: string = i18n.language;
    let config: any = axios.defaults;
    if (app.isInitialized()) {
      return await new Promise<AxiosRequestConfig>((resolve, reject) => {
        authentication
          .getAuthToken()
          .then((token) => {
            if (!config) {
              config = axios.defaults;
            }
            // eslint-disable-next-line @typescript-eslint/dot-notation
            config.headers.common['Authorization'] = `Bearer ${token}`;
            config.headers.common['Accept-Language'] = lang;
            resolve(config);
          })
          .catch((error) => {
            console.error('Error from getAuthToken: ', error);
            window.location.href = `/signin?locale=${lang}`;
          });
      });
    } else {
      return await new Promise<AxiosRequestConfig>((resolve, reject) => {
        resolve(config);
      });
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

const axiosJWTDecoratorInstance = new AxiosJWTDecorator();
export default axiosJWTDecoratorInstance;
