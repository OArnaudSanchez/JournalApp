import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../../src/firebase/providers";
import { checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { checkingAuthentication, startCreatingUserWithEmailPassword, startGoogleSignIn, startLoginEmailPassword, startLogOut } from "../../../src/store/auth/thunks";
import { clearNotesLogout } from "../../../src/store/journal/journalSlice";
import { demoUser } from "../../fixtures/authFixtures";

jest.mock("../../../src/firebase/providers");

describe('Pruebas unitarias y de integracion en el Thunk de autenticacion', () => {
    const dispatch = jest.fn();
    beforeEach(() => jest.clearAllMocks());

    test('Debe de invocar el checkingCredentials', async () => {
        await checkingAuthentication()( dispatch );
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
    });

    test('startGoogleSignIn debe de llamar el checkingCredentials y hacer el login', async() => {
        const loginData = { ok: true, ...demoUser };

        await signInWithGoogle.mockResolvedValue( loginData );
        await startGoogleSignIn()( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );
    });

    test('startGoogleSignIn debe de llamar el checkingCredentials y logout con error', async() => {
        const logoutData = { ok: false, errorMessage: 'Ha Ocurrido un error en Google' };

        await signInWithGoogle.mockResolvedValue( logoutData );
        await startGoogleSignIn()( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout( logoutData ) );
    });

    test('startLoginEmailPassword debe de llamar checkingCredentials y hacer el login', async() =>{
        const loginData = { ok: true, ...demoUser };
        const formData = { email: demoUser.email, password: '123456' };

        await loginWithEmailPassword.mockResolvedValue( loginData );
        await startLoginEmailPassword(formData)( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login(loginData) );
    });

    test('startLoginEmailPassword debe de llamar checkingCredentials y enviar un error de login no exitoso', async() => {
        const loginData = { ok: false, errorMessage: 'Login no exitoso' };
        const formData = {};

        await loginWithEmailPassword.mockResolvedValue( loginData );
        await startLoginEmailPassword(formData)( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout( loginData ) );
    });

    test('startCreatingUserWithEmailPassword deberia de llamar checkingCredentials y crear un usuario y hacer login', async() => {

        const loginData = { ok: true, ...demoUser, errorMessage: undefined };
        const formData = { 
            email: demoUser.email, 
            password: '123456', 
            displayName: demoUser.displayName 
        };
        const { uid, displayName, email, photoURL, errorMessage } = demoUser;

        await registerUserWithEmailPassword.mockResolvedValue( loginData );
        await startCreatingUserWithEmailPassword( formData )( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login({ uid, displayName, email, photoURL, errorMessage }) );
    });

    test('startCreatingUserWithEmailPassword deberia de llamar checkingCredentials y enviar un mensaje de error por el login invalido', async() => {

        const loginData = { ok: false, errorMessage: 'Login no exitoso' };
        const formData = {};
        const { errorMessage } = loginData;

        await registerUserWithEmailPassword.mockResolvedValue( loginData );
        await startCreatingUserWithEmailPassword( formData )( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout({ errorMessage }) );
    });

    test('startLogOut debe de llamar logoutFirebase, clearNotes y logout', async() =>{
        await startLogOut()( dispatch );

        expect( logoutFirebase ).toHaveBeenCalled();
        expect( dispatch ).toHaveBeenCalledWith( clearNotesLogout() );
        expect( dispatch ).toHaveBeenCalledWith( logout({}) );
    });

});