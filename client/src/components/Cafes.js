import React, { Component } from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import Cafe from './Cafe';
import Loading from './UI/Loading';
import Error from './ErrorMessage';
import {handleFetchCafes} from '../actions/cafes';

const CafeGrid = styled.ul`
  display: grid;
  grid-gap: 40px;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
`;


class Cafes extends Component {

  componentDidMount(){
    this.props.dispatch(handleFetchCafes());
  }

  render() {
    const {loading, cafes, error} = this.props;

    let cafesContent = null;
    if (loading) {
      cafesContent = <Loading />
    } else if (error) {
      cafesContent = <Error error={error} />
    } else {
      cafesContent = 
        <CafeGrid>
          {cafes.map(cafe => (
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

const mapStateToProps = ({cafes}) =>  (
  {
    loading: cafes.loading,
    cafes: cafes.cafes,
    error: cafes.error
  }
)

export default connect(mapStateToProps)(Cafes);