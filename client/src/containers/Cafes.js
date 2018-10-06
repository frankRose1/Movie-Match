import React, { Component } from 'react';
import axios from '../axios';
import Loading from '../components/UI/Loading';

/**most components that are fetching data will look like this */
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
    this.setState({
      loading: false,
      cafes: cafes.data
    });
  };

  componentDidMount(){
    //make api call
    //this.fetchCafes();
  }

  render() {
    let cafesContent;
    if (this.state.loading) {
      cafesContent = <Loading />
    } else if (this.state.error) {
      cafesContent = <p>Shoot! {this.state.error.message}</p>;
    } else {
      cafesContent = this.state.cafes.map(cafe => (
        <div>Cafe Component</div>
      ));
    }

    return (
      <div>
        {cafesContent}
      </div>
    );
  }
}

export default Cafes;