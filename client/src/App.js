import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import Layout from './components/Layout';
import CreateCafe from './containers/CreateCafe';
import Cafes from './containers/Cafes';
import Account from './components/Account';

//this is where we want to check for a token in local storage, to see if a user is signed in
  //this is because this comp is always loaded

class App extends Component {

  // maybe update state in this component to be authenticated: true ?
  checkAuthState = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      //user is signed out
    } else {
      //user is signed in
    }
  };
  
  render() {
    return (
      <Layout>
        <Switch>
          <Route exact path="/" component={Cafes}/>
          <Route path="/add" component={CreateCafe} />
          <Route path="/cafes" component={Cafes}/>
          <Route path="/account" component={Account}/>
        </Switch>
      </Layout>
    );
  }
}

export default App;
