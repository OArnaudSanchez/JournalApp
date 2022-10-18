import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { status } from "../../../src/store/auth/constans";
import { authenticatedState, authSliceName, demoUser, initialState, notAuthenticatedState } from "../../fixtures/authFixtures";

describe('Pruebas unitarias y de integracion en el slice AuthSlice', () => {

    test('Debe de retornar el estado inicial y llamarse "auth" ', () => {
        const { name, getInitialState } = authSlice;
        expect( getInitialState() ).toEqual( initialState );
        expect( name ).toBe( authSliceName );
    });

    test('Debe de autenticar el usuario', () => {
        const state = authSlice.reducer( initialState, login(demoUser) );
        expect( typeof state ).toBe( 'object' );
        expect( state.status ).toBe( status.authenticated );
        expect( state ).toEqual( authenticatedState );
    });

    test('Debe de realizar el logout sin argumentos', () => {
        const state = authSlice.reducer( authenticatedState, logout({}) );
        expect( typeof state ).toBe('object');
        expect( state.status ).toBe( status.notAuthenticated );
        expect( state ).toEqual( notAuthenticatedState );
    });

    test('Debe de realizar el logout y mostrar el mensaje de error', () => {
        const errorMessage = 'Credenciales Invalidas';
        const state = authSlice.reducer( authenticatedState, logout({ errorMessage }) );
        expect( typeof state ).toBe( 'object' );
        expect( state.status ).toBe( status.notAuthenticated );
        expect( state.errorMessage ).toBe( errorMessage );
    });

    test('Debe de cambiar el status a checking cuando esta autenticado', () => {
        const state = authSlice.reducer( authenticatedState, checkingCredentials() );
        expect( typeof state ).toBe( 'object' );
        expect( state.status ).toBe( status.checking );
    });
    
});
