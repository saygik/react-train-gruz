import "isomorphic-fetch";
import "@babel/polyfill";
import React, { useEffect } from "react";
import { ViewScroll } from './shared/containers/index'
import Navbar from './navbar'
import { AuthProvider } from '../context/Auth';
import { useAuth } from '../context/Auth';
import SetupInterceptors from "../services/SetupInterceptor";
import "./app.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import Routes from '../routes';

//Setup axios Interceptors with token refresh
function AxiosInterceptorsComponent() {
      const { getAccessToken, refreshSession, onSessionExpired } = useAuth();

      useEffect(
            () => SetupInterceptors({ getAccessToken, refreshSession, onSessionExpired }),
            [getAccessToken, refreshSession, onSessionExpired]
      );

      return null;
}

const App = () =>
      <AuthProvider>
            <ViewScroll>
                  <AxiosInterceptorsComponent />
                  <Routes />
                  <Navbar />
            </ViewScroll>
      </AuthProvider>
export default App
