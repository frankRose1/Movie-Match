import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import Layout from './components/Layout';
import CreateCafe from './containers/CreateCafe';
import Cafes from './containers/Cafes';
import Auth from './containers/Auth';

class App extends Component {
  
  render() {
    return (
      <div>
      <Layout>
        <Switch>
          <Route exact path="/" component={Cafes}/>
          <Route path="/add" component={CreateCafe} />
          <Route path="/cafes" component={Cafes}/>
          <Route path="/login" component={Auth}/>
        </Switch>
      </Layout>
      </div>
    );
  }
}

export default App;
