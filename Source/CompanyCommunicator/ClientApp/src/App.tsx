// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import './App.scss';
import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { FluentProvider, teamsDarkTheme, teamsHighContrastTheme, teamsLightTheme } from '@fluentui/react-components';
import { app } from '@microsoft/teams-js';
import i18n from '../src/i18n';
import Configuration from './components/config';
import ErrorPage from './components/ErrorPage/errorPage';
import { HomePage } from './components/Home/homePage';
import { NewMessage } from './components/NewMessage/newMessage';
import { SendConfirmationTask } from './components/SendConfirmationTask/sendConfirmationTask';
import SignInPage from './components/SignInPage/signInPage';
import SignInSimpleEnd from './components/SignInPage/signInSimpleEnd';
import SignInSimpleStart from './components/SignInPage/signInSimpleStart';
import { ViewStatusTask } from './components/ViewStatusTask/viewStatusTask';
import { ROUTE_PARAMS, ROUTE_PARTS } from './routes';
import { DeleteMessages } from './components/DeleteMessages/deleteMessages';
import { DeleteConfirmationTask } from './components/DeleteMessages/deleteConfirmationTask';

export const App = () => {
  const [fluentUITheme, setFluentUITheme] = React.useState(teamsLightTheme);
  const [locale, setLocale] = React.useState('en-US');
  const [isAppReady, setIsAppReady] = React.useState(false);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment, @typescript-eslint/prefer-ts-expect-error
  // @ts-ignore
  const dir = i18n.dir(locale);

  React.useEffect(() => {
    app
      .initialize()
      .then(() => {
        setIsAppReady(true);
      })
      .catch(() => {
        setIsAppReady(false);
      });
  }, []);

  React.useEffect(() => {
    if (isAppReady) {
      void app.getContext().then((context: app.Context) => {
        const theme = context.app.theme || 'default';
        setLocale(context.app.locale);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment, @typescript-eslint/prefer-ts-expect-error
        // @ts-ignore
        void i18n.changeLanguage(context.app.locale);
        updateTheme(theme);
      });

      app.registerOnThemeChangeHandler((theme: string) => {
        updateTheme(theme);
      });
    }
  }, [isAppReady]);

  const updateTheme = (theme: string) => {
    switch (theme.toLocaleLowerCase()) {
      case 'default':
        setFluentUITheme(teamsLightTheme);
        break;
      case 'dark':
        setFluentUITheme(teamsDarkTheme);
        break;
      case 'contrast':
        setFluentUITheme(teamsHighContrastTheme);
        break;
    }
  };

  return (
    <>
      {isAppReady && (
        <FluentProvider theme={fluentUITheme} dir={dir}>
          <Suspense fallback={<div></div>}>
            <BrowserRouter>
              <Routes>
                <Route path={`/${ROUTE_PARTS.CONFIG_TAB}`} element={<Configuration />} />
                <Route path={`/${ROUTE_PARTS.MESSAGES}`} element={<HomePage theme={fluentUITheme} />} />
                <Route path={`/${ROUTE_PARTS.NEW_MESSAGE}`} element={<NewMessage />} />
                <Route path={`/${ROUTE_PARTS.DELETE_MESSAGES}`} element={<DeleteMessages theme={fluentUITheme} />} />
                <Route
                  path={`/${ROUTE_PARTS.DELETE_MESSAGES_CONFIRM}/:${ROUTE_PARAMS.DELETION_TYPE}/:${ROUTE_PARAMS.DELETION_FROM_DATE}/:${ROUTE_PARAMS.DELETION_TO_DATE}`}
                  element={<DeleteConfirmationTask />}
                />
                <Route path={`/${ROUTE_PARTS.NEW_MESSAGE}/:${ROUTE_PARAMS.ID}`} element={<NewMessage />} />
                <Route path={`/${ROUTE_PARTS.VIEW_STATUS}/:${ROUTE_PARAMS.ID}`} element={<ViewStatusTask />} />
                <Route path={`/${ROUTE_PARTS.SEND_CONFIRMATION}/:${ROUTE_PARAMS.ID}`} element={<SendConfirmationTask />} />
                <Route path={`/${ROUTE_PARTS.SIGN_IN}`} element={<SignInPage />} />
                <Route path={`/${ROUTE_PARTS.SIGN_IN_SIMPLE_START}`} element={<SignInSimpleStart />} />
                <Route path={`/${ROUTE_PARTS.SIGN_IN_SIMPLE_END}`} element={<SignInSimpleEnd />} />
                <Route path={`/${ROUTE_PARTS.ERROR_PAGE}`} element={<ErrorPage />} />
                <Route path={`/${ROUTE_PARTS.ERROR_PAGE}/:${ROUTE_PARAMS.ID}`} element={<ErrorPage />} />
              </Routes>
            </BrowserRouter>
          </Suspense>
        </FluentProvider>
      )}
    </>
  );
};
