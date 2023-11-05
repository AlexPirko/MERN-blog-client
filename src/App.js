import { Routes, Route } from 'react-router-dom';
import Container from '@mui/material/Container';

import { Header } from './components/Header/index';
import { Home, PostPage, Registration, AddNewPost, Login } from './pages';

function App() {
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
