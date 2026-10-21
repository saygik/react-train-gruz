import { authConfig } from "../../config";

const normalizeErrorFn = (fallbackMessage) => (
  error
) => {
  // if ('error' in error) {
  //   return new OAuthError(error.error, error.error_description);
  // }
  if (error instanceof Error) {
    return error;
  }
  return new Error(fallbackMessage);
};

export const loginError = normalizeErrorFn('Login failed');

export const generateState = () => {
  const validChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const array = new Uint8Array(40);
  window.crypto.getRandomValues(array);
  return Array.from(array, (x) => validChars[x % validChars.length]).join('');
};

//********************  state OAuth  ********************//

export const saveState = (state) => {
  sessionStorage.setItem(authConfig.oauthStateKey, state);
};

export const readState = () => sessionStorage.getItem(authConfig.oauthStateKey);

export const removeState = () => {
  sessionStorage.removeItem(authConfig.oauthStateKey);
};

//********************  возврат после входа  ********************//

/** Внутренний путь приложения — защита от open redirect. */
export const safePath = (path) =>
  typeof path === 'string' && path.startsWith('/') && !path.startsWith('//')
    ? path
    : authConfig.homePath;

export const saveReturnTo = (path) => {
  sessionStorage.setItem(authConfig.returnToKey, safePath(path));
};

export const takeReturnTo = () => {
  const path = sessionStorage.getItem(authConfig.returnToKey);
  sessionStorage.removeItem(authConfig.returnToKey);
  return safePath(path);
};

export const clearReturnTo = () => {
  sessionStorage.removeItem(authConfig.returnToKey);
};

//********************  автопереход на SSO  ********************//

/**
 * Автоматический переход на страницу входа нужен, чтобы не показывать
 * лишний экран. Но он не должен превращаться в бесконечный цикл:
 * - после явного выхода вход запускается только кнопкой;
 * - повторный переход в течение autoRedirectWindowMs не выполняется.
 */
export const canAutoRedirect = () => {
  if (sessionStorage.getItem(authConfig.suppressAutoSignInKey)) return false;
  const last = Number(sessionStorage.getItem(authConfig.autoRedirectAtKey) || 0);
  return !last || Date.now() - last > authConfig.autoRedirectWindowMs;
};

export const markAutoRedirect = () => {
  sessionStorage.setItem(authConfig.autoRedirectAtKey, String(Date.now()));
};

export const clearAutoRedirectMark = () => {
  sessionStorage.removeItem(authConfig.autoRedirectAtKey);
};

export const suppressAutoRedirect = () => {
  sessionStorage.setItem(authConfig.suppressAutoSignInKey, '1');
};

export const allowAutoRedirect = () => {
  sessionStorage.removeItem(authConfig.suppressAutoSignInKey);
  sessionStorage.removeItem(authConfig.autoRedirectAtKey);
};
