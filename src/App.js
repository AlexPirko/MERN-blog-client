import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import Container from '@mui/material/Container';

import { Header } from './components/Header/index';
import { Home, PostPage, Registration, AddNewPost, Login } from './pages';
import { fetchAuthMe } from './store/slices/auth';

function App() {
    const dispatch = useDispatch();
    // const isAuth = useSelector(userIsAuth);

    useEffect(() => {
        dispatch(fetchAuthMe());
    }, [dispatch]);

    return (
        <>
            <Header />
            <Container maxWidth='lg'>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/posts/:id' element={<PostPage />} />
                    <Route path='/add-post' element={<AddNewPost />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Registration />} />
                </Routes>
            </Container>
        </>
    );
}

export default App;
