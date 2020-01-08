import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from "./containers/App";
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { ModalProvider } from "react-modal-hook";
import { TransitionGroup } from "react-transition-group";

ReactDOM.render(
    <BrowserRouter>
        <ModalProvider container={TransitionGroup}>
            <App />
        </ModalProvider>
    </BrowserRouter>,
    document.getElementById('root')
);

registerServiceWorker();
