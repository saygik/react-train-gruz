import { authConfig } from "../../config";

/**
 * Хранилище сессии OIDC.
 *
 * Раньше приложение хранило только access token и на каждой загрузке
 * страницы ходило в /api/oauth/whoami, чтобы получить пользователя.
 * Теперь сессия (access, refresh, id token + срок жизни + пользователь)
 * сохраняется целиком и восстанавливается локально, без запросов к API.
 */

const now = () => Date.now();

/**
 * Достаёт payload JWT без внешних зависимостей.
 * Возвращает null, если токен не является JWT.
 */
export const decodeJwt = (token) => {
    if (!token || typeof token !== "string") return null;
    const parts = token.split(".");
    if (parts.length < 2) return null;
    try {
        const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
        const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
        const json = decodeURIComponent(
            atob(padded)
                .split("")
                .map((char) => `%${(`00${char.charCodeAt(0).toString(16)}`).slice(-2)}`)
                .join("")
        );
        return JSON.parse(json);
    } catch (error) {
        return null;
    }
};

const tokenExpiry = (token) => {
    const payload = decodeJwt(token);
    return payload && typeof payload.exp === "number" ? payload.exp * 1000 : 0;
};

export const normalizeUser = (user) => ({
    ...(user || {}),
    name: (user && user.name) || (user && user.email) || "",
    groups: Array.isArray(user && user.groups) ? user.groups : [],
});

/**
 * Собирает объект сессии из ответа /api/oauth/token или /api/oauth/refresh.
 * Срок жизни берём из ответа сервера, иначе из JWT, иначе — запасной вариант.
 */
export const createSession = (token, user) => {
    const accessToken = token && token.access_token;
    if (!accessToken) return null;

    const serverExpiry = token.expiry ? Date.parse(token.expiry) : NaN;
    const jwtExpiry = tokenExpiry(accessToken);
    const expiresAt =
        Number.isFinite(serverExpiry) && serverExpiry > now()
            ? serverExpiry
            : jwtExpiry > now()
                ? jwtExpiry
                : now() + authConfig.fallbackTokenTtlMs;

    return {
        accessToken,
        refreshToken: token.refresh_token || "",
        idToken: token.id_token || "",
        expiresAt,
        user: normalizeUser(user),
    };
};

/**
 * Обновляет токены сессии, сохраняя данные пользователя и прежний
 * refresh token, если сервер не прислал новый.
 */
export const updateSession = (session, token) => {
    if (!session) return null;
    const next = createSession(token, session.user);
    if (!next) return null;
    return {
        ...session,
        ...next,
        refreshToken: next.refreshToken || session.refreshToken,
        idToken: next.idToken || session.idToken,
        user: session.user,
    };
};

export const readSession = () => {
    try {
        const raw = localStorage.getItem(authConfig.sessionStorageKey);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (!parsed || !parsed.accessToken || !parsed.expiresAt) return null;
        return { ...parsed, user: normalizeUser(parsed.user) };
    } catch (error) {
        return null;
    }
};

export const writeSession = (session) => {
    try {
        localStorage.setItem(authConfig.sessionStorageKey, JSON.stringify(session));
    } catch (error) {
        // приватный режим / переполнение хранилища — работаем без сохранения
    }
};

export const clearSession = () => {
    try {
        localStorage.removeItem(authConfig.sessionStorageKey);
    } catch (error) {
        // ignore
    }
};

/** Истёк ли токен с учётом запаса (leeway). */
export const isExpired = (session, leewayMs = 0) =>
    !session || !session.expiresAt || session.expiresAt - leewayMs <= now();

/** Есть ли access token, который можно отправлять на сервер. */
export const hasValidAccessToken = (session) =>
    Boolean(session && session.accessToken) && !isExpired(session, 0);
