import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import Loading from './UI/Loading'
import Error from './ErrorMessage'
import TopRatedStyles from './styles/TopRatedStyles'
import {handleFetchTopRated} from '../actions/cafes'

class TopRated extends Component {

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    cafes: PropTypes.array.isRequired
  }

  componentDidMount(){
    this.props.dispatch(handleFetchTopRated())
  }

  render() {

    const { cafes, error, loading } = this.props;

    if (loading) {
      return <Loading />
    }

    if (error) {
      return <Error error={error}/>
    }

    return (
      <Fragment>
        <h2>Top {cafes.length} Cafes</h2>
        <TopRatedStyles>
          <thead>
            <tr>
              <td>Photo</td>
              <td>Ranking</td>
              <td>Name</td>
              <td>Reviews</td>
              <td>Average Rating</td>
            </tr>
          </thead>
            {cafes.map((cafe, i) => (
              <tr key={cafe._id}>
                <td>
                  <Link to={`/cafe/${cafe.slug}`}>
                    <img width="200" src={cafe.image} alt={cafe.name}/>
                  </Link>
                </td>
                <td>{i + 1}</td>
                <td>
                  <Link to={`/cafe/${cafe.slug}`}>
                    {cafe.name}
                  </Link>
                </td>
                <td>{cafe.reviews.length}</td>
                <td>{Math.round(cafe.averageRating * 10) / 10} / 5</td>
              </tr>
            ))}
        </TopRatedStyles>
      </Fragment>
    )
  }

}

const mapStateToProps = ({cafes}) => ({
  loading: cafes.loading,
  cafes: cafes.cafes,
  error: cafes.error
})

export default connect(mapStateToProps)(TopRated)
