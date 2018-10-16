import React, { Component } from 'react';
import StyledSearch from '../components/styles/SearchStyles';

class Search extends Component {
  render() {
    return (
      <StyledSearch>
        <input type="search" name="search" placeholder="Coffee, Fresh-Brewed, Free Wifi..."/>
      </StyledSearch>
    );
  }
}

export default Search;