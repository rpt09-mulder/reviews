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
    let id, path;
    path = window.location.pathname;
    if (path === path.match(/\//)) {
      path = '/1';
    }

    axios.get(`${ebUrl}reviews${path}`)
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