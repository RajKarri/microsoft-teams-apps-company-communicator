// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React, { useEffect } from "react";
import { app } from "@microsoft/teams-js";
import { getAuthenticationConsentMetadata } from "../../apis/messageListApi";

const SignInSimpleStart: React.FunctionComponent = () => {
  useEffect(() => {
    app.getContext().then((context) => {
      const windowLocationOriginDomain = window.location.origin.replace("https://", "");
      const login_hint = context.user?.userPrincipalName ? context.user.userPrincipalName : "";

      getAuthenticationConsentMetadata(windowLocationOriginDomain, login_hint).then((result) => {
        window.location.assign(result.data);
      });
    });
  });

  return <></>;
};

export default SignInSimpleStart;
