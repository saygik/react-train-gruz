import axios from './axiosconfigfile';

/**
 * Интерсепторы axios.
 *
 * - Ко всем запросам добавляется актуальный access token.
 * - Если токен истёк, он один раз обновляется через /api/oauth/refresh,
 *   после чего исходный запрос повторяется. Полноценный редирект на SSO
 *   происходит только если обновить токен невозможно.
 */

const AUTH_ENDPOINTS = [
    '/api/oauth/login',
    '/api/oauth/token',
    '/api/oauth/refresh',
    '/api/oauth/logout',
];

const isAuthEndpoint = (url) => AUTH_ENDPOINTS.some((path) => (url || '').includes(path));

const SetupInterceptors = ({ getAccessToken, refreshSession, onSessionExpired }) => {
    //Request Interceptor
    const requestInterceptor = axios.interceptors.request.use(
        async (config) => {
            config.headers = config.headers || {};
            if (!config.headers['Content-Type']) {
                config.headers['Content-Type'] = 'application/json';
            }

            if (isAuthEndpoint(config.url)) return config;

            let token = getAccessToken();
            if (!token) {
                const session = await refreshSession();
                token = session && session.accessToken;
            }
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    //Response Interceptor
    const responseInterceptor = axios.interceptors.response.use(
        (response) => response,
        async (error) => {
            const original = error.config;
            const status = error.response && error.response.status;

            if (status !== 401 || !original || original.__isRetry || isAuthEndpoint(original.url)) {
                return Promise.reject(error);
            }
            original.__isRetry = true;

            const session = await refreshSession(true);
            if (!session || !session.accessToken) {
                onSessionExpired();
                return Promise.reject(error);
            }

            original.headers = {
                ...(original.headers || {}),
                Authorization: `Bearer ${session.accessToken}`,
            };
            return axios(original);
        }
    );

    return () => {
        axios.interceptors.request.eject(requestInterceptor);
        axios.interceptors.response.eject(responseInterceptor);
    };
};

export default SetupInterceptors;
