// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { getBaseUrl } from '../configVariables';
import axios from './axiosJWTDecorator';

const baseAxiosUrl = getBaseUrl() + '/api';

export const getSentNotifications = async (): Promise<any> => {
  const url = baseAxiosUrl + '/sentnotifications';
  return await axios.get(url);
};

export const getDraftNotifications = async (): Promise<any> => {
  const url = baseAxiosUrl + '/draftnotifications';
  return await axios.get(url);
};

export const verifyGroupAccess = async (): Promise<any> => {
  const url = baseAxiosUrl + '/groupdata/verifyaccess';
  return await axios.get(url);
};

export const getGroups = async (id: number): Promise<any> => {
  const url = `${baseAxiosUrl}/groupdata/${id}`;
  return await axios.get(url);
};

export const searchGroups = async (query: string): Promise<any> => {
  const url = `${baseAxiosUrl}/groupdata/search/${query}`;
  return await axios.get(url);
};

export const exportNotification = async (payload: any): Promise<any> => {
  const url = baseAxiosUrl + '/exportnotification/export';
  return await axios.put(url, payload);
};

export const getSentNotification = async (id: number): Promise<any> => {
  const url = `${baseAxiosUrl}/sentnotifications/${id}`;
  return await axios.get(url);
};

export const getDraftNotification = async (id: number): Promise<any> => {
  const url = `${baseAxiosUrl}/draftnotifications/${id}`;
  return await axios.get(url);
};

export const deleteDraftNotification = async (id: number): Promise<any> => {
  const url = `${baseAxiosUrl}/draftnotifications/${id}`;
  return await axios.delete(url);
};

export const duplicateDraftNotification = async (id: number): Promise<any> => {
  const url = `${baseAxiosUrl}/draftnotifications/duplicates/${id}`;
  return await axios.post(url);
};

export const sendDraftNotification = async (payload: any): Promise<any> => {
  const url = baseAxiosUrl + '/sentnotifications';
  return await axios.post(url, payload);
};

export const updateDraftNotification = async (payload: any): Promise<any> => {
  const url = baseAxiosUrl + '/draftnotifications';
  return await axios.put(url, payload);
};

export const createDraftNotification = async (payload: any): Promise<any> => {
  const url = baseAxiosUrl + '/draftnotifications';
  return await axios.post(url, payload);
};

export const getTeams = async (): Promise<any> => {
  const url = baseAxiosUrl + '/teamdata';
  return await axios.get(url);
};

export const cancelSentNotification = async (id: number): Promise<any> => {
  const url = `${baseAxiosUrl}/sentnotifications/cancel/${id}`;
  return await axios.post(url);
};

export const getConsentSummaries = async (id: number): Promise<any> => {
  const url = `${baseAxiosUrl}'/draftnotifications/consentSummaries/${id}`;
  return await axios.get(url);
};

export const sendPreview = async (payload: any): Promise<any> => {
  const url = baseAxiosUrl + '/draftnotifications/previews';
  return await axios.post(url, payload);
};

export const getAuthenticationConsentMetadata = async (windowLocationOriginDomain: string, loginHint: string): Promise<any> => {
  const url = `${baseAxiosUrl}/authenticationMetadata/consentUrl?windowLocationOriginDomain=${windowLocationOriginDomain}&loginhint=${loginHint}`;
  return await axios.get(url);
};
