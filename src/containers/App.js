import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from "./Dashboard/Dashboard";
import LoanDetail from "./LoanDetail/LoanDetail";
import Login from './Login/Login'
import '../containers/App.css'
import AuthRoute from './auth'
import NoPageFound from './NoPageFound/NoPageFound';
import { routes } from '../globals';



const App = () => {
  return (
    <div className="App">
      { /* Constant header component */}
      { /* Container stuff goes here  */}
      <Switch>
        <Route exact path={routes.HOME} component={Login}></Route>
        <AuthRoute exact path={routes.DASHBOARD} component={Dashboard} />
        <AuthRoute path={routes.LOANDETAIL + '/:loanAppNo'} component={LoanDetail} />
        <Route component={NoPageFound} />
      </Switch>
    </div>
  );
};
export default App;
