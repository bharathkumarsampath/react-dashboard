import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from "./Dashboard/Dashboard";
import UserProfile from "./Userprofile/Userprofile";
import Login from './Login/Login'
import '../containers/App.css'
import AuthRoute from './auth'
import NoPageFound from './NoPageFound/NoPageFound';



const App = () => {
  return (
    <div className="App">
      { /* Constant header component */}
      { /* Container stuff goes here  */}
      <Switch>
        <Route exact path="/" component={Login}></Route>
        <AuthRoute exact path="/dashboard" component={Dashboard} />
        <AuthRoute exact path="/userprofile" component={UserProfile} />
        <Route component={NoPageFound} />
      </Switch>
    </div>
  );
};
export default App;
