import { useMemo, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { ImageGallery } from "../components";
import { useForm } from "../../hooks/useForm";
import { setActiveNote } from "../../store/journal/journalSlice";
import { startDeletingNote, startSavingNote, startUploadingFiles } from "../../store/journal/thunks";
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.css';

export const NoteView = () => {
    const dispatch = useDispatch();

    const { activeNote, messageSaved, isSaving } = useSelector(state => state.journal);
    const { date, body, title, onInputChange, formState } = useForm( activeNote );
    
    const dateString = useMemo(() => {
        return new Date(date).toUTCString();
    }, [date]);

    const fileInputRef = useRef();

    useEffect(() => {
        dispatch(setActiveNote(formState));
    }, [ formState ]);

    useEffect(() => {
        if(messageSaved.length > 0){
            Swal.fire('Nota Actualizada', messageSaved, 'success');
        }
    }, [ messageSaved ]);

    const onSaveNote = () => {
        dispatch( startSavingNote() );
    }

    const onFileInputChange = ({ target }) => {
        if(target.files === 0) return;
        dispatch(startUploadingFiles(target.files));
    }

    const onDelete = () => {
        dispatch( startDeletingNote() );
    };

    return(
        <Grid 
            className='animate__animated animate__fadeIn animate__faster'
            container
            direction='row'
            justifyContent='space-between'
            alignItems='center'
            sx={{ mb: 1 }}>

                <Grid item>
                    <Typography fontSize={ 39 } fontWeight='light'>
                        { dateString }
                    </Typography>
                </Grid>

                <Grid item>
                    <input
                        type="file"
                        ref={ fileInputRef }
                        multiple
                        onChange={ onFileInputChange }
                        style={{ display: 'none' }}
                     />

                     <IconButton
                        color="primary"
                        disabled={ isSaving }
                        // De esta forma simulamos el click sobre el input file
                        onClick={ () => fileInputRef.current.click() }>
                        <UploadOutlined />
                     </IconButton>

                    <Button 
                        color='primary' 
                        onClick={ onSaveNote } 
                        disabled={ isSaving }>
                            
                        <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                        Guardar
                    </Button>
                </Grid>

                <Grid container>
                    <TextField 
                        type='text' 
                        variant="filled"
                        fullWidth
                        placeholder="Ingrese un titulo"
                        label='Titulo'
                        name='title'
                        sx={{ border: 'none', mb: 1 }}
                        value={ title }
                        onChange={ onInputChange } />

                    <TextField 
                        type='text' 
                        variant="filled"
                        fullWidth
                        multiline
                        placeholder="¿Que sucedió hoy?"
                        name='body'
                        monRows={ 5 }
                        value={ body }
                        onChange={ onInputChange } />
                </Grid>

                <Grid
                    container
                    justifyContent="end">
                        <Button
                            onClick={ onDelete }
                            sx={{ mt: 2 }}
                            color="error">
                            <DeleteOutline />
                            Borrar
                        </Button>
                </Grid>

                <ImageGallery images={ activeNote.imageUrls } />
        </Grid>
    )

};