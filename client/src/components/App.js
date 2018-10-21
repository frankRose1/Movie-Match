import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import Layout from './Layout';
import CreateCafe from './CreateCafe';
import Cafes from './Cafes';
import Account from './Account';
import Logout from './Logout';
import NotFound from './NotFound';

class App extends Component {

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
          <Route path="/logout" component={Logout}/>
          <Route component={NotFound}/>
        </Switch>
      </Layout>
    );
  }
}

export default App;
