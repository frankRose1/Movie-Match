import React from 'react'
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import CafeStyles from './styles/CafeStyles';

const Cafe = props => {
  const {cafe} = props;
  return (
    <CafeStyles>
      <div className="cafe__hero">
        <div className="cafe__actions">
            <div className="cafe__action">blah</div>
            <div className="cafe__action">blah</div>
            <div className="cafe__action">blah</div>
        </div>
        <img src={cafe.image} alt={cafe.name}/>
        <h2 className="title">
          <Link to={`/cafe/${cafe.slug}`}>{cafe.name}</Link>
        </h2>
      </div>
      <div className="cafe__details">
        <p>{cafe.description.split(' ').slice(0, 25).join(' ')}</p>
      </div>
    </CafeStyles>
  );
};

Cafe.propTypes = {
  cafe: PropTypes.object.isRequired
};

export default Cafe;