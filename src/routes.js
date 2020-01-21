import React from 'react';
import { Route } from 'react-router';

/**
 * Import all page components here
 */
import App from './App';
import Dashboard from './containers/Dashboard/Dashboard';
import UserProfile from './containers/LoanDetail/LoanDetail'

/**
 * All routes go here.
 * Don't forget to import the components above after adding new route.
 */

const routes = {
    "/": () => <App />,
    "/dashboard": () => <Dashboard />,
    "/loan": () => <UserProfile />
};
export default routes;