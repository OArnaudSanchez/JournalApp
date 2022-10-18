import { collection, getDocs } from "firebase/firestore/lite"
import { firebaseDb } from "../firebase/config";

export const loadNotes = async(uid = '') => {

    const collecionRef = collection(firebaseDb, `${uid}/journal/notes`);
    const docs = await getDocs(collecionRef);

    const notes = [];
    docs.forEach(doc => {
        notes.push({ id: doc.id, ...doc.data() });
    });

    return notes;
}