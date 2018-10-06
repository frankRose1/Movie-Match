import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import Layout from './components/Layout';
import CreateCafe from './containers/CreateCafe';
import Auth from './containers/Auth';

class App extends Component {
  
  render() {
    return (
      <div className="App">
      <Layout>
        <Switch>
          <Route path="/add" Component={CreateCafe} />
          <Route path="/login" Component={Auth}/>
        </Switch>
      </Layout>
      </div>
    );
  }
}

export default App;
