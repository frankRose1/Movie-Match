import React, {Component, Fragment} from 'react';
import {NavLink, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import StyledNav from './styles/NavStyles';

class Nav extends Component {
  render(){
    const {isAuthenticated, user} = this.props;
    return(
      <StyledNav>
        <ul>
          <li>
            <NavLink to='/cafes'>Cafes</NavLink>
          </li>
          <li>
            <NavLink to='/tags'>Tags</NavLink>
          </li>
          <li>
            <NavLink to='/top-rated'>Top</NavLink>
          </li>
          {isAuthenticated
          ? <Fragment>
              <li>
                <NavLink to='/add'>Add</NavLink>
              </li>
              <li>
                <NavLink to='/logout'>Logout</NavLink>
              </li>
              <li>
                <Link to='/account'>
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    title="You must have a Gravatar connected to your email to display an image." 
                    className="avatar"/>
                </Link>
              </li>
            </Fragment>
          : <Fragment>
              <li>
                <NavLink to='/login'>Sign In</NavLink>
              </li>
              <li>
                <NavLink to='/register'>Register</NavLink>
              </li>
            </Fragment>  }
        </ul>
      </StyledNav>
    )
  }
}

Nav.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = ({auth}) => ({
  isAuthenticated: auth.token !== null,
  user: auth.user
});

export default connect(mapStateToProps)(Nav);