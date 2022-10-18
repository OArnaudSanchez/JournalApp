import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";
import { firebaseDb } from "../../../src/firebase/config";
import { addNewEmptyNote, savingNewNote, setActiveNote } from "../../../src/store/journal/journalSlice";
import { startNewNote } from "../../../src/store/journal/thunks";

describe('Pruebas unitarias y de integracion en Journal Thunks', () => {

    const dispatch = jest.fn();
    const getState = jest.fn();
    beforeEach(() => jest.clearAllMocks());

    test('startNewNote Debe de crear una nueva nota', async() => {
        const uid = 'TEST-UID';
        getState.mockReturnValue({ auth: { uid: uid } });
        await startNewNote()(dispatch, getState);
        expect( dispatch ).toHaveBeenCalledWith( savingNewNote() );
        expect( dispatch ).toHaveBeenCalledWith( addNewEmptyNote({
            body: '',
            title: '',
            id: expect.any( String ),
            date: expect.any( Number )
        }));

        expect( dispatch ).toHaveBeenCalledWith( setActiveNote({
            body: '',
            title: '',
            id: expect.any( String ),
            date: expect.any( Number )
        }));

        const collectionRef = collection(firebaseDb, `${ uid }/journal/notes`);
        const docs = await getDocs(collectionRef);
        const deletePromises = [];
        docs.forEach( doc => deletePromises.push(deleteDoc(doc.ref)));
        await Promise.all(deletePromises);
        
    }, 10000);

});