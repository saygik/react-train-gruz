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
  let array = new Uint8Array(40);
  window.crypto.getRandomValues(array);
  array = array.map((x) => validChars.codePointAt(x % validChars.length));
  const randomState = String.fromCharCode.apply(null, array);
  return randomState;
};

export const saveState = (state) => {
  sessionStorage.setItem('GRUZ_OAUTH_STATE_KEY', state);
};

export const removeState = () => {
  sessionStorage.removeItem('GRUZ_OAUTH_STATE_KEY');
};