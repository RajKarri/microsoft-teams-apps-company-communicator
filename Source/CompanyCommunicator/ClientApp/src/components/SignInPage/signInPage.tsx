// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import "./signInPage.scss";
import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Text } from "@fluentui/react-components";
import { app, authentication } from "@microsoft/teams-js";
import i18n from "../../i18n";

const SignInPage = () => {
  const { t } = useTranslation();
  const errorMessage = t("SignInPromptMessage");

  function onSignIn() {
    if (app.isInitialized()) {
      authentication
        .authenticate({ url: window.location.origin + "/signin-simple-start", isExternal: true })
        .then(() => {
          console.log("Login succeeded!");
          window.location.href = "/messages";
        })
        .catch((error) => {
          console.log("Login failed: " + error);
          window.location.href = `/errorpage?locale=${i18n.language}`;
        });
    }
  }

  return (
    <div className="sign-in-content-container">
      <Text className="info-text" size={500}>
        {errorMessage}
      </Text>
      <div className="space"></div>
      <Button appearance="primary" className="sign-in-button" onClick={onSignIn}>
        {t("SignIn")}
      </Button>
    </div>
  );
};

export default SignInPage;
