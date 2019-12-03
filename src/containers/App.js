import React from 'react';
import { Route } from 'react-router-dom';
import Dashboard from "./Dashboard/Dashboard";
import UserProfile from "./Userprofile/Userprofile";
import Login from './Login/Login'
import '../containers/App.css'
import AuthRoute from './auth'

const App = () => {
  return (
    <div className="App">
      { /* Constant header component */}
      { /* Container stuff goes here  */}
      <Route exact path="/" component={Login}></Route>
      <AuthRoute path="/dashboard" component={Dashboard} />
      <Route exact path="/userprofile" component={UserProfile} />
    </div>
  );
};
export default App;
