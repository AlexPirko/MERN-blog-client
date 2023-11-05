import Container from '@mui/material/Container';

import { Header } from './components/Header/index';
import { Home, PostPage, Registration, AddNewPost, Login } from './pages';

function App() {
    return (
        <>
            <Header />
            <Container maxWidth='lg'>
                <Home />
                <PostPage />
                <AddNewPost />
                <Login />
                <Registration />
            </Container>
        </>
    );
}

export default App;
