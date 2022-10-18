import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { startCreatingUserWithEmailPassword, status } from '../../store/auth';

const initialForm = {
    displayName: '',
    email: '',
    password: ''
};

// El primer argumento del array es una funcion para validar los campos y luego tenemos el mensaje.
const formValidations = {
    email: [(value) => value?.includes('@'), 'El correo no es valido.'],
    password: [(value) => value?.length >= 5, 'El password debe ser mayor a 5 caracteres'],
    displayName: [(value) => value.length > 1, 'El nombre es obligatorio.' ]
};

export const RegisterPage = () => {
    const dispatch = useDispatch();
    const { status: loginStatus, errorMessage } = useSelector(state => state.auth);
    const isCheckingAuthentication = useMemo(() => loginStatus == status.checking , [loginStatus]);

    const[ formSubmitted, setFormSubmitted ] = useState(false);

    const { 
        formState, displayName, email, password, onInputChange,
        isFormValid, displayNameValid, emailValid, passwordValid    
    } = useForm(initialForm, formValidations);

    //Esta es una forma de validar los campos del formulario.
    // const validDisplayName = !displayName.length >= 1 && {ErrorMessage: 'El nombre es Obligatorio', isInvalid: true };
    // const validEmail = !email.includes('@') && {ErrorMessage: 'El correo no es Valido', isInvalid: true };
    // const validPassword = password.length < 5 && {ErrorMessage: 'El password debe ser mayor a 5 caracteres', isInvalid: true };

    const onSubmitForm = ( e ) => {
        e.preventDefault();
        setFormSubmitted(true);
        if( !isFormValid ) return;
        dispatch( startCreatingUserWithEmailPassword(formState) );
    };    

    return(
        <AuthLayout title="Register">
            <form onSubmit={ onSubmitForm } className='animate__animated animate__fadeIn animate__faster'>
                    <Grid container>
                        <Grid item xs={ 12 } sx={{ mt: 2 }}>
                            <TextField 
                                label="Nombre"
                                type="text"
                                placeholder="Nombre Completo"
                                name="displayName"
                                value={ displayName }
                                onChange={ onInputChange }
                                fullWidth     
                                error={ !!displayNameValid && formSubmitted }
                                helperText={ displayNameValid && formSubmitted }                  
                                />
                        </Grid>

                        <Grid item xs={ 12 } sx={{ mt: 2 }}>
                            <TextField 
                                label="Correo"
                                type="email"
                                placeholder="correo@correo.com"
                                name="email"
                                value={ email }
                                onChange={ onInputChange }
                                fullWidth
                                error={ !!emailValid && formSubmitted }
                                helperText={ emailValid && formSubmitted }   
                              />
                        </Grid>
                    
                        <Grid item xs={ 12 } sx={{ mt: 2 }}>
                            <TextField 
                                label="Password"
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={ password }
                                onChange={ onInputChange }
                                fullWidth
                                error={ !!passwordValid && formSubmitted }
                                helperText={ passwordValid && formSubmitted }   
                               />
                        </Grid>

                        <Grid container spacing={ 2 } sx={{ my: 1 }}>
                            <Grid 
                                item 
                                xs={ 12 }
                                display={ !!errorMessage ? '' : 'none' }>
                                <Alert severity='error'>{ errorMessage }</Alert>
                            </Grid>
                            <Grid item xs={ 12 }>
                                <Button 
                                    type="submit"
                                    variant="contained"
                                    fullWidth
                                    disabled={ isCheckingAuthentication }
                                    >
                                        Crear Cuenta
                                </Button>
                            </Grid>
                        </Grid>

                        <Grid container direction="row" justifyContent="end">
                            <Typography sx={{ mr: 1 }}>Ya tienes una cuenta?</Typography>
                            <Link component={ RouterLink } color="inherit" to="/auth/login">
                                 Inicia Sesion
                            </Link>
                        </Grid>
                    </Grid>
                </form>
        </AuthLayout>
    )

};