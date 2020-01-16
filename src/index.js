import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from "./containers/App";
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { ModalProvider } from "react-modal-hook";
import { TransitionGroup } from "react-transition-group";
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './styles'

ReactDOM.render(
    <BrowserRouter>
        <ThemeProvider theme={theme}>
            <ModalProvider container={TransitionGroup}>
                <App />
            </ModalProvider>
        </ThemeProvider>

    </BrowserRouter>,
    document.getElementById('root')
);

registerServiceWorker();
