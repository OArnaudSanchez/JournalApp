import { createSlice } from '@reduxjs/toolkit';
import { status } from './constans';

const initialState = {
    status: status.checking,
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: ( state, { payload } ) => {
            const { uid, email, displayName, photoURL, errorMessage } = payload;
            state.status = status.authenticated;
            state.uid = uid;
            state.email = email;
            state.displayName = displayName;
            state.photoURL = photoURL;
            state.errorMessage = errorMessage;
        },
        logout: ( state, { payload } ) => {
            state.status = status.notAuthenticated; 
            state.uid = null;
            state.email = null;
            state.displayName = null;
            state.photoURL = null;
            state.errorMessage = payload?.errorMessage;
        },
        checkingCredentials: ( state ) => {
            state.status = status.checking;
        }
    }
});

export const { login, logout, checkingCredentials } = authSlice.actions;