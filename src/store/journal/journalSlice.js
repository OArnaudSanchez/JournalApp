import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isSaving: false,
    messageSaved: '',
    notes: [],
    activeNote: null
};
export const journalSlice = createSlice({

    name: 'journal',
    initialState,
    reducers: {
        savingNewNote: (state) => {
            state.isSaving = true;
        },
        addNewEmptyNote: ( state, action ) => {
            state.notes.push( action.payload );
            state.isSaving = false;
        },
        setActiveNote: ( state, action ) => {
            state.activeNote = action.payload;
            state.messageSaved = '';
        },
        setNotes: ( state, action ) => {
            state.notes = action.payload;
        },
        setSaving: ( state ) => {
            state.isSaving = true;
            state.messageSaved = '';
        },
        updatedNote: ( state, action ) => {
            state.isSaving = false;
            state.notes = state.notes.map( note => {
                if( note.id === action.payload.id ){
                    return action.payload;
                }
                return note;
            });
            state.messageSaved = `Nota Actualizada Correctamente..`;
        },
        deleteNoteById: ( state, action ) => {
            state.notes = state.notes.filter( note => note.id !== action.payload );
            state.activeNote = null;
        },
        setPhotosToActiveNote: ( state, action ) => {
            state.activeNote.imageUrls = [ ...state.activeNote.imageUrls, ...action.payload ];
            state.isSaving = false;
        },
        clearNotesLogout: ( state ) => {
            state.isSaving = false;
            state.messageSaved = '';
            state.notes = [];
            state.activeNote = null;
        }
    }

});

export const {
  addNewEmptyNote,
  setActiveNote,
  setNotes,
  setSaving,
  updatedNote,
  deleteNoteById,
  savingNewNote,
  setPhotosToActiveNote,
  clearNotesLogout,
} = journalSlice.actions;