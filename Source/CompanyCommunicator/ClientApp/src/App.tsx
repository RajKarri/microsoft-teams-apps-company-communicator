// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import "./App.scss";
import i18n from "i18next";
import React, { Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { FluentProvider, teamsDarkTheme, teamsHighContrastTheme, teamsLightTheme } from "@fluentui/react-components";
import { app } from "@microsoft/teams-js";

import Configuration from "./components/config";
import ErrorPage from "./components/ErrorPage/errorPage";
import { MainContainer } from "./components/MainContainer/mainContainer";
import { NewMessage } from "./components/NewMessage/newMessage";
import { SendConfirmationTask } from "./components/SendConfirmationTask/sendConfirmationTask";
import SignInPage from "./components/SignInPage/signInPage";
import SignInSimpleEnd from "./components/SignInPage/signInSimpleEnd";
import SignInSimpleStart from "./components/SignInPage/signInSimpleStart";
import { ViewStatusTask } from "./components/ViewStatusTask/viewStatusTask";
import { ROUTE_PARAMS, ROUTE_PARTS } from "./routes";

export const App = () => {
  const [fluentUITheme, setFluentUITheme] = React.useState(teamsLightTheme);
  const [locale, setLocale] = React.useState("en-US");
  const [isAppReady, setIsAppReady] = React.useState(false);

  React.useEffect(() => {
    app
      .initialize()
      .then(() => {
        setIsAppReady(true);
      })
      .catch((error) => {
        setIsAppReady(false);
      });
  }, []);

  React.useEffect(() => {
    if (app.isInitialized() && isAppReady) {
      app.getContext().then((context: app.Context) => {
        const theme = context.app.theme || "default";
        setLocale(context.app.locale);
        i18n.changeLanguage(context.app.locale);
        updateTheme(theme);
      });

      app.registerOnThemeChangeHandler((theme: string) => {
        updateTheme(theme);
      });
    }
  }, [isAppReady]);

  const updateTheme = (theme: string) => {
    switch (theme.toLocaleLowerCase()) {
      case "default":
        setFluentUITheme(teamsLightTheme);
        break;
      case "dark":
        setFluentUITheme(teamsDarkTheme);
        break;
      case "contrast":
        setFluentUITheme(teamsHighContrastTheme);
        break;
    }
  };

  return (
    <>
      {isAppReady &&
        <FluentProvider theme={fluentUITheme} dir={i18n.dir(locale)}>
          <Suspense fallback={<div></div>}>
            <BrowserRouter>
              <Switch>
                <Route exact path={`/${ROUTE_PARTS.CONFIG_TAB}`} component={Configuration} />
                <Route exact path={`/${ROUTE_PARTS.MESSAGES}`} render={() => <MainContainer theme={fluentUITheme} />} />
                <Route exact path={`/${ROUTE_PARTS.NEW_MESSAGE}`} component={NewMessage} />
                <Route exact path={`/${ROUTE_PARTS.NEW_MESSAGE}/:${ROUTE_PARAMS.ID}`} component={NewMessage} />
                <Route exact path={`/${ROUTE_PARTS.VIEW_STATUS}/:${ROUTE_PARAMS.ID}`} component={ViewStatusTask} />
                <Route
                  exact
                  path={`/${ROUTE_PARTS.SEND_CONFIRMATION}/:${ROUTE_PARAMS.ID}`}
                  component={SendConfirmationTask}
                />
                <Route path={`/${ROUTE_PARTS.ERROR_PAGE}/:${ROUTE_PARAMS.ID}`} component={ErrorPage} />
                <Route path={`/${ROUTE_PARTS.ERROR_PAGE}`} component={ErrorPage} />
                <Route exact path={`/${ROUTE_PARTS.SIGN_IN}`} component={SignInPage} />
                <Route exact path={`/${ROUTE_PARTS.SIGN_IN_SIMPLE_START}`} component={SignInSimpleStart} />
                <Route exact path={`/${ROUTE_PARTS.SIGN_IN_SIMPLE_END}`} component={SignInSimpleEnd} />
              </Switch>
            </BrowserRouter>
          </Suspense>
        </FluentProvider>
      }
    </>
  );
};
