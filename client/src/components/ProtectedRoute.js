import React from 'react';
import {Route, Redirect} from 'react-router-dom';

const ProtectedRoute = ({component: ProtectedComponent, isAuthenticated, ...rest}) => {
  console.log(rest)
  return (
  <Route  {...rest} render={(props) => (
    isAuthenticated 
    ? <ProtectedComponent {...props} />
    : <Redirect to="/login"/>
  )} />
)};

export default ProtectedRoute;