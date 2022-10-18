
export const initialState = {
    isSaving: false,
    messageSaved: '',
    notes: [],
    activeNote: null
};

export const savingState = {
    isSaving: true,
    messageSaved: '',
    notes: [],
    activeNote: null
};

export const testNote = {
    id: 'ABC1230',
    title: 'Test Note Title0',
    body: 'Test note body0',
    date: 12312312,
    imageUrls: ['https://testImage.png']
};

export const stateWithNotes = {
    isSaving: false,
    messageSaved: '',
    notes: [
        {
            ...testNote
        }, 
        {
            id: 'ABC123',
            title: 'Test Note Title',
            body: 'Test note body',
            date: 12312312,
            imageUrls: ['https://testImage.png']
        },
        {
            id: 'ABC1234',
            title: 'Test Note Title2',
            body: 'Test note body2',
            date: 12312312,
            imageUrls: ['https://testImage.png']
        },
        {
            id: 'ABC1245',
            title: 'Test Note Title3',
            body: 'Test note body3',
            date: 12312312,
            imageUrls: ['https://testImage.png']
        }
    ],
    activeNote: testNote
};

export const testUpdatedNote = {
    id: testNote.id,
    title: 'Test Note Actualizada',
    body: 'Test note Actualizada',
    date: 12312312,
    imageUrls: ['https://testImage.png']
}
export const journalSliceName = 'journal';