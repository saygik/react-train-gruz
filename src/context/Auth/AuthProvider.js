import React, { useReducer, useEffect, useCallback, useMemo } from 'react';
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router";
import { api } from '../../services/api';

import { reducer, initialState } from './reducer';
import AuthContext from './AuthContext';


import { loginError, generateState, saveState, removeState } from './utils';

const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const cookies = new Cookies();
    const navigate = useNavigate()

    //********************   On componentDidMount effect  ********************//




    const signOut = useCallback(async () => {

        dispatch({ type: 'SIGN_OUT_REQUEST' });
        localStorage.removeItem('REACT_APPS_GRUZ_ATOKEN');
        cookies.set('REACT_APPS_GRUZ_RTOKEN', "none", { path: '/', maxAge: -1 });
        cookies.set('REACT_APPS_GRUZ_IDTOKEN', "none", { path: '/', maxAge: -1 });


    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    //********************   On authUser Change Effect ********************//



    const getUserData = useCallback(
        async () => {
            dispatch({ type: 'SIGN_IN_REQUEST' });
            const idtoken = cookies.get('REACT_APPS_GRUZ_IDTOKEN')
            try {
                const resultUser = await api.whoami(idtoken);
                //       console.log('resultUser', resultUser)
                if (resultUser && resultUser.status === 200) {

                    dispatch({ type: 'SIGN_IN_SUCCESS', payload: resultUser.data.user })

                } else {
                    dispatch({ type: 'SIGN_IN_ERROR' })
                    //deleteTokensInLocalStorege()
                    return { success: false, message: 'Ошибка получения информации о пользователе' }
                }
            } catch (error) {
                console.log('Ошибка получения информации о пользователе')
                dispatch({ type: 'SIGN_IN_ERROR' })
                return { success: false, message: 'Ошибка получения информации о пользователе' }
            }
        }, [])// eslint-disable-line react-hooks/exhaustive-deps

    const signIn = useCallback(async () => {

        dispatch({ type: 'SIGN_IN_REQUEST' });
        try {

            const state = generateState();
            saveState(state)
            const result = await api.oAuth2login(state);
            if (result && result.status === 200) {
                window.location.assign(result.data.data);
            } else {
                dispatch({ type: 'SIGN_IN_ERROR' })
                removeState()
                return { success: false, message: 'Ошибка авторизации' }
            }
        } catch (error) {
            console.log('error', error)
            dispatch({ type: 'SIGN_IN_ERROR', error: loginError(error) });
            removeState()
            return { success: false, message: error.response.data.message }
        }
        return
    }, [])// eslint-disable-line react-hooks/exhaustive-deps


    const exchangeCode = useCallback(async (params) => {

        try {
            const res = await api.exchangeCode(params);

            res.data.token.access_token && localStorage.setItem('REACT_APPS_GRUZ_ATOKEN', res.data.token.access_token);
            //console.log('res', res)
            // if (!!res.data.token.expiry) {
            //     let dete = new Date(res.data.token.expiry)
            //      console.log('res.data1', res.data)
            res.data.token.refresh_token && cookies.set('REACT_APPS_GRUZ_RTOKEN', res.data.token.refresh_token, { path: '/' });
            res.data.token.id_token && cookies.set('REACT_APPS_GRUZ_IDTOKEN', res.data.token.id_token, { path: '/' });
            //            }
            dispatch({
                type: 'SIGN_IN_SUCCESS', payload: {
                    "name": res.data.user.name
                }
            })
            navigate('/');
            //console.log('res.data.', res)
            // getUserData()

        } catch (err) {
            dispatch({ type: 'SIGN_IN_ERROR' })
            console.error(err);
            //navigate('/');
        }


    }, [])// eslint-disable-line react-hooks/exhaustive-deps


    const signInAuto = useCallback(() => {
        dispatch({ type: 'SIGN_IN_AUTO' });
        // getUserData()
    }, [])// eslint-disable-line react-hooks/exhaustive-deps





    // eslint-disable-next-line react-hooks/exhaustive-deps

    useEffect(() => {
        let token = localStorage.getItem('REACT_APPS_GRUZ_ATOKEN')
        if (token === "null" || token === null) token = ""
        if (!token) return
        getUserData()
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    //***********************************************************************************//
    const value = {
        ...state,
        signedIn: state.signedIn,
        user: state.authUser,
        username: state.authUser.name,
        signIn,
        exchangeCode,
        signInAuto,
        signOut,
    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export default AuthProvider;
