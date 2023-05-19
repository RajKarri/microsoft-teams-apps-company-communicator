// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { resolve } from "dns";
import { getBaseUrl } from "../configVariables";
// import axios from "./axiosJWTDecorator";

import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { authentication } from "@microsoft/teams-js";
let baseAxiosUrl = "https://rajtest2.azurefd.net/api";

const getConfig = () => {
  let config: AxiosRequestConfig = {};
  return new Promise<AxiosRequestConfig>((resolve, reject) => {
    authentication.getAuthToken().then((token: string) => {
      config.headers["Authorization"] = `Bearer ${token}`;
      resolve(config);
    });
  });
};

export const getSentNotifications = async (): Promise<any> => {
  let url = baseAxiosUrl + "/sentnotifications";

  await authentication.getAuthToken().then((token: string) => {
    let config: AxiosRequestConfig = {};
    config.headers["Authorization"] = `Bearer ${token}`;
    return axios.get(url, config);
  });

  // return await axios.get(url, await getConfig());
};

export const getDraftNotifications = async (): Promise<any> => {
  let url = baseAxiosUrl + "/draftnotifications";

  await authentication.getAuthToken().then((token: string) => {
    let config: AxiosRequestConfig = {};
    config.headers["Authorization"] = `Bearer ${token}`;
    return axios.get(url, config);
  });

  // return await axios.get(url, await getConfig());
};

export const verifyGroupAccess = async (): Promise<any> => {
  let url = baseAxiosUrl + "/groupdata/verifyaccess";

  await authentication.getAuthToken().then((token: string) => {
    let config: AxiosRequestConfig = {};
    config.headers["Authorization"] = `Bearer ${token}`;
    return axios.get(url, config);
  });

  // return await axios.get(url, await getConfig());
};

export const getGroups = async (id: number): Promise<any> => {
  let url = baseAxiosUrl + "/groupdata/" + id;

  await authentication.getAuthToken().then((token: string) => {
    let config: AxiosRequestConfig = {};
    config.headers["Authorization"] = `Bearer ${token}`;
    return axios.get(url, config);
  });
  // return await axios.get(url, await getConfig());
};

export const searchGroups = async (query: string): Promise<any> => {
  let url = baseAxiosUrl + "/groupdata/search/" + query;
  await authentication.getAuthToken().then((token: string) => {
    let config: AxiosRequestConfig = {};
    config.headers["Authorization"] = `Bearer ${token}`;
    return axios.get(url, config);
  });
  // return await axios.get(url, await getConfig());
};

export const exportNotification = async (payload: {}): Promise<any> => {
  let url = baseAxiosUrl + "/exportnotification/export";

  await authentication.getAuthToken().then((token: string) => {
    let config: AxiosRequestConfig = {};
    config.headers["Authorization"] = `Bearer ${token}`;
    return axios.put(url, payload, config);
  });
  // return await axios.put(url, payload, await getConfig());
};

export const getSentNotification = async (id: number): Promise<any> => {
  let url = baseAxiosUrl + "/sentnotifications/" + id;

  await authentication.getAuthToken().then((token: string) => {
    let config: AxiosRequestConfig = {};
    config.headers["Authorization"] = `Bearer ${token}`;
    return axios.get(url, config);
  });
  //  return await axios.get(url, await getConfig());
};

export const getDraftNotification = async (id: number): Promise<any> => {
  let url = baseAxiosUrl + "/draftnotifications/" + id;

  await authentication.getAuthToken().then((token: string) => {
    let config: AxiosRequestConfig = {};
    config.headers["Authorization"] = `Bearer ${token}`;
    return axios.get(url, config);
  });

  // return await axios.get(url, await getConfig());
};

export const deleteDraftNotification = async (id: number): Promise<any> => {
  let url = baseAxiosUrl + "/draftnotifications/" + id;

  await authentication.getAuthToken().then((token: string) => {
    let config: AxiosRequestConfig = {};
    config.headers["Authorization"] = `Bearer ${token}`;
    return axios.delete(url, config);
  });

  // return await axios.delete(url, await getConfig());
};

