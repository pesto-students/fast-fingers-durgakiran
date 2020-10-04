import React, { useState } from 'react';
import './App.css';
import Login from './containers/login/Login';
import Play from './containers/Play/Play';

function App() {

  const [ userName, setUserName ] = useState(sessionStorage.getItem('userName'));

  const updateUserName = (userName) => {
    setUserName(userName);
  }
  

  const componentToRender = Boolean(userName) ? <Play /> : <Login onUserUpdate={(userName) => updateUserName(userName)}/>;

  return (
    <section className="App">
      {
        componentToRender
      }
    </section>
  );
}
export default App;
