import styles from './Header.module.scss';
import { useSelector, useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { logout, userIsAuth } from '../../store/slices/auth';

export const Header = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(userIsAuth);

    const onClickLogout = () => {
        if (window.confirm('Are you sure you want to log out?')) {
            dispatch(logout());
            window.localStorage.removeItem('token');
        }
    };

    return (
        <div className={styles.root}>
            <Container maxWidth='lg'>
                <div className={styles.inner}>
                    <Link className={styles.logo} to='/'>
                        <div>SIMPLE BLOG</div>
                    </Link>
                    <div className={styles.buttons}>
                        {isAuth ? (
                            <>
                                <Link to='/posts/create'>
                                    <Button variant='contained'>Write a post</Button>
                                </Link>
                                <Button onClick={onClickLogout} variant='contained' color='error'>
                                    Log out
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link to='/login'>
                                    <Button variant='outlined'>Log in</Button>
                                </Link>
                                <Link to='/register'>
                                    <Button variant='contained'>Sign up</Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    );
};
