import React from 'react';
import Nav from './Nav';
import Search from '../containers/Search';

const Header = () => {
  return (
    <header>
      <a href="/">The Grind Logo</a>
      <Nav />
      <Search />
    </header>
  );
};

export default Header;