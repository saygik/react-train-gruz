export const appName = "gruz-01"
export const apiConfig = {
    //apiGruzUrl: "https://gruz-api.brnv.rw"
    apiGruzUrl: process.env.REACT_APP_GRUZ_API
}

// Группы домена (ИВЦ2), которые приходят в токене Authentik
export const GROUPS = {
    fullAccess: "ИВЦ2: АРМ Грузового: полный доступ",
    asus: "ИВЦ2: АРМ Грузового: АСУС",
}

export const authConfig = {
    // Токен обновляем заранее, чтобы не ловить 401 на открытой странице
    refreshLeewayMs: 60 * 1000,
    // Запасной вариант, если сервер не вернул срок жизни токена
    fallbackTokenTtlMs: 4 * 60 * 1000,
    homePath: "/",
    loginPath: "/login",
    callbackPath: "/complete",
    // Куда Authentik вернёт пользователя после выхода из SSO.
    // Должно быть указано в списке redirect_uri провайдера Authentik.
    postLogoutRedirectUri: process.env.REACT_APP_OAUTH_LOGOUT_REDIRECT || "",
    // Ключ, под которым токен хранился в прежней версии приложения
    legacyAccessTokenKey: "REACT_APPS_GRUZ_ATOKEN",
    // Не запускать автоматический вход после явного выхода
    suppressAutoSignInKey: "gruz.auth.suppress-auto-signin",
    // Хранилище сессии (access/refresh/id token, срок жизни, данные пользователя)
    sessionStorageKey: "gruz.auth.session",
    oauthStateKey: "gruz.auth.oauth-state",
    returnToKey: "gruz.auth.return-to",
    autoRedirectAtKey: "gruz.auth.auto-redirect-at",
    // Защита от бесконечного цикла редиректов на страницу входа
    autoRedirectWindowMs: 15 * 1000,
}