export const duplicateDraftNotification = async (id: number): Promise<any> => {
  let url = baseAxiosUrl + "/draftnotifications/duplicates/" + id;

  await authentication.getAuthToken().then((token: string) => {
    let config: AxiosRequestConfig = {};
    config.headers["Authorization"] = `Bearer ${token}`;
    return axios.post(url, undefined, config);
  });

  // return await axios.post(url, await getConfig());
};

export const sendDraftNotification = async (payload: {}): Promise<any> => {
  let url = baseAxiosUrl + "/sentnotifications";

  await authentication.getAuthToken().then((token: string) => {
    let config: AxiosRequestConfig = {};
    config.headers["Authorization"] = `Bearer ${token}`;
    return axios.post(url, payload, config);
  });

  // return await axios.post(url, payload, await getConfig());
};

export const updateDraftNotification = async (payload: {}): Promise<any> => {
  let url = baseAxiosUrl + "/draftnotifications";

  await authentication.getAuthToken().then((token: string) => {
    let config: AxiosRequestConfig = {};
    config.headers["Authorization"] = `Bearer ${token}`;
    return axios.put(url, payload, config);
  });
  // return await axios.put(url, payload, await getConfig());
};

export const createDraftNotification = async (payload: {}): Promise<any> => {
  let url = baseAxiosUrl + "/draftnotifications";

  await authentication.getAuthToken().then((token: string) => {
    let config: AxiosRequestConfig = {};
    config.headers["Authorization"] = `Bearer ${token}`;
    return axios.post(url, payload, config);
  });

  // return await axios.post(url, payload, await getConfig());
};

export const getTeams = async (): Promise<any> => {
  let url = baseAxiosUrl + "/teamdata";
  await authentication.getAuthToken().then((token: string) => {
    let config: AxiosRequestConfig = {};
    config.headers["Authorization"] = `Bearer ${token}`;
    return axios.get(url, config);
  });
  //return await axios.get(url, await getConfig());
};

export const cancelSentNotification = async (id: number): Promise<any> => {
  let url = baseAxiosUrl + "/sentnotifications/cancel/" + id;

  await authentication.getAuthToken().then((token: string) => {
    let config: AxiosRequestConfig = {};
    config.headers["Authorization"] = `Bearer ${token}`;
    return axios.post(url, undefined, config);
  });

  // return await axios.post(url, await getConfig());
};

export const getConsentSummaries = async (id: number): Promise<any> => {
  let url = baseAxiosUrl + "/draftnotifications/consentSummaries/" + id;
  await authentication.getAuthToken().then((token: string) => {
    let config: AxiosRequestConfig = {};
    config.headers["Authorization"] = `Bearer ${token}`;
    return axios.get(url, config);
  });
  // return await axios.get(url, await getConfig());
};

export const sendPreview = async (payload: {}): Promise<any> => {
  let url = baseAxiosUrl + "/draftnotifications/previews";

  await authentication.getAuthToken().then((token: string) => {
    let config: AxiosRequestConfig = {};
    config.headers["Authorization"] = `Bearer ${token}`;
    return axios.post(url, payload, config);
  });
  // return await axios.post(url, payload, await getConfig());
};

export const getAuthenticationConsentMetadata = async (
  windowLocationOriginDomain: string,
  login_hint: string
): Promise<any> => {
  let url = `${baseAxiosUrl}/authenticationMetadata/consentUrl?windowLocationOriginDomain=${windowLocationOriginDomain}&loginhint=${login_hint}`;

  await authentication.getAuthToken().then((token: string) => {
    let config: AxiosRequestConfig = {};
    config.headers["Authorization"] = `Bearer ${token}`;
    return axios.get(url, config);
  });

  // return await axios.get(url, await getConfig());
};
