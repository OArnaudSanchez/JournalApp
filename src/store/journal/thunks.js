import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { firebaseDb } from "../../firebase/config";
import { loadNotes, fileUpload } from "../../helpers";
import { 
    addNewEmptyNote, 
    deleteNoteById, 
    savingNewNote, 
    setActiveNote, 
    setNotes, 
    setPhotosToActiveNote, 
    setSaving, 
    updatedNote 
} from "./journalSlice";

export const startNewNote = () => {
  
    //Tenemos un segundo parametro equivalente al rootState en vuejs.
    return async( dispatch, getState ) => {

        dispatch(savingNewNote());

        const { uid } = getState().auth;
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        };

        const newDoc = doc(collection(firebaseDb, `${uid}/journal/notes`));
        await setDoc(newDoc, newNote);

        newNote.id = newDoc.id;

        dispatch(addNewEmptyNote( newNote ));
        dispatch(setActiveNote( newNote ));
    };  
};

export const startLoadingNotes = () => {

    return async ( dispatch, getState ) =>{
        const { uid } = getState().auth;
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    }
};

export const startSavingNote = () => {
    return async( dispatch, getState ) => {
        dispatch(setSaving());

        const { uid } = getState().auth;
        const { activeNote } = getState().journal;
        const noteToFirestore = { ...activeNote };
        delete noteToFirestore.id;

        const docRef = doc(firebaseDb, `${ uid }/journal/notes/${ activeNote.id }`);

        // Este merge lo que hace es unir los campos anteriores con los nuevos, si hay.
        await setDoc(docRef, noteToFirestore, { merge: true });
        console.log(activeNote.id)
        dispatch(updatedNote(activeNote));
    }
}

export const startUploadingFiles = ( files = [] ) => {
    return async(dispatch, getState) => {
        dispatch(setSaving());
        const fileUploadPromises = [];
        for (const file of files) {
            fileUploadPromises.push(fileUpload(file));
        }
        const photosUrls = await Promise.all( fileUploadPromises );
        dispatch(setPhotosToActiveNote(photosUrls));
    }
}

export const startDeletingNote = () => {

    return async( dispatch, getState ) => {
        const { uid } = getState().auth;
        const { activeNote } = getState().journal;

        const docRef = doc(firebaseDb, `${ uid }/journal/notes/${ activeNote.id }`);
        await deleteDoc( docRef );

        dispatch( deleteNoteById(activeNote.id) );
    }
};