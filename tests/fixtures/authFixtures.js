import { status } from "../../src/store/auth/constans";

export const initialState = {
    status: status.checking,
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null
};

export const authenticatedState = {
    status: status.authenticated,
    uid: '123ABC',
    email: 'test@email.com',
    displayName: 'Test Name',
    photoURL: 'https://testImage.png',
    errorMessage: undefined
};

export const notAuthenticatedState = {
    status: status.notAuthenticated,
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: undefined
};

export const demoUser = {
    uid: '123ABC',
    email: 'test@email.com',
    displayName: 'Test Name',
    photoURL: 'https://testImage.png'
};

export const authSliceName = 'auth';