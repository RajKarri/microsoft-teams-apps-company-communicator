// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { app, authentication } from "@microsoft/teams-js";
import i18n from "../i18n";

export class AxiosJWTDecorator {
  public async get<T = any, R = AxiosResponse<T>>(
    url: string,
    handleError: boolean = true,
    needAuthorizationHeader: boolean = true,
    config?: AxiosRequestConfig
  ): Promise<R> {
    try {
      if (needAuthorizationHeader) {
        config = await this.setupAuthorizationHeader(config);
      }
      return await axios.get(url, config);
    } catch (error) {
      if (handleError) {
        this.handleError(error);
        throw error;
      } else {
        throw error;
      }
    }
  }

  public async delete<T = any, R = AxiosResponse<T>>(
    url: string,
    handleError: boolean = true,
    config?: AxiosRequestConfig
  ): Promise<R> {
    try {
      config = await this.setupAuthorizationHeader(config);
      return await axios.delete(url, config);
    } catch (error) {
      if (handleError) {
        this.handleError(error);
        throw error;
      } else {
        throw error;
      }
    }
  }

  public async post<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: any,
    handleError: boolean = true,
    config?: AxiosRequestConfig
  ): Promise<R> {
    try {
      config = await this.setupAuthorizationHeader(config);
      return await axios.post(url, data, config);
    } catch (error) {
      if (handleError) {
        this.handleError(error);
        throw error;
      } else {
        throw error;
      }
    }
  }

  public async put<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: any,
    handleError: boolean = true,
    config?: AxiosRequestConfig
  ): Promise<R> {
    try {
      config = await this.setupAuthorizationHeader(config);
      return await axios.put(url, data, config);
    } catch (error) {
      if (handleError) {
        this.handleError(error);
        throw error;
      } else {
        throw error;
      }
    }
  }

  private handleError(error: any): void {
    if (error.hasOwnProperty("response")) {
      const errorStatus = error.response.status;
      if (errorStatus === 403) {
        window.location.href = `/errorpage/403?locale=${i18n.language}`;
      } else if (errorStatus === 401) {
        window.location.href = `/errorpage/401?locale=${i18n.language}`;
      } else {
        window.location.href = `/errorpage?locale=${i18n.language}`;
      }
    } else {
      window.location.href = `/errorpage?locale=${i18n.language}`;
    }
  }

  private async setupAuthorizationHeader(config?: AxiosRequestConfig): Promise<AxiosRequestConfig> {
    if (app.isInitialized()) {
      return new Promise<AxiosRequestConfig>((resolve, reject) => {
        authentication
          .getAuthToken()
          .then((token) => {
            if (!config) {
              config = axios.defaults;
            }
            config.headers["Authorization"] = `Bearer ${token}`;
            config.headers["Accept-Language"] = i18n.language;
            resolve(config);
          })
          .catch((error) => {
            console.error("Error from getAuthToken: ", error);
            window.location.href = `/signin?locale=${i18n.language}`;
          });
      });
    } else {
      return new Promise<AxiosRequestConfig>((resolve, reject) => {
        resolve(axios.defaults);
      });
    }
  }
}

const axiosJWTDecoratorInstance = new AxiosJWTDecorator();
export default axiosJWTDecoratorInstance;
