import React, { Component, useRoutes } from 'react';
import './App.css';
import Toolbar from './components/Toolbar/Toolbar'
import Login from './containers/Login/Login'
import Search from './components/Search/Search'
import routes from './routes'



class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p> */}
        <Toolbar />
        {/* <Search /> */}
        <Login />
      </div>
    );
  }
}
// function App() {
//   const routeResult = useRoutes(routes);
//   return (
//     <div className="App">
//       {/* <A href="/user">Users Page</A>
//       <A href="/about">About Page</A>
//       <A href="/contact">Contacts Page</A> */}
//       <Toolbar />
//       <Login />
//       {routeResult}
//     </div>
//   );
// }

export default App;
