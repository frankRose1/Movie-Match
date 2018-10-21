import React, {Fragment} from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import StyledNav from './styles/NavStyles';

const Nav = ({isAuth}) => (
  <StyledNav>
    <ul>
      <li>
        <NavLink to='/cafes'>Cafes</NavLink>
      </li>
      <li>
        <NavLink to='/tags'>Tags</NavLink>
      </li>
      <li>
        <NavLink to='/top'>Top</NavLink>
      </li>
      {isAuth
      ? <Fragment>
          <li>
            <NavLink to='/add'>Add</NavLink>
          </li>
          <li>
            <NavLink to='/logout'>Logout</NavLink>
          </li>
        </Fragment>
      : <li>
          <NavLink to='/account'>Account</NavLink>
        </li> }
    </ul>
  </StyledNav>
);

Nav.propTypes = {
  isAuth: PropTypes.bool.isRequired
};

export default Nav;