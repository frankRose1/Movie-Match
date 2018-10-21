import React, { Component } from 'react';
import axios from '../utils/axios';
import styled from 'styled-components';
import Cafe from './Cafe';
import Loading from './UI/Loading';
import {handleGetCafes} from '../actions/cafes';

const CafeGrid = styled.ul`
  display: grid;
  grid-gap: 40px;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
`;


class Cafes extends Component {

  state = {
    cafes: [],
    loading: false,
    error: false
  }

  fetchCafes = () => {
    this.setState({loading: true});
    axios.get('/cafes')
      .then(res => {
        this.setState({cafes: res.data, loading: false});
      })
      .catch(err => {
        this.setState({error: err, loading: false});
      });
  };

  componentDidMount(){
    this.fetchCafes();
  }

  render() {
    let cafesContent = null;
    if (this.state.loading) {
      cafesContent = <Loading />
    } else if (this.state.error) {
      cafesContent = <p>Shoot! {this.state.error.message}</p>;
    } else {
      cafesContent = 
        <CafeGrid>
          {this.state.cafes.map(cafe => (
            <Cafe
              key={cafe._id}
              cafe={cafe}/>
          ))}
        </CafeGrid>
      ;
    }

    return (
      <div>
        {cafesContent}
      </div>
    );
  }
}

export default Cafes;