// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import './App.scss';
import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { FluentProvider, teamsDarkTheme, teamsHighContrastTheme, teamsLightTheme } from '@fluentui/react-components';
import { app, authentication } from '@microsoft/teams-js';
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
import { RootState, useAppDispatch, useAppSelector } from './store';
import { authToken } from './authSlice';

export const App = () => {
  const [fluentUITheme, setFluentUITheme] = React.useState(teamsLightTheme);
  const [locale, setLocale] = React.useState('en-US');
  const [isAppReady, setIsAppReady] = React.useState(false);
  const [isTokenReady, setIsTokenReady] = React.useState(false);
  const [re, setResult] = React.useState<any>('');
  const [re5, setResult5] = React.useState<any>('');
  // const [st, setSt] = React.useState('stage1');
  const token = useAppSelector((state: RootState) => state.auth).authToken.payload;
  const [hostInfo, setHostInfo] = React.useState('test');
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment, @typescript-eslint/prefer-ts-expect-error
  // @ts-ignore
  const dir = i18n.dir(locale);
  const dispatch = useAppDispatch();

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

  // React.useEffect(() => {
  //   if (token) {
  //     setIsTokenReady(true);
  //     setSt('stage2');
  //     try {
  //       void fetch('https://rajtest2.azurewebsites.net/api/draftnotifications', {
  //         method: 'GET',
  //         headers: {
  //           Accept: 'application/json',
  //           Authorization: 'Bearer ' + token,
  //           'Content-Type': 'application/json'
  //         }
  //         // eslint-disable-next-line @typescript-eslint/promise-function-async
  //       }).then(res1 => res1.json()).then(re => {
  //         setResult(re);
  //         setSt('stage4');
  //       });
  //     } catch (error) {
  //       setSt('error');
  //       setResult(error);
  //     }
  //   }
  // }, [token]);

  React.useEffect(() => {
    // const config1 = axios.defaults;
    if (token) {
      setIsTokenReady(true);

      void fetch('https://rajtest2.azurefd.net/api/draftnotifications', {
        method: 'GET',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
        redirect: 'manual'
      }).then(r1 => {
        setResult5(r1?.status);
      }).catch(() => {
        setResult('catch block');
      });
      // axios.interceptors.request.use((config) => {
      //   config.headers.Authorization = 'Bearer ' + token;
      //   config.headers.accept = 'application/json';
      //   config.headers['content-type'] = 'application/json';
      //   setSt(JSON.stringify(config));
      //   return config;
      // }, async (error) => {
      //   return await Promise.reject(error);
      // });

      // axios.interceptors.response.use((re7) => {
      //   setResult5(JSON.stringify(re7));
      //   return re7;
      // }, async (error) => {
      //   return await Promise.reject(error);
      // });

      // try {
      //   axios.get('https://rajtest2.azurefd.net/api/draftnotifications').then(resp => {
      //     setResult(resp?.status);
      //   }).catch(er => {
      //     setResult(er?.response?.status || '');
      //   });
      // } catch {
      //   setResult('went to catch block');
      // }
    }
  }, [token]);

  React.useEffect(() => {
    if (isAppReady) {
      void authentication.getAuthToken().then(token => {
        dispatch(authToken({ type: 'ACCESS_TOKEN', payload: token }));
      });
      void app.getContext().then((context: app.Context) => {
        const theme = context.app.theme || 'default';
        setHostInfo(JSON.stringify(context.app.host));
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
      {isAppReady && isTokenReady && (
        <>
          {`token: ${token}`}
          <br />
          {// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            `result: ${re}`}
          <br />
          {/* {`headers: ${st}`} */}
          <br />
          <br />
          {// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            `response: ${re5}`}
          <br />
          <br />
          <span>{hostInfo}</span>
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
        </>
      )}
    </>
  );
};
