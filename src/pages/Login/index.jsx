import styles from './Login.module.scss';

import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { fetchUserData, userIsAuth } from '../../store/slices/auth';
import { Navigate } from 'react-router-dom';

export const Login = () => {
    const isAuth = useSelector(userIsAuth);
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onChange',
    });

    if (isAuth) {
        return <Navigate to='/' />;
    }

    const onSubmit = (values) => {
        dispatch(fetchUserData(values));
    };

    return (
        <Paper classes={{ root: styles.root }}>
            <Typography classes={{ root: styles.title }} variant='h5'>
                login to Account
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    className={styles.field}
                    label='E-Mail'
                    type='email'
                    error={Boolean(errors.email?.message)}
                    helperText={errors.email?.message}
                    {...register('email', { required: 'Enter your e-mail' })}
                    fullWidth
                />
                <TextField
                    className={styles.field}
                    label='Password'
                    type='password'
                    error={Boolean(errors.password?.message)}
                    helperText={errors.password?.message}
                    {...register('password', { required: 'Enter password' })}
                    fullWidth
                />
                <Button type='submit' size='large' variant='contained' fullWidth>
                    Log in
                </Button>
            </form>
        </Paper>
    );
};
