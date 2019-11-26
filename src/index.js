import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import Dashboard from './containers/Dashboard/Dashboard';
import registerServiceWorker from './registerServiceWorker';
import { Router, BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router';
import routes from './routes';
import UserProfile from './containers/Userprofile/Userprofile';

ReactDOM.render(
    <BrowserRouter>
        <Route exact path="/" component={App}></Route>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/userprofile" component={UserProfile} />
    </BrowserRouter>
    , document.getElementById('root'));
registerServiceWorker();
