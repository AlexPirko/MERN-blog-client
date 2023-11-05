import './index.scss';

import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme';

import App from './App';
import store from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <>
        <CssBaseline />
        <ThemeProvider theme={theme}>
            <Router>
                <Provider store={store}>
                    <App />
                </Provider>
            </Router>
        </ThemeProvider>
    </>,
);
