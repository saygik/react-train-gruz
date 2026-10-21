//* ****** Initial state ****************//

const EmptyUser = {};

export const initialState = {
    // Пока идёт восстановление сессии из localStorage, не показываем /login
    initializing: true,
    loginProcess: false,
    authUser: EmptyUser,
    signedIn: false,
    error: null,
};
//* *************************************//

//* ************ Reducer ****************//
export const reducer = (state, action) => {
    switch (action.type) {

        case 'AUTH_INITIALIZED':
            return {
                ...state,
                initializing: false,
            };
        case 'SIGN_IN_REQUEST':
            return {
                ...state,
                loginProcess: true,
                error: null,
            };
        case 'SIGN_IN_SUCCESS':
            return {
                ...state,
                initializing: false,
                signedIn: true,
                loginProcess: false,
                error: null,
                authUser: action.payload || EmptyUser,
            };
        case 'SIGN_IN_ERROR':
            return {
                ...initialState,
                initializing: false,
                error: action.payload || 'Не удалось выполнить вход',
            };

        case 'SIGN_OUT':
            return {
                ...initialState,
                initializing: false,
            };

        default:
            return state;
    }
};
