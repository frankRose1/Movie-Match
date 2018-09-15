import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    data: null
  }

  componentDidMount(){
    this.call_API("/api/hello")
      .then(res => {
        this.setState({data: res});
        console.log(this.state.data);
      })
      .catch(err => console.error(err))
      
  }

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
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          {this.state.data == null ? '' : this.state.data.name}
        </p>
      </div>
    );
  }
}

export default App;
