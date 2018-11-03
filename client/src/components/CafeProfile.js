import React, { Component } from 'react';
import {connect} from 'react-redux';
import CafeProfileStyles from './styles/CafeProfileStyles';
import Loading from './UI/Loading';
import Error from './ErrorMessage';
import {fetchCafeBySlug} from '../actions/cafe';

class CafeProfile extends Component {

  componentDidMount(){
    const {cafeSlug} = this.props.match.params;
    this.props.dispatch(fetchCafeBySlug(cafeSlug));
  }
  

  render() {
    const {cafe, loading, error} = this.props;

    if (loading) {
      return <Loading />
    }

    if (error) {
      return <Error error={error}/>
    }
    
    return (
      <CafeProfileStyles>
        <div className="hero">
          <img className="hero" src={cafe.largeImage} alt={cafe.name}/>
        </div>

        <div className="cafe-details">
          <img className="map" src="" alt=""/>
          <p className="location">store address</p>
          <p>cafe description</p>
        </div>

        <div>
          if user is signed in an is not the owner of the store put up review form
        </div>

        <div>
          if store has reviews show them and the users avatar
        </div>

      </CafeProfileStyles>
    )
  }
}

const mapStateToProps = ({cafe}) => ({
  cafe: cafe.cafe,
  loading: cafe.loading,
  error: cafe.error
});

export default connect(mapStateToProps)(CafeProfile);
