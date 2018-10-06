import React from 'react';
import {NavLink} from 'react-router-dom';

const paths = [
  'cafes',
  'tags',
  'top',
  'add',
  'register',
  'login'
];

const Nav = () => (
  <nav>
    <ul>
      {paths.map(path => (
        <li key={path}>
          <NavLink to={`/${path}`}>{path}</NavLink>
        </li>
      ))}
    </ul>
  </nav>
);

export default Nav;