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

const SetupInterceptors = (signOut) => {
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
            if (config.url.includes("/api/oauth/refresh")) return config;
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
        console.log('error', error)
        const originalRequest = error.config;
        const refreshToken = cookies.get('REACT_APPS_GRUZ_RTOKEN')
        //        const token = localStorage.getItem('REACT_APPS_GRUZ_ATOKEN')
        if (error.response && error.response.status === 401 && originalRequest.url === _apiBase + '/api/auth/refresh') {
            console.log('LOGOUT')
            localStorage.removeItem('REACT_APPS_GRUZ_ATOKEN');
            cookies.remove('REACT_APPS_GRUZ_RTOKEN')
            cookies.remove('REACT_APPS_GRUZ_IDTOKEN')
            isRefreshing = false
            failedQueue = [];
            signOut()
            return Promise.reject(error);
        }

        if (error.response.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise(function (resolve, reject) {
                    failedQueue.push({ resolve, reject })
                }).then(token => {
                    //   console.log('retry', originalRequest?.url)
                    originalRequest.headers['Authorization'] = 'Bearer ' + token;
                    return axios(originalRequest);
                }).catch(err => {
                    return Promise.reject(err);
                })
            }
        }
        //        if (error.response.status === 401 && !originalRequest._retry) {

        if (error.response.status === 401 && !originalRequest._retry && !isRefreshing) {
            // console.log('originalRequest', originalRequest)
            originalRequest._retry = true;
            isRefreshing = true
            return axios.post(_apiBase + '/api/oauth/refresh',
                {
                    refresh_token: refreshToken,
                })
                .then(res => {
                    //                    console.log('+++++res', res)
                    if (res.status === 200) {
                        //                        console.log('-----------------------------', res?.data)
                        localStorage.setItem('REACT_APPS_GRUZ_ATOKEN', res.data.access_token);
                        //                        console.log('res.data', res.data)
                        res.data.refresh_token && cookies.set('REACT_APPS_GRUZ_RTOKEN', res.data.refresh_token, { path: '/' });
                        res.data.id_token && cookies.set('REACT_APPS_GRUZ_IDTOKEN', res.data.id_token, { path: '/' });
                        isRefreshing = false
                        processQueue(null, res.data.access_token);
                        axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.access_token;
                        return axios(originalRequest);
                    } else {
                        isRefreshing = false
                        console.log('-LOGOUT+')
                        localStorage.removeItem('REACT_APPS_GRUZ_ATOKEN');
                        cookies.remove('REACT_APPS_GRUZ_RTOKEN')
                        cookies.remove('REACT_APPS_GRUZ_IDTOKEN')

                        processQueue("error refreshing token", null);
                        signOut()
                    }

                })
                .catch(err2 => {
                    isRefreshing = false
                    console.log('LOGOUT')
                    localStorage.removeItem('REACT_APPS_GRUZ_ATOKEN');
                    cookies.remove('REACT_APPS_GRUZ_RTOKEN')
                    cookies.remove('REACT_APPS_GRUZ_IDTOKEN')

                    processQueue(err2, null);
                    signOut()
                    console.log('error', err2)
                })

        }

        return Promise.reject(error);
    });
}

export default SetupInterceptors;
