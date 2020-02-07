import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from "./Dashboard/Dashboard";
import LoanDetail from "./LoanDetail/LoanDetail";
import Login from './Login/Login'
import '../containers/App.css'
import AuthRoute from './auth'
import NoPageFound from './NoPageFound/NoPageFound';
import { globals } from '../globals';



const App = () => {
  return (
    <div className="App">
      { /* Constant header component */}
      { /* Container stuff goes here  */}
      <Switch>
        <Route exact path={globals.routes.HOME} component={Login} />
        <AuthRoute exact path={globals.routes.DASHBOARD} component={Dashboard} />
        <AuthRoute path={globals.routes.LOANDETAIL + '/:loanAppNo'} component={LoanDetail} />
        <Route component={NoPageFound} />
      </Switch>
    </div>
  );
};
export default App;
