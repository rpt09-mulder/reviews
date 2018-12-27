import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }
  componentDidMount() {
    const ebUrl = 'http://firebnb-reviews.8di9c2yryn.us-east-1.elasticbeanstalk.com'; 
    // const localUrl = 'http://localhost:3003'
    let path = window.location.pathname;
    
    if (!path.match(/^\/[0-9]+$/)) {
      path = '/1';
    }
    console.log('path: ', path);
    axios.get(`${ebUrl}/reviews${path}`)
      .then(res => res.data)
      .then(res => {
        this.setState({
          data: res.data[0]
        });
      });
  }

  render() {
    return (
      <div>
        <h1>Firebnb reviews</h1>
      </div>
    )
  }
}

export default App;