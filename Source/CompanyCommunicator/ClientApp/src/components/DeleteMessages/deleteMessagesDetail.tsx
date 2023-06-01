// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as React from 'react';

export const DeleteMessageDetail = (deletedMessages: any) => {
  return (
    <>
      <div>{JSON.stringify(deletedMessages)}</div>
    </>
  );
};
