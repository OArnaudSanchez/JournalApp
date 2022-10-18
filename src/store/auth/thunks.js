import { 
    loginWithEmailPassword, 
    logoutFirebase, 
    registerUserWithEmailPassword, 
    signInWithGoogle } from "../../firebase/providers";
import { clearNotesLogout } from "../journal/journalSlice";
import { checkingCredentials, login, logout } from "./authSlice";

export const checkingAuthentication = () => {
    return async ( dispatch ) =>{
        dispatch( checkingCredentials() );
    }
};

export const startLoginEmailPassword = ({ email, password }) => {
    return async ( dispatch ) => {
        dispatch( checkingCredentials() );
        const response = await loginWithEmailPassword({ email, password });
        if(!response.ok){
            return dispatch(logout(response));
        }
        dispatch(login(response));
    };
}

export const startGoogleSignIn = () => {
    return async ( dispatch ) => {
        dispatch( checkingCredentials() );
        const response = await signInWithGoogle();
        if(!response.ok){
            return dispatch(logout(response));
        } 
        dispatch(login(response));
    };  
};

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
    return async(dispatch) => {
        dispatch( checkingCredentials() );
        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({ email, password, displayName });
        if(!ok){
            return dispatch(logout({ errorMessage }));
        }
        dispatch(login( { uid, displayName, email, photoURL, errorMessage } ));
    }
};

export const startLogOut = () => {
    return async(dispatch) => {
        await logoutFirebase();
        dispatch(clearNotesLogout());
        dispatch(logout({}));
    }
}