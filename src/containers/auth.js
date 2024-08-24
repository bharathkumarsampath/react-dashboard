import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { globals } from '../globals';

const checkAuth = (props) => {

    const token = localStorage.getItem('token');
    if (!token) {
        return false;
    } else {
        return true;

    }
}


const AuthRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        checkAuth() ? (<Component {...props} />)
            : (
                <Redirect to={{ pathname: globals.routes.HOME }} />
            )
    )} />

)



export default AuthRoute;
