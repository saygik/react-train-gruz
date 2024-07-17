//* ****** Initial state ****************//

const EmptyUser = {
};
export const initialState = {
    loginProcess: false,
    authUser: EmptyUser,
    signedIn: false,

};
//* *************************************//

//* ************ Reducer ****************//
export const reducer = (state, action) => {
    switch (action.type) {

        case 'SIGN_IN_REQUEST':
            return {
                ...state,
                loginProcess: true
            }
        case 'SIGN_IN_SUCCESS':
            return {
                ...state,
                signedIn: true,
                loginProcess: false,
                authUser: action.payload
            };
        case 'SIGN_IN_ERROR':
            return initialState;

        case 'SIGN_OUT_REQUEST':
            return initialState;

        default:
            return state;
    }
};
