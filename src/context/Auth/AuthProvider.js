import React, { useReducer, useEffect, useCallback, useMemo, useRef } from 'react';
import { useNavigate } from "react-router-dom";

import { api } from '../../services/api';
import { apiConfig, authConfig, GROUPS } from '../../config';

import { reducer, initialState } from './reducer';
import AuthContext from './AuthContext';
import {
    createSession,
    readSession,
    writeSession,
    clearSession,
    updateSession,
    isExpired,
    hasValidAccessToken,
} from './session';
import {
    generateState,
    saveState,
    readState,
    removeState,
    saveReturnTo,
    markAutoRedirect,
    clearAutoRedirectMark,
    suppressAutoRedirect,
    allowAutoRedirect,
    safePath,
} from './utils';

const apiBase = () => (apiConfig.apiGruzUrl || '').replace(/\/+$/, '');

const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const navigate = useNavigate();

    const sessionRef = useRef(null);
    const refreshRef = useRef(null);
    const mountedRef = useRef(true);

    useEffect(() => {
        mountedRef.current = true;
        return () => {
            mountedRef.current = false;
        };
    }, []);

    const applySession = useCallback((session) => {
        sessionRef.current = session;
        if (!mountedRef.current) return;
        if (session) {
            dispatch({ type: 'SIGN_IN_SUCCESS', payload: session.user });
        } else {
            dispatch({ type: 'SIGN_OUT' });
        }
    }, []);

    const dropSession = useCallback(() => {
        clearSession();
        sessionRef.current = null;
        if (mountedRef.current) {
            dispatch({ type: 'SIGN_OUT' });
        }
    }, []);

    /**
     * Обновление токена через /api/oauth/refresh.
     * Запросы "склеиваются": параллельные 401 не порождают пачку refresh.
     */
    const refreshSession = useCallback(async (force = false) => {
        const current = sessionRef.current;
        if (!current || !current.refreshToken) return null;
        if (refreshRef.current) return refreshRef.current;

        refreshRef.current = api.refreshToken(current.refreshToken)
            .then((response) => {
                const token = response && response.data;
                if (!token || !token.access_token) {
                    throw new Error('Сервер не вернул новый access token');
                }
                const next = updateSession(sessionRef.current, token);
                if (!next) throw new Error('Не удалось обновить сессию');
                writeSession(next);
                applySession(next);
                return next;
            })
            .catch(() => {
                const latest = sessionRef.current;
                // Сеть или SSO временно недоступны, но токен ещё жив — не разлогиниваем
                if (!force && hasValidAccessToken(latest)) {
                    return latest;
                }
                dropSession();
                return null;
            })
            .finally(() => {
                refreshRef.current = null;
            });

        return refreshRef.current;
    }, [applySession, dropSession]);

    //********************  Восстановление сессии при старте  ********************//

    useEffect(() => {
        let cancelled = false;

        const bootstrap = async () => {
            try {
                // Токен прежней версии не содержит данных о пользователе и сроке жизни
                localStorage.removeItem(authConfig.legacyAccessTokenKey);
            } catch (error) {
                // ignore
            }

            const stored = readSession();
            if (!stored) {
                if (!cancelled) dispatch({ type: 'AUTH_INITIALIZED' });
                return;
            }

            sessionRef.current = stored;

            if (isExpired(stored, authConfig.refreshLeewayMs)) {
                if (stored.refreshToken) {
                    const refreshed = await refreshSession();
                    if (cancelled) return;
                    if (!refreshed) {
                        dispatch({ type: 'AUTH_INITIALIZED' });
                    }
                    return;
                }
                clearSession();
                sessionRef.current = null;
                if (!cancelled) dispatch({ type: 'AUTH_INITIALIZED' });
                return;
            }

            if (!cancelled) applySession(stored);
        };

        bootstrap();

        return () => {
            cancelled = true;
        };
    }, [applySession, refreshSession]);

    //********************  Вход  ********************//

    /**
     * Стандартный Authorization Code flow.
     * Браузер сразу уходит на /api/oauth/login (302 на Authentik),
     * без промежуточного XHR за ссылкой авторизации.
     */
    const signIn = useCallback((returnTo) => {
        dispatch({ type: 'SIGN_IN_REQUEST' });

        const oauthState = generateState();
        saveState(oauthState);
        saveReturnTo(returnTo || `${window.location.pathname}${window.location.search}`);
        allowAutoRedirect();
        markAutoRedirect();

        const url = `${apiBase()}/api/oauth/login?state=${encodeURIComponent(oauthState)}&redirect=1`;
        window.location.assign(url);
    }, []);

    /**
     * Завершение входа: проверка state, обмен кода на токены,
     * сохранение сессии. Возвращает { ok, message }.
     */
    const completeSignIn = useCallback(async (search) => {
        const params = new URLSearchParams(search || window.location.search);
        const code = params.get('code');
        const oauthState = params.get('state');
        const oauthError = params.get('error');
        const savedState = readState();

        const fail = (message) => {
            dispatch({ type: 'SIGN_IN_ERROR', payload: message });
            removeState();
            clearAutoRedirectMark();
            return { ok: false, message };
        };

        if (oauthError) {
            return fail(params.get('error_description') || 'Вход отклонён провайдером авторизации');
        }
        if (!code) {
            return fail('Сервер авторизации не вернул код подтверждения');
        }
        if (!savedState || !oauthState || savedState !== oauthState) {
            return fail('Не совпадают параметры запроса авторизации. Попробуйте войти ещё раз.');
        }

        dispatch({ type: 'SIGN_IN_REQUEST' });

        try {
            const response = await api.exchangeCode(`?${params.toString()}`);
            const data = (response && response.data) || {};

            if (data.error) {
                return fail(data.error);
            }

            const session = createSession(data.token, data.user);
            if (!session) {
                return fail('Сервер авторизации не вернул access token');
            }

            writeSession(session);
            removeState();
            clearAutoRedirectMark();
            allowAutoRedirect();
            applySession(session);

            return { ok: true };
        } catch (error) {
            const message =
                (error.response && error.response.data && (error.response.data.message || error.response.data.error)) ||
                error.message ||
                'Не удалось завершить вход';
            return fail(message);
        }
    }, [applySession]);

    //********************  Выход  ********************//

    const signOut = useCallback(() => {
        const session = sessionRef.current;
        dropSession();
        suppressAutoRedirect();

        // Выход из SSO (RP-initiated logout), если настроен адрес возврата.
        // Иначе просто показываем страницу входа, не запуская вход автоматически.
        if (authConfig.postLogoutRedirectUri && session && session.idToken) {
            const url =
                `${apiBase()}/api/oauth/logout` +
                `?id_token_hint=${encodeURIComponent(session.idToken)}` +
                `&post_logout_redirect_uri=${encodeURIComponent(authConfig.postLogoutRedirectUri)}`;
            window.location.assign(url);
            return;
        }

        navigate(authConfig.loginPath, { replace: true, state: { manual: true } });
    }, [dropSession, navigate]);

    //********************  Обработка истёкшей сессии  ********************//

    const onSessionExpired = useCallback(() => {
        if (!sessionRef.current) return;
        dropSession();
        suppressAutoRedirect();

        const current = `${window.location.pathname}${window.location.search}`;
        const from = current !== authConfig.loginPath ? safePath(current) : authConfig.homePath;
        navigate(authConfig.loginPath, { replace: true, state: { from, expired: true } });
    }, [dropSession, navigate]);

    //********************  Для axios-интерсептора  ********************//

    const getAccessToken = useCallback(() => {
        const session = sessionRef.current;
        if (!hasValidAccessToken(session)) return null;
        return session.accessToken;
    }, []);

    //********************  Права  ********************//

    const isFullAccess = useMemo(() => {
        const groups = (state.authUser && state.authUser.groups) || [];
        return groups.includes(GROUPS.fullAccess);
    }, [state.authUser]);

    const isASUSAccess = useMemo(() => {
        const groups = (state.authUser && state.authUser.groups) || [];
        return groups.includes(GROUPS.asus);
    }, [state.authUser]);

    //***********************************************************************************//
    const value = {
        ...state,
        signedIn: state.signedIn,
        user: state.authUser,
        username: state.authUser.name,
        signIn,
        completeSignIn,
        signOut,
        refreshSession,
        getAccessToken,
        onSessionExpired,
        isFullAccess,
        isASUSAccess,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
