// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { resolve } from "dns";
import { getBaseUrl } from "../configVariables";
// import axios from "./axiosJWTDecorator";

import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { authentication } from "@microsoft/teams-js";
let baseAxiosUrl = "https://rajtest2.azurefd.net/api";

export const getSentNotifications = async (): Promise<any> => {
  let url = baseAxiosUrl + "/sentnotifications";

  authentication.getAuthToken().then((token: string) => {
    let config: AxiosRequestConfig = {};
    config.headers["Authorization"] = `Bearer ${token}`;
    return axios.get(url, config);
  });

  // return await axios.get(url, await getConfig());
};

export const getDraftNotifications = async (): Promise<any> => {
  let url = baseAxiosUrl + "/draftnotifications";

  authentication.getAuthToken().then((token: string) => {
    let config: AxiosRequestConfig = {};
    config.headers["Authorization"] = `Bearer ${token}`;
    return axios.get(url, config);
  });

  // return await axios.get(url, await getConfig());
};

export const verifyGroupAccess = async (): Promise<any> => {
  let url = baseAxiosUrl + "/groupdata/verifyaccess";

  authentication.getAuthToken().then((token: string) => {
    let config: AxiosRequestConfig = {};
    config.headers["Authorization"] = `Bearer ${token}`;
    return axios.get(url, config);
  });

  // return await axios.get(url, await getConfig());
};

export const getGroups = async (id: number): Promise<any> => {
  let url = baseAxiosUrl + "/groupdata/" + id;

  authentication.getAuthToken().then((token: string) => {
    let config: AxiosRequestConfig = {};
    config.headers["Authorization"] = `Bearer ${token}`;
    return axios.get(url, config);
  });
  // return await axios.get(url, await getConfig());
};

export const searchGroups = async (query: string): Promise<any> => {
  let url = baseAxiosUrl + "/groupdata/search/" + query;
  authentication.getAuthToken().then((token: string) => {
    let config: AxiosRequestConfig = {};
    config.headers["Authorization"] = `Bearer ${token}`;
    return axios.get(url, config);
  });
  // return await axios.get(url, await getConfig());
};

export const exportNotification = async (payload: {}): Promise<any> => {
  let url = baseAxiosUrl + "/exportnotification/export";

  authentication.getAuthToken().then((token: string) => {
    let config: AxiosRequestConfig = {};
    config.headers["Authorization"] = `Bearer ${token}`;
    return axios.put(url, payload, config);
  });
  // return await axios.put(url, payload, await getConfig());
};

export const getSentNotification = async (id: number): Promise<any> => {
  let url = baseAxiosUrl + "/sentnotifications/" + id;

  authentication.getAuthToken().then((token: string) => {
    let config: AxiosRequestConfig = {};
    config.headers["Authorization"] = `Bearer ${token}`;
    return axios.get(url, config);
  });
  //  return await axios.get(url, await getConfig());
};

export const getDraftNotification = async (id: number): Promise<any> => {
  let url = baseAxiosUrl + "/draftnotifications/" + id;

  authentication.getAuthToken().then((token: string) => {
    let config: AxiosRequestConfig = {};
    config.headers["Authorization"] = `Bearer ${token}`;
    return axios.get(url, config);
  });

  // return await axios.get(url, await getConfig());
};

export const deleteDraftNotification = async (id: number): Promise<any> => {
  let url = baseAxiosUrl + "/draftnotifications/" + id;

  authentication.getAuthToken().then((token: string) => {
    let config: AxiosRequestConfig = {};
    config.headers["Authorization"] = `Bearer ${token}`;
    return axios.delete(url, config);
  });

  // return await axios.delete(url, await getConfig());
};

export const duplicateDraftNotification = async (id: number): Promise<any> => {
  let url = baseAxiosUrl + "/draftnotifications/duplicates/" + id;

  authentication.getAuthToken().then((token: string) => {
    let config: AxiosRequestConfig = {};
    config.headers["Authorization"] = `Bearer ${token}`;
    return axios.post(url, undefined, config);
  });

  // return await axios.post(url, await getConfig());
};

export const sendDraftNotification = async (payload: {}): Promise<any> => {
  let url = baseAxiosUrl + "/sentnotifications";

  authentication.getAuthToken().then((token: string) => {
    let config: AxiosRequestConfig = {};
    config.headers["Authorization"] = `Bearer ${token}`;
    return axios.post(url, payload, config);
  });

  // return await axios.post(url, payload, await getConfig());
};

export const updateDraftNotification = async (payload: {}): Promise<any> => {
  let url = baseAxiosUrl + "/draftnotifications";

  authentication.getAuthToken().then((token: string) => {
    let config: AxiosRequestConfig = {};
    config.headers["Authorization"] = `Bearer ${token}`;
    return axios.put(url, payload, config);
  });
  // return await axios.put(url, payload, await getConfig());
};

export const createDraftNotification = async (payload: {}): Promise<any> => {
  let url = baseAxiosUrl + "/draftnotifications";

  authentication.getAuthToken().then((token: string) => {
    let config: AxiosRequestConfig = {};
    config.headers["Authorization"] = `Bearer ${token}`;
    return axios.post(url, payload, config);
  });

  // return await axios.post(url, payload, await getConfig());
};

export const getTeams = async (): Promise<any> => {
  let url = baseAxiosUrl + "/teamdata";
  authentication.getAuthToken().then((token: string) => {
    let config: AxiosRequestConfig = {};
    config.headers["Authorization"] = `Bearer ${token}`;
    return axios.get(url, config);
  });
  //return await axios.get(url, await getConfig());
};

export const cancelSentNotification = async (id: number): Promise<any> => {
  let url = baseAxiosUrl + "/sentnotifications/cancel/" + id;

  authentication.getAuthToken().then((token: string) => {
    let config: AxiosRequestConfig = {};
    config.headers["Authorization"] = `Bearer ${token}`;
    return axios.post(url, undefined, config);
  });

  // return await axios.post(url, await getConfig());
};

export const getConsentSummaries = async (id: number): Promise<any> => {
  let url = baseAxiosUrl + "/draftnotifications/consentSummaries/" + id;
  authentication.getAuthToken().then((token: string) => {
    let config: AxiosRequestConfig = {};
    config.headers["Authorization"] = `Bearer ${token}`;
    return axios.get(url, config);
  });
  // return await axios.get(url, await getConfig());
};

export const sendPreview = async (payload: {}): Promise<any> => {
  let url = baseAxiosUrl + "/draftnotifications/previews";

   authentication.getAuthToken().then((token: string) => {
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

  authentication.getAuthToken().then((token: string) => {
    let config: AxiosRequestConfig = {};
    config.headers["Authorization"] = `Bearer ${token}`;
    return axios.get(url, config);
  });

  // return await axios.get(url, await getConfig());
};
