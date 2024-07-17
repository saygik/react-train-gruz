import "isomorphic-fetch";
import "@babel/polyfill";
import React, { useState } from "react";
import { ViewScroll } from './shared/containers/index'
import Navbar from './navbar'
import { AuthProvider } from '../context/Auth';
import { useAuth } from '../context/Auth';
import SetupInterceptors from "../services/SetupInterceptor";
import "./app.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import Routes from '../routes';

//Setup axios Interceptors with signOut
function AxiosInterceptorsComponent(props) {
      const { signOut } = useAuth();
      const [ran, setRan] = useState(false);
      if (!ran) {
            SetupInterceptors(signOut);
            setRan(true);
      }
      return <></>;
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
