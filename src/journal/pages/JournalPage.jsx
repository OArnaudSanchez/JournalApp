import { useDispatch, useSelector } from 'react-redux';
import { AddOutlined } from '@mui/icons-material';
import { IconButton } from "@mui/material";
import { JournalLayout } from "../layout/JournalLayout";
import { NoteView, NothingSelectedView } from "../views";
import { startNewNote } from '../../store/journal';

export const JournalPage = () => {

    const dispatch = useDispatch();
    const { isSaving, activeNote } = useSelector(state => state.journal);
    const onClickNewNote = () => {
        dispatch( startNewNote() );
    };

    return(
        <JournalLayout>        
            {
                (!!activeNote) 
                ? <NoteView />
                :  <NothingSelectedView />
            }

            <IconButton 
                onClick={ onClickNewNote }
                disabled={ isSaving }
                size='large'
                sx={{
                    color: 'white',
                    backgroundColor: 'error.main',
                    ':hover': { backgroundColor: 'error.main' , opacity: 0.9 },
                    position: 'fixed',
                    right: 50,
                    bottom: 50
                }}>
                    <AddOutlined />
            </IconButton>
        </JournalLayout>
    )

};