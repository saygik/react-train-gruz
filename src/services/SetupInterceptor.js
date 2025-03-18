import axios from './axiosconfigfile'
import Cookies from 'universal-cookie';

import { apiConfig } from "../config";

let isRefreshing = false;

let failedQueue = [];
const _apiBase = apiConfig.apiGruzUrl
const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    })

    failedQueue = [];
}

const SetupInterceptors = (signOut, signIn) => {
    const cookies = new Cookies();
    //Request Interceptor
    axios.interceptors.request.use(
        async (config) => {

            config.headers["Content-Type"] = "application/json";
            //        const cookies = new Cookies()
            let token = localStorage.getItem('REACT_APPS_GRUZ_ATOKEN')
            if (token === "null" || token === null) token = ""
            //            console.log('tok', token)
            if (config.url.includes("/api/oauth/login")) return config;
            //            console.log('token1', token)
            if (token.length > 5) {
                config.headers["Authorization"] = "Bearer " + token;
            }
            // console.log('token', token)
            return config;
        },
        (error) => {
            console.log('error int', error)
            return Promise.reject(error);
        }
    )
    //Response Interceptor
    axios.interceptors.response.use((response) => {
        return response
    }, function (error) {
        //        const token = localStorage.getItem('REACT_APPS_GRUZ_ATOKEN')
        if (error.response && error.response.status === 401) {
            console.log('LOGOUT')
            localStorage.removeItem('REACT_APPS_GRUZ_ATOKEN');
            isRefreshing = false
            failedQueue = [];
            signIn()
            return Promise.reject(error);
        }

        return Promise.reject(error);
    });
}

export default SetupInterceptors;
