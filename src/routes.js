import React from 'react';
import { Route } from 'react-router';

/**
 * Import all page components here
 */
import App from './App';
import Dashboard from './containers/Dashboard/Dashboard';
import UserProfile from './containers/Userprofile/Userprofile'

/**
 * All routes go here.
 * Don't forget to import the components above after adding new route.
 */

const routes = {
    "/": () => <App />,
    "/dashboard": () => <Dashboard />,
    "/userprofile": () => <UserProfile />
};
export default routes;