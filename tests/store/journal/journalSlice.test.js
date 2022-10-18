import { 
    addNewEmptyNote, 
    clearNotesLogout, 
    deleteNoteById, 
    journalSlice, 
    savingNewNote, 
    setActiveNote, 
    setNotes, 
    setPhotosToActiveNote, 
    setSaving, 
    updatedNote 
} from "../../../src/store/journal/journalSlice";

import { 
    initialState, 
    journalSliceName, 
    savingState, 
    stateWithNotes, 
    testNote,
    testNotes, 
    testUpdatedNote 
} from "../../fixtures/journalFixtures";

describe('Pruebas unitarias y de integracion en el JournalSlice', () => {

    test('Debe de retornar el estado inicial y llamarse Journal', () => {
        const { name, getInitialState } = journalSlice;
        expect( getInitialState() ).toEqual( initialState );
        expect( name ).toBe( journalSliceName );
    });

    test('Debe de poner el estado en true cuando empieza el proceso de guardar una nota', () => {
        const state = journalSlice.reducer(savingState, savingNewNote());
        expect( typeof state ).toBe( 'object' );
        expect( state ).toEqual( savingState );
        expect( state.isSaving ).toBeTruthy();
    });

    test('Debe de agregar una nueva nota y poner el isSaving en false', () => {
        const { isSaving, notes } = journalSlice.reducer(initialState, addNewEmptyNote(testNote));
        expect( notes.length ).toBe( 1 );
        expect( notes[0] ).toEqual( testNote );
        expect( isSaving ).toBeFalsy();
    });

    test('Debe de establecer una nota activa y poner el messageSaved = "" ', () => {
        const { activeNote, messageSaved } = journalSlice.reducer(initialState, setActiveNote(testNote));
        expect(typeof activeNote).toBe( 'object' );
        expect( activeNote ).toEqual( testNote );
        expect( messageSaved ).toBe('');
    });

    test('Debe de establecer notas', () => {
        const { notes } = journalSlice.reducer(initialState, setNotes(testNotes));
        expect( notes ).toEqual( testNotes );
    });

    test('Debe de poner isSaving en true y limpiar el messageSaved', () => {
        const { isSaving, messageSaved } = journalSlice.reducer(initialState, setSaving());
        expect( isSaving ).toBeTruthy();
        expect( messageSaved ).toBe('');
    });

    test('Debe de actualizar una nota y decir el mensaje Nota Actualizada Correctamente..', () => {
        const { messageSaved, notes } = journalSlice.reducer(stateWithNotes, updatedNote(testUpdatedNote));
        expect( notes[0] ).toEqual( testUpdatedNote );
        expect( messageSaved ).toBe('Nota Actualizada Correctamente..');
    });

    test('Debe de buscar la nota con el ID: ABC1230', () => {
        const state = journalSlice.reducer(stateWithNotes, {});
        expect( state.notes.filter(note => note.id == 'ABC1230').length).toBe(1);
    });

    test('Debe de eliminar la nota con el ID: ABC1230 y borrar la nota activa', () => {
        const { notes, activeNote } = journalSlice.reducer(stateWithNotes, deleteNoteById('ABC1230'));
        expect( notes.filter(note => note.id == 'ABC1230').length).toBe(0);
        expect( activeNote ).toBeNull();
    });

    test('Debe de Agregar una imagen mas a la nota activa y poner isSaving en false', () => {
        const newImage = 'https://newImage.png';
        const { activeNote, isSaving }  = journalSlice.reducer(stateWithNotes, setPhotosToActiveNote([newImage]));
        expect( activeNote.imageUrls.includes(newImage) ).toBeTruthy();
        expect( isSaving ).toBeFalsy();
    });

    test('Debe de limpiar el state al hacer logout', () => {
        const state  = journalSlice.reducer(stateWithNotes, clearNotesLogout());
        expect( state ).toEqual( initialState );
    });

});