import React, { Component } from 'react';
import {connect} from 'react-redux';
import CafeProfileStyles from './styles/CafeProfileStyles';
import Reviews from './Reviews';
import CreateReview from './CreateReview';
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
    const {cafe, loading, error, isAuhenticated, currentUser} = this.props;

    if (loading) {
      return <Loading />
    }

    if (error) {
      return <Error error={error}/>
    }

    if (cafe) {
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
            {cafe.location && <p className="location">{cafe.location.address}</p>}
            <p>{cafe.description}</p>
          </div>
          
          {/* show the review form to authenticated users and who are not the cafe owner */}
          {isAuhenticated && currentUser.id !== cafe.user._id && <CreateReview cafeId={cafe._id}/>}
  
          {
            cafe.reviews.length 
              ? <Reviews reviews={cafe.reviews} />
              : <p style={{textAlign: 'center', fontSize: '3rem'}}>There are no reviews for this cafe yet!</p> 
          }
  
        </CafeProfileStyles>
      )
    }

    return <Loading />

  }
}

const mapStateToProps = ({cafe, auth}) => ({
  cafe: cafe.cafe,
  loading: cafe.loading,
  error: cafe.error,
  isAuhenticated: auth.token !== null,
  currentUser: auth.user
});

export default connect(mapStateToProps)(CafeProfile);
