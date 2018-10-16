import React from 'react';
import {NavLink} from 'react-router-dom';
import StyledNav from './styles/NavStyles';
import Logout from '../containers/Logout';


const paths = [
  'cafes',
  'tags',
  'top',
  'add',
  'account'
];

const Nav = () => (
  <StyledNav>
    <ul>
      {paths.map(path => (
        <li key={path}>
          <NavLink to={`/${path}`}>{path}</NavLink>
        </li>
      ))}
      <Logout />
    </ul>
  </StyledNav>
);

export default Nav;