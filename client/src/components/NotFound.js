import React from 'react';
import NotFoundStyles from './styles/NotFoundStyles';
import {Link} from 'react-router-dom';

const NotFound = () => (
  <NotFoundStyles>
    <div className="error">
      <p className="error-code">404</p>
      <i class="fas fa-frown-open"></i>
    </div>
    <p className="not-found-message">Shoot! We couldn't find the page you requested.</p>
    <Link className="not-found-link" to="/">Home</Link>
  </NotFoundStyles>
);

export default NotFound;