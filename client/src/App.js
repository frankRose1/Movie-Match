import React, { Component } from 'react';
import CreateCafe from './containers/CreateCafe';
import Layout from './components/Layout';

class App extends Component {
  state = {
    data: null
  }

  // componentDidMount(){
  //   this.call_API("/api/hello")
  //     .then(res => {
  //       this.setState({data: res});
  //       console.log(this.state.data);
  //     })
  //     .catch(err => console.error(err))
  // }

  call_API = async (route) => {
    const response = await fetch(route);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }

    return body;
  };

  render() {

    return (
      <div className="App">
      <Layout>
        <CreateCafe />
      </Layout>
      </div>
    );
  }
}

export default App;
