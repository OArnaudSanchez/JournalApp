import { 
    createUserWithEmailAndPassword, 
    GoogleAuthProvider, 
    signInWithPopup, 
    updateProfile, 
    signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

//* Esto equivale a los servicios, aqui hacemos las peticiones y le devolvemos el resultado a los thunks.
export const signInWithGoogle = async() => {

    try{
        const response = await signInWithPopup(firebaseAuth, googleProvider);
        const { displayName, email, photoURL, uid } = response.user;
        return {
            ok: true,
            displayName,
            email,
            photoURL, 
            uid
        }
    }catch(error){
        return{
            ok: false,
            errorMessage: error.message,
            errorCode: error.code
        }
    }
};

export const registerUserWithEmailPassword = async({ email, password, displayName }) => {
    try{
        const response = await createUserWithEmailAndPassword(firebaseAuth, email, password);
        const { uid, photoURL } = response.user;
        await updateProfile( firebaseAuth.currentUser, { displayName } );
        
        return {
            ok: true,
            uid, photoURL, email, displayName
        }
    }catch(error){
        //console.log(error);
        return { ok: false, errorMessage: error.message }
    }
};

export const loginWithEmailPassword = async({ email, password }) => {
    try{
        const response = await signInWithEmailAndPassword(firebaseAuth, email, password);
        const { displayName, photoURL, uid } = response.user;
        return {
            ok: true,
            displayName,
            email,
            photoURL, 
            uid
        }
    }catch(error){
        console.log(error);
        return { ok: false, errorMessage: error.message }
    }
}

export const logoutFirebase = async() => {
    return await firebaseAuth.signOut();
}