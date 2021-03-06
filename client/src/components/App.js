import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { checkAuthState } from "../actions/auth";
import Layout from "./Layout";
import CreateCafe from "./CreateCafe";
import Cafes from "./Cafes";
import CafeProfile from './CafeProfile';
import TopRated from './TopRated';
import Auth from "./Auth";
import SignUp from "./SignUp";
import Logout from "./Logout";
import NotFound from "./NotFound";
import ProtectedRoute from "./ProtectedRoute";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(checkAuthState());
  }

  render() {
    const { isAuthenticated } = this.props;
    
    return (
      <Layout>
        <Switch>
          <Route exact path="/" component={Cafes} />
          <Route exact path="/cafes" component={Cafes} />
          <Route path="/top-rated" component={TopRated} />
          <Route exact path="/logout" component={Logout} />
          <Route exact path="/login" component={Auth} />
          <Route exact path="/register" component={SignUp} />
          <Route exact path="/cafe/:cafeSlug" component={CafeProfile} />
          <ProtectedRoute exact isAuthenticated={isAuthenticated} path="/add" component={CreateCafe} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    isAuthenticated: auth.token !== null
  };
};

export default withRouter(connect(mapStateToProps)(App));
