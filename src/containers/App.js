import React from 'react';
import { Route } from 'react-router-dom';
import Dashboard from "./Dashboard/Dashboard";
import UserProfile from "./Userprofile/Userprofile";
import Login from './Login/Login'

const App = () => {
  return (
    <div>
      { /* Constant header component */}
      { /* Container stuff goes here  */}
      <Route exact path="/" component={Login}></Route>
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/userprofile" component={UserProfile} />
    </div>
  );
};
export default App;
