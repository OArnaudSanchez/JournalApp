import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Google } from "@mui/icons-material";
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { startLoginEmailPassword, status, startGoogleSignIn } from '../../store/auth';

const formData = {
    email: '',
    password: ''
};

export const LoginPage = () => {

    const dispatch = useDispatch();
    const { status: loginStatus, errorMessage } = useSelector(state => state.auth); 
    const isAuthenticating = useMemo(() => loginStatus === status.checking, [loginStatus]);

    const { email, password, onInputChange } = useForm(formData);

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch( startLoginEmailPassword({email, password}) );
    };

    const onGoogleSignIn = () => {
        dispatch( startGoogleSignIn() );
    };

    return(
        // De esta forma estamos usando el slot para inyectarle contenido.
        <AuthLayout title='Login'>
             <form onSubmit={ onSubmit } aria-label='submit-form' className='animate__animated animate__fadeIn animate__faster'>
                    <Grid container>
                        <Grid item xs={ 12 } sx={{ mt: 2 }}>
                            <TextField 
                                label="Correo"
                                type="email"
                                name="email"
                                value={ email }
                                onChange={ onInputChange }
                                placeholder="correo@correo.com"
                                fullWidth/>
                        </Grid>

                        <Grid item xs={ 12 } sx={{ mt: 2 }}>
                            <TextField 
                                label="Password"
                                type="password"
                                name="password"
                                value={ password }
                                inputProps={{
                                    'data-testid': 'password'
                                }}
                                onChange={ onInputChange }
                                placeholder="Password"
                                fullWidth/>
                        </Grid>

                        <Grid container spacing={ 2 } sx={{ mt: 1 }}>
                            <Grid 
                                item 
                                xs={ 12 }
                                display={ !!errorMessage ? '' : 'none' }>
                                <Alert severity='error'>{ errorMessage }</Alert>
                            </Grid>
                            <Grid item xs={ 12 } md={ 6 }>
                                <Button 
                                    type="submit"
                                    variant="contained"
                                    fullWidth
                                    aria-label="login-btn"
                                    disabled={ isAuthenticating }>
                                        Login
                                </Button>
                            </Grid>

                            <Grid item xs={ 12 } md={ 6 }>
                                <Button 
                                    variant="contained"
                                    fullWidth
                                    aria-label="google-btn"
                                    onClick={ onGoogleSignIn }
                                    disabled={ isAuthenticating }>
                                        <Google />
                                        <Typography sx={{ ml: 1 }}>Google</Typography>
                                </Button>
                            </Grid>
                        </Grid>

                        <Grid container direction="row" justifyContent="end">
                            <Link component={ RouterLink } color="inherit" to="/auth/register">
                                Crear una cuenta
                            </Link>
                        </Grid>
                    </Grid>
                </form>
        </AuthLayout>
    )
};