// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createSlice } from '@reduxjs/toolkit';

export interface AuthState {
  authToken: { action: string; payload: string };
}

const initialState: AuthState = {
  authToken: { action: 'ACCESS_TOKEN', payload: '' },
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    authToken: (state, action) => {
      state.authToken = action.payload;
    },
  },
});

export const { authToken } = authSlice.actions;

export default authSlice.reducer;
