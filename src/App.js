import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Switch,
  Route,
} from 'react-router-dom';
import Login from './pages/Login';
import Header from './Components/Header';

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" render={ (props) => <Login { ...props } /> } />
      </Switch>
    </div>
  );
}

export default App;
