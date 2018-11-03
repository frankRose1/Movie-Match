import React, { Component } from 'react';
import {connect} from 'react-redux';
import CafeProfileStylesfrom from './styles/CafeProfileStyles';
import Reviews from './Reviews';
import Loading from './UI/Loading';
import Error from './ErrorMessage';
import {fetchCafeBySlug, clearCafeError} from '../actions/cafe';
import {googleApiKey} from '../config';

class CafeProfile extends Component {

  componentDidMount(){
    const {cafeSlug} = this.props.match.params;
    this.props.dispatch(fetchCafeBySlug(cafeSlug));
  }

  /** 
   * if a cafe isnt found for a given slug the API will return a 404 error
   * clear it out before moving to another page that uses "cafe" state or it will show an unrelated error message there (ed /add)
   */
  componentWillUnmount(){
    this.props.dispatch(clearCafeError());
  }

  render() {
    const {cafe, loading, error, reviews} = this.props;

    if (loading) {
      return <Loading />
    }

    if (error) {
      return <Error error={error}/>
    }

    return (
      <CafeProfileStyles>
        <div className="hero">
          <img src={cafe.largeImage} alt={cafe.name}/>
        </div>

        <div className="cafe-details">
          { cafe.location && <img 
            className="map" 
            src={`https://maps.googleapis.com/maps/api/staticmap?center=${cafe.location.coordinates[1]},${cafe.location.coordinates[0]}&zoom=14&size=800x150&key=${googleApiKey}&markers=${cafe.location.coordinates[1]},${cafe.location.coordinates[0]}&scale=2`} 
            alt="Cafe Location"/> }
          <p className="location">{cafe.location.address}</p>
          <p>{cafe.description}</p>
        </div>

        <div>
          if user is signed in an is not the owner of the store put up review form
        </div>

        {
          reviews.length 
            ? <Reviews reviews={reviews} />
            : <p style={{textAlign: 'center', fontSize: '3rem'}}>There are no reviews for this cafe yet!</p> 
        }

      </CafeProfileStyles>
    )

  }
}

const mapStateToProps = ({cafe}) => ({
  cafe: cafe.cafe,
  reviews: cafe.cafe.reviews,
  loading: cafe.loading,
  error: cafe.error
});

export default connect(mapStateToProps)(CafeProfile);
