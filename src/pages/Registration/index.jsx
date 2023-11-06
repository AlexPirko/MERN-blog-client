import styles from './Registration.module.scss';

import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import { fetchUserRegistr, userIsAuth } from '../../store/slices/auth';

export const Registration = () => {
    const isAuth = useSelector(userIsAuth);
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
        },
        mode: 'onChange',
    });

    if (isAuth) {
        return <Navigate to='/' />;
    }

    const onSubmit = async (values) => {
        const data = await dispatch(fetchUserRegistr(values));

        if (!data.payload) {
            alert('Registration failed');
        }

        if ('token' in data.payload) {
            window.localStorage.setItem('token', data.payload.token);
        }
    };

    return (
        <Paper classes={{ root: styles.root }}>
            <Typography classes={{ root: styles.title }} variant='h5'>
                Create account
            </Typography>
            <div className={styles.avatar}>
                <Avatar sx={{ width: 100, height: 100 }} />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    className={styles.field}
                    label='Full Name'
                    error={Boolean(errors.fullName?.message)}
                    helperText={errors.fullName?.message}
                    {...register('fullName', { required: 'Enter your name' })}
                    fullWidth
                />
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
                    {...register('password', { required: 'Enter your password' })}
                    fullWidth
                />
                <Button disabled={!isValid} type='submit' size='large' variant='contained' fullWidth>
                    Register
                </Button>
            </form>
        </Paper>
    );
};
