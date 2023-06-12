// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { getBaseUrl } from '../configVariables';
import { IDeleteMessageRequest } from '../models/deletedMessages';
import apiCall from './apiTestDecorator';

const baseAxiosUrl = getBaseUrl() + '/api';

export const getSentNotifications = async (): Promise<any> => {
  const url = baseAxiosUrl + '/sentnotifications';
  return await apiCall.get(url);
};

export const getDraftNotifications = async (): Promise<any> => {
  const url = baseAxiosUrl + '/draftnotifications';
  return await apiCall.get(url);
};

export const verifyGroupAccess = async (): Promise<any> => {
  const url = baseAxiosUrl + '/groupdata/verifyaccess';
  return await apiCall.getText(url);
};

export const getGroups = async (id: number): Promise<any> => {
  const url = `${baseAxiosUrl}/groupdata/${id}`;
  return await apiCall.get(url);
};

export const searchGroups = async (query: string): Promise<any> => {
  const url = `${baseAxiosUrl}/groupdata/search/${query}`;
  return await apiCall.get(url);
};

export const getTeams = async (): Promise<any> => {
  const url = baseAxiosUrl + '/teamdata';
  return await apiCall.get(url);
};

export const getDraftNotification = async (id: number): Promise<any> => {
  const url = `${baseAxiosUrl}/draftnotifications/${id}`;
  return await apiCall.get(url);
};

export const exportNotification = async (payload: any): Promise<any> => {
  const url = baseAxiosUrl + '/exportnotification/export';
  return await apiCall.put(url, payload);
};

export const getSentNotification = async (id: number): Promise<any> => {
  const url = `${baseAxiosUrl}/sentnotifications/${id}`;
  return await apiCall.get(url);
};

export const deleteDraftNotification = async (id: number): Promise<any> => {
  const url = `${baseAxiosUrl}/draftnotifications/${id}`;
  return await apiCall.delete(url);
};

export const duplicateDraftNotification = async (id: number): Promise<any> => {
  const url = `${baseAxiosUrl}/draftnotifications/duplicates/${id}`;
  return await apiCall.post(url);
};

export const sendDraftNotification = async (payload: any): Promise<any> => {
  const url = baseAxiosUrl + '/sentnotifications';
  return await apiCall.postText(url, payload);
};

export const updateDraftNotification = async (payload: any): Promise<any> => {
  const url = baseAxiosUrl + '/draftnotifications';
  return await apiCall.put(url, payload);
};

export const createDraftNotification = async (payload: any): Promise<any> => {
  const url = baseAxiosUrl + '/draftnotifications';
  return await apiCall.post(url, payload);
};

export const cancelSentNotification = async (id: number): Promise<any> => {
  const url = `${baseAxiosUrl}/sentnotifications/cancel/${id}`;
  return await apiCall.post(url);
};

export const getConsentSummaries = async (id: number): Promise<any> => {
  const url = `${baseAxiosUrl}/draftnotifications/consentSummaries/${id}`;
  return await apiCall.get(url);
};

export const sendPreview = async (payload: any): Promise<any> => {
  const url = baseAxiosUrl + '/draftnotifications/previews';
  return await apiCall.post(url, payload);
};

export const getDeletedMessages = async (): Promise<any> => {
  const url = baseAxiosUrl + '/deletemessages';
  return await apiCall.get(url);
};

export const deleteMessages = async (payload: IDeleteMessageRequest): Promise<any> => {
  const url = baseAxiosUrl + '/deletemessages';
  return await apiCall.post(url, payload);
};

export const getAuthenticationConsentMetadata = async (windowLocationOriginDomain: string, loginHint: string): Promise<any> => {
  const url = `${baseAxiosUrl}/authenticationMetadata/consentUrl?windowLocationOriginDomain=${windowLocationOriginDomain}&loginhint=${loginHint}`;
  return await apiCall.get(url);
};
